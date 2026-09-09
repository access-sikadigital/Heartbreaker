/**
 * Site navigation, taken from the Sitemap sheet of
 * "Heartbreaker Ink — Keyword Map & Sitemap" (Sika Digital, 4 Sep 2026).
 *
 * Only Tier 1 URLs appear in the primary nav. Tier 2 and 3 live in the footer
 * or get reached from their pillar page, so the header stays short enough to
 * read at a glance.
 */

export type NavLink = { label: string; href: string };

/** Primary header navigation. */
export const primaryNav: NavLink[] = [
  { label: "Fine line", href: "/fine-line-tattoos/" },
  { label: "Flash", href: "/flash/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Journal", href: "/journal/" },
  { label: "About", href: "/about/" },
];

export const primaryCta: NavLink = { label: "Book now", href: "/book/" };

/** Footer columns. Mirrors the sitemap so nothing gets orphaned. */
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Tattoos",
    links: [
      { label: "Fine line", href: "/fine-line-tattoos/" },
      { label: "Small & micro", href: "/fine-line-tattoos/small-tattoos/" },
      { label: "Script & lettering", href: "/fine-line-tattoos/script-lettering/" },
      { label: "Custom", href: "/fine-line-tattoos/custom-tattoos/" },
      { label: "Couples & matching", href: "/fine-line-tattoos/couples-matching/" },
      { label: "Flash days", href: "/flash/" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About Beth", href: "/about/" },
      { label: "Gallery", href: "/gallery/" },
      { label: "Reviews", href: "/reviews/" },
      { label: "Pricing", href: "/pricing/" },
      { label: "Aftercare", href: "/aftercare/" },
      { label: "FAQs", href: "/faqs/" },
    ],
  },
  {
    title: "Visit",
    links: [
      { label: "Mornington", href: "/fine-line-tattoo-mornington/" },
      { label: "Melbourne", href: "/fine-line-tattoo-melbourne/" },
      { label: "Frankston", href: "/fine-line-tattoo-frankston/" },
      { label: "Journal", href: "/journal/" },
      { label: "Gift vouchers", href: "/gift-vouchers/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy policy", href: "/privacy-policy/" },
  { label: "Terms", href: "/terms-and-conditions/" },
];
