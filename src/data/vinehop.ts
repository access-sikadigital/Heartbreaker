/**
 * Heartbreaker Ink × Vinehop 2026.
 *
 * Mirrors the GHL funnel page "Vinehop 2026 Booking Page"
 * (page.heartbreakerink.com/vinehop-2026-booking-page), section for section.
 * Copy is taken from that page; booking is the live GHL calendar group:
 *   · group "Vinehop 2026", id jF8Z05OZwyLFmdzYv0Dl, slug vinehop-2026-menu
 *   · every calendar open Saturday 21 November 2026, 11am to 6pm
 *
 * The older group "Heartbreaker Ink × Vinehop 2026" (uo471ZuKyJkDTWKp7iQH) is
 * switched off in GHL. Do not point anything at it.
 *
 * Images and video are served from the GHL media library (the funnel's own
 * folder) rather than copied into /public, so swapping one in GHL swaps it
 * here. next.config.ts allows the host for next/image.
 *
 * PRICES ARE DELIBERATELY ABSENT. The widget shows them; repeating them here
 * means two places to change and one of them eventually wrong.
 */

const media = (file: string) =>
  `https://assets.cdn.filesafe.space/R3qo0uUhGSXmwcu1vMxl/media/${file}`;

export const vinehop = {
  name: "Vinehop 2026",
  dateLabel: "Saturday 21 November",

  widgetUrl: "https://book.heartbreakerink.com/widget/group/jF8Z05OZwyLFmdzYv0Dl",
  funnelUrl: "https://page.heartbreakerink.com/vinehop-2026-booking-page",

  /**
   * GHL Reputation review widget for this location — the "Heartbreaker
   * Experience" block on the GHL page. Set to null to drop the section.
   */
  reviewsWidgetUrl:
    "https://reputationhub.site/reputation/widgets/review_widget/R3qo0uUhGSXmwcu1vMxl" as
      | string
      | null,

  spots: 50,

  images: {
    /** "Heartbreaker Ink x Vinehop 2026" co-brand lockup, 2000×580. */
    lockup: { src: media("6ae166db9c1511d5b916c5a5.png"), width: 2000, height: 580 },
    /** The stall at Vinehop 2025. Portrait; the page crops it wide. */
    hero: { src: media("6adc627d36aa4a07e896b2d6.jpg"), width: 1024, height: 1536 },
  },

  designs: [
    {
      label: "Flash",
      size: "up to 5cm",
      sheet: { src: media("6adc4f95d542268bb4f48a2d.png"), width: 1414, height: 2000 },
      onSkin: { src: media("6ae16f23d542268bb479f772.png"), width: 1254, height: 1254 },
    },
    {
      label: "Freckle",
      size: "up to 1cm",
      sheet: { src: media("6adc4f95736386d0dc96cd44.png"), width: 1414, height: 2000 },
      onSkin: { src: media("6ae16f389c1511d5b917aefe.png"), width: 1254, height: 1254 },
    },
  ],

  terms: [
    { title: "By appointment only", body: "No walk-ins available on the day." },
    { title: "Only 50 spots available", body: "First in, best dressed." },
    { title: "Placements", body: "Arms & legs only." },
  ],

  /** Last year's highlight reel, 16:9. */
  video: media("6adc61ced542268bb4f5e3d3.mp4"),
} as const;
