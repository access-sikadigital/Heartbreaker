import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
/* PushThrough, TextScrub and the ink colour token all went with the
   scroll sequence this page used to open with. */
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { BookingCta } from "@/components/sections/BookingCta";
import { featured, mosaic } from "@/data/gallery";

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

      {/*
        The featured pieces, large and in normal flow.

        This was <PushThrough>: six absolutely stacked cards that scaled and
        crossfaded on scroll. With animation switched off the whole thing
        collapsed — every card and all six captions rendered at once, on top of
        each other. Its static fallback was written with Tailwind's
        `motion-reduce:` variants, which key off the operating system's
        setting and so never fired for the site's own switch.

        A large two-column grid says the same thing without depending on
        JavaScript to be legible: the work at a size you can judge a line by,
        with the caption under each piece rather than floating over it.
      */}
      <Section ground="ink" width="wide">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="type-label text-chilli">Selected work</p>
            <h2 className="type-headline mt-5 max-w-[16ch] text-offwhite">
              Close enough to judge a line by
            </h2>
          </div>
          <p className="type-body max-w-[34ch] text-paper-60">
            Healed pieces at full size. Fine line lives or dies on the line
            itself, so it is shown big enough to see one.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {featured.map((piece, i) => (
            <figure key={piece.src} className="group">
              {/*
                Landscape, not portrait. At two columns on a wide screen a 3:4
                tile is taller than the viewport: one photograph filled the
                whole window and the grid read as a slideshow. 4:3 roughly
                halves that, and 16:10 from lg keeps it in check as the columns
                get wider still.
              */}
              <div className="aspect-4/3 overflow-hidden bg-maroon-deep lg:aspect-16/10">
                <Image
                  src={piece.src}
                  alt={piece.title}
                  width={1200}
                  height={1600}
                  sizes="(max-width: 639px) 100vw, 50vw"
                  priority={i < 2}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-(--ease-brand) group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-5">
                <p className="type-subhead text-offwhite">{piece.title}</p>
                <p className="type-label mt-2 text-chilli">{piece.meta}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

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
