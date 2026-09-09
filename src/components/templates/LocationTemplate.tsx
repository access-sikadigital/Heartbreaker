import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { TextScrub } from "@/components/motion/TextScrub";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { BookingCta } from "@/components/sections/BookingCta";
import { tier1Services } from "@/data/services";
import type { Location } from "@/data/locations";
import { site } from "@/data/site";

/**
 * Location page template.
 *
 * The scope is clear that these do not win on suburb keywords — "fine line
 * tattoo mornington" is 0/mo. They exist to support the Google Business Profile
 * and to catch Melbourne category traffic. So they are written as genuinely
 * useful pages about getting to and sitting in this studio, with real detail
 * about the trip. A thin doorway page repeating the suburb name would rank for
 * nothing and read as spam to the one person who did land on it.
 */
export function LocationTemplate({ location }: { location: Location }) {
  return (
    <>
      <PageHero
        eyebrow="Visit"
        heading={location.heading}
        intro={location.intro}
        image={location.hero}
        trail={[{ label: location.name, href: `/${location.slug}/` }]}
      />

      <Section ground="paper">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="type-label text-chilli">Getting here</p>
            <TextScrub as="p" className="type-lead mt-6 max-w-[46ch] text-maroon">
              {location.travel}
            </TextScrub>

            <div className="mt-12 border-t rule-ink pt-8">
              <p className="type-label text-ink-50">Also covering</p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {location.nearby.map((n) => (
                  <li key={n} className="type-body text-ink-70">
                    {n}
                  </li>
                ))}
              </ul>
            </div>

            <address className="type-body mt-10 not-italic text-ink-70">
              <span className="block text-maroon">{site.name}</span>
              {site.contact.location}
              <br />
              {site.contact.region}
            </address>

            <Link
              href="/book/"
              className="type-button mt-8 inline-flex items-center gap-3 border border-maroon px-7 py-3.5 text-maroon transition-colors duration-(--duration-fast) hover:bg-maroon hover:text-offwhite"
            >
              Book a session
              <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>

          <ImageReveal from="bottom" className="aspect-4/5">
            <Image
              src="/brand/photography/placeholder-05.jpg"
              alt="Inside the studio"
              width={900}
              height={1125}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="h-full w-full object-cover"
            />
          </ImageReveal>
        </div>
      </Section>

      <Section ground="paper" className="border-t rule-ink">
        <p className="type-label text-chilli">What we do</p>
        <h2 className="type-headline mt-4 max-w-[16ch] text-maroon">
          Fine line, however you want it
        </h2>

        <Reveal stagger={0.08} className="mt-12 grid gap-6 sm:grid-cols-3">
          {tier1Services.map((s) => (
            <RevealItem key={s.slug}>
              <Link
                href={`/fine-line-tattoos/${s.slug}/`}
                className="group flex h-full flex-col"
              >
                <div className="aspect-4/3 overflow-hidden bg-maroon-deep">
                  <Image
                    src={s.hero}
                    alt=""
                    width={640}
                    height={480}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-(--ease-brand) group-hover:scale-105"
                  />
                </div>
                <h3 className="type-subhead mt-5 text-maroon">{s.name}</h3>
                <p className="type-body mt-2 text-ink-70">{s.intro}</p>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <BookingCta />
    </>
  );
}
