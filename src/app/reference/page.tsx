import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Parallax } from "@/components/motion/Parallax";
import { Magnetic } from "@/components/motion/Magnetic";
import { ScrubReveal } from "@/components/motion/ScrubReveal";
import { StackCards } from "@/components/motion/StackCards";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { colorSpec, logoMinSize } from "@/lib/tokens";
import { functionalIcons, flashIcons, lockups } from "@/data/brand";
import { site } from "@/data/site";

export const metadata = {
  title: "Setup reference",
  robots: { index: false, follow: false },
};

/**
 * Setup reference page.
 *
 * Lives at /reference. This exists so every token, typeface, asset and motion
 * primitive in the scaffold renders on one screen — if something is wired
 * wrong, it shows up here rather than three weeks into the build.
 *
 * Keep it for the life of the build; delete it at launch.
 */
export default function SetupReference() {
  return (
    <>
      {/* ---------------------------------------------------------- masthead */}
      <Section ground="maroon" width="wide" className="pt-24 pb-16">
        <p className="type-label text-chilli">Scaffold · not the homepage</p>

        <SplitLines as="h1" className="type-hero mt-6 max-w-[16ch]" immediate>
          Setup reference
        </SplitLines>

        <p className="type-lead mt-8 max-w-[62ch] text-paper-80">
          Every design token, typeface, brand asset and motion primitive in this
          project, rendered once. If something here looks wrong, the scaffold is
          wrong.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <Button variant="inverse" size="lg">
              Primary action
            </Button>
          </Magnetic>
          <Button variant="ghost" size="lg" className="text-offwhite hover:text-chilli">
            Secondary
          </Button>
        </div>
      </Section>

      {/* ------------------------------------------------------------ ticker */}
      <div className="bg-maroon-deep py-3 text-offwhite">
        <Marquee duration={38}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="type-label px-8 whitespace-nowrap">
              {site.ticker} · {site.tagline} · {site.contact.location}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ------------------------------------------------------------ colour */}
      <Section id="colour" ground="paper">
        <SectionHead index="02" title="Colour" note="Four hues. No secondary palette." />

        <Reveal stagger={0.07} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(colorSpec).map(([key, spec]) => (
            <RevealItem key={key} className="border border-ink-12">
              <div
                className="h-28 border-b border-ink-12"
                style={{ background: spec.hex }}
              />
              <div className="p-4">
                <h3 className="type-subhead text-[1rem]">{spec.name}</h3>
                <dl className="numeric mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[0.75rem]">
                  <dt className="text-ink-50">HEX</dt>
                  <dd>{spec.hex}</dd>
                  <dt className="text-ink-50">RGB</dt>
                  <dd>{spec.rgb.join(" / ")}</dd>
                  <dt className="text-ink-50">CMYK</dt>
                  <dd>{spec.cmyk.join(" / ")}</dd>
                  <dt className="text-ink-50">PMS</dt>
                  <dd>{spec.pms}</dd>
                </dl>
                <p className="mt-3 text-[0.75rem] leading-relaxed text-ink-70">
                  {spec.role}
                </p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      {/* -------------------------------------------------------- typography */}
      <Section id="type" ground="paper" className="border-t rule-ink pt-0">
        <SectionHead
          index="03"
          title="Typography"
          note="Bold Money for display, Lenia Mono for everything else. One weight each."
        />

        <div className="mt-10 divide-y divide-ink-12 border-y rule-ink">
          <TypeRow role="Hero · Bold Money" cls="type-hero">
            Fine line tattoos
          </TypeRow>
          <TypeRow role="Headline · Bold Money" cls="type-headline">
            Get your tatts out
          </TypeRow>
          <TypeRow role="Headline small · Lenia Mono" cls="type-headline-sm">
            Join me for some wines &amp; fine lines
          </TypeRow>
          <TypeRow role="Sub heading · Lenia Mono" cls="type-subhead">
            Saturday 22nd November
          </TypeRow>
          <TypeRow role="Body · Lenia Mono · the only mixed-case role" cls="type-body">
            {site.description}
          </TypeRow>
          <TypeRow role="Label · Lenia Mono" cls="type-label">
            Now booking · Lorne, Victoria
          </TypeRow>
        </div>

        <p className="type-body mt-6 max-w-[68ch] text-ink-70">
          The guidelines table says Title Case, but every specimen and every
          mockup is set in caps. The artwork wins — caps at every level except
          body.
        </p>
      </Section>

      {/* ------------------------------------------------------------- logos */}
      <Section id="logo" ground="ink">
        <SectionHead
          index="01"
          title="Logo suite"
          note="Five lockups. The PDF shows four — the asset library splits Full Stack in two."
          onDark
        />

        <div className="mt-10 grid gap-px border border-paper-20 bg-paper-20 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(lockups).map(([key, meta]) => (
            <div key={key} className="bg-ink p-8">
              <div className="flex h-24 items-center">
                <Logo
                  lockup={key as keyof typeof lockups}
                  colour="offwhite"
                  width={key === "brandmark" ? 70 : 230}
                />
              </div>
              <h3 className="type-label mt-6 text-chilli">{meta.label}</h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-paper-60">
                {meta.use}
              </p>
              <p className="numeric mt-3 text-[0.6875rem] text-paper-40">
                Min{" "}
                {logoMinSize[
                  key === "primary"
                    ? "primary"
                    : key === "full-stack-1"
                      ? "fullStack1"
                      : key === "brandmark"
                        ? "brandmark"
                        : "stacked"
                ]}
                mm
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------- icons */}
      <Section id="icons" ground="paper">
        <SectionHead
          index="04"
          title="Iconography"
          note="Eighteen icons, ported as currentColor. Labels are functional, not descriptive."
        />

        <h3 className="type-label mt-10 text-ink-50">Functional set</h3>
        <Reveal
          stagger={0.04}
          className="mt-4 grid grid-cols-3 gap-px border border-ink-12 bg-ink-12 sm:grid-cols-5 lg:grid-cols-9"
        >
          {functionalIcons.map((icon) => (
            <IconCell key={icon.slug} {...icon} />
          ))}
        </Reveal>

        <h3 className="type-label mt-10 text-ink-50">Flash set</h3>
        <Reveal
          stagger={0.04}
          className="mt-4 grid grid-cols-3 gap-px border border-ink-12 bg-ink-12 sm:grid-cols-5 lg:grid-cols-9"
        >
          {flashIcons.map((icon) => (
            <IconCell key={icon.slug} {...icon} />
          ))}
        </Reveal>
      </Section>

      {/* ----------------------------------------------------------- pattern */}
      <Section ground="pattern" width="wide" className="grain">
        <SectionHead
          index="06"
          title="Pattern"
          note="Rebuilt from the logo art. The guidelines specify it; the asset drop ships no file."
          onDark
        />
        <div className="mt-10 h-40" />
      </Section>

      {/* ------------------------------------------------------- photography */}
      <Section id="imagery" ground="paper">
        <SectionHead
          index="05"
          title="Imagery"
          note="Placeholders only — the inspiration folder is unlicensed. Replace before launch."
        />

        <Reveal stagger={0.08} className="mt-10 grid gap-4 sm:grid-cols-3">
          {["01", "05", "12"].map((n) => (
            <RevealItem key={n}>
              <Parallax speed={0.14} className="aspect-4/5">
                <Image
                  src={`/brand/photography/placeholder-${n}.jpg`}
                  alt=""
                  width={800}
                  height={1000}
                  className="h-[120%] w-full object-cover"
                />
              </Parallax>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------ motion */}
      <Section id="motion" ground="ink">
        <SectionHead
          index="08"
          title="Motion"
          note="Scrub-linked, not play-once. The page moves as much as you scroll it, and reverses."
          onDark
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <ScrubReveal y={80} from={0.15} className="max-w-[46ch]">
            <p className="type-lead text-paper-80">
              Every scroll animation on this scaffold is tied to scroll
              position rather than fired once on entry. Drag the page back and
              it plays backwards — that reversibility is what separates
              composed motion from a slideshow.
            </p>
            <p className="type-body mt-5 text-paper-60">
              Move the pointer anywhere on the page to draw. The stroke thickens
              when you slow down and thins when you flick.
            </p>
          </ScrubReveal>

          <div>
            <p className="type-label mb-4 text-chilli">Stacking cards</p>
            <StackCards className="flex flex-col gap-5">
              {[
                "From the first consultation to the final result, everything felt so thoughtful and calm.",
                "The fine line work is stunning — exactly what I imagined, only better.",
                "Clean studio, zero pressure, and a piece I will keep looking at for years.",
              ].map((quote, i) => (
                <figure
                  key={i}
                  className="border border-paper-20 bg-maroon-deep p-7"
                >
                  <blockquote className="type-body text-paper-80">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                  <figcaption className="type-label mt-4 text-paper-40">
                    Client testimonial · placeholder copy
                  </figcaption>
                </figure>
              ))}
            </StackCards>
          </div>
        </div>

        <div className="mt-14">
          <p className="type-label mb-4 text-chilli">Arch frame</p>
          <div className="grid gap-5 sm:grid-cols-3">
            {["03", "08", "15"].map((n) => (
              <ArchFrame key={n} rise="50%" className="bg-maroon-deep">
                <Image
                  src={`/brand/photography/placeholder-${n}.jpg`}
                  alt=""
                  width={600}
                  height={800}
                  className="aspect-3/4 w-full object-cover"
                />
              </ArchFrame>
            ))}
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------- close */}
      <Section ground="maroon" width="wide" className="py-16">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Logo lockup="full-stack-2" colour="offwhite" width={260} />
          <p className="type-label max-w-[36ch] text-paper-60">
            Scaffold only. No sections built yet — start in{" "}
            <code className="text-chilli">src/components/sections</code>.
          </p>
        </div>
      </Section>
    </>
  );
}

/* ------------------------------------------------------------- local bits -- */

function SectionHead({
  index,
  title,
  note,
  onDark = false,
}: {
  index: string;
  title: string;
  note: string;
  onDark?: boolean;
}) {
  return (
    <header className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
      <span className={onDark ? "type-label text-chilli" : "type-label text-chilli"}>
        {index}
      </span>
      <h2 className="type-headline">{title}</h2>
      <p
        className={`type-body ml-auto max-w-[46ch] text-[0.8125rem] ${
          onDark ? "text-paper-60" : "text-ink-70"
        }`}
      >
        {note}
      </p>
    </header>
  );
}

function TypeRow({
  role,
  cls,
  children,
}: {
  role: string;
  cls: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 py-7 md:grid-cols-[13rem_1fr] md:gap-8">
      <p className="type-label pt-2 text-ink-50">{role}</p>
      <p className={`${cls} text-maroon`}>{children}</p>
    </div>
  );
}

function IconCell({
  slug,
  label,
  depicts,
}: {
  slug: string;
  label: string;
  depicts: string;
}) {
  return (
    <div className="group flex flex-col items-center gap-2 bg-offwhite p-4 text-center">
      <Icon
        name={slug}
        size={44}
        className="transition-transform duration-(--duration-fast) ease-(--ease-brand) group-hover:-translate-y-1"
      />
      <span className="type-label mt-1 text-ink">{label}</span>
      <span className="text-[0.625rem] leading-tight text-ink-50">{depicts}</span>
    </div>
  );
}
