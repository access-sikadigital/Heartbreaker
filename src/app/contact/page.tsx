import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PinnedSteps } from "@/components/motion/PinnedSteps";
import { TextScrub } from "@/components/motion/TextScrub";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { BookingCta } from "@/components/sections/BookingCta";
import { site } from "@/data/site";
import { JsonLd, localBusinessSchema } from "@/lib/schema";

/**
 * Contact.
 *
 * Target: "tattoo shops near me" — 12,100/mo, KD 29 — though the scope is clear
 * that term is won through Google Business Profile, not this page. What this
 * page does is corroborate the GBP listing: same name, same area, same schema.
 * Keep it in step with the profile once it is claimed.
 *
 * This page absorbed the old /book/ route, which carried the same enquiry form
 * against the same intent. Two pages competing on "get in touch" helped
 * neither; /book/ now 308s here and its four-step explainer runs below the
 * form, where it answers the question the form raises ("what happens after I
 * press send?") instead of living on a page nobody reached.
 */
export const metadata: Metadata = {
  title: "Contact | Heartbreaker Ink, Mornington Peninsula",
  description:
    "Get in touch with Heartbreaker Ink, a private fine line tattoo studio in Mornington, Victoria. By appointment, send your idea and we will come back to you.",
  alternates: { canonical: "/contact/" },
};

