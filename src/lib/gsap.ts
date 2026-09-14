"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";
import { Observer } from "gsap/Observer";
import { Flip } from "gsap/Flip";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { MOTION_ENABLED } from "@/lib/motion-config";

let registered = false;

/**
 * Registers every GSAP plugin the site uses, exactly once, on the client, and
 * defines the brand easing curves so GSAP and CSS agree on how motion feels.
 *
 * As of GSAP 3.13 the former "club" plugins (SplitText, DrawSVG, ScrollSmoother)
 * ship in the public package, so no auth token is needed.
 *
 * NOTE: ScrollSmoother is registered but deliberately NOT used — Lenis drives
 * smooth scrolling here. Running both fights for the scroll position.
 *
 * This is invoked at module scope below, NOT from an effect. React runs child
 * effects before parent effects, so a component using ScrollTrigger would
 * otherwise run before the provider that registered it — and an unregistered
 * ScrollTrigger has not initialised its internals, which surfaces as
 * "_context is not a function" rather than anything readable.
 */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;

  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    SplitText,
    DrawSVGPlugin,
    CustomEase,
    Observer,
    Flip,
  );

  CustomEase.create("brand", "0.22, 1, 0.36, 1");
  CustomEase.create("brand-in", "0.64, 0, 0.78, 0");
  CustomEase.create("brand-out", "0.16, 1, 0.3, 1");
  CustomEase.create("snap", "0.85, 0, 0.15, 1");

  gsap.defaults({ ease: "brand", duration: 0.9 });

  // Mobile browsers fire resize on every URL-bar collapse; ignoring it stops
  // pinned sections from recalculating mid-scroll.
  ScrollTrigger.config({ ignoreMobileResize: true });

  registered = true;
}

// Register on import. `registerGsap` no-ops on the server, so this is safe in
// a module Next also evaluates during SSR.
registerGsap();

/**
 * True when animation should not run.
 *
 * Two reasons it returns true: the visitor asked for reduced motion, or the
 * site-wide switch in `motion-config.ts` is off. Every animated component
 * already calls this before doing anything, so the switch reaches all of them
 * without touching one of them.
 *
 * The name is now slightly narrower than the behaviour. It stays because it is
 * called in about twenty places and a rename would be twenty edits that change
 * no logic.
 */
export function prefersReducedMotion() {
  if (!MOTION_ENABLED) return true;
  return systemPrefersReducedMotion();
}

/**
 * The visitor's ACTUAL operating-system preference, ignoring the site switch.
 *
 * Needed because the two are no longer the same question. Animations are off
 * by site decision, but smooth scrolling is on, and the only thing that should
 * override smooth scrolling is a real request for reduced motion.
 */
export function systemPrefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export {
  gsap,
  useGSAP,
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  CustomEase,
  Observer,
  Flip,
  ScrollSmoother,
};
