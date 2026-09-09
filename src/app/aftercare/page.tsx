import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PinnedSteps } from "@/components/motion/PinnedSteps";
import { TextScrub } from "@/components/motion/TextScrub";
import { BookingCta } from "@/components/sections/BookingCta";

/**
 * Target: "tattoo aftercare" — 2,900/mo, KD 19. The single biggest
 * low-difficulty term in the scope, which is why it is a page and not a PDF.
 */
export const metadata: Metadata = {
  title: "Fine Line Tattoo Aftercare | Heartbreaker Ink",
  description:
    "How to look after a new fine line tattoo — the first 48 hours, the first fortnight, what normal healing looks like, and when to get in touch.",
  alternates: { canonical: "/aftercare/" },
};

const stages = [
  {
    title: "First 48 hours",
    lines: [
      "Leave the wrap on for as long as your artist told you — not as long as the internet says.",
      "Wash with clean hands and fragrance-free soap, two to three times a day.",
      "Pat dry with clean paper towel. Never a shared bath towel.",
      "A thin layer of balm. Thin enough that the skin still looks like skin.",
    ],
  },
  {
    title: "Week one to two",
    lines: [
      "Flaking is normal and will look alarming for a few days.",
      "The piece may go dull or patchy before it settles. This passes.",
      "Do not pick, scratch or peel. A flake taking colour with it is dead skin, not your tattoo.",
      "Keep it out of the sun entirely while it is healing.",
    ],
  },
  {
    title: "Avoid until healed",
    lines: [
      "Swimming, baths and spas — soaking lifts scabs early and fine line cannot spare the ink.",
      "Heavy training that stretches the area.",
      "Tight clothing over the piece.",
      "Fake tan, exfoliants and anything with fragrance.",
    ],
  },
  {
    title: "For the long run",
    lines: [
      "Sunscreen is the single biggest factor in how fine line ages.",
      "Keep the skin moisturised — hydrated skin holds a line better.",
      "A light touch-up after a few years is maintenance, not a fault.",
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
        image="/brand/photography/placeholder-16.jpg"
        trail={[{ label: "Aftercare", href: "/aftercare/" }]}
      />

      <Section ground="paper">
        <PinnedSteps
          aside={
            <>
              <p className="type-label text-chilli">The short version</p>
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

      <Section ground="chilli">
        <h2 className="type-headline max-w-[16ch]">When to ask for help</h2>
        <p className="type-lead mt-6 max-w-[52ch] text-paper-80">
          Spreading redness, heat, swelling that worsens after day three, or any
          discharge is worth a call — to us and to a doctor. Infection is
          uncommon and very treatable early. If something feels wrong, ask
          rather than wait.
        </p>
        <Link
          href="/contact/"
          className="type-button mt-9 inline-flex items-center gap-3 border border-offwhite px-7 py-3.5 transition-colors duration-(--duration-fast) hover:bg-offwhite hover:text-chilli"
        >
          Get in touch
          <span aria-hidden="true">&#8599;</span>
        </Link>
      </Section>

      <BookingCta />
    </>
  );
}
