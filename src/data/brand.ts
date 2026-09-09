/**
 * Heartbreaker Ink — brand asset registry.
 *
 * Generated from the files actually present in `public/brand`, so this list
 * cannot drift from what ships.
 */

export type IconSet = "functional" | "flash";

export type BrandIcon = {
  /** Filename stem in `public/brand/icons`. */
  slug: string;
  /** The name the brand guidelines give it. */
  label: string;
  /** What the drawing actually is. Often NOT what the label suggests. */
  depicts: string;
  set: IconSet;
};

/**
 * All eighteen icons.
 *
 * Heads up: the labels are FUNCTIONAL, not descriptive. "Bookings" is a
 * diamond, "Healed" is a rose, "Policy" is a leopard, "Events" is a pair of
 * dice. The brand also reuses them freely — the website mockup labels the rose
 * "Touch-ups" and the dice "Custom Tattoos". Pick by what reads right for the
 * message, not by the filename.
 */
export const icons: readonly BrandIcon[] = [
  { slug: "after-care", label: "After Care", depicts: "Anchor", set: "functional" },
  { slug: "bookings", label: "Bookings", depicts: "Faceted diamond", set: "functional" },
  { slug: "clients", label: "Clients", depicts: "Swallow", set: "functional" },
  { slug: "events", label: "Events", depicts: "Pair of dice", set: "functional" },
  { slug: "flash", label: "Flash", depicts: "Lightning bolt", set: "functional" },
  { slug: "gift-cards", label: "Gift Cards", depicts: "Ace of hearts", set: "functional" },
  { slug: "gun", label: "Gun", depicts: "Revolver", set: "flash" },
  { slug: "healed", label: "Healed", depicts: "Rose", set: "functional" },
  { slug: "horse-shoe", label: "Horse Shoe", depicts: "Studded horseshoe", set: "flash" },
  { slug: "moth", label: "Moth", depicts: "Winged moth", set: "flash" },
  { slug: "panther", label: "Panther", depicts: "Roaring panther head", set: "flash" },
  { slug: "policy", label: "Policy", depicts: "Seated leopard", set: "functional" },
  { slug: "reviews", label: "Reviews", depicts: "Envelope with heart", set: "functional" },
  { slug: "rock-n-roll", label: "Rock ‘N’ Roll", depicts: "Horns hand sign", set: "flash" },
  { slug: "scorpion", label: "Scorpion", depicts: "Scorpion", set: "flash" },
  { slug: "scull", label: "Scull", depicts: "Skull", set: "flash" },
  { slug: "snake", label: "Snake", depicts: "Coiled serpent", set: "flash" },
  { slug: "sun", label: "Sun", depicts: "Rayed sun", set: "flash" },
] as const;

export const functionalIcons = icons.filter((i) => i.set === "functional");
export const flashIcons = icons.filter((i) => i.set === "flash");

export function iconPath(slug: string) {
  return `/brand/icons/${slug}.svg`;
}

/* ------------------------------------------------------------------ logos -- */

export type Lockup = "primary" | "secondary" | "brandmark" | "full-stack-1" | "full-stack-2";
export type LogoColour = "maroon" | "chilli" | "offwhite" | "ink" | "black" | "white";

/**
 * Five lockups. The Brand Identity PDF shows four, but the asset library
 * splits Full Stack into two arrangements — five is correct.
 */
export const lockups: Record<Lockup, { label: string; use: string }> = {
  primary: {
    label: "Primary Logo",
    use: "Hero placements — site header, packaging, primary marketing.",
  },
  secondary: {
    label: "Secondary Logo",
    use: "Where the primary is too wide — square crops, tight layouts.",
  },
  brandmark: {
    label: "Brandmark",
    use: "Profile pictures, favicons, stamps, embroidery, small repeats.",
  },
  "full-stack-1": {
    label: "Full Stack 1",
    use: "Swallow above the wordmark. Vertical, centred compositions.",
  },
  "full-stack-2": {
    label: "Full Stack 2",
    use: "Stacked wordmark, swallow right. Compact — merch and signage.",
  },
};

/**
 * Path to a fixed-colour lockup.
 *
 * Omit `colour` to get the `currentColor` version, which is almost always what
 * you want in React — colour it with a Tailwind text utility instead.
 */
export function logoPath(lockup: Lockup, colour?: LogoColour) {
  return colour
    ? `/brand/logo/${lockup}-${colour}.svg`
    : `/brand/logo/${lockup}.svg`;
}

/**
 * Brandmark has two extra variants the other lockups do not: the default is
 * coloured line art on an off-white body, `-solid` is a solid bird with an
 * off-white halo.
 */
export const brandmarkVariants = [
  "maroon", "chilli", "ink",
  "maroon-solid", "chilli-solid", "ink-solid",
  "black", "white",
] as const;
