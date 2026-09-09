import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * The site is not live yet, so everything is disallowed. Flip `LIVE` to true at
 * launch — and remember the `robots` block in `layout.tsx` has to change too,
 * or the meta tag will keep saying noindex whatever this file says.
 */
const LIVE = false;

export default function robots(): MetadataRoute.Robots {
  if (!LIVE) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/reference"] },
    sitemap: `https://${site.domain}/sitemap.xml`,
    host: `https://${site.domain}`,
  };
}
