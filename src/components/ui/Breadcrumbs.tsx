import Link from "next/link";
import { site } from "@/data/site";

export type Crumb = { label: string; href: string };

/**
 * BreadcrumbList schema on its own, with nothing drawn.
 *
 * Split out from the visual trail because the two are wanted independently:
 * the page heroes no longer show a breadcrumb, but the service tree runs three
 * levels deep and search still needs to understand the pillar/child
 * relationship. Dropping the markup along with the visuals would have thrown
 * away the half that was doing the SEO work.
 */
export function BreadcrumbSchema({ trail }: { trail: Crumb[] }) {
  const full = [{ label: "Home", href: "/" }, ...trail];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: full.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `https://${site.domain}${c.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** The visible trail, plus the schema. Kept for anywhere that still wants it. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const full = [{ label: "Home", href: "/" }, ...trail];

  return (
    <>
      <BreadcrumbSchema trail={trail} />
      <nav aria-label="Breadcrumb">
        <ol className="type-label flex flex-wrap items-center gap-2 text-current opacity-70">
          {full.map((c, i) => (
            <li key={c.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === full.length - 1 ? (
                <span aria-current="page">{c.label}</span>
              ) : (
                <Link href={c.href} className="hover:text-chilli">
                  {c.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
