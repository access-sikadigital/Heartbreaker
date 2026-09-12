import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PushThrough } from "@/components/motion/PushThrough";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { TextScrub } from "@/components/motion/TextScrub";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { BookingCta } from "@/components/sections/BookingCta";
import { featured, mosaic } from "@/data/gallery";
import { colors } from "@/lib/tokens";

/**
 * Target: "fine line tattoos" — 2,900/mo, KD 32.
 *
 * Two ways of looking, in the order people actually use them. The
 * push-through sequence is for someone deciding whether they like this
 * artist's hand: one piece at a time, big enough to judge a line by. The
 * mosaic underneath is for someone who has already decided and is hunting for
 * their own idea, where scanning beats savouring.
 *
 * The scope names the gallery as the single most persuasive element on any
 * page, which is why it gets the most expensive interaction on the site.
 */
export const metadata: Metadata = {
  title: "Fine Line Tattoo Gallery | Heartbreaker Ink, Mornington",
  description:
    "Healed fine line tattoo work from Heartbreaker Ink, script, botanical, small pieces and custom designs. Mornington Peninsula studio.",
  alternates: { canonical: "/gallery/" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        heading="Fine line tattoos"
        intro="Healed work, shot as it lives on skin, not as it looked the day it was done. Everything here was drawn for the person wearing it."
        image="/brand/photography/fine-line/neck-crane.jpg"
        trail={[{ label: "Gallery", href: "/gallery/" }]}
      />

      {/* A short pause before the sequence, so it starts deliberately rather
          than the hero running straight into a full-screen photograph. */}
      <section
        data-ink-color={colors.offwhite}
        className="on-dark bg-ink pt-20 text-offwhite md:pt-28"
      >
        <div className="container-wide flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="type-label text-chilli">Selected work</p>
            <TextScrub
              as="h2"
              className="type-headline mt-5 max-w-[16ch] text-offwhite"
            >
              Close enough to judge a line by
            </TextScrub>
          </div>
          <p className="type-body max-w-[34ch] text-paper-60">
            Keep scrolling. Each piece opens to full size before it passes,
            which is the only honest way to show fine line work on a screen.
          </p>
        </div>
      </section>

      <PushThrough items={featured} />

      <Section ground="paper" width="wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="type-label text-chilli">More work</p>
            <h2 className="type-headline mt-4 max-w-[14ch] text-maroon">
              Everything else
            </h2>
          </div>
          <p className="type-body max-w-[36ch] text-ink-70">
            Small pieces, script, and the quieter work that makes up most of a
            week in the studio.
          </p>
        </div>

        {/*
          Rhythm comes from the tile SHAPE, not from row spans.

          A first pass used `lg:row-span-2` with `auto-rows-[minmax(0,1fr)]`;
          neither reached the compiled stylesheet, and a row-span that silently
          does nothing is worse than not asking for one, because the layout
          quietly reverts to a contact sheet. Alternating portrait and square
          tiles breaks the grid up just as well and uses only ratios this
          codebase already proves out.

          Below 576px it is a single column: two columns of tattoo detail on a
          phone is too small to judge anything by.
        */}
        <Reveal
          stagger={0.06}
          className="mt-14 grid gap-4 xs:grid-cols-2 lg:grid-cols-3"
        >
          {mosaic.map((piece, i) => {
            const tall = i % 3 === 0;
            return (
              <RevealItem key={piece.src}>
                <figure className="group relative">
                  <ImageReveal
                    from={i % 2 ? "top" : "bottom"}
                    className={tall ? "aspect-3/4" : "aspect-square"}
                  >
                    <Image
                      src={piece.src}
                      alt={piece.title}
                      width={900}
                      height={1200}
                      sizes="(max-width: 575px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-(--ease-brand) group-hover:scale-[1.04]"
                    />
                  </ImageReveal>

                  {/*
                    The caption lives over the image and only appears on hover,
                    so the wall stays photography rather than photography plus
                    a paragraph. It is still in the DOM for screen readers, and
                    the alt text carries the same words.
                  */}
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/85 to-transparent p-5 opacity-0 transition-all duration-(--duration-base) ease-(--ease-brand) group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="type-label text-offwhite">{piece.title}</p>
                    <p className="type-label mt-1.5 text-chilli">{piece.meta}</p>
                  </figcaption>
                </figure>
              </RevealItem>
            );
          })}
        </Reveal>
      </Section>

      <BookingCta />
    </>
  );
}
