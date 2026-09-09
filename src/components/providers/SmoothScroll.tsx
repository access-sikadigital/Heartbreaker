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
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

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

    if (prefersReducedMotion()) {
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

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  const api = useMemo<SmoothScrollApi>(
    () => ({ lenis, scrollTo, stop, start }),
    [lenis, scrollTo, stop, start],
  );

  return (
    <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>
  );
}
