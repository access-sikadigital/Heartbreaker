import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PinnedSteps } from "@/components/motion/PinnedSteps";
import { TextScrub } from "@/components/motion/TextScrub";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/data/site";

/**
 * Work with us.
 *
 * Recruitment, not a service page: the audience is tattoo artists looking for
 * a chair, and the scope lists it as its own destination for exactly that
 * reason. It carries no booking CTA, because the reader is not a client and a
 * "Book now" here would read as a misunderstanding of who is on the page.
 *
 * Deliberately vague on the commercial terms. Chair rent, split, minimum days
 * and guest-spot length are Beth's to set, and inventing numbers here would
 * put the studio in a negotiation it did not agree to. The page's job is to
 * attract the right applicant and start the conversation.
 */
export const metadata: Metadata = {
  title: "Work With Us | Tattoo Artist Opportunities, Mornington",
  description:
    "Guest spots and residencies for fine line tattoo artists at Heartbreaker Ink, a private studio in Mornington, Victoria. Send your portfolio and let's talk.",
  alternates: { canonical: "/work-with-us/" },
};

const looking = [
  {
    title: "Fine line first",
    body: "Your portfolio should show control at small scale. Single-needle, script, botanical, micro work. Heavier styles are welcome as range, not as the main body of work.",
  },
  {
    title: "Your own clients",
    body: "A following you bring with you matters more than years behind a machine. The studio is private and word of mouth carries most of its bookings.",
  },
  {
    title: "Licensed and current",
    body: "Victorian infection-control certification, current registration, and your own insurance. Non-negotiable, and the first thing that gets checked.",
  },
  {
    title: "The right temperament",
    body: "One client at a time, no audience, no rush. People come here for the calm as much as the work, and that only holds if everyone in the room protects it.",
  },
];

const offer = [
  {
    title: "A private room, not a production line",
    body: "You work one client at a time in your own space. No walk-in churn, no shared floor, no queue watching over your shoulder.",
  },
  {
    title: "Guest spots and residencies",
    body: "A week, a season, or a standing chair. Guest artists are a regular part of how the studio runs, so a short stay is a real option and not a favour.",
  },
  {
    title: "A brand that already brings people in",
    body: "Heartbreaker has an established following on the Peninsula and an audience that trusts the studio's eye. You are not starting from nothing here.",
  },
  {
    title: "Terms worth discussing",
    body: "Chair arrangements are set case by case depending on days, style and whether you are guesting or staying. Ask, and you will get a straight answer.",
  },
];

export default function WorkWithUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Work with us"
        heading="For artists"
        intro="Heartbreaker Ink takes on guest artists and residents who work the way the studio does: fine line, one client at a time, no rush. If that is you, we would like to see your work."
        image="/brand/photography/script-lettering/back-script.jpg"
        trail={[{ label: "Work with us", href: "/work-with-us/" }]}
      />

      <Section ground="paper">
        <PinnedSteps
          aside={
            <>
              <p className="type-label text-chilli">What we look for</p>
              <TextScrub as="p" className="type-lead mt-6 max-w-[34ch] text-maroon">
                Four things, and the portfolio is only the first of them. The
                rest is about whether the room still works with you in it.
              </TextScrub>
            </>
          }
        >
          {looking.map((item, i) => (
            <div
              key={item.title}
              data-step
              className="grid grid-cols-[3rem_1fr] gap-5 border-t rule-ink py-8"
            >
              <span className="type-label numeric pt-1 text-chilli">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="type-subhead text-maroon">{item.title}</h2>
                <p className="type-body mt-3 max-w-[46ch] text-ink-70">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </PinnedSteps>
      </Section>

      <Section ground="maroon">
        <p className="type-label text-chilli">What you get</p>
        <h2 className="type-headline mt-5 max-w-[16ch]">
          A studio worth the drive
        </h2>

        <Reveal stagger={0.08} className="mt-14 grid gap-8 xs:grid-cols-2">
          {offer.map((item) => (
            <RevealItem key={item.title}>
              <div className="h-full border-t border-paper-20 pt-7">
                <h3 className="type-subhead text-offwhite">{item.title}</h3>
                <p className="type-body mt-4 max-w-[40ch] text-paper-60">
                  {item.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <Section ground="paper">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="type-label text-chilli">Getting in touch</p>
            <h2 className="type-headline mt-4 max-w-[12ch] text-maroon">
              Send your work
            </h2>
            <p className="type-body mt-6 max-w-[40ch] text-ink-70">
              The fastest route is a message on Instagram with your handle, so
              Beth can see the work straight away. A written enquiry reaches the
              same inbox if you would rather put it in words.
            </p>
          </div>

          <div>
            <ul className="flex flex-col">
              {[
                {
                  label: "Your portfolio",
                  body: "A link is fine. Instagram, a website, or a folder. Recent work, not your best year.",
                },
                {
                  label: "What you are after",
                  body: "A guest week, a standing chair, or just a conversation about what is possible.",
                },
                {
                  label: "When you are free",
                  body: "Rough dates, and whether you are local to the Peninsula or travelling in.",
                },
                {
                  label: "Your credentials",
                  body: "Infection control, registration and insurance. Attach them or say they are ready.",
                },
              ].map((item) => (
                <li key={item.label} className="border-t rule-ink py-6">
                  <p className="type-label text-maroon">{item.label}</p>
                  <p className="type-body mt-2 text-ink-70">{item.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="type-button inline-flex items-center gap-3 border border-maroon px-7 py-3.5 text-maroon transition-colors duration-(--duration-fast) hover:bg-maroon hover:text-offwhite"
              >
                Message on Instagram
                <span aria-hidden="true">&#8599;</span>
              </a>
              <Link
                href="/contact/"
                className="type-button inline-flex items-center gap-3 border border-ink-30 px-7 py-3.5 text-ink-70 transition-colors duration-(--duration-fast) hover:border-maroon hover:text-maroon"
              >
                Send an enquiry
                <span aria-hidden="true">&#8599;</span>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
