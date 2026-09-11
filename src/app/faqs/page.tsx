import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { FaqAccordion, FaqSchema } from "@/components/ui/FaqAccordion";
import { BookingCta } from "@/components/sections/BookingCta";
import { studioFaqs, flatFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQs | Heartbreaker Ink, Mornington",
  description:
    "Common questions about getting tattooed at Heartbreaker Ink, booking, pain, healing, aftercare, age and everything else worth asking first.",
  alternates: { canonical: "/faqs/" },
};

export default function FaqsPage() {
  return (
    <>
      <FaqSchema items={flatFaqs} />

      <PageHero
        eyebrow="FAQs"
        heading="Everything worth asking first"
        intro="If it is not here, ask. No question about being tattooed is a stupid one, and the ones people are embarrassed to ask are usually the most common."
        trail={[{ label: "FAQs", href: "/faqs/" }]}
      />

      {studioFaqs.map((group, i) => (
        <Section
          key={group.group}
          ground="paper"
          className={i > 0 ? "border-t rule-ink pt-0" : undefined}
        >
          <div className="grid gap-10 lg:grid-cols-[0.5fr_1.5fr] lg:gap-20">
            <h2 className="type-subhead text-chilli lg:sticky lg:top-28 lg:self-start">
              {group.group}
            </h2>
            <FaqAccordion items={group.items} />
          </div>
        </Section>
      ))}

      <BookingCta />
    </>
  );
}
