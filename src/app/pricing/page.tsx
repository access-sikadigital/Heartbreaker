import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { TextScrub } from "@/components/motion/TextScrub";
import { BookingCta } from "@/components/sections/BookingCta";
import { priceBands, priceFactors } from "@/data/pricing";

/**
 * Target: "how much do tattoos cost" — 720/mo, KD 16.
 *
 * NOTE: every figure here is placeholder. Publishing pricing is Open Question 4
 * in the scope and needs Beth's sign-off — wrong numbers on this page cost
 * bookings and trust, so confirm before launch or take the page down.
 */
export const metadata: Metadata = {
  title: "Tattoo Pricing | How Much Does a Tattoo Cost? | Heartbreaker Ink",
  description:
    "What a fine line tattoo costs at Heartbreaker Ink — guide prices by size, what changes the figure, and how deposits work. Mornington Peninsula.",
  alternates: { canonical: "/pricing/" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        heading="What a tattoo costs"
        intro="Guide prices, not a menu. Every piece is quoted properly before you commit, and you will never find out the real number on the day."
        image="/brand/photography/small-micro/rose-abdomen.jpg"
        trail={[{ label: "Pricing", href: "/pricing/" }]}
      />

      <Section ground="paper">
        <Reveal stagger={0.08} className="grid gap-px border rule-ink bg-ink-12 sm:grid-cols-2">
          {priceBands.map((band) => (
            <RevealItem key={band.label} className="bg-offwhite p-8 md:p-10">
              <p className="type-label text-chilli">{band.label}</p>
              <p className="type-display mt-4 text-maroon">{band.from}</p>
              <p className="type-body mt-4 max-w-[38ch] text-ink-70">
                {band.detail}
              </p>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <Section ground="ink">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="type-label text-chilli">What moves the number</p>
            <h2 className="type-headline mt-4 max-w-[12ch]">
              Time, not ink
            </h2>
          </div>
          <ul className="flex flex-col">
            {priceFactors.map((factor) => (
              <li
                key={factor}
                className="type-body border-t border-paper-20 py-6 text-paper-80"
              >
                {factor}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section ground="paper">
        <TextScrub as="p" className="type-lead mx-auto max-w-[52ch] text-center text-maroon">
          A deposit holds your date and comes off the final price. It is not an
          extra — it is the first part of what you were always going to pay.
        </TextScrub>
        <div className="mt-10 text-center">
          <Link
            href="/book/"
            className="type-button inline-flex items-center gap-3 border border-maroon px-8 py-4 text-maroon transition-colors duration-(--duration-fast) hover:bg-maroon hover:text-offwhite"
          >
            Get a quote
            <span aria-hidden="true">&#8599;</span>
          </Link>
        </div>
      </Section>

      <BookingCta />
    </>
  );
}
