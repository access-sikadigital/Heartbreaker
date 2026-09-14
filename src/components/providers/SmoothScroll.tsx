"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import {
  gsap,
  ScrollTrigger,
  registerGsap,
  systemPrefersReducedMotion,
} from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { MOTION_ENABLED, SMOOTH_SCROLL_ENABLED } from "@/lib/motion-config";

type SmoothScrollApi = {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
  stop: () => void;
  start: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollApi>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * Lenis smooth scrolling, driven by the GSAP ticker so Lenis and ScrollTrigger
 * share ONE requestAnimationFrame loop. Two loops is the usual cause of jittery
 * pinned sections.
 *
 * Reduced-motion visitors get native scrolling and no Lenis instance at all.
 *
 * The instance lives in BOTH a ref and state on purpose: the ref is what the
 * stable callbacks read (so their identity never changes), and the state is
 * what the context value is built from — reading a ref during render is not
 * safe under concurrent rendering.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useIsomorphicLayoutEffect(() => {
    registerGsap();

    // Tells CSS that JS is live, so animated elements may safely start hidden.
    document.documentElement.classList.add("js");

    /*
      Gated on the smooth-scroll switch and the visitor's real preference, NOT
      on the animation switch. Scroll-linked animation being off does not mean
      the wheel should feel different: those are two separate decisions, and
      they are two separate flags in motion-config.ts.
    */
    if (!SMOOTH_SCROLL_ENABLED || systemPrefersReducedMotion()) {
      ScrollTrigger.refresh();
      return;
    }

    const instance = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Native momentum on touch beats an emulated version every time.
      syncTouch: false,
    });

    lenisRef.current = instance;
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Fonts and images change document height; recalculate once settled.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  const scrollTo = useCallback<SmoothScrollApi["scrollTo"]>((target, offset = 0) => {
    const instance = lenisRef.current;
    if (instance) {
      instance.scrollTo(target, { offset, duration: 1.2 });
      return;
    }
    // Reduced motion, or Lenis not mounted yet.
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (el instanceof HTMLElement) {
      window.scrollTo({ top: el.offsetTop + offset, behavior: "auto" });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target + offset, behavior: "auto" });
    }
  }, []);

  /*
    With smooth scrolling off there is no Lenis instance, so `stop()` would
    have been a no-op and the page would scroll underneath the open mobile
    menu — on iOS that leaves you somewhere else entirely when you close it.
    Falling back to locking the document keeps the menu behaving the same way
    whether or not Lenis is running.
  */
  const stop = useCallback(() => {
    const instance = lenisRef.current;
    if (instance) {
      instance.stop();
      return;
    }
    document.documentElement.style.overflow = "hidden";
  }, []);

  const start = useCallback(() => {
    const instance = lenisRef.current;
    if (instance) {
      instance.start();
      return;
    }
    document.documentElement.style.overflow = "";
  }, []);

  const api = useMemo<SmoothScrollApi>(
    () => ({ lenis, scrollTo, stop, start }),
    [lenis, scrollTo, stop, start],
  );

  /*
    MotionConfig covers the half of the site GSAP does not: the Reveal /
    RevealItem entrances and the mobile menu's AnimatePresence, which are
    Motion components with their own `initial` / `animate` / `exit` props and
    never consult `prefersReducedMotion()`.

    "always" rather than "user": the switch is a design decision here, not the
    visitor's preference. Motion still applies the END state of every
    transition, so elements land where they belong instead of being left at the
    `initial` values — which is exactly the stranded-at-opacity-0 failure that
    deleting the components by hand would have risked.

    This provider is the right home for it because it is already the client
    boundary. Putting MotionConfig in layout.tsx would drag a client component
    into a server one for no gain.
  */
  const tree = MOTION_ENABLED ? (
    children
  ) : (
    <MotionConfig reducedMotion="always">{children}</MotionConfig>
  );

  return <SmoothScrollContext.Provider value={api}>{tree}</SmoothScrollContext.Provider>;
}
