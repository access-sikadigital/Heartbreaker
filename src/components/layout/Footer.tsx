import Link from "next/link";
import Image from "next/image";
/* CtaLink and primaryCta went with the closing call to action below. */
import { footerNav, legalNav } from "@/data/navigation";
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
      {/*
        The closing "Your story deserves intention" band has been removed.

        Every page already ends with <BookingCta>, so the footer's own call to
        action landed immediately underneath it: two Book-a-tattoo buttons,
        stacked, a few hundred pixels apart. The second one added no new
        argument and cost the footer its opening.
      */}

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

          {/* NAP block, keep in step with the Google Business Profile. */}
          <address className="type-body not-italic text-paper-60">
            <span className="block text-offwhite">{site.name}</span>
            {site.contact.street}
            <br />
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
        The brandmark, centred, as the closing device.

        This was the full wordmark at display width and 12% opacity. On a
        400px phone it stretched edge to edge as a pale grey smear that read as
        a rendering fault rather than a graphic. The bird is square, so it
        holds its shape at any width, and at full strength it reads as a mark
        instead of a ghost.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none flex select-none justify-center px-6 pt-4 pb-12"
      >
        <Image
          src="/brand/logo/brandmark-white.svg"
          alt=""
          width={550}
          height={521}
          className="h-auto w-[54px] opacity-70 md:w-[68px]"
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
