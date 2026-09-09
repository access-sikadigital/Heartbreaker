"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ScrollCurtainProps = {
  /** The panel underneath — usually the footer. */
  beneath: ReactNode;
  /** The page content that lifts away to reveal it. */
  children: ReactNode;
  className?: string;
  /** Height of the reveal, as a CSS length. Should match the panel's height. */
  height?: string;
};

/**
 * The last section lifts away to uncover a panel sitting behind it.
 *
 * Wonderkin uses this on its footer — a scrubbed trigger running from `5%
 * bottom` to `bottom bottom`, so the footer is uncovered rather than scrolled
 * to. It costs nothing and it is the single cheapest way to make the bottom of
 * a page feel designed instead of simply ending.
 *
 * The panel is sticky rather than fixed, so it stops participating in layout
 * the moment it has been fully revealed.
 */
export function ScrollCurtain({
  beneath,
  children,
  className,
  height = "60vh",
}: ScrollCurtainProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const panel = root.querySelector<HTMLElement>("[data-curtain-panel]");
      if (!panel) return;

      // Gentle counter-drift on the panel so it settles into place instead of
      // simply sliding up at scroll speed.
      gsap.fromTo(
        panel,
        { yPercent: -18 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "5% bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    },
    { scope },
  );

  return (
    <div ref={scope} className={cn("relative", className)}>
      <div className="relative z-10">{children}</div>

      <div style={{ height }} className="relative">
        <div
          data-curtain-panel
          className="sticky top-[40vh] overflow-hidden"
          style={{ height }}
        >
          {beneath}
        </div>
      </div>
    </div>
  );
}
