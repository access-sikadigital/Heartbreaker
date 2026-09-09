"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { SplitLines } from "@/components/motion/SplitLines";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { primaryCta } from "@/data/navigation";
import { site } from "@/data/site";
import { colors } from "@/lib/tokens";

/**
 * Homepage hero.
 *
 * Layered rather than flat: a blurred portrait behind, the lockup and promise
 * in front, and an arch-framed piece of work to the side. Every layer is
 * scrubbed at a different rate, so the hero comes apart as you leave it instead
 * of simply scrolling away — the depth is what stops it reading as a static
 * banner.
 *
 * The arch frame is doing real work here: it reads as a doorway into the
 * studio, and it is the one soft shape in an identity built from hard edges.
 */
export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const scrub = (selector: string, vars: gsap.TweenVars, from: gsap.TweenVars) =>
        gsap.fromTo(root.querySelectorAll(selector), from, {
          ...vars,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

      // Background settles back and drifts down — slowest layer.
      scrub("[data-hero-bg]", { scale: 1, yPercent: 12 }, { scale: 1.14, yPercent: 0 });
      // Content leaves faster than the ground behind it.
      scrub("[data-hero-content]", { yPercent: -18, opacity: 0.15 }, { yPercent: 0, opacity: 1 });
      // The arch rises against everything else.
      scrub("[data-hero-arch]", { yPercent: -26 }, { yPercent: 6 });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      data-ink-color={colors.offwhite}
      className="on-dark relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-ink pt-(--header-h) text-offwhite"
    >
      <div data-hero-bg className="absolute inset-0 -z-20 will-change-transform">
        <Image
          src="/brand/photography/placeholder-18.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-85"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/55"
      />

      <div className="container-wide grid gap-12 pb-14 md:pb-20 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-16">
        <div data-hero-content>
          <Image
            src="/brand/logo/brandmark-white.svg"
            alt=""
            width={550}
            height={521}
            priority
            className="mb-7 h-auto w-[52px] md:w-[66px]"
          />

          <Image
            src="/brand/logo/primary-offwhite.svg"
            alt={site.name}
            width={830}
            height={53}
            priority
            className="h-auto w-full max-w-[54rem]"
          />

          <SplitLines as="h1" className="type-headline-sm mt-9 max-w-[20ch]" immediate>
            A fine line tattoo studio on the Mornington Peninsula
          </SplitLines>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              href={primaryCta.href}
              className="type-button inline-flex items-center gap-3 border border-offwhite px-8 py-4 transition-colors duration-(--duration-fast) hover:bg-offwhite hover:text-ink"
            >
              {primaryCta.label}
              <span aria-hidden="true">&#8599;</span>
            </Link>
            <Link
              href="/gallery/"
              className="type-label text-paper-60 underline-offset-8 transition-colors hover:text-chilli hover:underline"
            >
              See the work
            </Link>
          </div>
        </div>

        {/* Arch-framed piece — the doorway into the studio. */}
        <div data-hero-arch className="hidden justify-self-end lg:block">
          <ArchFrame rise="50%" className="w-[19rem] bg-maroon-deep">
            <Image
              src="/brand/photography/placeholder-10.jpg"
              alt="Fine line work across a shoulder"
              width={760}
              height={1000}
              sizes="19rem"
              className="aspect-3/4 w-full object-cover"
            />
          </ArchFrame>
        </div>
      </div>

      <div className="container-wide flex items-center justify-between border-t border-paper-20 py-5">
        <p className="type-label text-paper-60">
          {site.contact.location} &middot; by appointment
        </p>
        <p className="type-label hidden text-paper-60 sm:block">
          Scroll <span aria-hidden="true">&#8600;</span>
        </p>
      </div>
    </section>
  );
}
