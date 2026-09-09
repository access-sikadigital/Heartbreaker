import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

/**
 * Journal teaser.
 *
 * The three Tier 1 articles from the scope's content plan, each carrying its
 * validated target keyword. The blog is the durable ranking moat there —
 * aftercare alone is 2,900/mo at KD 19 — so it earns a homepage slot rather
 * than living only in the footer.
 */
const articles = [
  {
    title: "Fine line tattoo aftercare: the complete guide",
    href: "/journal/tattoo-healing-guide/",
    cluster: "Aftercare",
    read: "8 min",
    image: "/brand/photography/placeholder-16.jpg",
  },
  {
    title: "How much does a tattoo cost in Australia?",
    href: "/pricing/",
    cluster: "Pricing",
    read: "6 min",
    image: "/brand/photography/placeholder-06.jpg",
  },
  {
    title: "Getting your first tattoo: what to expect",
    href: "/journal/first-tattoo-guide/",
    cluster: "First timers",
    read: "7 min",
    image: "/brand/photography/placeholder-12.jpg",
  },
];

export function JournalTeaser() {
  return (
    <Section id="journal" ground="paper" className="border-t rule-ink">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="type-label text-chilli">Journal</p>
          <h2 className="type-headline mt-4 max-w-[16ch] text-maroon">
            Everything you wanted to ask
          </h2>
        </div>
        <Link
          href="/journal/"
          className="type-button border border-maroon px-6 py-3 text-maroon transition-colors duration-(--duration-fast) hover:bg-maroon hover:text-offwhite"
        >
          All articles
        </Link>
      </header>

      <Reveal stagger={0.09} className="mt-12 grid gap-8 md:grid-cols-3">
        {articles.map((article) => (
          <RevealItem key={article.href}>
            <Link href={article.href} className="group flex h-full flex-col">
              <div className="aspect-16/11 overflow-hidden bg-maroon-deep">
                <Image
                  src={article.image}
                  alt=""
                  width={720}
                  height={495}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-[1100ms] ease-(--ease-brand) group-hover:scale-[1.05]"
                />
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="type-label text-chilli">{article.cluster}</span>
                <span className="type-label text-ink-50">{article.read}</span>
              </div>

              <h3 className="type-subhead mt-3 text-maroon">{article.title}</h3>
              <span className="type-label mt-auto pt-5 text-ink-50 transition-colors group-hover:text-maroon">
                Read <span aria-hidden="true">&#8599;</span>
              </span>
            </Link>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
