/**
 * Pricing guidance.
 *
 * The scope flags "how much do tattoos cost" at 720/mo and KD 16 — a cheap win
 * — and lists pricing transparency as an open question for Beth. These are
 * PLACEHOLDER bands written to the right shape; confirm every figure before
 * launch, and delete the page rather than publish numbers that are wrong.
 */

export type PriceBand = {
  label: string;
  from: string;
  detail: string;
};

export const priceBands: PriceBand[] = [
  {
    label: "Minimum charge",
    from: "$150",
    detail:
      "Covers setup, a single-use needle, and the time to draw and place it properly. Almost any small piece starts here.",
  },
  {
    label: "Small & micro",
    from: "$150 – $250",
    detail:
      "A single motif, script word or small botanical. Usually one short session.",
  },
  {
    label: "Custom, half session",
    from: "$400",
    detail:
      "Around two hours. Enough for a detailed single piece or a pair of matching tattoos.",
  },
  {
    label: "Custom, full session",
    from: "$750",
    detail:
      "Around four hours with breaks. Larger arrangements, or the first sitting of a bigger piece.",
  },
];

export const priceFactors = [
  "Size and how much fine detail sits inside it — detail costs time, not ink.",
  "Placement. Ribs, hands and feet take longer because the skin and the sitting are both harder.",
  "Whether the design is custom-drawn or an existing flash piece.",
  "How much drawing happens before the day. Complex custom work carries design time.",
];
