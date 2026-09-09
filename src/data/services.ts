/**
 * Service pages.
 *
 * Every entry carries the keyword the scope's map assigns to its URL, so page
 * metadata can be generated from one place rather than hand-written per route.
 * Volumes and KD are Semrush AU, 4 Sep 2026.
 */

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  /** Nav and card label. */
  name: string;
  /** H1. Leads with the category, because nobody searches the studio yet. */
  heading: string;
  title: string;
  description: string;
  keyword: { term: string; volume: number; kd: number };
  tier: 1 | 2;
  /** Icon slug from the brand set — chosen for what it depicts, not its name. */
  icon: string;
  hero: string;
  gallery: string[];
  intro: string;
  forWho: string;
  detail: string[];
  priceFrom: string;
  faqs: Faq[];
};

export const pillar = {
  slug: "fine-line-tattoos",
  name: "Fine line",
  heading: "Fine line tattoos",
  title: "Fine Line Tattoos | Heartbreaker Ink, Mornington",
  description:
    "Delicate, precise fine line tattoo work on the Mornington Peninsula. Custom designs, script, small pieces and flash days. Book online with Beth.",
  keyword: { term: "fine line tattoo", volume: 2900, kd: 28 },
  hero: "/brand/photography/placeholder-10.jpg",
  intro:
    "Fine line is the whole studio, not a style on a menu. Single-needle work, drawn to sit with your body rather than on it, and built to still read in ten years.",
} as const;

