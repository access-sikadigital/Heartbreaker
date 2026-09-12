"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { CtaLink } from "@/components/ui/CtaLink";
import { Magnetic } from "@/components/motion/Magnetic";
import { primaryNav, primaryCta, legalNav } from "@/data/navigation";
import { site } from "@/data/site";
import { colors } from "@/lib/tokens";
import { cn } from "@/lib/utils";

/**
 * Site header.
 *
 * Three behaviours, each earning its keep:
 *
 * · Transparent over the hero, solid once past it. The hero carries the logo
 *   reversed out of a photograph; a solid bar there would fight it.
 * · Hides on scroll down, returns on scroll up. On a long editorial page that
 *   buys back the full viewport while reading but keeps Book now one flick away.
 * · The mobile panel stops Lenis while open. Without that the page scrolls
 *   underneath the overlay, which on iOS leaves you somewhere else entirely
 *   when you close it.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { stop, start } = useSmoothScroll();

  /* Scroll state: solidify past the hero, hide when travelling down. */
  useGSAP(
    () => {
      const el = headerRef.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        ScrollTrigger.create({
          start: "top -80",
          end: 99999,
          onUpdate: (self) => setSolid(self.progress > 0),
        });
        return;
      }

      const show = gsap.quickTo(el, "yPercent", { duration: 0.4, ease: "brand" });
      let hidden = false;

      const trigger = ScrollTrigger.create({
        start: "top -120",
        end: 99999,
        onUpdate: (self) => {
          setSolid(self.scroll() > 120);

          // Never hide the bar while the panel is open, or near the top.
          const goingDown = self.direction === 1;
          if (goingDown && !hidden && self.scroll() > 400) {
            hidden = true;
            show(-100);
          } else if (!goingDown && hidden) {
            hidden = false;
            show(0);
          }
        },
      });

      return () => trigger.kill();
    },
    { scope: headerRef },
  );

  /* Lock the page behind the mobile panel. */
  useEffect(() => {
    if (open) stop();
    else start();
    return () => start();
  }, [open, stop, start]);

  /* Escape closes the panel. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        data-ink-color={colors.offwhite}
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-offwhite transition-colors duration-500",
          solid && !open
            ? "bg-maroon/95 backdrop-blur-sm"
            : "bg-transparent",
        )}
      >
        <div className="container-wide flex h-(--header-h) items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${site.name}, home`}
            className="relative z-10 shrink-0"
            onClick={() => setOpen(false)}
          >
            {/*
              Intrinsic size is the lockup's own viewBox; CSS does the sizing.

              The primary lockup is 830x53, a 15.7:1 band, so width is the only
              dimension worth setting and height follows. At 300px it stands
              19px tall inside a 72px bar, which is as large as the lockup can
              go before the brand's own clearspace rule (a third of the mark's
              height above and below) starts to be broken by the bar edges.
            */}
            <Image
              src="/brand/logo/primary-offwhite.svg"
              alt={site.name}
              width={830}
              height={53}
              priority
              /*
                224px on a phone, up from 176px.

                The bar only carries the menu button beside it below 640px, so
                the width was being spent on empty space rather than the
                wordmark. At 224px inside a 335px content box there is still
                70px of clear air before the menu button, which keeps the
                brand's clearspace rule intact.
              */
              className="h-auto w-[224px] sm:w-[260px] xl:w-[248px] 2xl:w-[300px]"
            />
          </Link>

          {/*
            The desktop bar appears at xl (1280), not lg (1024).

            Seven links plus two buttons plus a legible wordmark measures wider
            than a 1024px container can hold. The choices were to drop links,
            shrink the wordmark past the point it reads, or let the row wrap.
            Showing the menu button on a 1024-wide laptop is the least bad of
            the four, and the panel already carries every link plus both calls
            to action.
          */}
          <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex 2xl:gap-9">
            {primaryNav.map((link) => (
              <Link key={link.href} href={link.href} className="group relative">
                <span className="type-label">{link.label}</span>
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-chilli transition-transform duration-(--duration-fast) ease-(--ease-brand) group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/*
              Two calls to action, ranked. "Book now" leaves for the booking
              widget and stays the solid-bordered one; "Contact" is the lower
              commitment route for anyone not ready to pick a date, so it is
              drawn quieter rather than competing.

              Shown with the desktop nav, from xl. Below that the header
              carries Book now plus the menu button, and a third control there
              pushes the logo down to a size where the wordmark stops being
              legible. The panel carries Contact instead.
            */}
            <Link
              href="/contact/"
              className="type-button hidden border border-paper-40 px-5 py-2.5 text-paper-80 transition-colors duration-(--duration-fast) hover:border-offwhite hover:text-offwhite xl:inline-block"
            >
              Contact
            </Link>

            <Magnetic className="hidden sm:block">
              <CtaLink href={primaryCta.href}
                className="type-button btn-fill inline-block px-5 py-2.5"
              >
                {primaryCta.label}
              </CtaLink>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-[5px] xl:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span
                className={cn(
                  "block h-px w-6 bg-offwhite transition-transform duration-(--duration-fast) ease-(--ease-brand)",
                  open && "translate-y-[3px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-6 bg-offwhite transition-transform duration-(--duration-fast) ease-(--ease-brand)",
                  open && "-translate-y-[3px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-ink-color={colors.offwhite}
            className="on-dark fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-maroon px-6 pt-(--header-h) pb-10 xl:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* py-1.5 rather than py-2: with seven links the panel ran 699px
                against a 667px iPhone SE viewport, and trimming the link
                padding is what gives that back. mt-2 starts the list just
                under the bar instead of floating it a third of the way down. */}
            <nav aria-label="Mobile" className="mt-2 flex flex-col gap-1">
              {primaryNav.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.06,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    /* type-headline, not type-display. Seven links at display
                       scale overflow a 667px phone before the CTAs are even
                       drawn; overflow-y-auto on the panel is the safety net,
                       not the plan. */
                    className="type-headline block py-1.5 text-offwhite"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.34, duration: 0.4 }}
              className="flex flex-col gap-6"
            >
              {/*
                Same filled treatment as the desktop bar. It was a plain
                outlined box here, which put the primary action in the same
                visual weight as the secondary one sitting directly beneath it
                and left the phone with no obvious first choice.
              */}
              <CtaLink href={primaryCta.href}
                onClick={() => setOpen(false)}
                className="type-button btn-fill flex items-center justify-center gap-3 px-6 py-4"
              >
                {primaryCta.label}
                <span aria-hidden="true">&#8599;</span>
              </CtaLink>

              {/* The desktop bar's Contact button, kept reachable on mobile. */}
              <Link
                href="/contact/"
                onClick={() => setOpen(false)}
                className="type-button flex items-center justify-center border border-paper-40 px-6 py-4 text-paper-80"
              >
                Contact
              </Link>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="type-label text-paper-60 hover:text-chilli"
                >
                  {site.social.instagramHandle}
                </a>
                <div className="flex gap-5">
                  {legalNav.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="type-label text-paper-40 hover:text-chilli"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
