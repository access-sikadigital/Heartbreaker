/**
 * Location pages.
 *
 * The scope is blunt about these: suburb terms carry almost no volume
 * ("fine line tattoo mornington" is 0/mo). They exist to support Google
 * Business Profile and to catch the Melbourne category traffic, not because
 * anyone searches the suburb. So they are written as genuinely useful pages
 * about travelling to the studio — thin doorway pages would be worse than none.
 */

export type Location = {
  slug: string;
  name: string;
  heading: string;
  title: string;
  description: string;
  keyword: { term: string; volume: number; kd: number };
  intro: string;
  travel: string;
  nearby: string[];
  hero: string;
};

export const locations: Location[] = [
  {
    slug: "fine-line-tattoo-mornington",
    name: "Mornington",
    heading: "Fine line tattoos in Mornington",
    title: "Fine Line Tattoo Mornington | Heartbreaker Ink",
    description:
      "A private fine line tattoo studio in Mornington, on the Peninsula. Custom work, script and small pieces, by appointment. Book online.",
    keyword: { term: "tattoo mornington", volume: 50, kd: 26 },
    intro:
      "The studio is in Mornington, and most of the people who sit in the chair are from within twenty minutes of it.",
    travel:
      "Parking is straightforward and the studio is private, you will not be walking through a shopfront to get to your appointment. Exact address comes with your booking confirmation.",
    nearby: ["Mount Eliza", "Mount Martha", "Somerville", "Moorooduc", "Tyabb"],
    /* Was placeholder-02: a street-style selfie in camo shorts, no tattoo
       visible and nothing to do with Mornington. All three location heroes
       were mood-board images; each now shows actual fine line work. */
    hero: "/brand/photography/placeholder-10.jpg",
  },
  {
    slug: "fine-line-tattoo-melbourne",
    name: "Melbourne",
    heading: "Fine line tattoos for Melbourne",
    title: "Fine Line Tattoo Melbourne | Heartbreaker Ink",
    description:
      "Fine line tattoo work for Melbourne clients, an hour from the CBD on the Mornington Peninsula. Custom designs, script and flash. Book online.",
    keyword: { term: "fine line tattoos melbourne", volume: 1600, kd: 34 },
    intro:
      "A good portion of the studio's work comes down from Melbourne. An hour each way is a long trip for a tattoo, so the appointment is built to be worth it.",
    travel:
      "Roughly an hour from the CBD down the Nepean or the Peninsula Link. Sessions are scheduled with the drive in mind, you will not be sitting in a waiting room, and we do not double-book.",
    nearby: ["Melbourne CBD", "Bayside", "Brighton", "Frankston", "Dandenong"],
    /* Was placeholder-15: a motion-blurred figure on a pedestrian crossing. */
    hero: "/brand/photography/placeholder-07.jpg",
  },
  {
    slug: "fine-line-tattoo-frankston",
    name: "Frankston",
    heading: "Fine line tattoos near Frankston",
    title: "Fine Line Tattoo Frankston | Heartbreaker Ink",
    description:
      "Fine line tattoo work a short drive from Frankston, in a private Mornington studio. Custom designs, script and small pieces. Book online.",
    keyword: { term: "tattoo frankston", volume: 210, kd: 36 },
    intro:
      "Frankston is fifteen minutes up the road, and it is the closest large centre to the studio.",
    travel:
      "A short run down the Nepean Highway or the Peninsula Link. Easy enough to come after work, later appointments are available on request.",
    nearby: ["Frankston South", "Seaford", "Carrum Downs", "Langwarrin", "Mount Eliza"],
    /* Was placeholder-11: a dark abstract blur with no readable subject. */
    hero: "/brand/photography/placeholder-08.jpg",
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}
