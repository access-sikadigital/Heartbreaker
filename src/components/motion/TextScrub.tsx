"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type TextScrubProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Colour the words rest at before the scrub reaches them. */
  dimClassName?: string;
};

/**
 * A paragraph that colours in word by word as it passes through the viewport.
 *
 * The words start dimmed and resolve to full colour, scrubbed to scroll
 * position, so the reader's eye is pulled along at the speed they are already
 * moving. It is the single most effective way to make a block of statement copy
 * feel like it is being said rather than displayed.
 *
 * Opacity is animated rather than colour, because animating `color` on a few
 * hundred spans forces style recalculation on every frame; opacity stays on the
 * compositor.
 *
 * Under reduced motion the split never happens and the text renders normally.
 */
export function TextScrub({
  children,
  className,
  as: Tag = "p",
  dimClassName,
}: TextScrubProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const split = SplitText.create(root, {
        type: "words",
        wordsClass: "scrub-word",
        autoSplit: true,
        onSplit(self) {
          // 0.32, not 0.18. The resting state has to read as "not yet
          // arrived", never as "failed to load" — and on the off-white ground
          // maroon at 0.18 is close to invisible. Anyone landing mid-section,
          // or on a short block they can see all of at once, sees the whole
          // sentence rather than a half-broken one.
          return gsap.fromTo(
            self.words,
            { opacity: 0.32 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.4,
              scrollTrigger: {
                trigger: root,
                start: "top 82%",
                // Completes well before the block leaves, so it is never
                // still mid-scrub when you have finished reading it.
                end: "bottom 68%",
                scrub: true,
              },
            },
          );
        },
      });

      return () => split.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className={cn(dimClassName, className)}>
      <Tag>{children}</Tag>
    </div>
  );
}
