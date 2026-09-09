"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, SplitText, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SplitLinesProps = {
  children: ReactNode;
  className?: string;
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
  as: Tag = "div",
  stagger = 0.09,
  delay = 0,
  immediate = false,
}: SplitLinesProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !scope.current) return;

      // NO `mask` option on purpose. Masking wraps every line in an
      // overflow-hidden box sized to the line box, and Bold Money's caps
      // overshoot a sub-1 line-height — so at the tight display leading this
      // brand uses, a masked reveal shears the tops and bottoms off the type.
      // Rising from below with a fade gives the same read and cannot clip.
      const split = SplitText.create(scope.current, {
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

  // The scope keeps overflow visible so a mid-animation line is never clipped
  // by an ancestor; SplitText's own per-line masks do the clipping.
  return (
    <div ref={scope} className={cn("overflow-visible", className)}>
      <Tag>{children}</Tag>
    </div>
  );
}
