import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PolicyList } from "@/components/ui/PolicyList";
import { PinnedSteps } from "@/components/motion/PinnedSteps";
import { TextScrub } from "@/components/motion/TextScrub";
import { Reveal } from "@/components/motion/Reveal";
import { BookingCta } from "@/components/sections/BookingCta";
import { aftercareIntro, aftercareSteps } from "@/data/policy";
import { site } from "@/data/site";

/**
 * Target: "tattoo aftercare" — 2,900/mo, KD 19. The single biggest
 * low-difficulty term in the scope, which is why it is a page and not a PDF.
 *
 * The studio's own instructions lead, because they are the ones the client is
 * actually held to and the ones Beth hands over at the end of a session. The
 * week-by-week timeline below them is supporting depth for the search term,
 * and is written to stay inside the studio's minimums rather than invent
 * looser ones.
 */
export const metadata: Metadata = {
  title: "Fine Line Tattoo Aftercare",
  description:
    "Heartbreaker Ink's own aftercare instructions for a new fine line tattoo, plus what healing looks like week by week and when to get in touch.",
  alternates: { canonical: "/aftercare/" },
};

const stages = [
  {
    title: "First 48 hours",
    lines: [
      "Leave the wrap on for as long as Beth told you, not as long as the internet says.",
      "Wash with clean hands and fragrance-free soap, two to three times a day.",
      "Pat dry with clean paper towel. Never a shared bath towel.",
      "A thin coat of ointment. Thin enough that the skin still looks like skin.",
    ],
  },
  {
    title: "Week one to two",
    lines: [
      "Flaking is normal and will look alarming for a few days.",
      "The piece may go dull or patchy before it settles. This passes.",
      "Do not pick, scratch or peel. A flake taking colour with it is dead skin, not your tattoo.",
      "Keep applying your aftercare until the flaking stops.",
    ],
  },
  {
    title: "Still off limits",
    lines: [
      "Swimming, baths and spas for at least two to three weeks. Soaking lifts scabs early and fine line cannot spare the ink.",
      "Direct sun for at least two to four weeks while it heals.",
      "Heavy training that stretches the area, and tight clothing over the piece.",
      "Fake tan, exfoliants and anything with fragrance.",
    ],
  },
  {
    title: "For the long run",
    lines: [
      "Sunscreen is the single biggest factor in how fine line ages. Slip, slop, slap.",
      "Keep the skin moisturised. Hydrated skin holds a line better.",
      "A touch-up is free within three months, and priced after that.",
    ],
  },
];

export default function AftercarePage() {
  return (
    <>
      <PageHero
        eyebrow="Aftercare"
        heading="Looking after fine line work"
        intro="Fine line asks a little more of the first fortnight than heavier styles do. The lines carry less ink to start with, so anything that pulls pigment out shows up sooner."
        image="/brand/photography/fine-line/back-red-knit.jpg"
        trail={[{ label: "Aftercare", href: "/aftercare/" }]}
      />

      {/*
        The studio's own card, in full, before anything written for search.
        These are the instructions a client is held to, and the touch-up policy
        refers back to them, so they lead the page.
      */}
      <Section ground="paper">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Image
                src="/brand/icons/after-care.svg"
                alt=""
                width={120}
                height={120}
                className="h-16 w-16"
              />
            </Reveal>

            <p className="type-label mt-8 text-chilli">From the studio</p>

            <TextScrub as="p" className="type-lead mt-5 max-w-[34ch] text-maroon">
              {aftercareIntro}
            </TextScrub>

            <p className="type-body mt-8 max-w-[40ch] text-ink-70">
              Ink Nurse is stocked in the studio, so you can pick yours up on
              the day rather than hunting for something on the way home. You can
              also order it before your appointment.
            </p>

            {/*
              Straight to Square's hosted checkout, which owns the price and
              stock. Deliberately no figure quoted here: a number on this page
              would be a second source of truth and the one that goes stale.
            */}
            <a
              href={site.shop.aftercareUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="type-button mt-8 inline-flex items-center gap-3 border border-maroon px-7 py-3.5 text-maroon transition-colors duration-(--duration-fast) hover:bg-maroon hover:text-offwhite"
            >
              {site.shop.aftercareLabel}
              <span aria-hidden="true">&#8599;</span>
            </a>
          </div>

          <PolicyList items={aftercareSteps} />
        </div>
      </Section>

      <Section ground="paper" className="pt-0">
        <PinnedSteps
          aside={
            <>
              <p className="type-label text-chilli">Week by week</p>
              <TextScrub as="p" className="type-lead mt-6 max-w-[36ch] text-maroon">
                Keep it clean, keep it dry, keep it out of the sun, and leave it
                alone. Almost every healing problem is one of those four.
              </TextScrub>
            </>
          }
        >
          {stages.map((stage) => (
            <div key={stage.title} data-step className="border-t rule-ink py-9">
              <h2 className="type-subhead text-maroon">{stage.title}</h2>
              <ul className="mt-5 flex flex-col gap-3 pl-5">
                {stage.lines.map((line) => (
                  <li key={line} className="type-body list-disc text-ink-70">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </PinnedSteps>
      </Section>

      {/*
        Paper, not chilli. A full-bleed red band is the loudest thing the
        palette can do, and spending it on the infection warning made the one
        genuinely calm-voiced section on the page read as an alarm. The chilli
        accent survives on the label, which is enough to mark it as the section
        to find in a hurry.
      */}
      <Section ground="paper" className="border-t rule-ink">
        <p className="type-label text-chilli">If something is not right</p>
        <h2 className="type-headline mt-4 max-w-[16ch] text-maroon">
          When to ask for help
        </h2>
        <p className="type-lead mt-6 max-w-[52ch] text-ink-70">
          Spreading redness, heat, swelling that worsens after day three, or any
          discharge is worth a call, to us and to a doctor. Infection is
          uncommon and very treatable early. If something feels wrong, ask
          rather than wait.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            href="/contact/"
            className="type-button inline-flex items-center gap-3 border border-maroon px-7 py-3.5 text-maroon transition-colors duration-(--duration-fast) hover:bg-maroon hover:text-offwhite"
          >
            Get in touch
            <span aria-hidden="true">&#8599;</span>
          </Link>
          <Link
            href="/studio-policy/"
            className="type-button inline-flex items-center gap-3 border border-ink-30 px-7 py-3.5 text-ink-70 transition-colors duration-(--duration-fast) hover:border-maroon hover:text-maroon"
          >
            Touch-up policy
            <span aria-hidden="true">&#8599;</span>
          </Link>
        </div>
      </Section>

      <BookingCta />
    </>
  );
}
