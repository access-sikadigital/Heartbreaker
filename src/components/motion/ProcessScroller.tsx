"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export type ProcessStep = {
  title: string;
  body: string;
  image: string;
  alt: string;
};

type ProcessScrollerProps = {
  steps: ProcessStep[];
  eyebrow?: string;
  heading?: string;
  className?: string;
};

/**
 * A scrollytelling panel: the media holds while the steps move past it, and
 * swaps to match whichever step you are reading.
 *
 * Three linked mechanics rather than one, which is what makes it feel built
 * instead of decorated:
 *
 * 1. The media crossfades with a clip-path wipe and a counter-scale, so the
 *    outgoing frame recedes while the incoming one opens. A plain opacity
 *    crossfade between two photographs reads as a slideshow.
 * 2. A progress rail fills against scroll, scrubbed, so there is a continuous
 *    read on how far through the process you are — the steps themselves only
 *    tell you discretely.
 * 3. The step index is oversized and swapped on the same beat as the media,
 *    which ties the two halves of the layout together.
 *
 * Held with `position: sticky` rather than ScrollTrigger's `pin` — pinning
 * injects a spacer and rewrites surrounding layout, and this section sits
 * between two others that would inherit the jump.
 *
 * Without JS, or under reduced motion, every step is readable and the first
 * image shows. Nothing here gates content on an animation firing.
 */
export function ProcessScroller({
  steps,
  eyebrow,
  heading,
  className,
}: ProcessScrollerProps) {
  const scope = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* Which step is being read. One trigger per step, no scrub — this is a
     discrete state change, and scrubbing it would leave the media mid-fade. */
  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>("[data-step]", root).forEach((el, i) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 62%",
            end: "bottom 62%",
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          },
        });
      });

      // Progress rail, scrubbed across the whole column.
      const rail = root.querySelector("[data-rail-fill]");
      const column = root.querySelector("[data-steps]");
      if (rail && column) {
        gsap.fromTo(
          rail,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: column,
              start: "top 62%",
              end: "bottom 62%",
              scrub: true,
            },
          },
        );
      }
    },
    { scope },
  );

  /* Swap the media whenever the active step changes. */
  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const frames = gsap.utils.toArray<HTMLElement>("[data-frame]", root);
      frames.forEach((frame, i) => {
        const isActive = i === active;
        gsap.to(frame, {
          autoAlpha: isActive ? 1 : 0,
          clipPath: isActive ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 12% 0%)",
          scale: isActive ? 1 : 1.06,
          duration: 0.85,
          ease: "brand-out",
          overwrite: "auto",
        });
      });

      const index = root.querySelector("[data-index]");
      if (index) {
        gsap.fromTo(
          index,
          { yPercent: 40, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.55, ease: "brand-out" },
        );
      }
    },
    { scope, dependencies: [active] },
  );

  return (
    <div ref={scope} className={cn(className)}>
      {/*
        The heading scrolls away normally. Sticking it to the media meant the
        title sat next to step four still announcing the section. And it pushed
        the image most of a viewport down the screen before the sequence began.
        Only the media holds.
      */}
      <header className="mb-14 lg:mb-20">
        {eyebrow && <p className="type-label text-chilli">{eyebrow}</p>}
        {heading && (
          <h2 className="type-headline mt-4 max-w-[18ch]">{heading}</h2>
        )}
      </header>

      <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
        {/* Sticky media. Sits high and fills most of the viewport height. */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="relative aspect-4/5 overflow-hidden bg-maroon-deep lg:aspect-auto lg:h-[76svh]">
          {steps.map((step, i) => (
            <div
              key={step.image + i}
              data-frame
              className={cn(
                "absolute inset-0 will-change-transform",
                i !== 0 && "opacity-0",
              )}
            >
              <Image
                src={step.image}
                alt={step.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          ))}

          {/* Oversized index, swapped on the same beat as the media. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-gradient-to-t from-ink/80 to-transparent p-6">
            <span
              data-index
              className="type-display numeric leading-none text-offwhite"
            >
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="type-label text-paper-60">
              of {String(steps.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Steps side */}
      <div data-steps className="relative flex flex-col pl-8 lg:pl-12">
        {/* Progress rail */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-0 w-px bg-paper-20"
        >
          <div
            data-rail-fill
            className="h-full w-px origin-top scale-y-0 bg-chilli"
          />
        </div>

        {steps.map((step, i) => (
          <div
            key={step.title}
            data-step
            className={cn(
              // No top padding on the first step, so it starts level with the
              // top of the sticky image rather than half a screen below it.
              "relative py-14 transition-opacity duration-(--duration-base) first:pt-0 lg:min-h-[58svh] lg:py-20 lg:first:pt-0",
              active === i ? "opacity-100" : "opacity-45",
            )}
          >
            {/* Node on the rail */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-16 -left-[calc(2rem+3px)] h-1.5 w-1.5 rounded-pill transition-colors duration-(--duration-base) lg:-left-[calc(3rem+3px)]",
                active === i ? "bg-chilli" : "bg-paper-20",
              )}
            />

            <p className="type-label numeric text-chilli">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="type-subhead mt-4">{step.title}</h3>
            <p className="type-body mt-4 max-w-[42ch] text-paper-60">
              {step.body}
            </p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
