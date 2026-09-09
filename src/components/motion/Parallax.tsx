"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Travel as a fraction of the element's height. 0.2 = 20%. */
  speed?: number;
  direction?: "up" | "down";
};

/**
 * Scroll-linked parallax. Scrubbed rather than tweened, so it tracks the
 * scrollbar exactly instead of easing behind it.
 *
 * Wrap media in this, not whole sections — parallaxing a section shifts every
 * ScrollTrigger start inside it.
 */
export function Parallax({
  children,
  className,
  speed = 0.18,
  direction = "up",
}: ParallaxProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !scope.current) return;

      const distance = speed * 100 * (direction === "up" ? -1 : 1);

      gsap.fromTo(
        scope.current.firstElementChild,
        { yPercent: -distance / 2 },
        {
          yPercent: distance / 2,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope, dependencies: [speed, direction] },
  );

  return (
    <div ref={scope} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
