import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * Serve URLs WITH a trailing slash.
   *
   * Every canonical tag on the site and every entry in the sitemap is written
   * with one ("/gallery/", "/contact/"), but Next's default is to strip it, so
   * each of those URLs answered with a 308 to the slashless form. The site was
   * telling search engines to index an address that immediately redirects,
   * which wastes crawl budget and splits the signal between two URLs for the
   * same page.
   *
   * Aligning the server with what the pages already declare is the smaller of
   * the two possible fixes; the alternative is rewriting every canonical and
   * the sitemap generator.
   */
  trailingSlash: true,

  // The brand ships flat art and photography. AVIF first, WebP as the
  // fallback — both are markedly smaller than the source JPEGs.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [400, 640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [128, 200, 256, 384],

    // Every logo and icon on the site is an SVG, and the image optimiser
    // rejects SVG with a 400 unless this is set — which renders them as broken
    // images rather than throwing anything. Safe here because the only SVGs
    // served are the brand files in /public; the CSP below neuters scripting
    // inside them regardless, and nothing user-supplied ever takes this path.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Brand SVGs are ours and are served from /public, so they are safe to
  // inline. Anything user-supplied must never take this path.
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  /**
   * /book/ was a second enquiry page carrying the same form as /contact/.
   * Once "Book now" started going straight to the live booking widget it had
   * no inbound links left, and two pages competing on the same enquiry intent
   * split whatever authority either would have had. Its useful content (the
   * four-step "how booking works" explainer) moved to /contact/.
   *
   * Permanent, not temporary: the URL is not coming back, and a 308 is what
   * passes ranking signals on to the destination.
   */
  async redirects() {
    return [{ source: "/book", destination: "/contact/", permanent: true }];
  },

  /**
   * /vinehop/ IS the GHL funnel page, served from this domain.
   *
   * Vercel fetches page.heartbreakerink.com/vinehop-2026-booking-page and
   * returns it at /vinehop/, so visitors stay on the main site's address but
   * get the exact page built in GHL: same layout, same booking calendar, same
   * payment flow. Edit the page in GHL and this updates with it.
   *
   * A rebuilt copy was tried first and was slower, drifted from the original
   * and fought the site's smooth scrolling. Proxying avoids all three.
   *
   * The page's canonical tag still names the GHL address, which is correct:
   * there is one page, so search engines should index one URL. Remove this
   * after the event (21 Nov 2026).
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/vinehop/",
          destination: "https://page.heartbreakerink.com/vinehop-2026-booking-page",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  async headers() {
    return [
      {
        // Fonts and brand art never change without a filename change.
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
