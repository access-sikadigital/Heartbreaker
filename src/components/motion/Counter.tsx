"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type CounterProps = {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

/**
 * Counts up when scrolled into view.
 *
 * The final value is rendered on the server, so it is correct before any JS
 * runs and correct for reduced-motion visitors. The tween only ever overwrites
 * a number that is already right.
 */
export function Counter({
  to,
  from = 0,
  duration = 1.6,
  suffix = "",
  prefix = "",
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const counter = { value: from };

      gsap.to(counter, {
        value: to,
        duration,
        ease: "brand-out",
        snap: { value: 1 },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(counter.value).toLocaleString()}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    { scope: ref, dependencies: [to, from, duration] },
  );

  return (
    <span ref={ref} className={cn("numeric", className)}>
      {prefix}
      {to.toLocaleString()}
      {suffix}
    </span>
  );
}
