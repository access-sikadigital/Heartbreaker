"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How far the element follows the cursor, in pixels. */
  strength?: number;
};

/**
 * Pulls an element gently toward the cursor. For primary calls to action only —
 * used on everything it stops reading as intent and starts reading as noise.
 *
 * Pointer-fine only: on touch there is no cursor to follow, and the listeners
 * would just cost memory.
 */
export function Magnetic({ children, className, strength = 18 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const move = gsap.quickTo(el, "x", { duration: 0.5, ease: "brand" });
      const moveY = gsap.quickTo(el, "y", { duration: 0.5, ease: "brand" });

      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = event.clientX - (rect.left + rect.width / 2);
        const relY = event.clientY - (rect.top + rect.height / 2);
        move((relX / rect.width) * strength * 2);
        moveY((relY / rect.height) * strength * 2);
      };

      const onLeave = () => {
        move(0);
        moveY(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref, dependencies: [strength] },
  );

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      {children}
    </div>
  );
}
