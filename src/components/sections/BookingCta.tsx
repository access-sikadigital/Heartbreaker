import Link from "next/link";
import Image from "next/image";
import { SplitLines } from "@/components/motion/SplitLines";
import { Magnetic } from "@/components/motion/Magnetic";
import { CtaLink } from "@/components/ui/CtaLink";
import { primaryCta } from "@/data/navigation";
import { site } from "@/data/site";
import { colors } from "@/lib/tokens";

/**
 * Closing conversion block.
 *
 * Two paths on purpose: a booking for people who are ready, and a gift voucher
 * for people buying for someone else. "tattoo gift voucher" is KD 3 — close to
 * free to rank for — and it opens a revenue line that needs no chair time.
 */
export function BookingCta() {
  return (
    <section
      data-ink-color={colors.offwhite}
      className="on-dark relative isolate overflow-hidden bg-ink py-24 text-offwhite md:py-32"
    >
      <Image
        src="/brand/photography/placeholder-17.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-40"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/55" />

      <div className="container-content text-center">
        <p className="type-label text-chilli">Bookings are open</p>

        <SplitLines as="h2" className="type-display mx-auto mt-6 max-w-[16ch]">
          Let&rsquo;s draw something you will keep
        </SplitLines>

        <p className="type-lead mx-auto mt-8 max-w-[44ch] text-paper-80">
          Tell us the idea, however half-formed. Beth will tell you honestly
          whether it works, what it needs, and what it costs.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <Magnetic>
            <CtaLink href={primaryCta.href}
              className="type-button inline-flex items-center gap-3 bg-offwhite px-9 py-4 text-ink transition-colors duration-(--duration-fast) hover:bg-chilli hover:text-offwhite"
            >
              {primaryCta.label}
              <span aria-hidden="true">&#8599;</span>
            </CtaLink>
          </Magnetic>

          <Link
            href="/gift-vouchers/"
            className="type-button inline-flex items-center gap-3 border border-offwhite px-9 py-4 transition-colors duration-(--duration-fast) hover:bg-offwhite hover:text-ink"
          >
            Gift a voucher
          </Link>
        </div>

        <p className="type-label mt-10 text-paper-40">
          {site.contact.location} &middot; {site.social.instagramHandle}
        </p>
      </div>
    </section>
  );
}
