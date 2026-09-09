import Link from "next/link";
import Image from "next/image";
import { footerNav, legalNav, primaryCta } from "@/data/navigation";
import { site } from "@/data/site";
import { colors } from "@/lib/tokens";

/**
 * Site footer.
 *
 * The name / area / hours block is not decoration — the scope puts Google
 * Business Profile at the centre of local ranking, and a consistent NAP block
 * on every page is what corroborates that listing. It must match GBP exactly
 * once the profile is claimed, so it reads from `site.ts` rather than being
 * typed inline.
 *
 * The oversized wordmark at the base is the brand's own device: the identity
 * uses the logo at display scale, cropped, as a graphic rather than a mark.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-ink-color={colors.offwhite}
      className="on-dark relative overflow-hidden bg-maroon text-offwhite"
    >
      {/* Closing call to action */}
      <div className="container-wide border-b border-paper-20 py-16 md:py-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="type-label text-chilli">Bookings</p>
            <h2 className="type-display mt-4 max-w-[14ch]">
              Your story deserves intention
            </h2>
          </div>

          <Link
            href={primaryCta.href}
            className="type-button inline-flex shrink-0 items-center gap-3 border border-offwhite px-8 py-4 transition-colors duration-(--duration-fast) hover:bg-offwhite hover:text-maroon"
          >
            {primaryCta.label}
            <span aria-hidden="true">&#8599;</span>
          </Link>
        </div>
      </div>

      {/* Navigation + studio details */}
      <div className="container-wide grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-6">
          <Image
            src="/brand/logo/full-stack-2-offwhite.svg"
            alt={site.name}
            width={730}
            height={283}
            className="h-auto w-[168px]"
          />

          {/* NAP block — keep in step with the Google Business Profile. */}
          <address className="type-body not-italic text-paper-60">
            <span className="block text-offwhite">{site.name}</span>
            {site.contact.location}
            <br />
            {site.contact.region}
          </address>

          <a
            href={site.social.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="type-label w-fit text-paper-80 transition-colors hover:text-chilli"
          >
            {site.social.instagramHandle}
          </a>
        </div>

        {footerNav.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3 className="type-label text-chilli">{column.title}</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="type-body text-paper-60 transition-colors duration-(--duration-fast) hover:text-offwhite"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/*
        Oversized wordmark as a graphic device.

        It sits in its own band with real padding — an earlier version used a
        negative bottom margin to tuck it behind the legal row, which just put
        the copyright on top of it and pushed the "INK" past the right edge
        where the footer's overflow clipped it. Contained and full-width, the
        mark reads as intentional rather than broken.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none px-6 pt-6 pb-10"
        style={{ opacity: 0.12 }}
      >
        <Image
          src="/brand/logo/primary-offwhite.svg"
          alt=""
          width={830}
          height={53}
          className="h-auto w-full"
        />
      </div>

      <div className="container-wide flex flex-col gap-4 border-t border-paper-20 py-7 md:flex-row md:items-center md:justify-between">
        <p className="type-label text-paper-40">
          &copy; {year} {site.name}. {site.contact.region}, Australia.
        </p>

        <div className="flex flex-wrap gap-6">
          {legalNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="type-label text-paper-40 transition-colors hover:text-chilli"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
