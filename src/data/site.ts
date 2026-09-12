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

    /**
     * Query for the Google Maps embed on /contact/.
     *
     * The STREET ADDRESS, not the business name. A name query depends on the
     * Google Business Profile existing and being verified; until it is, a name
     * query drops the pin somewhere unhelpful or shows nothing. Swap this to
     * the business name once the GBP is claimed, so the embed carries the
     * listing's reviews and hours with it.
     */
    mapQuery: "53-55 Barkly Street, Mornington, Victoria, Australia",

    /**
     * Photograph of the studio front, for the "finding us" section.
     *
     * NULL ON PURPOSE. There is no exterior shot in the asset library, and the
     * one image whose entire job is "this is the door you are looking for"
     * cannot be a stand-in from the portfolio. The section drops to a
     * full-width map until a real photo lands here.
     */
    exteriorPhoto: null as string | null,
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
   * Live booking widget. EVERY control on the site that reaches it reads its
   * label from here, so the wording is changed once and never hunted through
   * components. Two templates used to hardcode their own ("Book a session",
   * and a "Start an enquiry" that actually opened the booking widget); both
   * now read this value.
   *
   * "Book a tattoo", not "Book now". "Now" describes when the button is
   * pressed, which the reader already knows; "a tattoo" describes what they
   * end up with, and it is the only CTA on the site that leaves for an
   * external tool, so naming the outcome is worth the extra two words.
   */
  booking: {
    url: "https://book.heartbreakerink.com/widget/bookings/tattoo-app",
    label: "Book a tattoo",
  },

  /**
   * Square checkout for aftercare product, supplied by John on 12 Sep 2026.
   *
   * A direct checkout link, not a storefront: it opens straight into Square's
   * hosted payment page for one item. That is why nothing on the site prices
   * it or describes what is in the box. Square owns that page, so it stays the
   * single source for price, stock and postage, and this site never contradicts
   * it. If the item is ever renamed or retired the link dies loudly rather
   * than quietly selling the wrong thing.
   */
  shop: {
    aftercareUrl:
      "https://checkout.square.site/merchant/ML3TJGCSYJ8N9/checkout/SORHOCSKJYB3V372F7PN6DPS",
    aftercareLabel: "Buy aftercare",
  },

  /**
   * Voice, as evidenced in the artwork: short, flat and a little insolent for
   * display lines — "Cool girls with cute tatts", "Worth the forever" — then
   * sincere in long form. Keep both. The tension is the brand.
   */
  ticker: "Now booking",
} as const;

export type Site = typeof site;
