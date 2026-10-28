import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { Section } from "@/components/ui/Section";
import { GhlBookingEmbed } from "@/components/forms/GhlBookingEmbed";
import { vinehop } from "@/data/vinehop";
import { colors } from "@/lib/tokens";

/**
 * Vinehop 2026 pre-booking page.
 *
 * Built to match the GHL funnel page section for section: co-brand band and
 * stall photo, the pitch with the booking menu straight under it, this year's
 * designs, terms, last year's reel and reviews. Booking, payment and the
 * reviews feed stay in GHL; everything else is the site's own.
 *
 * Not in the nav. Traffic comes from Instagram, ads and the festival itself.
 * Take it down (or redirect it) after the day.
 */
export const metadata: Metadata = {
  title: "Vinehop 2026 Fine Line Tattoo Pre-Booking",
  description: `Book your Vinehop flash or freckle tattoo with Heartbreaker Ink, ${vinehop.dateLabel}. Pre-booking only, ${vinehop.spots} spots for the whole day.`,
  alternates: { canonical: "/vinehop/" },
};

const bookButton =
  "type-button inline-flex items-center gap-3 bg-chilli px-8 py-4 text-offwhite transition-colors duration-(--duration-fast) hover:bg-maroon";

export default function VinehopPage() {
  const { images, designs, terms } = vinehop;

  return (
    <>
      {/* Co-brand band, then the stall. The header sits over the band. */}
      <section data-ink-color={colors.offwhite} className="on-dark bg-maroon pt-(--header-h)">
        <div className="flex justify-center px-6 py-6">
          <Image
            src={images.lockup.src}
            width={images.lockup.width}
            height={images.lockup.height}
            alt="Heartbreaker Ink × Vinehop"
            priority
            className="h-14 w-auto md:h-20"
          />
        </div>
        <div className="relative h-[70vw] max-h-[640px] min-h-[280px]">
          <Image
            src={images.hero.src}
            alt="The Heartbreaker Ink fine line tattoo stall at Vinehop"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_35%]"
          />
        </div>
      </section>

      <Section ground="paper" className="text-center">
        <h1 className="type-headline mx-auto max-w-[20ch] text-maroon">
          Fine line tattoo pre-booking page
        </h1>
        <div className="type-body mx-auto mt-8 flex max-w-[52ch] flex-col gap-5 text-ink-70">
          <p>
            Book your exclusive Vinehop flash tattoo and get inked by the{" "}
            <strong className="text-chilli">Heartbreaker Ink</strong> team at
            this year&rsquo;s festival.
          </p>
          <p>
            Pre-bookings are <strong className="text-chilli">essential</strong>{" "}
            this year, with only{" "}
            <strong className="text-chilli">{vinehop.spots} spots available</strong>{" "}
            for the entire day.
          </p>
          <p>Once they&rsquo;re gone, they&rsquo;re gone, so get in quick!</p>
        </div>

        <p id="book" className="type-subhead mt-12 scroll-mt-28 text-chilli">
          Book here <span aria-hidden="true">&darr;</span>
        </p>

        <div className="mx-auto mt-8 max-w-4xl bg-white p-3 text-left shadow-[0_8px_40px_rgb(0_0_0/0.08)] md:p-6">
          <GhlBookingEmbed
            src={vinehop.widgetUrl}
            title={`Book a tattoo at ${vinehop.name}`}
            fallbackUrl={vinehop.funnelUrl}
          />
        </div>
      </Section>

      <Section ground="maroon" className="text-center">
        <h2 className="type-headline">This year&rsquo;s designs</h2>
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-x-3 gap-y-14 sm:gap-x-6">
          {designs.map((d) => (
            <div key={d.label} className="flex flex-col items-center">
              <p className="type-label text-chilli">&mdash; {d.label} &mdash;</p>
              <Image
                src={d.sheet.src}
                width={d.sheet.width}
                height={d.sheet.height}
                alt={`${d.label} designs for Vinehop 2026`}
                sizes="(max-width: 639px) 50vw, 448px"
                className="mt-5 h-auto w-full bg-white"
              />
              <p className="type-label mt-6 text-paper-80">size: {d.size}</p>
              <Image
                src={d.onSkin.src}
                width={d.onSkin.width}
                height={d.onSkin.height}
                alt={`A ${d.label.toLowerCase()} tattoo on an arm, to show the size`}
                sizes="(max-width: 639px) 50vw, 448px"
                className="mt-6 h-auto w-full"
              />
            </div>
          ))}
        </div>
      </Section>

      <Section ground="paper" className="text-center">
        <h2 className="type-headline text-maroon">Terms</h2>
        <dl className="mt-10 flex flex-col gap-8">
          {terms.map((t) => (
            <div key={t.title}>
              <dt className="type-label text-chilli">{t.title}</dt>
              <dd className="type-body mt-2 text-ink-70">{t.body}</dd>
            </div>
          ))}
        </dl>
        <a href="#book" className={`${bookButton} mt-12`}>
          Book my Vinehop tattoo
        </a>
      </Section>

      <Section ground="paper" className="border-t rule-ink text-center">
        <h2 className="type-headline text-maroon">Last year was a vibe!</h2>
        <p className="type-label mt-4 text-chilli">Don&rsquo;t miss out</p>

        <video
          src={vinehop.video}
          className="mx-auto mt-10 aspect-video w-full max-w-4xl bg-ink object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
        />

        {vinehop.reviewsWidgetUrl && (
          <div className="mx-auto mt-14 max-w-4xl bg-white p-3 text-left shadow-[0_8px_40px_rgb(0_0_0/0.08)] md:p-6">
            <h3 className="type-subhead text-maroon">The Heartbreaker experience</h3>
            <iframe
              className="lc_reviews_widget mt-4 block w-full border-0"
              src={vinehop.reviewsWidgetUrl}
              title="Heartbreaker Ink reviews"
              style={{ minWidth: "100%", minHeight: 260 }}
              loading="lazy"
            />
            <Script
              src="https://reputationhub.site/reputation/assets/review-widget.js"
              strategy="lazyOnload"
            />
          </div>
        )}

        <a href="#book" className={`${bookButton} mt-14`}>
          Book my Vinehop tattoo
        </a>
      </Section>
    </>
  );
}
