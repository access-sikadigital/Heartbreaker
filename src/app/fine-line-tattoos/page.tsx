import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { TextScrub } from "@/components/motion/TextScrub";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { BookingCta } from "@/components/sections/BookingCta";
import { pillar, allServices } from "@/data/services";

/** Service pillar. Target: "fine line tattoo" — 2,900/mo, KD 28. */
export const metadata: Metadata = {
  title: pillar.title,
  description: pillar.description,
  alternates: { canonical: "/fine-line-tattoos/" },
};

export default function FineLineTattoosPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        heading={pillar.heading}
        intro={pillar.intro}
        image={pillar.hero}
        trail={[{ label: "Fine line tattoos", href: "/fine-line-tattoos/" }]}
      />

      {/*
        Columns are vertically centred and the text column carries real weight —
        a label, a scrubbed statement, supporting copy and a spec list. An
        earlier version put one short paragraph against a full-height image,
        which left most of the row empty and made the photograph look like it
        had been dropped in beside nothing.
      */}
      <Section ground="paper">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <div>
            <p className="type-label text-chilli">Why fine line</p>

            <TextScrub as="p" className="type-lead mt-6 max-w-[40ch] text-maroon">
              Single needle, drawn at the size it will be worn, and spaced for
              how ink behaves over a decade rather than over a week.
            </TextScrub>

            <p className="type-body mt-7 max-w-[48ch] text-ink-70">
              That last part is most of the difference between fine line that
              ages well and fine line that closes up. Lines set too close will
              read as one shape in ten years, and no amount of aftercare undoes
              a drawing decision.
            </p>

            <p className="type-body mt-5 max-w-[48ch] text-ink-70">
              So the drawing is the work. Everything else — the sitting, the
              healing, the touch-up years later — follows from getting that
              right first.
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-8 border-t rule-ink pt-8 sm:grid-cols-3">
              {[
                { k: "Needle", v: "Single" },
                { k: "Drawn", v: "By hand" },
                { k: "Sittings", v: "One at a time" },
              ].map((f) => (
                <div key={f.k}>
                  <dt className="type-label text-ink-50">{f.k}</dt>
                  <dd className="type-subhead mt-2 text-maroon">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ImageReveal className="aspect-4/5 lg:aspect-3/4">
            <Image
              src="/brand/photography/placeholder-03.jpg"
              alt="Healed fine line work across a collarbone"
              width={900}
              height={1200}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="h-full w-full object-cover"
            />
          </ImageReveal>
        </div>
      </Section>

      <Section ground="paper" className="border-t rule-ink">
        <p className="type-label text-chilli">Every service</p>
        <h2 className="type-headline mt-4 max-w-[14ch] text-maroon">
          Pick where to start
        </h2>

        <Reveal stagger={0.07} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allServices.map((s) => (
            <RevealItem key={s.slug}>
              <Link
                href={`/fine-line-tattoos/${s.slug}/`}
                className="group flex h-full flex-col"
              >
                <div className="relative aspect-4/5 overflow-hidden bg-maroon-deep">
                  <Image
                    src={s.hero}
                    alt=""
                    width={700}
                    height={875}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-[1000ms] ease-(--ease-brand) group-hover:scale-[1.05]"
                  />
                  <span className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center bg-offwhite">
                    <Icon name={s.icon} size={26} />
                  </span>
                </div>
                <h3 className="type-subhead mt-5 text-maroon">{s.heading}</h3>
                <p className="type-body mt-3 text-ink-70">{s.intro}</p>
                <span className="type-label mt-auto pt-5 text-chilli">
                  From {s.priceFrom} <span aria-hidden="true">&#8599;</span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <BookingCta />
    </>
  );
}
