import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PolicyList } from "@/components/ui/PolicyList";
import { TextScrub } from "@/components/motion/TextScrub";
import { Reveal } from "@/components/motion/Reveal";
import { BookingCta } from "@/components/sections/BookingCta";
import { bookingPolicy, touchUpPolicy } from "@/data/policy";

/**
 * Studio policy.
 *
 * This is the studio's own published policy, lifted from the pinned Instagram
 * highlight, not marketing copy. It exists as a page for one practical reason:
 * a story highlight cannot be linked from a booking confirmation, quoted in a
 * dispute, or read by anyone who does not use Instagram.
 *
 * Deliberately NOT merged into /terms-and-conditions/. Those are the legal
 * terms of trade; this is the short list a client actually needs before they
 * pay a deposit, and burying it in legal boilerplate is how it stops being
 * read.
 */
export const metadata: Metadata = {
  title: "Studio Policy, Deposits & Touch-Ups",
  description:
    "Deposits, cancellations, rescheduling and touch-ups at Heartbreaker Ink. A non-refundable deposit secures your appointment, changes need 48 hours notice, and touch-ups are free within 3 months.",
  alternates: { canonical: "/studio-policy/" },
};

export default function StudioPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Studio policy"
        heading="Before you book"
        intro="The short list every client gets before their appointment. It is here in full so nothing about your deposit or your date comes as a surprise."
        image="/brand/photography/fine-line/bird-arm.jpg"
        trail={[{ label: "Studio policy", href: "/studio-policy/" }]}
      />

      <Section ground="paper">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Image
                src="/brand/icons/policy.svg"
                alt=""
                width={120}
                height={120}
                className="h-16 w-16 text-maroon"
              />
            </Reveal>

            <TextScrub as="p" className="type-lead mt-8 max-w-[34ch] text-maroon">
              Beth works one client at a time in a private studio. A held slot
              is a slot nobody else can take, which is the whole reason the
              deposit rules read the way they do.
            </TextScrub>

            <p className="type-body mt-8 max-w-[40ch] text-ink-70">
              Questions about any of this are welcome before you pay, not after.
              Send them with your enquiry and they will be answered straight.
            </p>

            <Link
              href="/contact/"
              className="type-button mt-8 inline-flex items-center gap-3 border border-maroon px-7 py-3.5 text-maroon transition-colors duration-(--duration-fast) hover:bg-maroon hover:text-offwhite"
            >
              Ask a question
              <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>

          <div>
            <h2 className="type-headline-sm text-maroon">Appointments</h2>
            <PolicyList items={bookingPolicy} className="mt-8" />
          </div>
        </div>
      </Section>

      <Section ground="maroon">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="type-label text-chilli">Touch-ups</p>
            <h2 className="type-headline mt-5 max-w-[12ch]">Settling is normal</h2>
            <p className="type-body mt-7 max-w-[38ch] text-paper-60">
              Fine line carries less pigment than heavier work, so a line
              occasionally needs a second pass once it has healed. That is
              expected, and inside the first three months it is free.
            </p>
          </div>

          <PolicyList items={touchUpPolicy} tone="dark" />
        </div>
      </Section>

      <Section ground="paper">
        <div className="flex flex-wrap items-baseline justify-between gap-6">
          <TextScrub as="p" className="type-lead max-w-[44ch] text-maroon">
            Aftercare is the other half of this. How a piece heals is mostly
            decided in the fortnight after you leave.
          </TextScrub>
          <Link
            href="/aftercare/"
            className="type-button inline-flex items-center gap-3 border border-maroon px-7 py-3.5 text-maroon transition-colors duration-(--duration-fast) hover:bg-maroon hover:text-offwhite"
          >
            Read the aftercare
            <span aria-hidden="true">&#8599;</span>
          </Link>
        </div>
      </Section>

      <BookingCta />
    </>
  );
}
