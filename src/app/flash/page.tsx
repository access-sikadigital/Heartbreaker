import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { TextScrub } from "@/components/motion/TextScrub";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { BookingCta } from "@/components/sections/BookingCta";
import { flashIcons } from "@/data/brand";

/** Target: "flash tattoo" — 1,000/mo, KD 25. The natural hook for Meta ads. */
export const metadata: Metadata = {
  title: "Flash Tattoos & Flash Days | Heartbreaker Ink, Mornington",
  description:
    "Limited flash designs, drawn once and tattooed once. Flash days at a private Mornington Peninsula studio. See what's available and claim a design.",
  alternates: { canonical: "/flash/" },
};

const DRIFT = ["mt-0", "mt-10", "mt-4", "mt-12", "mt-2", "mt-8", "mt-5", "mt-11", "mt-3"];

export default function FlashPage() {
  return (
    <>
      <PageHero
        eyebrow="Flash"
        heading="Drawn once. Tattooed once."
        intro="Flash days are a limited set of designs, released together and claimed first come. Each is tattooed a single time, so the piece you take home stays yours alone."
        image="/brand/photography/fine-line/shoulder-circles.jpg"
        trail={[{ label: "Flash", href: "/flash/" }]}
      />

      <Section ground="paper">
        <TextScrub as="p" className="type-lead mx-auto max-w-[54ch] text-center text-maroon">
          Flash is where the studio gets to be selfish — designs drawn for their
          own sake rather than to a brief, priced simply, and gone once claimed.
        </TextScrub>

        <Reveal
          stagger={0.05}
          className="mt-16 grid grid-cols-3 justify-items-center gap-x-6 gap-y-12 sm:grid-cols-5"
        >
          {flashIcons.map((icon, i) => (
            <RevealItem key={icon.slug} className={DRIFT[i % DRIFT.length]}>
              <Icon
                name={icon.slug}
                size={92}
                title={icon.depicts}
                className="transition-transform duration-(--duration-base) ease-(--ease-brand) hover:-translate-y-2"
              />
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <Section ground="maroon">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="type-label text-chilli">How flash works</p>
            <h2 className="type-headline mt-4 max-w-[14ch]">
              First in, only one
            </h2>
          </div>
          <ol className="flex flex-col">
            {[
              "A set drops. You will see it here and on Instagram at the same time.",
              "Claim the design you want by sending its number. First message takes it.",
              "Flash is priced as drawn — size and placement are set, so the quote is simple.",
              "Once a design is tattooed it is retired. Nobody else gets that piece.",
            ].map((step, i) => (
              <li
                key={i}
                className="grid grid-cols-[3rem_1fr] gap-5 border-t border-paper-20 py-7"
              >
                <span className="type-label numeric pt-1 text-chilli">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="type-body max-w-[44ch] text-paper-80">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section ground="paper" className="text-center">
        <h2 className="type-headline mx-auto max-w-[16ch] text-maroon">
          No flash live right now
        </h2>
        <p className="type-body mx-auto mt-6 max-w-[44ch] text-ink-70">
          Sets drop through the year and go quickly. Ask to be told when the next
          one lands, or book custom work instead.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/book/"
            className="type-button border border-maroon px-7 py-3.5 text-maroon transition-colors duration-(--duration-fast) hover:bg-maroon hover:text-offwhite"
          >
            Tell me when flash drops
          </Link>
          <Link
            href="/fine-line-tattoos/custom-tattoos/"
            className="type-button border border-ink-30 px-7 py-3.5 text-ink-70 transition-colors duration-(--duration-fast) hover:border-maroon hover:text-maroon"
          >
            Custom work
          </Link>
        </div>
      </Section>

      <BookingCta />
    </>
  );
}
