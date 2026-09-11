import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { StackCards } from "@/components/motion/StackCards";

/**
 * Social proof.
 *
 * The scope calls the studio's reviews and following its "biggest untapped
 * asset" — strong on Instagram, invisible to Google. Surfacing them on the site
 * is what makes that asset countable.
 *
 * PLACEHOLDER COPY. Replace with real Google and Instagram reviews before
 * launch, and add Review / AggregateRating schema at the same time — inventing
 * testimonials is both dishonest and a structured-data violation.
 */
const reviews = [
  {
    quote:
      "From the first consultation to the final result, everything felt thoughtful and calm. The fine line work is stunning, exactly what I imagined, only better.",
    name: "Placeholder review",
    source: "Google",
  },
  {
    quote:
      "I was nervous about my first tattoo and Beth talked me through every step. Never once felt rushed or judged. I have already booked my second.",
    name: "Placeholder review",
    source: "Instagram",
  },
  {
    quote:
      "She drew the script by hand until it was right. It is the one piece people always ask me about.",
    name: "Placeholder review",
    source: "Google",
  },
];

export function Reviews() {
  return (
    <Section id="reviews" ground="paper" className="border-t rule-ink">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="type-label text-chilli">In their words</p>
          <h2 className="type-headline mt-4 max-w-[12ch] text-maroon">
            Worth the forever
          </h2>
          <p className="type-body mt-7 max-w-[38ch] text-ink-70">
            Most of the studio&rsquo;s work comes from people sending a friend.
            That is the only marketing that has ever mattered here.
          </p>
          <Link
            href="/reviews/"
            className="type-button mt-8 inline-flex items-center gap-3 border border-maroon px-6 py-3 text-maroon transition-colors duration-(--duration-fast) hover:bg-maroon hover:text-offwhite"
          >
            Read more
            <span aria-hidden="true">&#8599;</span>
          </Link>
        </div>

        <StackCards className="flex flex-col gap-6">
          {reviews.map((review, i) => (
            <figure
              key={i}
              className="border rule-ink bg-paper-warm p-8 md:p-10"
            >
              <span aria-hidden="true" className="type-display block text-chilli">
                &ldquo;
              </span>
              <blockquote className="type-lead -mt-6 text-maroon">
                {review.quote}
              </blockquote>
              <figcaption className="type-label mt-6 text-ink-50">
                {review.name} &middot; {review.source}
              </figcaption>
            </figure>
          ))}
        </StackCards>
      </div>
    </Section>
  );
}
