"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ScrubRevealProps = {
  children: ReactNode;
  className?: string;
  /** Distance travelled, in pixels. */
  y?: number;
  /** Starting scale. 1 disables the scale component. */
  scale?: number;
  /** Start opacity. 1 keeps it fully visible and moves it only. */
  from?: number;
  /** ScrollTrigger start. Default: the element entering the viewport. */
  start?: string;
  /** ScrollTrigger end. Default: the element reaching the middle of the screen. */
  end?: string;
};

/**
 * A reveal tied to scroll POSITION rather than played once on entry.
 *
 * This is the device Wonderkin is built on — every ScrollTrigger on that site
 * is scrubbed and none are pinned. Scrubbing is why it feels composed: the page
 * moves exactly as much as you scroll it, and reverses when you scroll back.
 * Play-once reveals pop, which reads louder and cheaper.
 *
 * Use this for the calm, editorial sections. Use `Reveal` when you want a
 * one-shot entrance instead.
 */
export function ScrubReveal({
  children,
  className,
  y = 60,
  scale = 1,
  from = 0,
  start = "top bottom",
  end = "50% 50%",
}: ScrubRevealProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el || prefersReducedMotion()) return;

      gsap.fromTo(
        el,
        { y, scale, opacity: from },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start, end, scrub: true },
        },
      );
    },
    { scope, dependencies: [y, scale, from, start, end] },
  );

  return (
    <div ref={scope} className={cn(className)}>
      {children}
    </div>
  );
}
