import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { colors } from "@/lib/tokens";

export type Ground = "paper" | "maroon" | "chilli" | "ink" | "pattern";

type SectionProps = {
  children: ReactNode;
  className?: string;
  /** Ground colour. `dark` grounds also flip the focus ring to off-white. */
  ground?: Ground;
  width?: "content" | "wide" | "full";
  id?: string;
  as?: ElementType;
};

/**
 * Each ground carries its own classes AND the colour the ink cursor should
 * draw in on top of it. Keeping the two together means a new section can never
 * end up with an invisible cursor — the ink colour is part of the ground
 * definition, not something a caller has to remember.
 */
const GROUND: Record<Ground, { className: string; ink: string }> = {
  paper: { className: "bg-offwhite text-ink", ink: colors.maroon },
  maroon: { className: "bg-maroon text-offwhite on-dark", ink: colors.offwhite },
  chilli: { className: "bg-chilli text-offwhite on-dark", ink: colors.offwhite },
  ink: { className: "bg-ink text-offwhite on-dark", ink: colors.offwhite },
  pattern: {
    className: "surface-pattern text-offwhite on-dark",
    ink: colors.offwhite,
  },
};

/**
 * A page section on one of the approved grounds.
 *
 * Only the five combinations approved on Brand Identity p.13 are reachable
 * here — the ground sets the type colour with it, so an unapproved pairing
 * cannot be typed by accident.
 *
 * `data-ink-color` is read by <InkCursor> to invert the pointer trail over
 * this section. Any element can carry that attribute, not just a Section.
 */
export function Section({
  children,
  className,
  ground = "paper",
  width = "content",
  id,
  as: Tag = "section",
}: SectionProps) {
  const inner =
    width === "full"
      ? "w-full"
      : width === "wide"
        ? "container-wide"
        : "container-content";

  const { className: groundClass, ink } = GROUND[ground];

  return (
    <Tag
      id={id}
      data-ink-color={ink}
      className={cn("section-y relative", groundClass, className)}
    >
      <div className={inner}>{children}</div>
    </Tag>
  );
}
