/**
 * Heartbreaker Ink — design tokens, mirrored in TypeScript.
 *
 * `globals.css` is the single source of truth for anything the browser paints.
 * This file exists for the places CSS cannot reach: GSAP tweens, canvas and
 * WebGL, chart libraries, `<meta name="theme-color">`, and generated OG images.
 *
 * If you change a value here, change it in `globals.css` too. The token names
 * match one-to-one on purpose.
 */

/* --------------------------------------------------------------- colour -- */

/** The four brand colours. Nothing else is in this palette. */
export const colors = {
  maroon: "#570B0B",
  chilli: "#DE0202",
  offwhite: "#F2F1EE",
  ink: "#262626",
} as const;

/** Full specification, for anyone producing print or spec sheets. */
export const colorSpec = {
  maroon: {
    name: "Maroon",
    hex: "#570B0B",
    rgb: [87, 11, 11],
    cmyk: [0, 87, 87, 66],
    pms: "490 C",
    role: "Leads. Carries the most visual weight.",
  },
  chilli: {
    name: "Chilli",
    hex: "#DE0202",
    rgb: [222, 2, 2],
    cmyk: [7, 100, 100, 1],
    pms: "032 C",
    role: "Accent. One job per composition — it shouts.",
  },
  offwhite: {
    name: "Off-White",
    hex: "#F2F1EE",
    rgb: [242, 241, 238],
    cmyk: [0, 0, 2, 5],
    pms: "Warm Gray 1 C",
    role: "Breathing room. The light ground.",
  },
  ink: {
    name: "Ink",
    hex: "#262626",
    rgb: [38, 38, 38],
    cmyk: [0, 0, 0, 85],
    pms: "Black 7 C",
    role: "Type and fine detail. Not large fields.",
  },
} as const;

/**
 * CMYK separations carry slightly different hex values. This is a print
 * separation, NOT a palette change — pull from the CMYK asset folder rather
 * than converting an RGB file by hand.
 */
export const cmykVariants = {
  maroon: "#561112",
  chilli: "#DE0A14",
} as const;

/**
 * Approved ground/type pairings (Brand Identity p.13). Anything not listed
 * here has not been approved. Chilli-on-Maroon is deliberately low contrast —
 * display type only, never body copy.
 */
export const colorCombinations = [
  { ground: "maroon", type: "offwhite", accent: "chilli" },
  { ground: "chilli", type: "offwhite", accent: "ink" },
  { ground: "offwhite", type: "maroon", accent: "ink" },
  { ground: "offwhite", type: "chilli", accent: "ink" },
  { ground: "ink", type: "offwhite", accent: "chilli" },
] as const;

/* ----------------------------------------------------------- typography -- */

export const fonts = {
  /** Bold Money. Display only. One weight. */
  display: "var(--font-bold-money)",
  /** Lenia Mono. Everything else. One weight. */
  mono: "var(--font-lenia-mono)",
} as const;

/** Fluid sizes, as authored in `globals.css`. */
export const fontSize = {
  hero: "clamp(2.75rem, min(9vw, 13vh), 8.5rem)",
  display: "clamp(2.25rem, min(6vw, 10vh), 5.5rem)",
  h1: "clamp(2rem, 4.6vw, 4rem)",
  h2: "clamp(1.625rem, 3.2vw, 2.75rem)",
  h3: "clamp(1.25rem, 2vw, 1.75rem)",
  h4: "clamp(1.0625rem, 1.4vw, 1.25rem)",
  lead: "clamp(1.0625rem, 1.4vw, 1.375rem)",
  body: "clamp(0.9375rem, 1vw, 1.0625rem)",
  small: "0.875rem",
  label: "0.6875rem",
} as const;

export const leading = {
  display: 0.9,
  title: 1.08,
  subtitle: 1.35,
  body: 1.65,
  label: 1.4,
} as const;

/**
 * The guidelines specify 2% tracking at every level — display and body alike.
 * Bold Money has very tight sidebearings, so display type collides without it.
 * `display` is the single token to raise if headings still read too close.
 */
export const tracking = {
  brand: "0.02em",
  display: "0.02em",
  label: "0.14em",
} as const;

/**
 * The hierarchy from Brand Identity p.19.
 *
 * The source table says "Title Case" for headings, but every specimen on that
 * page and every mockup in the asset library is set in CAPS. The artwork wins:
 * caps at every level except body.
 */
export const typeScale = {
  hero: { font: "display", size: "hero", case: "upper" },
  headline: { font: "display", size: "h1", case: "upper" },
  headlineSm: { font: "mono", size: "h2", case: "upper" },
  subhead: { font: "mono", size: "h3", case: "upper" },
  body: { font: "mono", size: "body", case: "sentence" },
  button: { font: "mono", size: "small", case: "upper" },
  label: { font: "mono", size: "label", case: "upper" },
} as const;

/* --------------------------------------------------------------- motion -- */

/** Confident entrances, hard settles. This brand is not bouncy. */
export const easing = {
  brand: [0.22, 1, 0.36, 1],
  brandIn: [0.64, 0, 0.78, 0],
  expo: [0.16, 1, 0.3, 1],
  snap: [0.85, 0, 0.15, 1],
} as const;

export const easingCss = {
  brand: "cubic-bezier(0.22, 1, 0.36, 1)",
  brandIn: "cubic-bezier(0.64, 0, 0.78, 0)",
  expo: "cubic-bezier(0.16, 1, 0.3, 1)",
  snap: "cubic-bezier(0.85, 0, 0.15, 1)",
} as const;

/** Milliseconds in CSS, seconds for GSAP and Motion. */
export const duration = {
  fast: 240,
  base: 560,
  slow: 900,
  crawl: 1400,
} as const;

export const durationSec = {
  fast: 0.24,
  base: 0.56,
  slow: 0.9,
  crawl: 1.4,
} as const;

/* ------------------------------------------------------------ structure -- */

export const layout = {
  /** 1520px. Both containers match so every section aligns on one edge. */
  containerContent: "95rem",
  containerWide: "95rem",
  headerHeight: "4.5rem",
  tickerHeight: "2.25rem",
} as const;

/** Minimum reproduction sizes, in millimetres (Brand Identity p.9). */
export const logoMinSize = {
  primary: 3,
  fullStack1: 3,
  stacked: 2,
  brandmark: 1,
} as const;

/**
 * Clearspace, expressed as a fraction of the mark's own height.
 * Wordmark: one third. Brandmark and icons: one half.
 */
export const clearspace = {
  wordmark: 1 / 3,
  brandmark: 1 / 2,
} as const;

export type ColorToken = keyof typeof colors;
export type TypeRole = keyof typeof typeScale;
