import Image from "next/image";
import { logoPath, type Lockup, type LogoColour } from "@/data/brand";
import { cn } from "@/lib/utils";

/**
 * Aspect ratios taken from each lockup's own viewBox — measured, not estimated.
 * Next reserves layout space from the width/height these produce, so a wrong
 * value here shows up as layout shift on load.
 *
 * Note the brandmark is WIDER than it is tall (the swallow's tail runs out to
 * the right). It is not the same shape as the iconography set.
 */
const RATIO: Record<Lockup, number> = {
  primary: 829.77 / 53.03, // 15.6472
  secondary: 785.27 / 156.35, // 5.0225
  brandmark: 550.03 / 521.49, // 1.0547
  "full-stack-1": 838.91 / 226.21, // 3.7085
  "full-stack-2": 729.57 / 282.66, // 2.5811
};

type LogoProps = {
  lockup?: Lockup;
  /** Omit for the currentColor version, coloured by the parent's text colour. */
  colour?: LogoColour;
  /** Rendered width in pixels. Height follows the lockup's aspect ratio. */
  width?: number;
  className?: string;
  priority?: boolean;
  title?: string;
};

/**
 * A brand lockup.
 *
 * Clearspace is the caller's job — one third of the wordmark's height around
 * the wordmark lockups, one half around the brandmark (Brand Identity p.9).
 */
export function Logo({
  lockup = "primary",
  colour,
  width = 220,
  className,
  priority = false,
  title,
}: LogoProps) {
  const height = Math.round(width / RATIO[lockup]);

  return (
    <Image
      src={logoPath(lockup, colour)}
      alt={title ?? "Heartbreaker Ink"}
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto", className)}
    />
  );
}
