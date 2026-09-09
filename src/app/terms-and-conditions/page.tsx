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
  { h: "Age", p: "You must be 18 or over and present photo identification on the day. There are no exceptions, including with a parent or guardian present." },
  { h: "Deposits", p: "A deposit secures your appointment and comes off the final price. It covers the design time and the reserved slot." },
  { h: "Rescheduling and cancellation", p: "Give as much notice as you can and your deposit moves with you. Repeated late changes or a no-show forfeit the deposit, because the slot cannot be refilled." },
  { h: "Design", p: "Designs are drawn for you and remain the work of the artist. You will see the drawing before the day and can ask for changes." },
  { h: "Fitness to be tattooed", p: "You will be asked to complete a health declaration. Do not attend intoxicated, unwell, or having taken blood-thinning medication against medical advice \u2014 the session will be rescheduled." },
  { h: "Aftercare", p: "Written aftercare is provided. How a tattoo heals depends heavily on how it is cared for, and healing outcomes affected by aftercare are not covered by touch-ups." },
  { h: "Touch-ups", p: "Minor settling is normal. Get in touch if something needs attention and we will arrange a short session." },
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
