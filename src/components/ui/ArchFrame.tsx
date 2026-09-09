import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ArchFrameProps = {
  children: ReactNode;
  className?: string;
  /** How far down the arch springs from. 50% is a true half-round top. */
  rise?: string;
  /** Square off the bottom corners. */
  flatBase?: boolean;
};

/**
 * A portal-shaped image frame — flat sides, round top.
 *
 * Wonderkin frames its hero portrait this way, and it does a lot of work: the
 * arch reads as a doorway, keeps the subject centred, and softens an otherwise
 * hard grid without introducing rounded corners anywhere else.
 *
 * Built from an asymmetric border-radius rather than a clip-path, so the shape
 * clips child images and survives `overflow: hidden` on every browser.
 */
export function ArchFrame({
  children,
  className,
  rise = "50%",
  flatBase = true,
}: ArchFrameProps) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{
        borderRadius: flatBase
          ? `${rise} ${rise} 0 0 / ${rise} ${rise} 0 0`
          : `${rise}`,
      }}
    >
      {children}
    </div>
  );
}
