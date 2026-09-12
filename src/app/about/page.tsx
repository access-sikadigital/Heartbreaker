import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { TextScrub } from "@/components/motion/TextScrub";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Parallax } from "@/components/motion/Parallax";
import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { BookingCta } from "@/components/sections/BookingCta";
import { site } from "@/data/site";

/** Target: "fine line tattoo artist" — 210/mo, KD 31. */
export const metadata: Metadata = {
  title: "About Beth | Fine Line Tattoo Artist, Mornington",
  description:
    "Beth is a fine line tattoo artist on the Mornington Peninsula, working since 2017. Custom script a signature, and a private studio built to feel calm.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The artist"
        heading="Beth"
        intro="Fine line specialist, custom script a signature, and a studio deliberately built to feel like nothing you have to steel yourself for."
        image="/brand/photography/script-lettering/arm-garden.jpg"
        trail={[{ label: "About", href: "/about/" }]}
      />

      <Section ground="paper">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-20">
          <div>
            <TextScrub as="p" className="type-lead max-w-[46ch] text-maroon">
              I have been tattooing since 2017, and fine line is not a style I
              added to a menu. It is the reason I picked up a machine.
            </TextScrub>

            <div className="mt-10 flex max-w-[52ch] flex-col gap-5">
              <p className="type-body text-ink-70">
                Most people who sit in my chair are either getting their first
                piece or coming back after a bad experience somewhere loud. I
                built the studio around both. One client at a time, a door that
                closes, and as long as the piece needs.
              </p>
              <p className="type-body text-ink-70">
                Script is where I am happiest. A name, a date, a line worth
                carrying, drawn by hand until it sits right on the body rather
                than merely fitting on it.
              </p>
              <p className="type-body text-ink-70">
                I will tell you honestly if an idea will not work as fine line,
                or if somewhere on your body will not hold the detail you want.
                That conversation is worth more than the booking.
              </p>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-8 border-t rule-ink pt-8">
              <div>
                <dt className="type-label text-ink-50">Tattooing since</dt>
                <dd className="type-subhead mt-2 text-maroon">
                  <Counter to={2017} />
                </dd>
              </div>
              <div>
                <dt className="type-label text-ink-50">Specialism</dt>
                <dd className="type-subhead mt-2 text-maroon">Fine line</dd>
              </div>
              <div>
                <dt className="type-label text-ink-50">Studio</dt>
                <dd className="type-subhead mt-2 text-maroon">Private</dd>
              </div>
            </dl>
          </div>

          <ArchFrame rise="50%" className="bg-maroon-deep lg:justify-self-end">
            <Image
              src="/brand/photography/placeholder-05.jpg"
              alt="Beth at work"
              width={900}
              height={1200}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="aspect-3/4 w-full object-cover"
            />
          </ArchFrame>
        </div>
      </Section>

      <Section ground="ink" width="wide">
        <p className="type-label text-chilli">The studio</p>
        <h2 className="type-headline mt-4 max-w-[16ch]">
          Quiet on purpose
        </h2>

        <Reveal stagger={0.1} className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            "/brand/photography/small-micro/back-black-shirt.jpg",
            "/brand/photography/fine-line/back-red-knit.jpg",
            "/brand/photography/script-lettering/arm-garden.jpg",
          ].map((src, i) => (
            <RevealItem key={src}>
              <Parallax speed={0.1 + i * 0.04} className="aspect-3/4">
                <Image
                  src={src}
                  alt=""
                  width={720}
                  height={960}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-[116%] w-full object-cover"
                />
              </Parallax>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <Section ground="paper">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <ImageReveal from="left" className="aspect-4/3">
            <Image
              src="/brand/photography/fine-line/floral-arm.jpg"
              alt="Healed fine line work"
              width={900}
              height={675}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="h-full w-full object-cover"
            />
          </ImageReveal>
          <div>
            <p className="type-label text-chilli">Where to find me</p>
            <h2 className="type-headline mt-4 max-w-[12ch] text-maroon">
              {site.contact.location}
            </h2>
            <p className="type-body mt-6 max-w-[42ch] text-ink-70">
              The studio is private and by appointment, on the {site.contact.region}.
              Most clients are local; a good share come down from Melbourne.
              Exact address comes with your booking.
            </p>
          </div>
        </div>
      </Section>

      <BookingCta />
    </>
  );
}
