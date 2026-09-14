import Image from "next/image";
import Link from "next/link";
import { colors } from "@/lib/tokens";

/**
 * Portfolio teaser.
 *
 * A plain grid. This used to be <StickyCollage>: five absolutely positioned
 * tiles that scattered and reconverged on scroll, with the centre piece opening
 * to fill the viewport.
 *
 * It was removed because absolute positioning in percentages only holds while
 * the container keeps roughly the proportions it was designed against. On a
 * 400px-wide phone the tiles landed on top of each other and spilled past the
 * section edge — the layout had no way to reflow, because none of it was in
 * normal flow. A grid cannot overlap: the browser does the packing, and the
 * same markup works at 375px and 1920px without a single hand-placed rect.
 *
 * Kept: the images, the order, and the varied tile shapes that gave the
 * original its rhythm. Lost: the scroll choreography, deliberately.
 */
const tiles = [
  {
    src: "/brand/photography/fine-line/shoulder-circles.jpg",
    alt: "Concentric line work tattooed on a shoulder",
    /* Wide tile: two columns from sm up. */
    span: "sm:col-span-2",
    aspect: "aspect-16/10",
    sizes: "(max-width: 639px) 100vw, 66vw",
    priority: true,
  },
  {
    src: "/brand/photography/script-lettering/hand-script.jpg",
    alt: "Fine line script along the inside of a forearm",
    span: "",
    aspect: "aspect-square",
    sizes: "(max-width: 639px) 100vw, 33vw",
  },
  {
    src: "/brand/photography/small-micro/rose-abdomen.jpg",
    alt: "Fine line rose tattooed on the abdomen",
    span: "",
    aspect: "aspect-3/4",
    sizes: "(max-width: 639px) 100vw, 33vw",
    priority: true,
  },
  {
    src: "/brand/photography/fine-line/bird-arm.jpg",
    alt: "Small fine line bird tattooed on an upper arm",
    span: "",
    aspect: "aspect-3/4",
    sizes: "(max-width: 639px) 100vw, 33vw",
  },
  {
    src: "/brand/photography/script-lettering/arm-garden.jpg",
    alt: "Script tattoo on a forearm, photographed in a garden",
    span: "",
    aspect: "aspect-3/4",
    sizes: "(max-width: 639px) 100vw, 33vw",
  },
];

export function GalleryTeaser() {
  return (
    <section
      id="gallery"
      data-ink-color={colors.offwhite}
      className="on-dark relative bg-ink py-20 text-offwhite md:py-28"
    >
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="type-label text-chilli">Selected work</p>
            <h2 className="type-display mt-4 max-w-[10ch] text-offwhite">
              Our tattoos
            </h2>
          </div>
          <p className="type-body max-w-[36ch] text-paper-60">
            Healed pieces, shot as they live on skin, not as they looked the day
            they were done.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {tiles.map((tile) => (
            <figure
              key={tile.src}
              className={`group overflow-hidden bg-maroon-deep ${tile.span} ${tile.aspect}`}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                width={1200}
                height={1200}
                sizes={tile.sizes}
                priority={tile.priority}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-(--ease-brand) group-hover:scale-[1.04]"
              />
            </figure>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/gallery/"
            className="type-button inline-flex items-center gap-3 border border-offwhite px-8 py-4 transition-colors duration-(--duration-fast) hover:bg-offwhite hover:text-ink"
          >
            View the portfolio
            <span aria-hidden="true">&#8599;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
