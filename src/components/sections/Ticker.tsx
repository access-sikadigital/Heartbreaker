import { Marquee } from "@/components/motion/Marquee";
import { colors } from "@/lib/tokens";

/**
 * The booking strip from the website mockup — a thin maroon band of repeating
 * caps between the hero and the body. Pure CSS, so it runs with no scroll
 * trigger and stops dead under prefers-reduced-motion.
 */
export function Ticker({ message = "Now booking" }: { message?: string }) {
  return (
    <div
      data-ink-color={colors.offwhite}
      className="border-y border-maroon-deep bg-maroon py-3 text-offwhite"
    >
      <Marquee duration={44}>
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="type-label flex items-center gap-8 px-8 whitespace-nowrap">
            {message}
            <span aria-hidden="true" className="text-chilli">&#10022;</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
