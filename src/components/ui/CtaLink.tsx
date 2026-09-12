import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** For the rare one-off a utility class cannot settle, such as a font
   *  override that has to outrank a type role in the same cascade layer. */
  style?: CSSProperties;
  /** Force an anchor. Otherwise any absolute URL is treated as external. */
  external?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

/**
 * A link that knows whether it is leaving the site.
 *
 * The booking widget sits on a different host, so those CTAs must be plain
 * anchors: `next/link` is for client-side routing and has nothing to offer a
 * cross-origin URL. Routing that through Link works by accident rather than by
 * design, and it invites a prefetch of a page Next cannot prefetch.
 *
 * External links open in the same tab. Booking is the end of the journey, not a
 * detour, and forcing a new tab takes the choice away from the visitor.
 */
export function CtaLink({
  href,
  children,
  className,
  style,
  external,
  onClick,
  ...rest
}: CtaLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      style={style}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Link>
  );
}
