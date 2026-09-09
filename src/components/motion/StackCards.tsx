"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type StackCardsProps = {
  children: ReactNode;
  className?: string;
  /** How far each card starts below its resting place. */
  offset?: number;
  /** Scale applied to a card once the next one covers it. */
  restScale?: number;
};

/**
 * Cards that ride up and stack over one another as you scroll — the
 * testimonial treatment on Wonderkin, where each card past the first gets its
 * own scrubbed trigger running from `top bottom` to `50% 50%`.
 *
 * Each direct child becomes a card. The first sits still; every one after it
 * slides up over its predecessor, which shrinks slightly so the stack reads as
 * depth rather than a flat slide.
 *
 * Cards are sticky, so this needs a parent tall enough to scroll through.
 */
export function StackCards({
  children,
  className,
  offset = 90,
  restScale = 0.94,
}: StackCardsProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const cards = gsap.utils.toArray<HTMLElement>(":scope > *", root);
      if (cards.length < 2) return;

      cards.forEach((card, i) => {
        if (i === 0) return;

        // The incoming card rises into place, scrubbed to scroll.
        gsap.fromTo(
          card,
          { y: offset, opacity: 0.4 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "50% 50%",
              scrub: true,
            },
          },
        );

        // The card underneath settles back, so the stack has depth.
        gsap.to(cards[i - 1]!, {
          scale: restScale,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "50% 50%",
            scrub: true,
          },
        });
      });
    },
    { scope, dependencies: [offset, restScale] },
  );

  return (
    <div ref={scope} className={cn(className)}>
      {children}
    </div>
  );
}
