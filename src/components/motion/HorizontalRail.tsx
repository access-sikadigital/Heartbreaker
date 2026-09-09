"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type HorizontalRailProps = {
  children: ReactNode;
  className?: string;
  /** Track height. Longer track = slower sideways travel. */
  trackClassName?: string;
};

/**
 * A row of work that travels sideways while the section holds.
 *
 * Vertical scroll is translated into horizontal movement across a sticky
 * stage — the standard way to show a long row of images without asking anyone
 * to drag a scrollbar.
 *
 * Travel is measured from the rail's real width at refresh rather than
 * hard-coded, so adding or removing an item cannot silently leave dead space at
 * the end. Below `lg` it falls back to a normal swipeable overflow row, because
 * hijacking scroll direction on a touch device is genuinely unpleasant.
 */
export function HorizontalRail({
  children,
  className,
  trackClassName = "h-[300svh]",
}: HorizontalRailProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;
      if (!window.matchMedia("(min-width: 1024px)").matches) return;

      const rail = root.querySelector<HTMLElement>("[data-rail]");
      if (!rail) return;

      gsap.to(rail, {
        x: () => -(rail.scrollWidth - window.innerWidth + 64),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className={cn("relative lg:block", trackClassName, className)}>
      <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:overflow-hidden">
        <div
          data-rail
          className="flex gap-4 overflow-x-auto px-6 pb-4 lg:gap-8 lg:overflow-visible lg:px-16 lg:pb-0"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
