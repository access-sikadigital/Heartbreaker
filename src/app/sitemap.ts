import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { articles } from "@/data/journal";

/**
 * Sitemap, generated from the route data rather than hand-listed — a hand-kept
 * sitemap is always one page behind the site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  const now = new Date();

  const core = [
    { path: "/", priority: 1 },
    { path: "/fine-line-tattoos/", priority: 0.9 },
    { path: "/flash/", priority: 0.8 },
    { path: "/gallery/", priority: 0.8 },
    { path: "/aftercare/", priority: 0.8 },
    { path: "/studio-policy/", priority: 0.6 },
    { path: "/work-with-us/", priority: 0.5 },
    { path: "/pricing/", priority: 0.8 },
    { path: "/about/", priority: 0.7 },
    { path: "/journal/", priority: 0.7 },
    /* /book/ redirects to /contact/, so it must not be listed. A sitemap
       entry that 308s is a crawl-budget waste and a Search Console warning. */
    { path: "/contact/", priority: 0.9 },
    { path: "/gift-vouchers/", priority: 0.6 },
    { path: "/reviews/", priority: 0.6 },
    { path: "/faqs/", priority: 0.6 },
  ];

  return [
    ...core.map((c) => ({
      url: `${base}${c.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: c.priority,
    })),
    ...services.map((s) => ({
      url: `${base}/fine-line-tattoos/${s.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: s.tier === 1 ? 0.8 : 0.7,
    })),
    ...locations.map((l) => ({
      url: `${base}/${l.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: `${base}/journal/${a.slug}/`,
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
