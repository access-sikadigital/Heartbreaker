"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Placement within the stage, as percentages. */
export type Rect = { x: number; y: number; w: number; h: number };

export type CollageImage = {
  src: string;
  alt?: string;
  /** Resting box. Percentages of the stage, so it holds at any viewport. */
  rect: Rect;
  /**
   * This is the piece that opens to fill the frame. Exactly one tile should
   * carry it; it gets no outward travel.
   */
  fill?: boolean;
  /** Direction this tile clears the frame. Percentage of its own size. */
  travel?: { x?: number; y?: number };
  sizes?: string;
  width: number;
  height: number;
  priority?: boolean;
};

type StickyCollageProps = {
  images: CollageImage[];
  children?: ReactNode;
  cta?: { label: string; href: string };
  trackClassName?: string;
  className?: string;
};

/**
 * A packed grid of work where the centre piece opens to fill the frame.
 *
 * At rest the tiles tile the viewport with small gutters. On scroll the centre
 * piece grows to the full width and height of the stage while the others clear
 * the frame in the direction they already sit.
 *
 * GEOMETRY IS INLINE, NOT TAILWIND. Percentages here are data, and data-driven
 * arbitrary values (`w-[22%]`) are precisely the pattern Tailwind's scanner
 * misses — it reads source text, so a class assembled from a data array can
 * silently never get generated. Inline styles always apply.
 *
 * The centre grows by animating width/height/left/top rather than by scaling.
 * Scaling a box to a different aspect ratio stretches the photograph; animating
 * the box lets `object-cover` recrop it correctly at every frame. It is one
 * element, so the layout cost is not worth optimising away.
 *
 * Sticky rather than ScrollTrigger's `pin` — pinning rewrites layout and fights
 * Lenis for scroll position. Everything is scrubbed, so it reverses exactly.
 */
export function StickyCollage({
  images,
  children,
  cta,
  trackClassName = "h-[280svh]",
  className,
}: StickyCollageProps) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = track.current;
      if (!root || prefersReducedMotion()) return;

      const scrollTrigger = {
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      } as const;

      // The centre piece opens to the full stage.
      const filler = root.querySelector<HTMLElement>("[data-collage-fill]");
      if (filler) {
        gsap.to(filler, {
          left: "0%",
          top: "0%",
          width: "100%",
          height: "100%",
          ease: "none",
          scrollTrigger,
        });
      }

      // Everything else clears the frame the way it already leans.
      gsap.utils.toArray<HTMLElement>("[data-collage-tile]", root).forEach((tile) => {
        const x = Number(tile.dataset.travelX ?? 0);
        const y = Number(tile.dataset.travelY ?? 0);
        if (!x && !y) return;

        gsap.to(tile, {
          xPercent: x,
          yPercent: y,
          opacity: 0,
          ease: "none",
          scrollTrigger,
        });
      });

      // Type arrives once the centre piece has enough of the frame to sit on.
      const centre = root.querySelector("[data-collage-centre]");
      if (centre) {
        gsap.fromTo(
          centre,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "25% top",
              end: "60% top",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: track },
  );

  return (
    <div ref={track} className={cn("relative", trackClassName, className)}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0">
          {images.map((img, i) => (
            <div
              key={img.src + i}
              {...(img.fill
                ? { "data-collage-fill": "" }
                : {
                    "data-collage-tile": "",
                    "data-travel-x": img.travel?.x ?? 0,
                    "data-travel-y": img.travel?.y ?? 0,
                  })}
              style={{
                position: "absolute",
                left: `${img.rect.x}%`,
                top: `${img.rect.y}%`,
                width: `${img.rect.w}%`,
                height: `${img.rect.h}%`,
              }}
              className="overflow-hidden bg-maroon-deep will-change-transform"
            >
              <Image
                src={img.src}
                alt={img.alt ?? ""}
                width={img.width}
                height={img.height}
                priority={img.priority}
                sizes={img.sizes ?? "80vw"}
                className="h-full w-full object-cover"
              />
              {img.fill && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-ink/45"
                />
              )}
            </div>
          ))}
        </div>

        <div
          data-collage-centre
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-6 text-center opacity-0"
        >
          {children}
          {cta && (
            <Link
              href={cta.href}
              className="type-button pointer-events-auto mt-2 inline-flex items-center gap-3 border border-offwhite px-9 py-4 text-offwhite transition-colors duration-(--duration-fast) hover:bg-offwhite hover:text-ink"
            >
              {cta.label}
              <span aria-hidden="true">&#8599;</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
