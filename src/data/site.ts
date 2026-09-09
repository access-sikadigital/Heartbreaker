/**
 * Single source of truth for site-wide copy and details.
 *
 * Confirmed against "Heartbreaker Ink — Keyword Map & Sitemap" (Sika Digital,
 * 4 Sep 2026), which supersedes anything read off the brand mockups.
 *
 * STILL UNCONFIRMED:
 *   · handle — @heartbreakerink_ on most artwork, @heartbreakerink on the card
 *   · phone  — the business card reads 0123 456 789, an obvious placeholder
 *   · email  — the card shows beth@heartbreaker.com.au, a different domain
 */

export const site = {
  name: "Heartbreaker Ink",
  shortName: "Heartbreaker",

  // Confirmed by the scope doc. NOT the .com.au the mockups suggested.
  domain: "heartbreakerink.com",

  tagline: "Fine line tattoos",
  description:
    "Heartbreaker Ink is a fine line tattoo studio rooted in intention, authenticity, and care, dedicated to creating timeless pieces that celebrate individuality through refined detail and thoughtful design.",

  locale: "en-AU",

  founder: {
    name: "Beth",
    role: "Founder & Lead Artist",
    specialism: "Fine line, with custom script as a signature",
  },

  contact: {
    // UNCONFIRMED — placeholder on the business card.
    phone: "",
    // UNCONFIRMED — the card shows a different domain to the confirmed one.
    email: "",
    /** Confirmed: Mornington. The "Lorne" on a mockup was placeholder copy. */
    location: "Mornington, Victoria",
    region: "Mornington Peninsula",
  },

  /**
   * Search strategy is Peninsula-first for local dominance, Melbourne for
   * category reach. Suburb terms carry almost no volume — local ranking comes
   * from Google Business Profile, not from the page names.
   */
  serviceAreas: ["Mornington", "Mornington Peninsula", "Frankston", "Melbourne"],

  social: {
    // UNCONFIRMED — trailing underscore is inconsistent across the artwork.
    instagram: "https://instagram.com/heartbreakerink_",
    instagramHandle: "@heartbreakerink_",
  },

  nav: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],

  cta: { label: "Book now", href: "/contact" },

  /**
   * Voice, as evidenced in the artwork: short, flat and a little insolent for
   * display lines — "Cool girls with cute tatts", "Worth the forever" — then
   * sincere in long form. Keep both. The tension is the brand.
   */
  ticker: "Now booking",
} as const;

export type Site = typeof site;
