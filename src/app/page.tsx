import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Intro } from "@/components/sections/Intro";
import { Services } from "@/components/sections/Services";
import { GalleryTeaser } from "@/components/sections/GalleryTeaser";
import { Flash } from "@/components/sections/Flash";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { BookingCta } from "@/components/sections/BookingCta";
import { JsonLd, localBusinessSchema, websiteSchema } from "@/lib/schema";

/**
 * Homepage.
 *
 * Target keyword: "fine line tattoo shops" — 2,900/mo, KD 26 (Semrush AU),
 * assigned to `/` in the scope's sitemap. The title leads with the category
 * rather than the studio name, because nobody searches the studio name yet —
 * that is the whole reason this site is being built.
 */
export const metadata: Metadata = {
  title: "Fine Line Tattoo Studio | Heartbreaker Ink, Mornington",
  description:
    "Heartbreaker Ink is a fine line tattoo studio on the Mornington Peninsula. Delicate custom work, script and lettering, and limited flash days. Book online.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Fine Line Tattoo Studio | Heartbreaker Ink, Mornington",
    description:
      "A fine line tattoo studio on the Mornington Peninsula. Delicate custom work, script and lettering, and limited flash days.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={websiteSchema()} />

      <Hero />
      <Ticker />
      <Intro />
      <Services />
      <GalleryTeaser />
      <Flash />
      <Process />
      <Reviews />
      <BookingCta />
    </>
  );
}
