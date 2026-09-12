/**
 * Site navigation, taken from the Sitemap sheet of
 * "Heartbreaker Ink — Keyword Map & Sitemap" (Sika Digital, 4 Sep 2026).
 *
 * Only Tier 1 URLs appear in the primary nav. Tier 2 and 3 live in the footer
 * or get reached from their pillar page, so the header stays short enough to
 * read at a glance.
 */

import { site } from "@/data/site";

export type NavLink = { label: string; href: string; external?: boolean };

/** Primary header navigation. */
export const primaryNav: NavLink[] = [
  { label: "Fine line", href: "/fine-line-tattoos/" },
  { label: "Flash", href: "/flash/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Journal", href: "/journal/" },
  { label: "About", href: "/about/" },
  { label: "Aftercare", href: "/aftercare/" },
  /* Aimed at artists, not clients. It sits in the nav because an artist
     looking for a chair will not think to dig through a footer, and it is the
     only page on the site with an audience other than customers. */
  { label: "Work with us", href: "/work-with-us/" },
];

/**
 * The primary call to action goes straight to the live booking widget, which
 * lives on a different host. `external` tells CtaLink to render a plain anchor
 * rather than a client-routed Link.
 */
export const primaryCta: NavLink = {
  label: site.booking.label,
  href: site.booking.url,
  external: true,
};

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
      { label: "Reviews", href: "/reviews/" },
      { label: "Pricing", href: "/pricing/" },
      { label: "Aftercare", href: "/aftercare/" },
      { label: "Studio policy", href: "/studio-policy/" },
      { label: "FAQs", href: "/faqs/" },
      { label: "Work with us", href: "/work-with-us/" },
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
