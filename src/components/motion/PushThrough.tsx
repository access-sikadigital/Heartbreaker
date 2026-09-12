"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import type { GalleryPiece } from "@/data/gallery";

/**
 * Push-through gallery.
 *
 * Each piece arrives small, grows until it fills the frame, then keeps growing
 * until you pass through it and the next one is already coming up behind. It is
 * the effect from the Wonderkin reference: the numbers below (0.42 → 1 → 2.75,
 * with a lateral drift that reverses on the way out) are what I measured off
 * that site's own ScrollTrigger timelines rather than eyeballed.
 *
 * IMPLEMENTATION NOTES
 *
 * · `position: sticky`, not ScrollTrigger `pin`. Pinning injects a spacer and
 *   rewrites the surrounding layout, which is where most "the section jumps
 *   when it unpins" bugs come from. Sticky does the same job natively.
 *
 * · The scroll distance is the wrapper's height, one viewport per piece plus
 *   one to land on. That is what gives each piece a full screen of travel; drop
 *   it and the sequence turns into a flicker.
 *
 * · One timeline, scrubbed, rather than a trigger per card. Overlapping the
 *   segments by a beat is what makes the next piece appear BEHIND the one
 *   currently blowing past the camera, instead of after it.
 *
 * · `motion-reduce:` variants unstack the whole thing into a plain vertical
 *   list. The GSAP is skipped under reduced motion, so without them the cards
 *   would stay absolutely positioned on top of one another.
 */
export function PushThrough({ items }: { items: GalleryPiece[] }) {
  const wrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = wrap.current;
      if (!root || prefersReducedMotion()) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", root);
      const caps = gsap.utils.toArray<HTMLElement>("[data-cap]", root);

      // Authored in JS, not CSS: if the animation never runs (reduced motion),
      // the markup must stay visible rather than starting at opacity 0.
      gsap.set(cards, { scale: 0.42, opacity: 0, transformOrigin: "50% 50%" });
      gsap.set(caps, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          // A little smoothing. Fully rigid scrub makes the scale read as
          // stepping rather than travelling on a trackpad.
          scrub: 0.6,
        },
      });

      cards.forEach((card, i) => {
        // Alternating drift so consecutive pieces do not arrive on the same
        // path. It reverses on the way out, which reads as the camera moving
        // past the piece rather than the piece sliding away.
        const drift = i % 2 ? 16 : -16;
        const at = i;

        tl.fromTo(
          card,
          { scale: 0.42, opacity: 0, xPercent: drift, yPercent: 6 },
          { scale: 1, opacity: 1, xPercent: 0, yPercent: 0, duration: 1 },
          at,
        ).to(
          card,
          { scale: 2.75, opacity: 0, xPercent: -drift * 0.5, duration: 1 },
          at + 1,
        );

        if (caps[i]) {
          tl.fromTo(
            caps[i],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.3 },
            at + 0.62,
          ).to(caps[i], { opacity: 0, y: -18, duration: 0.28 }, at + 1.2);
        }
      });

      // The counter tracks whichever piece is currently at full size.
      const counter = root.querySelector<HTMLElement>("[data-count]");
      if (counter) {
        items.forEach((_, i) => {
          tl.set(counter, { textContent: String(i + 1).padStart(2, "0") }, i + 0.5);
        });
      }
    },
    { scope: wrap, dependencies: [items.length] },
  );

  return (
    <div
      ref={wrap}
      /* One screen per piece, plus one to come to rest on. */
      style={{ height: `${(items.length + 1) * 100}svh` }}
      className="relative bg-ink motion-reduce:h-auto!"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden motion-reduce:static motion-reduce:block motion-reduce:h-auto motion-reduce:py-16">
        {items.map((item, i) => (
          <div
            key={item.src}
            data-card
            className="absolute inset-0 grid place-items-center will-change-transform motion-reduce:relative motion-reduce:inset-auto motion-reduce:mb-6"
          >
            <div className="relative aspect-3/4 h-[78svh] overflow-hidden bg-maroon-deep motion-reduce:h-auto motion-reduce:w-full">
              <Image
                src={item.src}
                alt={item.title}
                fill
                /* It reaches 2.75x the frame at the top of its arc, so the
                   source has to be sized for that, not for the 78svh box. */
                sizes="(max-width: 768px) 150vw, 90vw"
                priority={i === 0}
                className="object-cover"
              />
            </div>
          </div>
        ))}

        {/* Captions sit in one fixed spot and swap; they do not travel with
            the card, which would drag them off screen at 2.75x. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 motion-reduce:hidden">
          <div className="container-wide relative h-20">
            {items.map((item) => (
              <div key={item.src} data-cap className="absolute inset-x-0 bottom-0">
                <p className="type-headline-sm text-offwhite">{item.title}</p>
                <p className="type-label mt-2 text-chilli">{item.meta}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Position in the sequence. */}
        <div className="pointer-events-none absolute top-24 right-0 z-10 motion-reduce:hidden">
          <div className="container-wide flex justify-end">
            <p className="type-label numeric text-paper-40">
              <span data-count className="text-offwhite">
                01
              </span>
              {" / "}
              {String(items.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
