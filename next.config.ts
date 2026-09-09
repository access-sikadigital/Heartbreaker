import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

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
