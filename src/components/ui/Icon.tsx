import Image from "next/image";
import { iconPath } from "@/data/brand";
import { cn } from "@/lib/utils";

type IconProps = {
  /** Filename stem, e.g. "flash", "moth", "rock-n-roll". */
  name: string;
  size?: number;
  className?: string;
  /** Give the icon a label when it carries meaning on its own. */
  title?: string;
};

/**
 * A brand icon.
 *
 * The ported SVGs use `fill: currentColor`, so an <Image> renders them in a
 * fixed colour. Where you need the icon to take the parent's text colour,
 * inline it with the SVGR import instead:
 *
 *   import Flash from "@/../public/brand/icons/flash.svg";
 *   <Flash className="size-8 text-chilli" />
 */
export function Icon({ name, size = 40, className, title }: IconProps) {
  return (
    <Image
      src={iconPath(name)}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      width={size}
      height={size}
      className={cn("h-auto", className)}
    />
  );
}
