import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { TextScrub } from "@/components/motion/TextScrub";
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
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <TextScrub as="p" className="type-lead max-w-[42ch] text-maroon">
              Tell us what you are thinking, roughly where you want it, and any
              references. You will get a straight answer on whether it works.
            </TextScrub>

            <div className="mt-12 flex flex-col gap-8 border-t rule-ink pt-8">
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
                  By appointment. Later sessions available on request.
                </p>
              </div>
            </div>
          </div>

          {/* Enquiry form slot — wire to the booking tool once chosen. */}
          <div className="border rule-ink bg-paper-warm p-8 md:p-10">
            <h2 className="type-subhead text-maroon">Send an enquiry</h2>
            <p className="type-body mt-4 text-ink-70">
              The enquiry form arrives with the booking system. Until then,
              Instagram is the quickest route and lets you attach references
              straight from your camera roll.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="type-button inline-flex items-center gap-3 bg-maroon px-7 py-3.5 text-offwhite transition-colors duration-(--duration-fast) hover:bg-chilli"
              >
                Message on Instagram
                <span aria-hidden="true">&#8599;</span>
              </a>
              <Link
                href="/faqs/"
                className="type-button inline-flex items-center gap-3 border border-maroon px-7 py-3.5 text-maroon transition-colors duration-(--duration-fast) hover:bg-maroon hover:text-offwhite"
              >
                Read the FAQs
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
