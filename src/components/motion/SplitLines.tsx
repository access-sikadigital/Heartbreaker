"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, SplitText, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SplitLinesProps = {
  children: ReactNode;
  className?: string;
  /** Lands on the heading itself, alongside `className`. */
  style?: CSSProperties;
  as?: ElementType;
  /** Seconds between each line. */
  stagger?: number;
  delay?: number;
  /** Animate on mount rather than on scroll — use for the hero. */
  immediate?: boolean;
};

/**
 * Masked line-by-line reveal, the signature entrance for display type.
 *
 * GSAP SplitText re-splits on resize, so the masks stay correct when the text
 * reflows. Under reduced motion the text is simply left alone — no split, no
 * mask, no tween.
 */
export function SplitLines({
  children,
  className,
  style,
  as: Tag = "div",
  stagger = 0.09,
  delay = 0,
  immediate = false,
}: SplitLinesProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !scope.current) return;

      // Split the HEADING, not the wrapper.
      //
      // Splitting the wrapper made SplitText clone the block-level child once
      // per line, so a two-line <h1> became two <h1> elements in the document.
      // Targeting the heading itself puts the line divs inside it, leaving one
      // semantic heading whatever the text wraps to.
      const target = scope.current.firstElementChild as HTMLElement | null;
      if (!target) return;

      // NO `mask` option on purpose. Masking wraps every line in an
      // overflow-hidden box sized to the line box, and Bold Money's caps
      // overshoot a sub-1 line-height — so at the tight display leading this
      // brand uses, a masked reveal shears the tops and bottoms off the type.
      // Rising from below with a fade gives the same read and cannot clip.
      const split = SplitText.create(target, {
        type: "lines",
        linesClass: "line-inner",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 40,
            opacity: 0,
            duration: 1.05,
            ease: "brand-out",
            stagger,
            delay,
            scrollTrigger: immediate
              ? undefined
              : {
                  trigger: scope.current,
                  start: "top 85%",
                  once: true,
                },
          });
        },
      });

      return () => {
        split.revert();
        ScrollTrigger.refresh();
      };
    },
    { scope, dependencies: [stagger, delay, immediate] },
  );

  /*
    `className` goes on the HEADING, not the wrapper.

    It used to sit on the wrapper, which left the <h1> with no classes at all.
    globals.css has a base rule setting every h1-h6 to the display face, and a
    bare element rule beats an inherited value — so a heading given a mono type
    role (type-headline-sm) silently rendered in Bold Money. Putting the role on
    the element itself lets the utility layer win, as it was always meant to.
  */
  return (
    <div ref={scope} className="overflow-visible">
      <Tag className={cn(className)} style={style}>
        {children}
      </Tag>
    </div>
  );
}
