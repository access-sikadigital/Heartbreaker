import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

/**
 * Priority services, in the order the scope ranks them: fine line as the
 * pillar, then small/micro, script and flash.
 *
 * Each card leads with the work rather than an icon — the scope names the
 * gallery strip as the single most persuasive element on any page, and a card
 * showing the actual tattoo sells the service better than a symbol does. The
 * icon stays as a brand marker, sitting over the image.
 *
 * Icons are chosen for what the drawing IS, not what its filename says.
 */
const services = [
  {
    icon: "moth",
    title: "Fine line",
    href: "/fine-line-tattoos/",
    image: "/brand/photography/fine-line/neck-crane.jpg",
    alt: "Fine line sunburst across a shoulder",
    copy: "Delicate, precise work built to age well. The studio's signature, and the reason most people come.",
  },
  {
    icon: "sun",
    title: "Small & micro",
    href: "/fine-line-tattoos/small-tattoos/",
    image: "/brand/photography/small-micro/legs-foliage.jpg",
    alt: "Small wrist tattoo",
    copy: "Something quiet, on your terms. The classic first piece, and rarely the last.",
  },
  {
    icon: "bookings",
    title: "Script & lettering",
    href: "/fine-line-tattoos/script-lettering/",
    image: "/brand/photography/script-lettering/back-script.jpg",
    alt: "Hand-drawn script on a shoulder",
    copy: "Custom script drawn by hand. A word, a date, a line worth carrying.",
  },
  {
    icon: "flash",
    title: "Flash days",
    href: "/flash/",
    image: "/brand/photography/small-micro/urban-pair.jpg",
    alt: "Client at a flash day",
    copy: "Limited designs, drawn once and tattooed once. When they're gone, they're gone.",
  },
];

export function Services() {
  return (
    <Section id="services" ground="paper" className="border-t rule-ink">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="type-label text-chilli">What we do</p>
          <h2 className="type-headline mt-4 max-w-[14ch] text-maroon">
            Fine line tattoos, done properly
          </h2>
        </div>
        <Link
          href="/fine-line-tattoos/"
          className="type-button border border-maroon px-6 py-3 text-maroon transition-colors duration-(--duration-fast) hover:bg-maroon hover:text-offwhite"
        >
          All services
        </Link>
      </header>

      {/*
        One card per row below 576px, 2x2 from 576px, four across from 1024px.

        The aspect ratio steps with the column count rather than staying at 4:5
        everywhere. A 4:5 card at full phone width is 470px of photograph before
        the heading even starts, which is what made the section feel like a
        slideshow; the portrait crop only earns its height once the card is one
        of four in a row.
      */}
      <Reveal
        stagger={0.09}
        className="mt-14 grid gap-6 xs:grid-cols-2 lg:grid-cols-4"
      >
        {services.map((service) => (
          <RevealItem key={service.href}>
            <Link href={service.href} className="group flex h-full flex-col">
              <div className="relative aspect-16/10 overflow-hidden bg-maroon-deep xs:aspect-4/3 md:aspect-4/5">
                <Image
                  src={service.image}
                  alt={service.alt}
                  width={640}
                  height={800}
                  /* Must track the column count above, or Next serves a source
                     sized for the wrong layout and the card looks soft. */
                  sizes="(max-width: 575px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  className="h-full w-full object-cover transition-transform duration-[1100ms] ease-(--ease-brand) group-hover:scale-[1.06]"
                />
                <span className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center bg-offwhite">
                  <Icon name={service.icon} size={28} />
                </span>
              </div>

              <h3 className="type-subhead mt-6 text-maroon">{service.title}</h3>
              <p className="type-body mt-3 text-ink-70">{service.copy}</p>
              <span className="type-label mt-auto pt-5 text-chilli">
                Explore <span aria-hidden="true">&#8599;</span>
              </span>
            </Link>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
