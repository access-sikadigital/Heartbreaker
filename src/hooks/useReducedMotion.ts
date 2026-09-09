"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Tracks the visitor's reduced-motion preference, and keeps tracking it — the
 * setting can be changed mid-session on every major platform.
 *
 * For imperative code outside React (GSAP setup, Lenis) use
 * `prefersReducedMotion()` from `@/lib/gsap` instead.
 */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
