import { StickyCollage, type CollageImage } from "@/components/motion/StickyCollage";
import { colors } from "@/lib/tokens";

/**
 * Portfolio teaser.
 *
 * At rest the work tiles the frame as a packed grid with even gutters. On
 * scroll the centre piece opens to the full width and height of the viewport
 * while the other four clear the frame in the direction they already lean.
 *
 * Rects are percentages, laid out so nothing overlaps and every gutter is ~2%.
 * The `sizes` on the centre piece is 100vw because that is what it ends up at
 * — sizing it for its resting box would serve a small source that the browser
 * then upscales at exactly the moment it fills the screen.
 */
const tiles: CollageImage[] = [
  {
    // Top left, wide.
    src: "/brand/photography/fine-line/shoulder-circles.jpg",
    alt: "Concentric line work tattooed on a shoulder",
    rect: { x: 1.5, y: 2, w: 62, h: 29 },
    travel: { y: -70 },
    sizes: "65vw",
    width: 1200,
    height: 620,
    priority: true,
  },
  {
    // Top right.
    src: "/brand/photography/script-lettering/hand-script.jpg",
    alt: "Fine line script along the inside of a forearm",
    rect: { x: 65, y: 14, w: 33.5, h: 33 },
    travel: { x: 70 },
    sizes: "36vw",
    width: 700,
    height: 700,
  },
  {
    // Centre — the piece that opens to fill the frame.
    src: "/brand/photography/small-micro/rose-abdomen.jpg",
    alt: "Fine line rose tattooed on the abdomen",
    rect: { x: 33.5, y: 33, w: 30, h: 32 },
    fill: true,
    sizes: "100vw",
    width: 1920,
    height: 1280,
    priority: true,
  },
  {
    // Left, tall.
    src: "/brand/photography/fine-line/bird-arm.jpg",
    alt: "Small fine line bird tattooed on an upper arm",
    rect: { x: 1.5, y: 33, w: 30, h: 55 },
    travel: { x: -70 },
    sizes: "32vw",
    width: 700,
    height: 1250,
  },
  {
    // Bottom, wide.
    src: "/brand/photography/script-lettering/arm-garden.jpg",
    alt: "Script tattoo on a forearm, photographed in a garden",
    rect: { x: 33.5, y: 67, w: 65, h: 31 },
    travel: { y: 70 },
    sizes: "68vw",
    width: 1200,
    height: 620,
  },
];

export function GalleryTeaser() {
  return (
    <section
      id="gallery"
      data-ink-color={colors.offwhite}
      className="on-dark relative bg-ink text-offwhite"
    >
      <StickyCollage
        images={tiles}
        cta={{ label: "View the portfolio", href: "/gallery/" }}
      >
        <p className="type-label text-chilli">Selected work</p>
        <h2 className="type-display max-w-[10ch] text-offwhite">Our tattoos</h2>
        <p className="type-body mx-auto max-w-[36ch] text-paper-80">
          Healed pieces, shot as they live on skin — not as they looked the day
          they were done.
        </p>
      </StickyCollage>
    </section>
  );
}
