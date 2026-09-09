import Link from "next/link";
import { site } from "@/data/site";

export type Crumb = { label: string; href: string };

/**
 * Breadcrumb trail with matching BreadcrumbList schema.
 *
 * The service tree runs three levels deep, so this is doing real work for both
 * the reader and for how the pillar/child relationship is understood in search.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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
