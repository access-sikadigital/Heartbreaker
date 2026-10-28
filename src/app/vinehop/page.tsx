import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { GhlBookingEmbed } from "@/components/forms/GhlBookingEmbed";
import { vinehop } from "@/data/vinehop";

/**
 * Event page for Vinehop 2026. Replaces sending people to the GHL funnel page:
 * the copy lives here, the booking and payment stay in GHL via the embedded
 * calendar group, so slots, prices and confirmations are still managed in one
 * place.
 *
 * Not in the nav. Traffic comes from Instagram, ads and the festival itself,
 * all of which link straight here. Take it down (or redirect it) after the day.
 */
export const metadata: Metadata = {
  title: "Vinehop 2026 Fine Line Tattoos | Heartbreaker Ink",
  description: `Fine line flash and freckle tattoos at ${vinehop.name}, ${vinehop.dateLabel}. Pre-booking only, limited spots. Pick your tattoo and time and pay to secure it.`,
  alternates: { canonical: "/vinehop/" },
};

export default function VinehopPage() {
  return (
    <>
      <PageHero
        eyebrow={`${vinehop.name} · ${vinehop.dateLabel}`}
        heading="Fine line tattoos at Vinehop"
        intro="Flash and freckle tattoos on the day, by pre-booking only. Limited spots, first in, best dressed."
        image="/brand/photography/small-micro/legs-foliage.jpg"
        trail={[{ label: "Vinehop 2026", href: "/vinehop/" }]}
      />

      <Section ground="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="type-label text-chilli">What&rsquo;s on offer</p>
            <h2 className="type-headline mt-4 max-w-[14ch] text-maroon">
              Pick one, then pick a time
            </h2>
            <p className="type-body mt-6 max-w-[40ch] text-ink-70">
              {vinehop.dateLabel}, {vinehop.hoursLabel}. Prices are shown when
              you choose an option below.
            </p>
          </div>

          <ul className="flex flex-col">
            {vinehop.options.map((o) => (
              <li
                key={o.name}
                className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 border-t rule-ink py-6"
              >
                <h3 className="type-subhead text-maroon">{o.name}</h3>
                <span className="type-label numeric pt-1 text-ink-50">{o.time}</span>
                <p className="type-body col-span-2 max-w-[48ch] text-ink-70">{o.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section ground="maroon">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="type-label text-chilli">Before you book</p>
            <h2 className="type-headline mt-4 max-w-[14ch]">The fine print</h2>
          </div>
          <ol className="flex flex-col">
            {vinehop.rules.map((rule, i) => (
              <li
                key={rule}
                className="grid grid-cols-[3rem_1fr] gap-5 border-t border-paper-20 py-6"
              >
                <span className="type-label numeric pt-1 text-chilli">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="type-body max-w-[44ch] text-paper-80">{rule}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section ground="paper" id="book">
        <p className="type-label text-chilli">Book your spot</p>
        <h2 className="type-headline mt-4 max-w-[16ch] text-maroon">
          Choose your tattoo and time
        </h2>
        <div className="mt-12">
          <GhlBookingEmbed
            src={vinehop.widgetUrl}
            title={`Book a tattoo at ${vinehop.name}`}
            fallbackUrl={vinehop.funnelUrl}
          />
        </div>
      </Section>
    </>
  );
}
