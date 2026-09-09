import Image from "next/image";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { colors } from "@/lib/tokens";

type PageHeroProps = {
  eyebrow?: string;
  heading: string;
  intro?: string;
  trail?: Crumb[];
  image?: string;
  imageAlt?: string;
};

/**
 * Standard inner-page header.
 *
 * Every page below the homepage opens the same way, which is deliberate — the
 * homepage gets the full-bleed treatment, and consistency everywhere else means
 * a visitor always knows where the title, the trail and the first line of
 * explanation will be.
 */
export function PageHero({
  eyebrow,
  heading,
  intro,
  trail,
  image,
  imageAlt = "",
}: PageHeroProps) {
  return (
    <section
      data-ink-color={colors.offwhite}
      className="on-dark relative isolate overflow-hidden bg-maroon pt-(--header-h) text-offwhite"
    >
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover opacity-70"
          />
          {/*
            Two overlays, not one flat wash.

            The previous version knocked the photograph back to 30% AND laid a
            near-opaque gradient over it, which left the image as a faint
            texture doing nothing. Instead the scrim runs HORIZONTALLY — heavy
            on the left where the type sits, clearing to almost nothing on the
            right so the photograph is actually legible. The second, vertical
            layer only protects the very bottom edge.
          */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-maroon via-maroon/85 to-maroon/25"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-maroon/70 via-transparent to-maroon/40"
          />
        </>
      )}

      <div className="container-wide py-16 md:py-24">
        {trail && (
          <Reveal>
            <Breadcrumbs trail={trail} />
          </Reveal>
        )}

        {eyebrow && <p className="type-label mt-8 text-chilli">{eyebrow}</p>}

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
