/**
 * Heartbreaker Ink × Vinehop 2026.
 *
 * Everything here is read off the live GoHighLevel setup (location "Heartbreaker
 * Ink"), 28 Oct 2026, so the page never says something the booking widget
 * contradicts:
 *   · calendar group "Vinehop 2026", id jF8Z05OZwyLFmdzYv0Dl, slug
 *     vinehop-2026-menu: the active group, five service calendars
 *   · every calendar is open Saturday 21 November 2026, 11am to 6pm
 *
 * The older group "Heartbreaker Ink × Vinehop 2026" (uo471ZuKyJkDTWKp7iQH) is
 * switched off in GHL. Do not point anything at it.
 *
 * PRICES ARE DELIBERATELY ABSENT. The active calendars charge through GHL, and
 * the widget shows the price on each option. Repeating it here means two places
 * to change and one of them eventually wrong.
 */

export const vinehop = {
  name: "Vinehop 2026",
  date: "2026-11-21",
  dateLabel: "Saturday 21 November",
  hoursLabel: "11am to 6pm",

  /**
   * The GHL calendar group widget, on the same custom domain as the main
   * booking calendar so the visitor never sees a leadconnector URL.
   */
  widgetUrl: "https://book.heartbreakerink.com/widget/group/jF8Z05OZwyLFmdzYv0Dl",

  /** The GHL funnel page this replaces. Kept as the fallback link. */
  funnelUrl: "https://page.heartbreakerink.com/vinehop-2026-booking-page",

  /** Same order and wording as the calendars in the widget. */
  options: [
    {
      name: "Flash tattoo × 1",
      detail: "One fine line design from the Vinehop flash sheet, up to 5cm.",
      time: "20 mins",
    },
    {
      name: "Flash tattoo × 2",
      detail: "Two designs from the flash sheet, each up to 5cm. Two different pieces, or the same one twice.",
      time: "40 mins",
    },
    {
      name: "Flash + freckle",
      detail: "One flash design up to 5cm, plus one freckle tattoo up to 1cm.",
      time: "30 mins",
    },
    {
      name: "Freckle tattoo × 1",
      detail: "One tiny tattoo up to 1cm, like a small heart, star or sparkle.",
      time: "20 mins",
    },
    {
      name: "Freckle tattoo × 2",
      detail: "Two freckle tattoos, each up to 1cm. Together or spread out.",
      time: "30 mins",
    },
  ],

  rules: [
    "Pre-booking only. Limited spots, first in, best dressed.",
    "Pay in full when you book to secure your slot.",
    "Arms and legs only.",
    "You must be 18+ and show photo ID on the day.",
    "If you're not there at your booking time, you lose your slot and your payment isn't refunded.",
  ],
} as const;
