/**
 * Journal articles.
 *
 * The launch set from the scope's content plan. The blog is described there as
 * the durable ranking moat — aftercare alone is 2,900/mo at KD 19 — so each
 * entry is pinned to a validated keyword rather than written to a whim.
 *
 * `body` holds the article as paragraphs and headings. These are real drafts,
 * not lorem, but they are drafts: they need Beth's read before they go live,
 * and anything clinical needs checking against current Australian guidance.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  keyword: { term: string; volume: number; kd: number };
  cluster: string;
  read: string;
  date: string;
  hero: string;
  excerpt: string;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "tattoo-healing-guide",
    title: "Fine line tattoo aftercare: the complete guide",
    metaTitle: "Fine Line Tattoo Aftercare: The Complete Guide",
    description:
      "How to look after a fine line tattoo through the first fortnight and beyond — washing, moisturising, sun, swimming and what normal healing looks like.",
    keyword: { term: "tattoo aftercare", volume: 2900, kd: 19 },
    cluster: "Aftercare",
    read: "8 min",
    date: "2026-09-10",
    hero: "/brand/photography/placeholder-16.jpg",
    excerpt:
      "Fine line needs more care than heavier work, not less. The lines are thinner, so there is less ink to lose before the piece changes.",
    body: [
      {
        type: "p",
        text: "Fine line work asks a little more of the first two weeks than heavier styles do. The lines carry less ink to begin with, so anything that pulls pigment out — picking, soaking, sun — shows up sooner and matters more.",
      },
      { type: "h2", text: "The first 48 hours" },
      {
        type: "p",
        text: "Leave the wrap on for the time your artist tells you, not the time the internet tells you. When it comes off, wash gently with clean hands and a fragrance-free soap, pat dry with a clean paper towel, and let it breathe.",
      },
      {
        type: "ul",
        items: [
          "Wash two to three times a day with lukewarm water and fragrance-free soap.",
          "Pat dry. Never rub, and never use a shared bath towel.",
          "Apply a thin layer of the balm your artist recommends — thin enough that the skin still looks like skin.",
        ],
      },
      { type: "h2", text: "Week one to two" },
      {
        type: "p",
        text: "Flaking is normal and it will look alarming for a few days. The piece may go dull or patchy before it settles. Do not pick, do not scratch, and do not panic at a flake taking colour with it — that is dead skin, not your tattoo.",
      },
      { type: "h2", text: "What to avoid" },
      {
        type: "ul",
        items: [
          "Swimming, baths and spas until fully healed — soaking is the fastest way to lose linework.",
          "Direct sun. Once healed, sunscreen is the single biggest factor in how a fine line piece ages.",
          "Tight clothing over the area, and heavy training that stretches the skin.",
        ],
      },
      { type: "h2", text: "When to get in touch" },
      {
        type: "p",
        text: "Redness that spreads, heat, swelling that worsens after day three, or any discharge is worth a call — to us and to a doctor. Infection is uncommon and very treatable early. If something feels wrong, ask rather than wait.",
      },
    ],
  },
  {
    slug: "swimming-after-a-new-tattoo",
    title: "How long after a new tattoo can you swim?",
    metaTitle: "How Long After a Tattoo Can You Swim? | Heartbreaker Ink",
    description:
      "How long to stay out of the ocean, the pool and the bath after a new tattoo, and why soaking is worse for fine line work than for anything else.",
    keyword: { term: "how long after a tattoo can i swim", volume: 720, kd: 14 },
    cluster: "Aftercare",
    read: "5 min",
    date: "2026-09-12",
    hero: "/brand/photography/placeholder-09.jpg",
    excerpt:
      "The short answer is two to four weeks. The longer answer is that it depends what you mean by swimming.",
    body: [
      {
        type: "p",
        text: "Two to four weeks, and not a day earlier because the weather turned. A healing tattoo is an open wound, and every kind of water you might want to get into carries something you do not want in it.",
      },
      { type: "h2", text: "Why soaking is the problem" },
      {
        type: "p",
        text: "Submersion softens the healing skin and lifts the scab early. On heavy work that costs you some saturation. On fine line, where a whole stem might be one pass of a single needle, it can cost you the line.",
      },
      { type: "h2", text: "Ocean, pool and bath" },
      {
        type: "ul",
        items: [
          "Ocean — bacteria and sand. Wait until fully healed, and rinse afterwards.",
          "Pools and spas — chlorine is an irritant on broken skin, and heat opens it further.",
          "Baths — the same soaking problem as everything else. Showers are fine from day one.",
        ],
      },
      { type: "h2", text: "If it happens anyway" },
      {
        type: "p",
        text: "Rinse with clean water, pat dry, and keep an eye on it. One accidental dunk is not a disaster. Repeatedly swimming through week one usually is.",
      },
    ],
  },
  {
    slug: "first-tattoo-guide",
    title: "Getting your first tattoo: what to expect",
    metaTitle: "Getting Your First Tattoo: What to Expect | Heartbreaker Ink",
    description:
      "What actually happens at a first tattoo appointment — booking, the consult, the day itself, pain, and how to look after it afterwards.",
    keyword: { term: "first tattoo", volume: 140, kd: 15 },
    cluster: "First timers",
    read: "7 min",
    date: "2026-09-14",
    hero: "/brand/photography/placeholder-12.jpg",
    excerpt:
      "Most nerves about a first tattoo are really nerves about not knowing what happens. Here is the whole thing, start to finish.",
    body: [
      {
        type: "p",
        text: "Almost nobody is nervous about the needle. They are nervous about not knowing the order of events — where to stand, what to say, whether it is rude to ask for a break. So here is the entire appointment, plainly.",
      },
      { type: "h2", text: "Before the day" },
      {
        type: "p",
        text: "You will have talked the idea through and seen a drawing. Eat properly beforehand, drink water, skip alcohol the night before, and wear something that gives easy access to the placement without you having to undress.",
      },
      { type: "h2", text: "In the chair" },
      {
        type: "ul",
        items: [
          "A stencil goes on first, and you check the placement in a mirror. Move it as many times as you need — this is the moment to be fussy.",
          "A short test line tells you what the sensation actually is. It is almost always less than people imagine.",
          "Breaks whenever you want one. Say so; nobody minds.",
        ],
      },
      { type: "h2", text: "Does it hurt?" },
      {
        type: "p",
        text: "It is uncomfortable rather than unbearable, and it depends far more on placement than size. Outer arm and thigh are mild. Ribs, sternum, feet and the inside of the arm are sharper. Fine line uses a single needle, which most people find less aggressive than shading.",
      },
      { type: "h2", text: "Afterwards" },
      {
        type: "p",
        text: "You leave wrapped, with written aftercare and a way to reach us. The first fortnight is the part that matters — the aftercare guide covers it properly.",
      },
    ],
  },
  {
    slug: "do-fine-line-tattoos-last",
    title: "Do fine line tattoos last? How they age",
    metaTitle: "Do Fine Line Tattoos Last? How They Age | Heartbreaker Ink",
    description:
      "An honest look at how fine line tattoos age, what makes them blur, and how placement, line weight and sun exposure change the outcome.",
    keyword: { term: "do fine line tattoos last", volume: 50, kd: 30 },
    cluster: "Fine line",
    read: "6 min",
    date: "2026-09-16",
    hero: "/brand/photography/placeholder-10.jpg",
    excerpt:
      "Yes — but they age differently to bold work, and pretending otherwise does nobody any favours.",
    body: [
      {
        type: "p",
        text: "Fine line lasts. It just ages differently to traditional work, and the honest version of that answer is more useful than the reassuring one.",
      },
      { type: "h2", text: "What actually changes" },
      {
        type: "p",
        text: "All ink spreads slightly under the skin over years. On a bold outline that spread is invisible. On a hairline it is a meaningful percentage of the line's width, so fine work softens sooner. Good fine line is drawn anticipating that — spacing, weight and detail density are all set for how it will look in ten years, not ten days.",
      },
      { type: "h2", text: "What makes the difference" },
      {
        type: "ul",
        items: [
          "Sun. Comfortably the biggest factor. Sunscreen on healed work is the best thing you can do for it.",
          "Placement. High-friction, high-stretch areas — hands, feet, inner wrist — soften faster than an outer arm.",
          "Detail density. Lines drawn too close will eventually read as one shape. This is a drawing decision, not an aftercare one.",
        ],
      },
      { type: "h2", text: "Touch-ups" },
      {
        type: "p",
        text: "Fine line is not a one-and-done for everyone. Some pieces want a light refresh after a few years, which is a short and inexpensive session. That is maintenance, not a failure.",
      },
    ],
  },
  {
    slug: "small-tattoo-ideas",
    title: "50 small tattoo ideas worth keeping",
    metaTitle: "50 Small Tattoo Ideas Worth Keeping | Heartbreaker Ink",
    description:
      "Small fine line tattoo ideas by theme — botanical, symbolic, script and abstract — with notes on which placements hold small detail best.",
    keyword: { term: "small tattoo ideas", volume: 2900, kd: 31 },
    cluster: "Ideas",
    read: "9 min",
    date: "2026-09-18",
    hero: "/brand/photography/placeholder-01.jpg",
    excerpt:
      "Ideas are easy. Ideas that still look good in a decade are the harder list, so this one is sorted by how well each ages.",
    body: [
      {
        type: "p",
        text: "Anyone can list small tattoo ideas. The useful version sorts them by how they hold up, because at this scale the difference between a piece you love at forty and one you have lasered is usually the drawing, not the idea.",
      },
      { type: "h2", text: "Botanical" },
      {
        type: "ul",
        items: [
          "A single birth flower, stem and all.",
          "One seed head — dandelion, poppy, nigella.",
          "A folded leaf, drawn from real reference.",
          "A sprig of something from a garden that matters to you.",
        ],
      },
      { type: "h2", text: "Symbolic" },
      {
        type: "ul",
        items: [
          "A swallow, for the journey out and the journey home.",
          "A small moth, which reads better at scale than a butterfly.",
          "A crescent, a sun, or a single star — quiet and hard to date.",
          "An anchor, small enough to be a reference rather than a statement.",
        ],
      },
      { type: "h2", text: "Script" },
      {
        type: "ul",
        items: [
          "One word, in someone's real handwriting.",
          "A date in numerals rather than words.",
          "Initials, spaced generously so they stay legible.",
        ],
      },
      { type: "h2", text: "Where small work holds best" },
      {
        type: "p",
        text: "Outer forearm, upper arm, calf and shoulder blade all hold fine detail well. Fingers, palms, feet and the inside of the wrist are high-friction and high-stretch — beautiful for a few years, and honest studios will tell you they need refreshing.",
      },
    ],
  },
  {
    slug: "birth-flower-tattoos",
    title: "Birth flower tattoos: a month-by-month guide",
    metaTitle: "Birth Flower Tattoos: A Month by Month Guide",
    description:
      "Every month's birth flower and what it traditionally means, with notes on which ones translate well into fine line tattoo work.",
    keyword: { term: "birth flower tattoo", volume: 720, kd: 29 },
    cluster: "Ideas",
    read: "7 min",
    date: "2026-09-20",
    hero: "/brand/photography/placeholder-07.jpg",
    excerpt:
      "A quiet way to mark a person or a date without lettering — and some translate to single needle far better than others.",
    body: [
      {
        type: "p",
        text: "Birth flowers are one of the most requested fine line subjects, and one of the easiest to get wrong. Some translate beautifully to single needle. Others are dense enough that they need to be drawn much larger than people expect.",
      },
      { type: "h2", text: "The months" },
      {
        type: "ul",
        items: [
          "January — carnation. Layered petals; wants a little size to read.",
          "February — violet. Small and simple, ideal for fine line.",
          "March — daffodil. Strong silhouette, translates well.",
          "April — daisy. Clean and forgiving at any scale.",
          "May — lily of the valley. Delicate bells; a natural fit.",
          "June — rose. Beautiful, but the most detail-hungry on the list.",
          "July — larkspur. Tall and linear, lovely along a forearm.",
          "August — poppy. Works especially well as a seed head.",
          "September — aster. Fine radiating petals; keep it generous.",
          "October — marigold. Dense; needs size or simplifying.",
          "November — chrysanthemum. The densest of the twelve.",
          "December — narcissus. Simple form, ages well.",
        ],
      },
      { type: "h2", text: "Combining months" },
      {
        type: "p",
        text: "Several flowers for several people is one of the nicest ways to build a piece over time. Tell us the full list at the first session even if you only want one now — the composition gets drawn with the others in mind.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export const articlesByDate = [...articles].sort((a, b) =>
  b.date.localeCompare(a.date),
);
