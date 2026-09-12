import Image from "next/image";
import { BreadcrumbSchema, type Crumb } from "@/components/ui/Breadcrumbs";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { colors } from "@/lib/tokens";

/**
 * Scrims, written as real CSS rather than gradient utilities.
 *
 * Tailwind can express a three-stop gradient, but not legibly, and the stop
 * POSITIONS are the whole point here: they are pinned to where the type
 * actually ends, not to round percentages. `color-mix` against the token keeps
 * this driven by --color-ink, so a palette change still flows through.
 *
 * INK, not maroon. A maroon scrim over a photograph of skin tints the whole
 * frame red, and since almost every hero image IS skin, every inner page came
 * out the same shade of red. Black leaves the photograph its own colour and
 * only takes away light.
 */
const ink = (pct: number) =>
  `color-mix(in oklab, var(--color-ink) ${pct}%, transparent)`;

/**
 * Wide. The heading is capped at 18ch and the intro at 52ch, which on a large
 * screen puts the last word of the longest line a little past 40% of the
 * frame. The scrim therefore holds near-solid to 40% and only then falls away,
 * so no type ever sits over an uncontrolled photograph.
 */
const scrimWide = `linear-gradient(to right, ${ink(92)} 0%, ${ink(86)} 28%, ${ink(
  70,
)} 45%, ${ink(32)} 70%, ${ink(10)} 100%)`;

/**
 * Narrow. Below lg the type runs the full width, so the scrim cannot clear the
 * right side without stranding words on the photograph. It still lightens, but
 * only from 90% to 60%.
 */
const scrimNarrow = `linear-gradient(to right, ${ink(90)} 0%, ${ink(80)} 55%, ${ink(
  60,
)} 100%)`;

/** Protects the transparent header's off-white links. */
const scrimTop = `linear-gradient(to bottom, ${ink(80)} 0%, ${ink(42)} 45%, ${ink(
  0,
)} 100%)`;

/**
 * Fallback background.
 *
 * Every hero gets a photograph, so `image` is optional only for convenience.
 * A hero with no image is a flat coloured panel, which is what the legal and
 * utility pages used to be; pages that have no obvious photograph of their own
 * land here rather than on a blank ground.
 */
const DEFAULT_IMAGE = "/brand/photography/fine-line/bird-arm.jpg";

type PageHeroProps = {
  eyebrow?: string;
  heading: string;
  intro?: string;
  /**
   * Still required, and still used: the visible trail is gone but the
   * BreadcrumbList markup it carried is not. See BreadcrumbSchema.
   */
  trail?: Crumb[];
  image?: string;
  imageAlt?: string;
};

/**
 * Standard inner-page header.
 *
 * Every page below the homepage opens the same way, which is deliberate — the
 * homepage gets the full-bleed treatment, and consistency everywhere else means
 * a visitor always knows where the title and the first line of explanation sit.
 */
export function PageHero({
  eyebrow,
  heading,
  intro,
  trail,
  image,
  imageAlt = "",
}: PageHeroProps) {
  const src = image ?? DEFAULT_IMAGE;

  return (
    <section
      data-ink-color={colors.offwhite}
      /*
        One height for every inner page.

        Left to its content, the hero was as tall as whatever it happened to
        contain: a one-line heading with no intro gave a shallow band, a
        three-line heading with a long intro gave a deep one, and moving
        between pages the header appeared to jump. A single min-height with the
        block centred in it means the masthead lands in the same place on every
        page, whatever the copy does.

        Driven by viewport WIDTH, not height. A vh-based value looked right at
        900px tall and then fell below the content on a shorter window, at
        which point the longest pages grew past it and the heights diverged
        again. Width also tracks the thing that actually decides the content
        height, which is how far the text has to wrap.

        The 32rem floor is the measured worst case plus headroom: the tallest
        hero copy on the site (flash) runs 369px at 375px wide and 388px at
        1440px, and the section adds the 72px header offset on top.
      */
      style={{ minHeight: "clamp(32rem, 36vw, 36rem)" }}
      className="on-dark relative isolate flex items-center overflow-hidden bg-ink pt-(--header-h) text-offwhite"
    >
      {/*
        Full opacity, deliberately.

        An earlier version set the photograph to 70% over a coloured ground AND
        laid a second full-width wash on top. Both tinted the entire frame, so
        every inner-page hero read as a flat panel with a texture behind it
        rather than a photograph. The photo plays at full strength and ONLY the
        scrims below control it.
      */}
      <Image
        src={src}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />

      {/*
        Below lg the type runs the full width of the frame, so the scrim has to
        as well. It still falls off to the right, just far less.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 lg:hidden"
        style={{ backgroundImage: scrimNarrow }}
      />

      {/*
        From lg the type occupies the left half and the right half is free to be
        the photograph. Heavy under the words, nearly clear by the right edge.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden lg:block"
        style={{ backgroundImage: scrimWide }}
      />

      {/*
        The header sits transparent over this hero with off-white links.
        Clearing the right side means those links can land on a bright
        photograph, so this strip keeps the top band dark enough to read
        against. Sized in pixels rather than a percentage because what it
        protects is a fixed 72px bar, not a share of the hero.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-40"
        style={{ backgroundImage: scrimTop }}
      />

      {/*
        The visible breadcrumb is gone at the client's request, so the block
        starts higher: py-12/py-16 rather than py-16/py-24, and the eyebrow no
        longer needs the mt-8 that was clearing the trail above it.

        The schema stays. It is invisible either way, and the service tree runs
        three levels deep, so it is the half that was doing the SEO work.
      */}
      {trail && <BreadcrumbSchema trail={trail} />}

      {/* w-full: as a flex item the container would otherwise shrink to its
          content and stop centring on the page's own measure. */}
      <div className="container-wide w-full py-12 md:py-16">
        {eyebrow && <p className="type-label text-chilli">{eyebrow}</p>}

        <SplitLines as="h1" className="type-headline mt-5 max-w-[18ch]" immediate>
          {heading}
        </SplitLines>

        {intro && (
          <Reveal delay={0.25}>
            <p className="type-lead mt-7 max-w-[52ch] text-paper-80">{intro}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
