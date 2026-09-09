"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full pass. Higher is slower. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  /** Pause when the pointer is over the track. */
  pauseOnHover?: boolean;
};

/**
 * The repeating strip from the website mockup — "NOW BOOKING JUNE", set in
 * Lenia Mono caps on a maroon band.
 *
 * Content is rendered twice and the track translates -50%, which is what makes
 * the loop seamless. The duplicate is aria-hidden so screen readers hear the
 * message once. Animation is pure CSS, so it runs without a scroll trigger and
 * stops dead under prefers-reduced-motion.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className,
  pauseOnHover = false,
}: MarqueeProps) {
  return (
    <div
      className={cn("marquee overflow-hidden", pauseOnHover && "group", className)}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div className="marquee-track" data-direction={reverse ? "reverse" : undefined}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
