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
              className="h-auto w-[176px] sm:w-[240px] lg:w-[264px] xl:w-[300px]"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {primaryNav.map((link) => (
              <Link key={link.href} href={link.href} className="group relative">
                <span className="type-label">{link.label}</span>
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-chilli transition-transform duration-(--duration-fast) ease-(--ease-brand) group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Magnetic className="hidden sm:block">
              <CtaLink href={primaryCta.href}
                className="type-button border border-offwhite px-5 py-2.5 transition-colors duration-(--duration-fast) hover:bg-offwhite hover:text-maroon"
              >
                {primaryCta.label}
              </CtaLink>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
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
            className="on-dark fixed inset-0 z-40 flex flex-col justify-between bg-maroon px-6 pt-(--header-h) pb-10 lg:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile" className="mt-10 flex flex-col gap-1">
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
                    className="type-display block py-2 text-offwhite"
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
              <CtaLink href={primaryCta.href}
                onClick={() => setOpen(false)}
                className="type-button flex items-center justify-center border border-offwhite px-6 py-4"
              >
                {primaryCta.label}
              </CtaLink>

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
