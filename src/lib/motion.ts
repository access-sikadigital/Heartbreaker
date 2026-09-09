import type { Variants, Transition } from "motion/react";
import { easing, durationSec } from "@/lib/tokens";

/**
 * Shared Motion variants.
 *
 * Motion (formerly Framer Motion) handles component-level and gesture work —
 * menus, hovers, page transitions, layout animation. GSAP handles anything
 * bound to scroll position. Keeping that split avoids two libraries animating
 * the same property.
 */

export const brandTransition: Transition = {
  duration: durationSec.base,
  ease: easing.brand as unknown as [number, number, number, number],
};

export const slowTransition: Transition = {
  duration: durationSec.slow,
  ease: easing.expo as unknown as [number, number, number, number],
};

/** Fade up. The default entrance for most blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: brandTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: brandTransition },
};

/** Wipe up from a mask. Pair with an overflow-hidden parent. */
export const wipeUp: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: slowTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: brandTransition },
};

/** Parent that staggers its children. Pair with any variant above. */
export function stagger(step = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: step, delayChildren: delay },
    },
  };
}

/**
 * Default viewport config for scroll-triggered reveals.
 *
 * `amount: "some"` — i.e. any part of the element visible — NOT a fraction.
 * A fractional threshold is unreachable whenever the observed element is taller
 * than the viewport: a 5000px grid in an 800px window can never exceed an
 * intersection ratio of 0.16, so `amount: 0.25` means the reveal NEVER fires
 * and the content stays permanently invisible. That is exactly what happened on
 * the service pillar grid, and it got worse the narrower the screen, because
 * the grid stacks taller.
 *
 * Any threshold that content-visibility depends on has to be one the element
 * can actually reach at every breakpoint. "some" always can.
 */
export const inView = { once: true, amount: "some", margin: "0px 0px -10% 0px" } as const;
