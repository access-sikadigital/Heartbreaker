import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

/**
 * PLACEHOLDER LEGAL COPY.
 *
 * A scaffold in the right shape — not legal advice, and not reviewed by a
 * lawyer. Australian privacy obligations and Victorian tattoo regulations both
 * apply. Have this checked before launch, and replace anything that does not
 * describe what the studio actually does.
 */
export const metadata: Metadata = {
  title: "Terms & Conditions | Heartbreaker Ink",
  description: "Booking terms, deposits, cancellations, age requirements and aftercare responsibility at Heartbreaker Ink.",
  alternates: { canonical: "/terms-and-conditions/" },
  robots: { index: false, follow: true },
};

const sections = [
  { h: "Age", p: "We are a strictly 18+ studio and there are no exceptions, including with a parent or guardian present. Please do not bring children to your appointment." },
  { h: "Deposits", p: "A non-refundable deposit is required to secure all appointments. It covers the design time and the reserved slot. Pricing is subject to change and may vary depending on design, placement and time." },
  { h: "Rescheduling and cancellation", p: "Cancellations and reschedules must be made at least 48 hours before the appointment; anything later results in a loss of deposit. One reschedule may use the same deposit, and any further reschedule requires a new one. If you cancel inside the 48-hour window and do not reschedule, the deposit is held on file for 12 months." },
  { h: "Design", p: "Designs are drawn for you and remain the work of the artist. You will see the drawing before the day and can ask for changes." },
  { h: "Fitness to be tattooed", p: "You will be asked to complete a health declaration. Do not attend intoxicated, unwell, or having taken blood-thinning medication against medical advice; the session will be rescheduled." },
  { h: "Aftercare", p: "Written aftercare is provided. How a tattoo heals depends heavily on how it is cared for, and healing outcomes affected by aftercare are not covered by touch-ups." },
  { h: "Touch-ups", p: "Touch-ups are free within 3 months of the original appointment date. After 3 months they are $50 for all areas and $100 for fingers. A clear photo of the healed tattoo is required before a touch-up is booked." },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        heading={"Terms & Conditions"}
        intro={"The terms that apply to booking and being tattooed at the studio."}
        trail={[{ label: "Terms & Conditions", href: "/terms-and-conditions/" }]}
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
    </>
  );
}
