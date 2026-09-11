/**
 * Single source of truth for site-wide copy and details.
 *
 * Confirmed against "Heartbreaker Ink — Keyword Map & Sitemap" (Sika Digital,
 * 4 Sep 2026), which supersedes anything read off the brand mockups.
 *
 * Confirmed 11 Sep 2026 from the studio's own Instagram bio:
 *   · handle  @heartbreakerink_ (the trailing underscore is real)
 *   · artist  Beth Sikalias, @bethsikalias
 *   · street  Shop 5, 53-55 Barkly St, Mornington
 *
 * STILL UNCONFIRMED:
 *   · phone  the business card reads 0123 456 789, an obvious placeholder
 *   · email  the card shows beth@heartbreaker.com.au, a different domain
 *   · postcode, deliberately left out rather than guessed
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
    name: "Beth Sikalias",
    role: "Founder & Lead Artist",
    specialism: "Fine line, with custom script as a signature",
  },

  contact: {
    // UNCONFIRMED — placeholder on the business card.
    phone: "",
    // UNCONFIRMED — the card shows a different domain to the confirmed one.
    email: "",
    /**
     * Confirmed from the studio's own Instagram bio, 11 Sep 2026.
     * Postcode is NOT confirmed and is deliberately omitted rather than
     * guessed: a wrong postcode in LocalBusiness markup actively conflicts
     * with the Google Business Profile it is meant to corroborate.
     */
    street: "Shop 5, 53-55 Barkly St",
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
    /** Confirmed live account, 11 Sep 2026. The trailing underscore is real. */
    instagram: "https://instagram.com/heartbreakerink_",
    instagramHandle: "@heartbreakerink_",
    /** Beth's personal artist account, linked from the studio bio. */
    artistHandle: "@bethsikalias",
    linktree: "https://linktr.ee/heartbreakerink",
  },

  nav: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],

  /**
   * Live booking widget. Every "Book now" on the site points here, so changing
   * the tool later is a one-line edit rather than a hunt through components.
   */
  booking: {
    url: "https://book.heartbreakerink.com/widget/bookings/tattoo-app",
    label: "Book now",
  },

  /**
   * Voice, as evidenced in the artwork: short, flat and a little insolent for
   * display lines — "Cool girls with cute tatts", "Worth the forever" — then
   * sincere in long form. Keep both. The tension is the brand.
   */
  ticker: "Now booking",
} as const;

export type Site = typeof site;
