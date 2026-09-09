import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { TextScrub } from "@/components/motion/TextScrub";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { site } from "@/data/site";
import { JsonLd, localBusinessSchema } from "@/lib/schema";

/**
 * Contact.
 *
 * Target: "tattoo shops near me" — 12,100/mo, KD 29 — though the scope is clear
 * that term is won through Google Business Profile, not this page. What this
 * page does is corroborate the GBP listing: same name, same area, same schema.
 * Keep it in step with the profile once it is claimed.
 */
export const metadata: Metadata = {
  title: "Contact | Heartbreaker Ink, Mornington Peninsula",
  description:
    "Get in touch with Heartbreaker Ink, a private fine line tattoo studio in Mornington, Victoria. By appointment — send your idea and we will come back to you.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />

      <PageHero
        eyebrow="Contact"
        heading="Get in touch"
        intro="The studio is private and by appointment. A message with your idea is the fastest way to an answer — usually the same day."
        trail={[{ label: "Contact", href: "/contact/" }]}
      />

      <Section ground="paper">
        {/*
          The left column is sticky and carries real content. It previously
          held three short blocks against a long form, so it ran out of things
          to say a third of the way down and left a hole.

          The "what to include" list is the part doing actual work: enquiries
          that arrive with placement, size and timing attached can be answered
          in one reply instead of four.
        */}
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <TextScrub as="p" className="type-lead max-w-[38ch] text-maroon">
              Tell us what you are thinking, roughly where you want it, and any
              references. You will get a straight answer on whether it works.
            </TextScrub>

            <div className="mt-10 border-t rule-ink pt-8">
              <p className="type-label text-chilli">What to include</p>
              <ul className="mt-5 flex flex-col gap-3">
                {[
                  "The idea, even half-formed",
                  "Where on the body it goes",
                  "Rough size in centimetres",
                  "Days or weeks that suit you",
                  "Reference images, sent on Instagram",
                ].map((item) => (
                  <li
                    key={item}
                    className="type-body flex gap-3 text-ink-70"
                  >
                    <span aria-hidden="true" className="text-chilli">
                      &mdash;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 grid gap-8 border-t rule-ink pt-8 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <p className="type-label text-ink-50">Instagram</p>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="type-subhead mt-2 block text-maroon hover:text-chilli"
                >
                  {site.social.instagramHandle}
                </a>
              </div>

              <div>
                <p className="type-label text-ink-50">Studio</p>
                <address className="type-body mt-2 not-italic text-ink-70">
                  {site.contact.location}
                  <br />
                  {site.contact.region}, Australia
                  <br />
                  Exact address with your booking
                </address>
              </div>

              <div>
                <p className="type-label text-ink-50">Hours</p>
                <p className="type-body mt-2 text-ink-70">
                  By appointment. Later sessions on request.
                </p>
              </div>

              <div>
                <p className="type-label text-ink-50">Reply time</p>
                <p className="type-body mt-2 text-ink-70">
                  Usually the same day.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t rule-ink pt-8">
              {[
                { label: "FAQs", href: "/faqs/" },
                { label: "Pricing", href: "/pricing/" },
                { label: "Aftercare", href: "/aftercare/" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="type-label text-ink-50 underline-offset-8 transition-colors hover:text-maroon hover:underline"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <EnquiryForm />
        </div>
      </Section>
    </>
  );
}
