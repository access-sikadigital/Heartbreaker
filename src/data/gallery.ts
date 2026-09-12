/**
 * Gallery contents.
 *
 * Split into two sets on purpose. `featured` runs through the push-through
 * sequence, which gives each piece a full screen and roughly a screen-height of
 * scroll, so six is the ceiling before the page becomes a chore to get past.
 * Everything else lives in the mosaic underneath, where it can be scanned.
 *
 * Captions describe the WORK, not the photograph: style and placement are what
 * a visitor is trying to judge when they are deciding whether their idea suits
 * this artist. Replace these with the real piece details when the studio's own
 * photography lands.
 */

export type GalleryPiece = {
  src: string;
  /** Used as the alt text as well as the on-screen caption. */
  title: string;
  /** Style and placement, shown small under the title. */
  meta: string;
};

export const featured: GalleryPiece[] = [
  {
    src: "/brand/photography/fine-line/floral-arm.jpg",
    title: "Botanical trail",
    meta: "Fine line · forearm",
  },
  {
    src: "/brand/photography/script-lettering/back-script.jpg",
    title: "Custom script",
    meta: "Hand-drawn lettering · upper back",
  },
  {
    src: "/brand/photography/fine-line/neck-crane.jpg",
    title: "Paper crane",
    meta: "Single needle · behind the ear",
  },
  {
    src: "/brand/photography/small-micro/heart-hands.jpg",
    title: "Matching pair",
    meta: "Micro · hands",
  },
  {
    src: "/brand/photography/fine-line/back-red-knit.jpg",
    title: "Spine piece",
    meta: "Fine line · centre back",
  },
  {
    src: "/brand/photography/script-lettering/arm-script.jpg",
    title: "A line worth carrying",
    meta: "Script · inner arm",
  },
];

export const mosaic: GalleryPiece[] = [
  {
    src: "/brand/photography/fine-line/bird-arm.jpg",
    title: "Swallow",
    meta: "Fine line · upper arm",
  },
  {
    src: "/brand/photography/script-lettering/hand-script.jpg",
    title: "Single word",
    meta: "Script · hand",
  },
  {
    src: "/brand/photography/small-micro/legs-foliage.jpg",
    title: "Foliage",
    meta: "Fine line · calf",
  },
  {
    src: "/brand/photography/small-micro/urban-pair.jpg",
    title: "Two small pieces",
    meta: "Micro · forearm",
  },
  {
    src: "/brand/photography/fine-line/shoulder-circles.jpg",
    title: "Concentric sun",
    meta: "Fine line · shoulder",
  },
  {
    src: "/brand/photography/script-lettering/arm-garden.jpg",
    title: "Garden sleeve start",
    meta: "Fine line · forearm",
  },
  {
    src: "/brand/photography/small-micro/back-black-shirt.jpg",
    title: "Nape piece",
    meta: "Micro · nape",
  },
  {
    src: "/brand/photography/small-micro/rose-abdomen.jpg",
    title: "Single rose",
    meta: "Fine line · ribs",
  },
  /*
    From the brand folder's image set, which is a mood board rather than a
    photo library: most of it is blurred fashion reference with no tattoo in
    frame, and one file has Instagram's carousel badge burnt into the corner.
    These two survived the audit — real fine line work, clean, no interface
    artefacts.
  */
  {
    src: "/brand/photography/placeholder-09.jpg",
    title: "Blessed",
    meta: "Script · foot",
  },
  {
    src: "/brand/photography/placeholder-13.jpg",
    title: "Muse",
    meta: "Script · shoulder",
  },
];
