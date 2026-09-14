import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { BookingCta } from "@/components/sections/BookingCta";

/**
 * PLACEHOLDER LEGAL COPY.
 *
 * A scaffold in the right shape — not legal advice, and not reviewed by a
 * lawyer. Australian privacy obligations and Victorian tattoo regulations both
 * apply. Have this checked before launch, and replace anything that does not
 * describe what the studio actually does.
 */
export const metadata: Metadata = {
  title: "Privacy Policy | Heartbreaker Ink",
  description: "How Heartbreaker Ink collects, uses and stores personal information.",
  alternates: { canonical: "/privacy-policy/" },
  robots: { index: false, follow: true },
};

const sections = [
  { h: "What we collect", p: "Enquiry and booking details you send us: your name, contact details, the idea you are describing and any reference images you attach. Nothing is collected that is not needed to answer you or tattoo you safely." },
  { h: "Why we hold it", p: "To respond to your enquiry, manage your booking, keep required consent and aftercare records, and contact you about your appointment." },
  { h: "Who sees it", p: "Only the studio, and any booking or payment provider we use to run appointments. We do not sell or share personal information for marketing." },
  { h: "How long we keep it", p: "Consent and health-declaration records are kept for the period Victorian regulations require. Enquiry correspondence is kept only while it is useful." },
  { h: "Analytics and advertising", p: "The site uses analytics to understand how pages are used, and advertising tools to measure campaigns. These set cookies in your browser." },
  { h: "Your rights", p: "You can ask what we hold about you, ask for it to be corrected, or ask us to delete it where we are not required to keep it. Contact the studio and we will action it." },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        heading={"Privacy Policy"}
        intro={"How we handle the information you give us when you enquire, book or subscribe."}
        image="/brand/photography/small-micro/legs-foliage.jpg"
        trail={[{ label: "Privacy Policy", href: "/privacy-policy/" }]}
      />

      <Section ground="paper">
        <div className="flex max-w-[68ch] flex-col gap-10">
          <p className="type-body text-ink-50">
            Last updated {new Date().getFullYear()}. Placeholder content pending
            legal review.
          </p>

          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="type-subhead text-maroon">{s.h}</h2>
              <p className="type-body mt-4 text-ink-70">{s.p}</p>
            </div>
          ))}
        </div>
      </Section>

      <BookingCta />
    </>
  );
}
