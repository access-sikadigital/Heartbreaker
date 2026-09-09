import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { HorizontalRail } from "@/components/motion/HorizontalRail";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { BookingCta } from "@/components/sections/BookingCta";
import { colors } from "@/lib/tokens";

/** Target: "fine line tattoos" — 2,900/mo, KD 32. */
export const metadata: Metadata = {
  title: "Fine Line Tattoo Gallery | Heartbreaker Ink, Mornington",
  description:
    "Healed fine line tattoo work from Heartbreaker Ink — script, botanical, small pieces and custom designs. Mornington Peninsula studio.",
  alternates: { canonical: "/gallery/" },
};

const rail = [
  "/brand/photography/fine-line/floral-arm.jpg",
  "/brand/photography/script-lettering/back-script.jpg",
  "/brand/photography/small-micro/heart-hands.jpg",
  "/brand/photography/fine-line/back-red-knit.jpg",
  "/brand/photography/script-lettering/arm-script.jpg",
  "/brand/photography/small-micro/rose-abdomen.jpg",
];

const grid = [
  "/brand/photography/fine-line/neck-crane.jpg",
  "/brand/photography/fine-line/bird-arm.jpg",
  "/brand/photography/script-lettering/hand-script.jpg",
  "/brand/photography/small-micro/legs-foliage.jpg",
  "/brand/photography/small-micro/urban-pair.jpg",
  "/brand/photography/fine-line/shoulder-circles.jpg",
  "/brand/photography/script-lettering/arm-garden.jpg",
  "/brand/photography/small-micro/back-black-shirt.jpg",
  "/brand/photography/fine-line/floral-arm.jpg",
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        heading="Fine line tattoos"
        intro="Healed work, shot as it lives on skin — not as it looked the day it was done. Everything here was drawn for the person wearing it."
        trail={[{ label: "Gallery", href: "/gallery/" }]}
      />

      {/* Sideways rail — the whole row travels as you scroll past it. */}
      <section
        data-ink-color={colors.offwhite}
        className="on-dark bg-ink py-16 text-offwhite lg:py-0"
      >
        <HorizontalRail>
          {rail.map((src, i) => (
            <figure
              key={src}
              className="w-[74vw] shrink-0 sm:w-[46vw] lg:w-[30vw]"
            >
              <div className="aspect-4/5 overflow-hidden bg-maroon-deep">
                <Image
                  src={src}
                  alt="Fine line tattoo by Heartbreaker Ink"
                  width={800}
                  height={1000}
                  priority={i < 2}
                  sizes="(max-width: 640px) 74vw, (max-width: 1024px) 46vw, 30vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </figure>
          ))}
        </HorizontalRail>
      </section>

      <Section ground="paper" width="wide">
        <Reveal stagger={0.06} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((src, i) => (
            <RevealItem key={src}>
              <ImageReveal
                from={i % 2 ? "top" : "bottom"}
                className={i % 5 === 0 ? "aspect-4/5" : "aspect-square"}
              >
                <Image
                  src={src}
                  alt="Fine line tattoo by Heartbreaker Ink"
                  width={800}
                  height={800}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover"
                />
              </ImageReveal>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <BookingCta />
    </>
  );
}
