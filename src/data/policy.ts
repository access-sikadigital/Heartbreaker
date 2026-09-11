/**
 * Studio policy and aftercare, in the studio's own words.
 *
 * SOURCE: the pinned "POLICY" and "AFTER CARE" Instagram story highlights on
 * @heartbreakerink_, supplied by John on 11 Sep 2026. This is the studio's
 * actual published policy, so it OVERRIDES anything written for the site
 * before it. Where earlier site copy softened a rule ("give as much notice as
 * you can"), the rule below is what the client already tells customers, and a
 * website that contradicts it is a liability rather than a nicety.
 *
 * Wording is verbatim apart from two things:
 *   1. Em dashes are replaced, per the site-wide rule.
 *   2. "Take a photo!" from the top of the aftercare card is dropped. In a
 *      story it means "screenshot this"; on a page it means nothing.
 *
 * `strong` lists the phrases the studio underlined in the artwork, so the page
 * carries the same stress the card does. Each entry must appear verbatim in
 * its own `text` or it renders as ordinary copy.
 *
 * CHANGE THESE ONLY FROM THE STUDIO. Do not reword, round a figure, or add a
 * rule that is not on the card.
 */

export type PolicyItem = { text: string; strong?: string[] };

/** Deposits, cancellations, rescheduling, pricing, age. */
export const bookingPolicy: PolicyItem[] = [
  {
    text: "A non-refundable deposit is required to secure all appointments",
    strong: ["non-refundable"],
  },
  {
    text: "Cancellations or reschedules must be made at least 48 hours before your appointment. Anything after this will result in a loss of deposit",
    strong: ["at least 48 hours"],
  },
  {
    text: "You may reschedule once using the same deposit. Any additional reschedules will require a new deposit",
    strong: ["once"],
  },
  {
    text: "If you cancel within the 48-hour window and choose not to reschedule, your deposit will be kept on file for 12 months",
    strong: ["12 months"],
  },
  {
    text: "Pricing is subject to change and may vary depending on design, placement, and time",
  },
  {
    text: "We are a strictly 18+ studio, no exceptions",
    strong: ["strictly 18+"],
  },
  {
    text: "Please do not bring children to your appointment",
  },
];

/** Touch-ups. Free inside three months, priced after. */
export const touchUpPolicy: PolicyItem[] = [
  {
    text: "Touch-ups are free within 3 months of your original appointment date",
    strong: ["free within 3 months"],
  },
  {
    text: "After 3 months, touch-ups are $50 for all areas and $100 for fingers",
    strong: ["$50", "$100"],
  },
  {
    text: "A clear photo of your healed tattoo is required before booking a touch-up so we can assess what's needed and allow the right amount of time",
    strong: ["A clear photo"],
  },
];

export const aftercareIntro =
  "Proper aftercare is crucial for the healing process of your tattoo. Follow all aftercare instructions carefully. Failure to do so may result in infection or poor healing. Here are some steps to help take care of your new ink.";

/** The studio's own aftercare steps, in card order. */
export const aftercareSteps: PolicyItem[] = [
  {
    text: "Apply a thin coat of your preferred aftercare ointment",
    strong: ["thin coat"],
  },
  {
    text: "We recommend Ink Nurse for its gentle, effective healing properties. Heartbreaker Ink now stocks Ink Nurse products in the studio, so you can conveniently purchase after your appointment to ensure the best healing results",
    strong: ["Ink Nurse"],
  },
  {
    text: "Apply ointment 1-2 times a day as per instructions. This will help with the dryness and irritation. Use your aftercare until it stops flaking",
    strong: ["1-2 times a day"],
  },
  {
    text: "Always wash your hands before touching your new body art. Fragrance-free soap is recommended",
    strong: ["wash your hands"],
  },
  {
    text: "Wait at least 2-3 weeks before swimming in pools, oceans, or hot tubs",
    strong: ["2-3 weeks"],
  },
  {
    text: "Limit sun exposure for at least 2-4 weeks while in healing phase",
    strong: ["2-4 weeks"],
  },
  {
    text: "Once healed, always remember to slip slop slap",
  },
];