/** How an enquiry becomes an appointment. Moved here from /book/. */
const steps = [
  {
    title: "Send the idea",
    body: "Rough size, where you want it, and any reference images. Half-formed is fine, that is what the conversation is for.",
  },
  {
    title: "Get a straight answer",
    body: "Beth will tell you whether it works as fine line, what it needs, and what it costs. If it does not work, you will be told that too.",
  },
  {
    title: "Hold the date",
    body: "A non-refundable deposit secures your slot. Reschedule once with at least 48 hours notice and it moves with you.",
  },
  {
    title: "Come in",
    body: "One client at a time, in a private studio. Stencil, placement check, then the work. Breaks whenever you want them.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />

      <PageHero
        eyebrow="Contact"
        heading="Get in touch"
        intro="The studio is private and by appointment. A message with your idea is the fastest way to an answer, usually the same day."
        image="/brand/photography/small-micro/urban-pair.jpg"
        trail={[{ label: "Contact", href: "/contact/" }]}
      />

      <Section ground="paper">
        {/*
          The left column is sticky and carries real content. It previously
          held three short blocks against a long form, so it ran out of things
          to say a third of the way down and left a hole.

          The "what to include" list is the part doing actual work: enquiries
          that arrive with placement, size and timing attached can be answered
          in one reply instead of four.
        */}
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <TextScrub as="p" className="type-lead max-w-[38ch] text-maroon">
              Tell us what you are thinking, roughly where you want it, and any
              references. You will get a straight answer on whether it works.
            </TextScrub>

            <div className="mt-10 border-t rule-ink pt-8">
              <p className="type-label text-chilli">What to include</p>
              <ul className="mt-5 flex flex-col gap-3">
                {[
                  "The idea, even half-formed",
                  "Where on the body it goes",
                  "Rough size in centimetres",
                  "Days or weeks that suit you",
                  "Reference images, sent on Instagram",
                ].map((item) => (
                  <li
                    key={item}
                    className="type-body flex gap-3 text-ink-70"
                  >
                    <span aria-hidden="true" className="text-chilli">
                      &middot;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 grid gap-8 border-t rule-ink pt-8 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <p className="type-label text-ink-50">Instagram</p>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="type-subhead mt-2 block text-maroon hover:text-chilli"
                >
                  {site.social.instagramHandle}
                </a>
              </div>

              <div>
                <p className="type-label text-ink-50">Studio</p>
                <address className="type-body mt-2 not-italic text-ink-70">
                  {site.contact.street}
                  <br />
                  {site.contact.location}
                  <br />
                  {site.contact.region}, Australia
                </address>
              </div>

              <div>
                <p className="type-label text-ink-50">Hours</p>
                <p className="type-body mt-2 text-ink-70">
                  By appointment. Later sessions on request.
                </p>
              </div>

              <div>
                <p className="type-label text-ink-50">Reply time</p>
                <p className="type-body mt-2 text-ink-70">
                  Usually the same day.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t rule-ink pt-8">
              {[
                { label: "FAQs", href: "/faqs/" },
                { label: "Pricing", href: "/pricing/" },
                { label: "Studio policy", href: "/studio-policy/" },
                { label: "Aftercare", href: "/aftercare/" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="type-label text-ink-50 underline-offset-8 transition-colors hover:text-maroon hover:underline"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <EnquiryForm />
        </div>
      </Section>

      {/*
        Finding the studio.

        The map is a plain Google Maps embed rather than the Maps JavaScript
        API: no key to manage, no billing account, and nothing to break when a
        key rotates. It is lazy-loaded because the iframe pulls a few hundred KB
        and sets Google's cookies, and neither should happen for the majority of
        visitors who never scroll this far.

        CONFIRM WITH BETH before launch: the travel time, the parking line and
        what a client should do when they arrive at a private studio with a
        closed door. Everything here is either derived from the address or
        deliberately general, but "general and true" is not the same as "what
        the studio actually tells people".
      */}
      <Section ground="paper" className="border-t rule-ink">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="type-label text-chilli">Finding us</p>
            <h2 className="type-headline mt-4 max-w-[14ch] text-maroon">
              Where the studio is
            </h2>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              site.contact.mapQuery,
            )}`}
            target="_blank"
            rel="noreferrer noopener"
            className="type-button inline-flex items-center gap-3 border border-maroon px-6 py-3 text-maroon transition-colors duration-(--duration-fast) hover:bg-maroon hover:text-offwhite"
          >
            Open in Maps
            <span aria-hidden="true">&#8599;</span>
          </a>
        </div>

        <div
          className={
            site.contact.exteriorPhoto
              ? "mt-12 grid gap-6 lg:grid-cols-2"
              : "mt-12"
          }
        >
          {/*
            Height depends on whether the photo is beside it. Paired, the map
            takes half the width and a 4:3 crop sits right; alone at full
            width a ratio-driven box is nearly 1000px tall, which is a map
            nobody asked to read. Fixed heights instead when it stands alone.
          */}
          <div
            className={
              site.contact.exteriorPhoto
                ? "aspect-16/10 overflow-hidden bg-ink-06 lg:aspect-4/3"
                : "h-72 overflow-hidden bg-ink-06 md:h-96"
            }
          >
            <iframe
              title={`Map showing ${site.name}, ${site.contact.street}, ${site.contact.location}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                site.contact.mapQuery,
              )}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0 grayscale-[0.35] contrast-[1.05]"
            />
          </div>

          {site.contact.exteriorPhoto && (
            <div className="aspect-16/10 overflow-hidden bg-maroon-deep lg:aspect-4/3">
              <Image
                src={site.contact.exteriorPhoto}
                alt={`The front of ${site.name} on ${site.contact.street}`}
                width={1200}
                height={900}
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        <Reveal
          stagger={0.07}
          className="mt-12 grid gap-8 border-t rule-ink pt-10 xs:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              label: "The address",
              body: `${site.contact.street}, ${site.contact.location}. Barkly Street runs through the centre of town.`,
            },
            {
              label: "By car",
              body: "Roughly an hour from Melbourne down the Nepean Highway and Peninsula Link, then into central Mornington.",
            },
            {
              label: "Parking",
              body: "Street parking on and around Barkly Street. Allow a few extra minutes on weekends and through summer.",
            },
            {
              label: "At the door",
              body: "The studio is private and runs by appointment, so it is not an open shopfront. Come at your appointment time and you will be let in.",
            },
          ].map((item) => (
            <RevealItem key={item.label}>
              <p className="type-label text-chilli">{item.label}</p>
              <p className="type-body mt-3 text-ink-70">{item.body}</p>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      {/* What happens after you press send. Inherited from the old /book/. */}
      <Section ground="paper" className="border-t rule-ink">
        <PinnedSteps
          aside={
            <>
              <p className="type-label text-chilli">How booking works</p>
              <TextScrub as="p" className="type-lead mt-6 max-w-[34ch] text-maroon">
                Four steps, no pressure at any of them, and nothing charged
                until you have seen what you are getting.
              </TextScrub>

              <Link
                href="/studio-policy/"
                className="type-label mt-8 inline-block text-ink-50 underline-offset-8 hover:text-maroon hover:underline"
              >
                Read the full studio policy
              </Link>
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

      <BookingCta />
    </>
  );
}
