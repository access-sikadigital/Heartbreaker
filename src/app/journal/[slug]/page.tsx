import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { BookingCta } from "@/components/sections/BookingCta";
import { articles, getArticle, articlesByDate } from "@/data/journal";
import { site } from "@/data/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.metaTitle,
    description: article.description,
    alternates: { canonical: `/journal/${article.slug}/` },
    openGraph: {
      type: "article",
      title: article.metaTitle,
      description: article.description,
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = articlesByDate.filter((a) => a.slug !== article.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    image: `https://${site.domain}${article.hero}`,
    author: { "@type": "Person", name: site.founder.name },
    publisher: { "@id": `https://${site.domain}/#studio` },
    mainEntityOfPage: `https://${site.domain}/journal/${article.slug}/`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHero
        eyebrow={article.cluster}
        heading={article.title}
        intro={article.excerpt}
        image={article.hero}
        trail={[
          { label: "Journal", href: "/journal/" },
          { label: article.cluster, href: `/journal/${article.slug}/` },
        ]}
      />

      <Section ground="paper" width="wide">
        <ImageReveal className="aspect-16/9">
          <Image
            src={article.hero}
            alt=""
            width={1600}
            height={900}
            priority
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </ImageReveal>
      </Section>

      <Section ground="paper" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="type-label text-ink-50">Reading time</p>
            <p className="type-subhead mt-2 text-maroon">{article.read}</p>
            <p className="type-label mt-8 text-ink-50">Filed under</p>
            <p className="type-subhead mt-2 text-maroon">{article.cluster}</p>
          </aside>

          <Prose blocks={article.body} />
        </div>
      </Section>

      <Section ground="paper" className="border-t rule-ink">
        <p className="type-label text-chilli">Keep reading</p>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {more.map((a) => (
            <Link key={a.slug} href={`/journal/${a.slug}/`} className="group">
              <div className="aspect-16/11 overflow-hidden bg-maroon-deep">
                <Image
                  src={a.hero}
                  alt=""
                  width={640}
                  height={440}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-(--ease-brand) group-hover:scale-105"
                />
              </div>
              <h3 className="type-subhead mt-4 text-maroon">{a.title}</h3>
            </Link>
          ))}
        </div>
      </Section>

      <BookingCta />
    </>
  );
}
