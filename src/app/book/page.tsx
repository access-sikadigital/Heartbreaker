import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PinnedSteps } from "@/components/motion/PinnedSteps";
import { TextScrub } from "@/components/motion/TextScrub";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { site } from "@/data/site";

/**
 * Booking.
 *
 * PLACEHOLDER FLOW. The scope lists the booking system as a client dependency
 * and an open question — deposits, reference upload and calendar sync all
 * depend on which tool Beth picks. This page sets out the flow and hands off to
 * email/Instagram until that decision is made; drop the real widget into the
 * marked slot when it exists.
 */
export const metadata: Metadata = {
  title: "Book a Fine Line Tattoo | Heartbreaker Ink, Mornington",
  description:
    "Book a fine line tattoo at Heartbreaker Ink. Send your idea, get an honest answer on whether it works, and hold your date with a deposit.",
  alternates: { canonical: "/book/" },
  robots: { index: true, follow: true },
};

const steps = [
  {
    title: "Send the idea",
    body: "Rough size, where you want it, and any reference images. Half-formed is fine — that is what the conversation is for.",
  },
  {
    title: "Get a straight answer",
    body: "Beth will tell you whether it works as fine line, what it needs, and what it costs. If it does not work, you will be told that too.",
  },
  {
    title: "Hold the date",
    body: "A deposit secures your slot and comes off the final price. Reschedule with notice and it moves with you.",
  },
  {
    title: "Come in",
    body: "One client at a time, in a private studio. Stencil, placement check, then the work. Breaks whenever you want them.",
  },
];

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Bookings"
        heading="Start an enquiry"
        intro="Every piece starts with a conversation rather than a calendar slot. Tell us the idea and you will get an honest read on it."
        image="/brand/photography/small-micro/urban-pair.jpg"
        trail={[{ label: "Book", href: "/book/" }]}
      />

      <Section ground="paper">
        <PinnedSteps
          aside={
            <>
              <p className="type-label text-chilli">How booking works</p>
              <TextScrub as="p" className="type-lead mt-6 max-w-[34ch] text-maroon">
                Four steps, no pressure at any of them, and nothing charged
                until you have seen what you are getting.
              </TextScrub>
            </>
          }
        >
          {steps.map((step, i) => (
            <div
              key={step.title}
              data-step
              className="grid grid-cols-[3rem_1fr] gap-5 border-t rule-ink py-8"
            >
              <span className="type-label numeric pt-1 text-chilli">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="type-subhead text-maroon">{step.title}</h2>
                <p className="type-body mt-3 max-w-[46ch] text-ink-70">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </PinnedSteps>
      </Section>

      {/* The enquiry form stands in until a booking tool is chosen. */}
      <Section ground="paper" className="border-t rule-ink">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="type-label text-chilli">Send it through</p>
            <h2 className="type-headline mt-4 max-w-[12ch] text-maroon">
              Tell us the idea
            </h2>
            <p className="type-body mt-6 max-w-[38ch] text-ink-70">
              Online booking with deposits is coming. Until then this reaches
              Beth directly, usually answered the same day.
            </p>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="type-label mt-8 inline-block text-ink-50 underline-offset-8 hover:text-maroon hover:underline"
            >
              Or message on Instagram
            </a>
          </div>

          <EnquiryForm />
        </div>
      </Section>
    </>
  );
}
