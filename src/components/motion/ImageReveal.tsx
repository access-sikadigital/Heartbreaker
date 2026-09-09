"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  /** Where the reveal opens from. */
  from?: "bottom" | "top" | "left" | "right";
  /** Counter-scale on the media, so it settles rather than simply appearing. */
  scale?: number;
};

const INSET: Record<string, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * A clip-path wipe that uncovers media, with the media itself drifting the
 * other way underneath.
 *
 * Two moving parts is what separates this from a fade: the frame opens while
 * the photograph settles back to rest inside it, so the image reads as having
 * been there all along rather than as having just arrived.
 *
 * Plays once. A scrubbed wipe re-closes when you scroll back, which on a
 * portfolio reads as the work being taken away from you.
 */
export function ImageReveal({
  children,
  className,
  from = "bottom",
  scale = 1.16,
}: ImageRevealProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const media = root.firstElementChild;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });

      tl.fromTo(
        root,
        { clipPath: INSET[from] },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: "brand-out" },
      );

      if (media) {
        tl.fromTo(
          media,
          { scale },
          { scale: 1, duration: 1.4, ease: "brand-out" },
          0,
        );
      }
    },
    { scope, dependencies: [from, scale] },
  );

  return (
    <div ref={scope} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
