import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { BookingCta } from "@/components/sections/BookingCta";
import { articlesByDate } from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal | Fine Line Tattoo Guides & Ideas | Heartbreaker Ink",
  description:
    "Aftercare guides, pricing, healing, design ideas and honest answers about fine line tattoos, from a Mornington Peninsula studio.",
  alternates: { canonical: "/journal/" },
};

export default function JournalPage() {
  const [lead, ...rest] = articlesByDate;

  return (
    <>
      <PageHero
        eyebrow="Journal"
        heading="Everything you wanted to ask"
        intro="Aftercare, cost, healing, and the questions people are slightly embarrassed to ask in the studio. Written to be useful rather than to rank."
        trail={[{ label: "Journal", href: "/journal/" }]}
      />

      {lead && (
        <Section ground="paper">
          <Link href={`/journal/${lead.slug}/`} className="group grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ImageReveal className="aspect-16/11">
              <Image
                src={lead.hero}
                alt=""
                width={1100}
                height={756}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover transition-transform duration-[1100ms] ease-(--ease-brand) group-hover:scale-[1.04]"
              />
            </ImageReveal>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4">
                <span className="type-label text-chilli">{lead.cluster}</span>
                <span className="type-label text-ink-50">{lead.read}</span>
              </div>
              <h2 className="type-headline mt-5 max-w-[16ch] text-maroon">
                {lead.title}
              </h2>
              <p className="type-body mt-6 max-w-[46ch] text-ink-70">
                {lead.excerpt}
              </p>
              <span className="type-label mt-8 text-chilli">
                Read the guide <span aria-hidden="true">&#8599;</span>
              </span>
            </div>
          </Link>
        </Section>
      )}

      <Section ground="paper" className="border-t rule-ink">
        <Reveal stagger={0.08} className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <RevealItem key={article.slug}>
              <Link href={`/journal/${article.slug}/`} className="group flex h-full flex-col">
                <div className="aspect-16/11 overflow-hidden bg-maroon-deep">
                  <Image
                    src={article.hero}
                    alt=""
                    width={720}
                    height={495}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-[1000ms] ease-(--ease-brand) group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="type-label text-chilli">{article.cluster}</span>
                  <span className="type-label text-ink-50">{article.read}</span>
                </div>
                <h3 className="type-subhead mt-3 text-maroon">{article.title}</h3>
                <p className="type-body mt-3 text-ink-70">{article.excerpt}</p>
                <span className="type-label mt-auto pt-5 text-ink-50 transition-colors group-hover:text-maroon">
                  Read <span aria-hidden="true">&#8599;</span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <BookingCta />
    </>
  );
}
