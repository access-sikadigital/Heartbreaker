"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type PinnedStepsProps = {
  /** Held in place while the steps advance beside it. */
  aside: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * A panel that holds while a column of steps scrolls past it.
 *
 * Held with `position: sticky` rather than ScrollTrigger's `pin`. Pinning
 * injects a spacer element and rewrites the surrounding layout, which is where
 * most "the section jumps when it unpins" bugs come from; sticky does the same
 * job natively and leaves the document alone.
 *
 * Each step brightens as it reaches reading position and dims once past, so
 * there is always exactly one obviously-current item.
 */
export function PinnedSteps({ aside, children, className }: PinnedStepsProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>("[data-step]", root).forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.32 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              end: "top 45%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope },
  );

  return (
    <div
      ref={scope}
      className={cn("grid gap-12 lg:grid-cols-2 lg:gap-20", className)}
    >
      <div className="lg:sticky lg:top-28 lg:self-start">{aside}</div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}
