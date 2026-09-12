import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CtaLink } from "@/components/ui/CtaLink";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { FaqAccordion, FaqSchema } from "@/components/ui/FaqAccordion";
import { TextScrub } from "@/components/motion/TextScrub";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { PinnedSteps } from "@/components/motion/PinnedSteps";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ScrubReveal } from "@/components/motion/ScrubReveal";
import { BookingCta } from "@/components/sections/BookingCta";
import { tier1Services, type Service } from "@/data/services";
import { site } from "@/data/site";

/**
 * Service page template — the nine-section blueprint from the scope, in order:
 * hero, who it's for, gallery strip, what makes it Heartbreaker, how booking
 * works, pricing guidance, reviews, FAQ, enquiry.
 *
 * One template rather than eight near-identical files. The pages differ in
 * content, not structure, and eight copies of the same layout is eight places
 * to forget a change.
 */
export function ServiceTemplate({ service }: { service: Service }) {
  const others = tier1Services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.heading,
    description: service.description,
    serviceType: service.name,
    provider: { "@id": `https://${site.domain}/#studio` },
    areaServed: site.serviceAreas.map((n) => ({ "@type": "Place", name: n })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <FaqSchema items={service.faqs} />

      <PageHero
        eyebrow="Fine line"
        heading={service.heading}
        intro={service.intro}
        image={service.hero}
        imageAlt=""
        trail={[
          { label: "Fine line tattoos", href: "/fine-line-tattoos/" },
          { label: service.name, href: `/fine-line-tattoos/${service.slug}/` },
        ]}
      />

      {/* 2, Who it's for */}
      <Section ground="paper">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Icon name={service.icon} size={64} />
            <p className="type-label mt-8 text-chilli">Who it&rsquo;s for</p>
          </div>
          <TextScrub as="p" className="type-lead max-w-[46ch] text-maroon">
            {service.forWho}
          </TextScrub>
        </div>
      </Section>

      {/* 3, Gallery strip. The scope calls this the most persuasive element. */}
      <Section ground="paper" width="wide" className="pt-0">
        <Reveal stagger={0.1} className="grid gap-4 sm:grid-cols-3">
          {service.gallery.map((src, i) => (
            <RevealItem key={src + i}>
              <ImageReveal from={i % 2 ? "top" : "bottom"} className="aspect-4/5">
                <Image
                  src={src}
                  alt={`${service.name} work by Heartbreaker Ink`}
                  width={800}
                  height={1000}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="h-full w-full object-cover"
                />
              </ImageReveal>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      {/* 4 + 5, What makes it ours, and how it works */}
      <Section ground="ink">
        <PinnedSteps
          aside={
            <>
              <p className="type-label text-chilli">How it works</p>
              <h2 className="type-headline mt-4 max-w-[14ch]">
                What you can expect
              </h2>
              <p className="type-body mt-6 max-w-[38ch] text-paper-60">
                One artist, one client at a time, and no part of it rushed.
              </p>
              <CtaLink
                href={site.booking.url}
                className="type-button mt-8 inline-flex items-center gap-3 border border-offwhite px-7 py-3.5 transition-colors duration-(--duration-fast) hover:bg-offwhite hover:text-ink"
              >
                {/* Said "Start an enquiry" while opening the booking widget.
                    The label now matches where the button actually goes. */}
                {site.booking.label}
                <span aria-hidden="true">&#8599;</span>
              </CtaLink>
            </>
          }
        >
          {service.detail.map((line, i) => (
            <div
              key={i}
              data-step
              className="grid grid-cols-[3rem_1fr] gap-5 border-t border-paper-20 py-8"
            >
              <span className="type-label numeric pt-1 text-chilli">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="type-body max-w-[46ch] text-paper-80">{line}</p>
            </div>
          ))}
        </PinnedSteps>
      </Section>

      {/* 6, Pricing guidance */}
      <Section ground="paper">
        <ScrubReveal y={40} from={0.25}>
          <div className="flex flex-wrap items-end justify-between gap-8 border-b rule-ink pb-10">
            <div>
              <p className="type-label text-chilli">Guide price</p>
              <p className="type-display mt-3 text-maroon">{service.priceFrom}</p>
            </div>
            <p className="type-body max-w-[40ch] text-ink-70">
              A guide, not a quote. Final price depends on size, detail and
              placement, you will have an exact figure before you commit.{" "}
              <Link href="/pricing/" className="text-maroon underline underline-offset-4">
                See full pricing
              </Link>
              .
            </p>
          </div>
        </ScrubReveal>
      </Section>

      {/* 8, FAQ */}
      <Section ground="paper" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="type-label text-chilli">Questions</p>
            <h2 className="type-headline mt-4 max-w-[12ch] text-maroon">
              Before you book
            </h2>
            <Link
              href="/faqs/"
              className="type-label mt-6 inline-block text-ink-50 underline-offset-8 hover:text-maroon hover:underline"
            >
              All studio FAQs
            </Link>
          </div>
          <FaqAccordion items={service.faqs} />
        </div>
      </Section>

      {/* Related services */}
      <Section ground="paper" className="border-t rule-ink pt-0">
        <p className="type-label text-chilli">Also in fine line</p>
        <Reveal stagger={0.08} className="mt-8 grid gap-6 sm:grid-cols-3">
          {others.map((other) => (
            <RevealItem key={other.slug}>
              <Link
                href={`/fine-line-tattoos/${other.slug}/`}
                className="group flex h-full flex-col"
              >
                <div className="aspect-4/3 overflow-hidden bg-maroon-deep">
                  <Image
                    src={other.hero}
                    alt=""
                    width={640}
                    height={480}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-(--ease-brand) group-hover:scale-105"
                  />
                </div>
                <h3 className="type-subhead mt-5 text-maroon">{other.name}</h3>
                <span className="type-label mt-3 text-chilli">
                  View <span aria-hidden="true">&#8599;</span>
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
