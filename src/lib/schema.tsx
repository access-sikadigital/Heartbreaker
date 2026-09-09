import { site } from "@/data/site";

/**
 * Structured data.
 *
 * The scope doc puts Google Business Profile at the centre of local ranking —
 * "tattoo shops near me" is 12,100/mo and won through GBP, not the website.
 * LocalBusiness markup is what lets the site corroborate that profile, so the
 * name, area and URL here must match GBP exactly once it is claimed.
 *
 * Fields that are still unconfirmed (phone, email, street address) are omitted
 * rather than guessed. Wrong structured data is worse than none — it actively
 * conflicts with the GBP listing.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    "@id": `https://${site.domain}/#studio`,
    name: site.name,
    description: site.description,
    url: `https://${site.domain}/`,
    image: `https://${site.domain}/opengraph-image.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mornington",
      addressRegion: "VIC",
      addressCountry: "AU",
    },
    areaServed: site.serviceAreas.map((name) => ({ "@type": "Place", name })),
    sameAs: [site.social.instagram],
    founder: {
      "@type": "Person",
      name: site.founder.name,
      jobTitle: site.founder.role,
    },
    knowsAbout: [
      "Fine line tattoos",
      "Script and lettering tattoos",
      "Small and micro tattoos",
      "Custom tattoo design",
      "Flash tattoos",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `https://${site.domain}/#website`,
    name: site.name,
    url: `https://${site.domain}/`,
    inLanguage: "en-AU",
    publisher: { "@id": `https://${site.domain}/#studio` },
  };
}

/** Renders a JSON-LD block. Next inlines this into the server HTML. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Schema objects are authored here, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
