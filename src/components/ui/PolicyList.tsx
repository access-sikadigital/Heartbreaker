import { Fragment } from "react";
import type { PolicyItem } from "@/data/policy";
import { cn } from "@/lib/utils";

/**
 * Splits a line on the phrases the studio underlined and wraps those in
 * <strong>, so the page stresses what the card stresses.
 *
 * Longest match first, because "at least 48 hours" contains "48 hours" and a
 * shorter match would otherwise consume the longer one's text and leave a
 * fragment behind. A phrase that is not present is simply skipped, which is
 * why data/policy.ts requires them to be verbatim.
 */
function emphasise(text: string, strong: string[] | undefined, dark: boolean) {
  if (!strong?.length) return text;

  const phrases = [...strong].sort((a, b) => b.length - a.length);
  const pattern = phrases
    .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const parts = text.split(new RegExp(`(${pattern})`, "g"));

  return parts.map((part, i) =>
    phrases.includes(part) ? (
      <strong
        key={i}
        className={cn(
          "font-normal underline underline-offset-4",
          /*
            Chilli on maroon is the one approved pairing the brand restricts to
            display type, and this is body copy at 15px. On a dark ground the
            emphasis is carried by off-white against paper-80 instead, which is
            a real contrast step rather than a hue change at the same lightness.
          */
          dark ? "text-offwhite decoration-chilli" : "text-chilli",
        )}
      >
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

type PolicyListProps = {
  items: PolicyItem[];
  /** `paper` for the light ground, `dark` over maroon, chilli or ink. */
  tone?: "paper" | "dark";
  className?: string;
};

/**
 * The studio's policy and aftercare lines, rendered as a rule-separated list.
 *
 * The card on Instagram bullets each line with a heart. Repeating that here
 * with a real glyph would put a decorative character into the accessibility
 * tree seven times, so the mark is an aria-hidden span and the list carries the
 * semantics instead.
 */
export function PolicyList({ items, tone = "paper", className }: PolicyListProps) {
  const dark = tone === "dark";

  return (
    <ul className={cn("flex flex-col", className)}>
      {items.map((item) => (
        <li
          key={item.text}
          className={cn(
            "flex gap-4 border-t py-6 first:border-t-0 first:pt-0",
            dark ? "border-paper-20" : "rule-ink",
          )}
        >
          <span
            aria-hidden="true"
            className="type-body mt-px shrink-0 leading-none text-chilli"
          >
            &#9829;
          </span>
          <p className={cn("type-body", dark ? "text-paper-80" : "text-ink-70")}>
            {emphasise(item.text, item.strong, dark)}
          </p>
        </li>
      ))}
    </ul>
  );
}
