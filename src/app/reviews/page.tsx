import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { StackCards } from "@/components/motion/StackCards";
import { TextScrub } from "@/components/motion/TextScrub";
import { BookingCta } from "@/components/sections/BookingCta";
import { site } from "@/data/site";

/**
 * Reviews hub.
 *
 * PLACEHOLDER CONTENT. Everything below is written to the right shape but is
 * not real. Replace with genuine Google and Instagram reviews before launch,
 * and add Review / AggregateRating schema at the same time — fabricated
 * testimonials are dishonest and inventing review markup is a structured-data
 * violation that can get the whole site penalised.
 */
export const metadata: Metadata = {
  title: "Reviews | Heartbreaker Ink, Mornington",
  description:
    "What clients say about being tattooed at Heartbreaker Ink — a private fine line studio on the Mornington Peninsula.",
  alternates: { canonical: "/reviews/" },
};

const reviews = [
  {
    quote:
      "From the first consultation to the final result, everything felt thoughtful and calm. The fine line work is stunning — exactly what I imagined, only better.",
    source: "Google",
  },
  {
    quote:
      "I was nervous about my first tattoo and Beth talked me through every step. Never once felt rushed or judged. I have already booked my second.",
    source: "Instagram",
  },
  {
    quote:
      "She drew the script by hand until it was right. It is the one piece people always ask me about.",
    source: "Google",
  },
  {
    quote:
      "Came down from Melbourne on a recommendation and would do the drive again tomorrow. Private, unhurried, and the line work is immaculate.",
    source: "Google",
  },
];

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        heading="What people say"
        intro="Most of the studio's work comes from someone sending a friend. That is the only marketing that has ever mattered here."
        trail={[{ label: "Reviews", href: "/reviews/" }]}
      />

      <Section ground="paper">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <TextScrub as="p" className="type-lead max-w-[32ch] text-maroon">
              Word of mouth, mostly. A few of them have been kind enough to
              write it down.
            </TextScrub>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="type-label mt-8 inline-block text-ink-50 underline-offset-8 hover:text-maroon hover:underline"
            >
              More on Instagram
            </a>
          </div>

          <StackCards className="flex flex-col gap-6">
            {reviews.map((review, i) => (
              <figure key={i} className="border rule-ink bg-paper-warm p-8 md:p-10">
                <span aria-hidden="true" className="type-display block text-chilli">
                  &ldquo;
                </span>
                <blockquote className="type-lead -mt-6 text-maroon">
                  {review.quote}
                </blockquote>
                <figcaption className="type-label mt-6 text-ink-50">
                  Placeholder review &middot; {review.source}
                </figcaption>
              </figure>
            ))}
          </StackCards>
        </div>
      </Section>

      <Section ground="maroon" className="text-center">
        <h2 className="type-headline mx-auto max-w-[16ch]">
          Been tattooed here?
        </h2>
        <p className="type-body mx-auto mt-6 max-w-[42ch] text-paper-80">
          A review helps more than you would think — it is how the next nervous
          first-timer decides to send the message.
        </p>
        <Link
          href="/contact/"
          className="type-button mt-9 inline-flex items-center gap-3 border border-offwhite px-8 py-4 transition-colors duration-(--duration-fast) hover:bg-offwhite hover:text-maroon"
        >
          Leave a review
          <span aria-hidden="true">&#8599;</span>
        </Link>
      </Section>

      <BookingCta />
    </>
  );
}