export const services: Service[] = [
  {
    slug: "small-tattoos",
    name: "Small & micro",
    heading: "Small tattoos",
    title: "Small Tattoos | Fine Line Micro Tattoos, Mornington",
    description:
      "Small and micro fine line tattoos on the Mornington Peninsula. The classic first piece — quiet, precise, and drawn to last. Book online.",
    keyword: { term: "small tattoo", volume: 720, kd: 14 },
    tier: 1,
    icon: "sun",
    hero: "/brand/photography/placeholder-08.jpg",
    gallery: [
      "/brand/photography/placeholder-01.jpg",
      "/brand/photography/placeholder-09.jpg",
      "/brand/photography/placeholder-10.jpg",
    ],
    intro:
      "Something quiet, on your terms. Small work is where most people start, and it is rarely where they stop.",
    forWho:
      "First-timers, anyone testing how their skin takes ink, and people who want a piece only they will notice.",
    detail: [
      "Single needle, drawn at the size it will be worn — never shrunk from a larger sketch, which is what makes small work blur.",
      "Placement matters more at this scale than at any other. We will tell you honestly if somewhere will not hold the detail.",
      "Most small pieces sit inside a single short session.",
    ],
    priceFrom: "$150",
    faqs: [
      {
        q: "How small can a fine line tattoo actually go?",
        a: "Roughly a five-cent piece is the practical floor for anything with internal detail. Below that, lines sit too close and will spread into each other as the skin heals. We would rather draw it slightly larger than watch it close up in two years.",
      },
      {
        q: "Do small tattoos hurt less?",
        a: "They take less time, which is most of what people mean. The sensation depends far more on placement than size — ribs and feet are sharp anywhere, an outer arm is mild almost everywhere.",
      },
    ],
  },
  {
    slug: "script-lettering",
    name: "Script & lettering",
    heading: "Script & lettering tattoos",
    title: "Script Tattoos & Lettering | Heartbreaker Ink, Mornington",
    description:
      "Custom hand-drawn script and lettering tattoos. A word, a date, a line worth carrying — drawn by hand, never set from a font. Book online.",
    keyword: { term: "script tattoo", volume: 480, kd: 24 },
    tier: 1,
    icon: "bookings",
    hero: "/brand/photography/placeholder-13.jpg",
    gallery: [
      "/brand/photography/placeholder-13.jpg",
      "/brand/photography/placeholder-01.jpg",
      "/brand/photography/placeholder-03.jpg",
    ],
    intro:
      "Script is Beth's signature. Every piece is drawn by hand for the body it will sit on — never typed out in a font and stretched to fit.",
    forWho:
      "Names, dates, a line from something that matters. Anyone who wants the handwriting to feel like a person made it.",
    detail: [
      "Drawn by hand, then redrawn against your placement until the flow follows the limb rather than fighting it.",
      "Letterforms are spaced for how ink spreads over years — tight script is the fastest way to an illegible tattoo.",
      "Bring the exact wording and any spelling you want kept. We will read it back to you before the needle goes near you.",
    ],
    priceFrom: "$180",
    faqs: [
      {
        q: "Can you copy someone's handwriting?",
        a: "Yes, and it is some of the most meaningful work we do. Send a clear photo of the original on flat paper, shot straight on. We redraw it rather than trace it, so it holds up at tattoo scale.",
      },
      {
        q: "Will fine script blur over time?",
        a: "All ink spreads a little. Script is drawn with that in mind — letter spacing and stroke weight are set so it reads cleanly in a decade, not just on the day.",
      },
    ],
  },
  {
    slug: "custom-tattoos",
    name: "Custom",
    heading: "Custom tattoos",
    title: "Custom Tattoo Design | Fine Line, Mornington Peninsula",
    description:
      "Custom fine line tattoo design on the Mornington Peninsula. Bring an idea, however half-formed, and Beth will draw it for you. Book a consult.",
    keyword: { term: "custom tattoo", volume: 210, kd: 17 },
    tier: 1,
    icon: "events",
    hero: "/brand/photography/placeholder-07.jpg",
    gallery: [
      "/brand/photography/placeholder-07.jpg",
      "/brand/photography/placeholder-10.jpg",
      "/brand/photography/placeholder-09.jpg",
    ],
    intro:
      "Bring the idea, however half-formed. Custom work starts with a conversation, not a catalogue.",
    forWho:
      "Anyone with something specific in mind, or a feeling they cannot quite draw yet.",
    detail: [
      "A consult first — in person or over messages — to work out what the piece actually needs to be.",
      "Beth draws it, you see it before the day, and there is room to change it.",
      "Larger custom work is often split across sessions so the skin gets a rest.",
    ],
    priceFrom: "$220",
    faqs: [
      {
        q: "Can I see the design before my appointment?",
        a: "Yes. You will see the drawing ahead of the day, with time to ask for changes. Nobody should be seeing their tattoo for the first time while sitting in the chair.",
      },
      {
        q: "What if I only have a vague idea?",
        a: "That is normal and completely fine. Reference images, a mood, a feeling, a story — all of it is useful. The consult exists to turn that into something drawable.",
      },
    ],
  },
  {
    slug: "couples-matching",
    name: "Couples & matching",
    heading: "Matching tattoos",
    title: "Matching & Couples Tattoos | Fine Line, Mornington",
    description:
      "Matching and couples fine line tattoos on the Mornington Peninsula. Two pieces designed to belong together. Book for two.",
    keyword: { term: "matching tattoos", volume: 1000, kd: 28 },
    tier: 2,
    icon: "clients",
    hero: "/brand/photography/placeholder-02.jpg",
    gallery: [
      "/brand/photography/placeholder-01.jpg",
      "/brand/photography/placeholder-08.jpg",
      "/brand/photography/placeholder-13.jpg",
    ],
    intro:
      "Two pieces designed to belong together — matching, mirrored, or halves of one idea.",
    forWho:
      "Partners, siblings, friends, and anyone marking something shared.",
    detail: [
      "Designs are drawn as a pair, so they read as related without being identical stickers.",
      "Book a double session and come in together. Most matching pairs are done back to back on the same day.",
      "Different placements on different bodies need different drawings — that is the work.",
    ],
    priceFrom: "$300 for two",
    faqs: [
      {
        q: "Do matching tattoos have to be identical?",
        a: "No, and the best ones usually are not. Two halves of an idea, or the same motif drawn at different scales, tends to age better than an exact copy on two very different bodies.",
      },
      {
        q: "Can we book together?",
        a: "Yes — say so when you enquire and we will hold a double slot so you are in the studio at the same time.",
      },
    ],
  },
  {
    slug: "floral-botanical",
    name: "Floral & botanical",
    heading: "Fine line flower tattoos",
    title: "Fine Line Flower & Botanical Tattoos | Mornington",
    description:
      "Fine line floral and botanical tattoos — birth flowers, single stems and botanical studies, drawn in single needle. Book online.",
    keyword: { term: "fine line flower tattoo", volume: 260, kd: 28 },
    tier: 2,
    icon: "healed",
    hero: "/brand/photography/placeholder-07.jpg",
    gallery: [
      "/brand/photography/placeholder-07.jpg",
      "/brand/photography/placeholder-03.jpg",
      "/brand/photography/placeholder-10.jpg",
    ],
    intro:
      "Botanical work is where fine line earns its name — stems, seed heads and petals drawn thin enough to breathe.",
    forWho:
      "Birth flowers, a plant that means something, or a study for its own sake.",
    detail: [
      "Drawn from real botanical reference rather than clipart, so the structure of the plant is right.",
      "Line weight is varied by hand to give depth without shading.",
      "Works beautifully as a first piece and as an addition to an existing arrangement.",
    ],
    priceFrom: "$200",
    faqs: [
      {
        q: "What is a birth flower tattoo?",
        a: "Each month has a flower traditionally associated with it — carnation for January, violet for February, and so on. They are a quiet way to mark a person or a date without lettering.",
      },
      {
        q: "Can you add to a floral piece later?",
        a: "Yes, and it is worth planning for. Tell us if you might extend it and the first piece gets drawn with room to grow.",
      },
    ],
  },
  {
    slug: "minimalist",
    name: "Minimalist",
    heading: "Minimalist tattoos",
    title: "Minimalist Tattoos | Fine Line Studio, Mornington",
    description:
      "Minimalist fine line tattoos — the smallest number of lines that still say it. Mornington Peninsula studio. Book online.",
    keyword: { term: "minimalist tattoo", volume: 480, kd: 32 },
    tier: 2,
    icon: "moth",
    hero: "/brand/photography/placeholder-01.jpg",
    gallery: [
      "/brand/photography/placeholder-01.jpg",
      "/brand/photography/placeholder-08.jpg",
      "/brand/photography/placeholder-09.jpg",
    ],
    intro:
      "The smallest number of lines that still says it. Minimalist work is subtraction, and it is harder than it looks.",
    forWho:
      "Anyone who wants a piece that sits quietly and does not date.",
    detail: [
      "Every line has to earn its place — there is nothing to hide behind at this weight.",
      "Ages exceptionally well, because there is no fine detail to close up.",
      "Pairs well with existing work without competing with it.",
    ],
    priceFrom: "$150",
    faqs: [
      {
        q: "Is a minimalist tattoo quicker?",
        a: "Usually, though the drawing takes as long as anything else. Simplicity on skin comes from a lot of decisions on paper.",
      },
      {
        q: "Will such a fine line fade?",
        a: "Fine lines soften rather than vanish. Sun is the real enemy — keep it covered or use high SPF and it will hold for years.",
      },
    ],
  },
  {
    slug: "cover-ups",
    name: "Cover-ups",
    heading: "Cover up tattoos",
    title: "Cover Up Tattoos | Fine Line Studio, Mornington",
    description:
      "Fine line cover up and rework tattoos on the Mornington Peninsula. Send a photo and we will tell you honestly what is possible.",
    keyword: { term: "cover up tattoo", volume: 590, kd: 31 },
    tier: 2,
    icon: "panther",
    hero: "/brand/photography/placeholder-06.jpg",
    gallery: [
      "/brand/photography/placeholder-07.jpg",
      "/brand/photography/placeholder-10.jpg",
      "/brand/photography/placeholder-03.jpg",
    ],
    intro:
      "Some pieces can be reworked into something you want to keep. Some cannot, and we will say so.",
    forWho:
      "Anyone living with work they have outgrown, or a piece that did not heal the way it was promised.",
    detail: [
      "Send a clear, well-lit photo before you book. Fine line cannot cover heavy dark work, and pretending otherwise wastes your money.",
      "Some pieces are better lightened with a few laser sessions first. We will tell you if that is the honest answer.",
      "Reworks are quoted individually — there is no standard price for undoing someone else's decision.",
    ],
    priceFrom: "Quoted per piece",
    faqs: [
      {
        q: "Can fine line cover an old dark tattoo?",
        a: "Often not on its own. Fine line works with light, open designs, and heavy black needs either a bolder cover or some laser lightening first. Send a photo and you will get a straight answer rather than a booking.",
      },
      {
        q: "Do I need laser first?",
        a: "Sometimes. Two or three sessions can lift an old piece enough for fine line to work over it. We will tell you before you commit to anything.",
      },
    ],
  },
];

export const allServices = services;
export const tier1Services = services.filter((s) => s.tier === 1);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
