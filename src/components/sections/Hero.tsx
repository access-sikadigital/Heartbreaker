"use client";

import Image from "next/image";
/* next/link went with the "See the work" secondary link. */
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { SplitLines } from "@/components/motion/SplitLines";
import { CtaLink } from "@/components/ui/CtaLink";
import { primaryCta } from "@/data/navigation";
import { site } from "@/data/site";
import { colors } from "@/lib/tokens";

/**
 * Homepage hero.
 *
 * Layered rather than flat: a blurred portrait behind, the lockup and promise
 * in front. The two layers are scrubbed at different rates, so the hero comes
 * apart as you leave it instead of simply scrolling away — the depth is what
 * stops it reading as a static banner.
 *
 * An arch-framed photograph used to sit beside the type on lg and up. It was
 * removed at the client's request; the grid, its parallax tween and the
 * ArchFrame import went with it rather than being left behind as dead weight.
 * ArchFrame itself is still used elsewhere.
 */
export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const scrub = (selector: string, vars: gsap.TweenVars, from: gsap.TweenVars) =>
        gsap.fromTo(root.querySelectorAll(selector), from, {
          ...vars,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

      // Background settles back and drifts down — slowest layer.
      scrub("[data-hero-bg]", { scale: 1, yPercent: 12 }, { scale: 1.14, yPercent: 0 });
      // Content leaves faster than the ground behind it.
      scrub("[data-hero-content]", { yPercent: -18, opacity: 0.15 }, { yPercent: 0, opacity: 1 });
    },
    { scope },
  );

  /*
    The section is justify-center, not justify-end.

    Bottom-aligned, the block sat in the last third of the frame under a large
    empty field, which read as the content having fallen rather than been
    placed. Centred, with the header padding above and the section padding
    below, it lands just above optical centre, which is where a hero wants it.
  */
  return (
    <section
      ref={scope}
      data-ink-color={colors.offwhite}
      className="on-dark relative isolate flex min-h-svh flex-col overflow-hidden bg-ink pt-(--header-h) text-offwhite"
    >
      {/*
        objectPosition 50% 45% centres the HEAD, not the image.

        THE WHOLE FACE CANNOT FIT, and no value here will make it. The source
        is 1600x2000 and the hero is roughly 1920x870, so object-cover scales
        the image to 1920 wide (2400 tall) and only 870 of those 2400 pixels
        survive: about 36% of the picture. The head runs from the top of the
        hair to the chin across roughly 58% of it. 58 does not go into 36.

        45% is the value that puts the middle of the head in the middle of the
        band, which is the best available compromise. Showing the face whole
        needs one of two real changes, not a tweak here:

          1. A landscape-framed photograph, where the head occupies less of the
             frame height.
          2. Stop full-bleeding this one: constrain it to the hero's height as
             a centred portrait column with the ink ground either side. The
             whole face shows, but the section stops being a full-width image.
      */}
      <div data-hero-bg className="absolute inset-0 -z-20 will-change-transform">
        <Image
          src="/brand/photography/placeholder-18.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: "50% 45%" }}
          className="object-cover opacity-85"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/70"
      />

      {/*
        Single column since the arch came out. The two-column split and its
        1.35/0.65 ratio only existed to seat that image beside the type.

        `flex-1` is what moves the studio/scroll bar to the bottom of the hero.
        The section used to be `justify-center`, which centred the content and
        the bar TOGETHER as one group and left a band of empty frame beneath
        them. Letting this block absorb the free space instead pins the bar to
        the bottom edge while the type stays optically centred above it.
      */}
      <div className="container-wide flex flex-1 items-center pb-14 md:pb-20">
        <div data-hero-content className="w-full text-center">
          {/*
            The brandmark and the oversized wordmark have both been removed.

            The header already carries the wordmark at the top of every page,
            including this one, so the hero was showing the studio's name twice
            within 200px of itself. The sentence below is now the first thing
            read, which is the thing that actually says what the studio does.
          */}

          {/*
            30ch, not 20ch: the sentence is 52 characters, so a 20ch measure
            broke it over three lines with a two-word orphan at the end. At
            30ch it sets in two even lines.

            leading-tight (1.25) overrides the 0.9 display leading the type
            role carries. That value is tuned for Bold Money at display sizes;
            on mono caps at 32px it closed the lines up until the sentence read
            as a solid block.
          */}
          {/*
            Lenia Mono ships in ONE weight, so there is no bolder cut to load.

            `-webkit-text-stroke` thickens the existing letterforms instead of
            faking a second weight by smearing them: the stroke is painted in
            the same colour as the fill, so it reads as a heavier version of
            the face the brand actually owns. `paint-order: stroke fill` puts
            the stroke UNDER the fill, which keeps the counters (the holes in
            A, O, R) from closing up as it thickens.

            Set in `em`, so the weight scales with the size rather than looking
            heavy on a phone and hairline on a display.
          */}
          <SplitLines
            as="h1"
            className="type-headline-sm mx-auto mt-9 max-w-[24ch] leading-tight"
            style={{
              fontSize: "clamp(2.25rem, 5.4vw, 5.5rem)",
              WebkitTextStroke: "0.022em currentColor",
              paintOrder: "stroke fill",
            }}
            immediate
          >
            A fine line tattoo studio on the Mornington Peninsula
          </SplitLines>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            {/*
              The hero button, and only the hero button, is set in Bold Money.

              An inline style rather than a class on purpose: `type-button`
              already declares the mono family, and both it and a `font-display`
              utility live in the same cascade layer, so which one won would
              depend on the order Tailwind happened to emit them in. A style
              attribute is unambiguous and cannot be reordered out from under
              this. Every other button on the site stays mono.

              The size rides with it for the same reason. Bold Money is an
              extended display face carrying a lot of weight per character, and
              at the 14px `type-button` size it read as cramped rather than
              confident. The clamp keeps it from crowding the CTA row on a
              phone while letting it stand up at desktop width.
            */}
            <CtaLink href={primaryCta.href}
              style={{
                fontFamily: "var(--font-display)",
                /* Floor 20px, not 17px. At 1.5vw the old clamp sat on its
                   floor at every normal laptop width, so a 14px button became
                   17px and the change read as nothing happening. */
                fontSize: "clamp(1.25rem, 1.9vw, 1.75rem)",
              }}
              className="type-button btn-fill inline-flex items-center px-8 py-4"
            >
              {primaryCta.label}
            </CtaLink>
          </div>
        </div>

      </div>

      <div className="container-wide flex items-center justify-between border-t border-paper-20 py-5">
        <p className="type-label text-paper-60">
          {site.contact.location} &middot; by appointment
        </p>
        <p className="type-label hidden text-paper-60 sm:block">
          Scroll <span aria-hidden="true">&#8600;</span>
        </p>
      </div>
    </section>
  );
}
