# Heartbreaker Ink

Front end for Heartbreaker Ink, a fine line tattoo studio in Mornington,
Victoria. Next.js App Router, TypeScript, Tailwind v4, GSAP + Lenis + Motion.

**Status: homepage built.** Tokens, fonts, brand assets and motion primitives
are wired. Header, footer and the full homepage are done. The remaining 24 URLs
from the sitemap are not built yet.

Everything follows **"Heartbreaker Ink — Keyword Map & Sitemap"**
(Sika Digital, 4 Sep 2026). That workbook is the source of truth for the URL
structure, the target keyword on each page, and the positioning. Where the
brand mockups and that document disagree, the document wins — it is why the
domain here is `heartbreakerink.com` and the location is Mornington, not the
`.com.au` and "Lorne" that appear on mockup artwork.

## Routes

| Route | Target keyword | Vol / KD |
|---|---|---|
| `/` | fine line tattoo shops | 2,900 / 26 |
| `/reference` | — | Setup reference, `noindex`. Delete at launch. |

The homepage composes ten sections from `src/components/sections/`. The
remaining sitemap URLs are listed in `src/data/navigation.ts`.

---

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The page that loads is
`src/app/page.tsx` — a setup reference showing every token, typeface, logo,
icon and motion primitive on one screen. If something is wired wrong it shows up
there. **Delete that file when the real homepage lands.**

| Script | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | Typecheck then lint — run before every commit |

Verified on Node 22 with `next build`, `tsc --noEmit` and `eslint` all clean.

---

## Where things live

```
src/
  app/            Routes, root layout, globals.css, generated icons + OG images
  assets/fonts/   Bold Money + Lenia Mono (woff2, plus the original otf/ttf)
  components/
    layout/       Header, Footer, persistent chrome        (empty — see README)
    motion/       Reveal, SplitLines, Marquee, Parallax, Magnetic, Counter
    providers/    SmoothScroll (Lenis on the GSAP ticker)
    sections/     One file per page section                (empty — see README)
    ui/           Logo, Icon, Button, Section
  data/
    brand.ts      Icon registry + lockup registry (generated from public/brand)
    site.ts       Site-wide copy and contact details
  hooks/          useMediaQuery, useReducedMotion, useIsomorphicLayoutEffect
  lib/
    fonts.ts      next/font/local setup
    gsap.ts       Plugin registration + brand easings
    motion.ts     Shared Motion variants
    tokens.ts     Design tokens mirrored in TypeScript
    utils.ts      cn(), clamp, lerp, mapRange, slugify
  types/          SVGR module declarations

public/brand/
  logo/           37 SVGs — 5 lockups × colourways, plus currentColor versions
  icons/          18 icons as currentColor SVG + manifest.json
  pattern/        The brand pattern, rebuilt (see below)
  mockups/        33 design references, grouped by surface
  photography/    18 PLACEHOLDERS — unlicensed, replace before launch
  video/          Empty. The asset drop contains no video.
```

---

## Design tokens

`src/app/globals.css` is the single source of truth. Tokens are declared in a
Tailwind v4 `@theme` block, so every one is available as a utility class
(`bg-maroon`, `text-chilli`, `type-hero`) *and* as a CSS custom property.

`src/lib/tokens.ts` mirrors them for the places CSS cannot reach — GSAP tweens,
canvas, `theme-color`, generated OG images. **Change a value in one, change it
in the other.**

### Colour

Four hues. There is no secondary palette.

| Token | Hex | PMS | Role |
|---|---|---|---|
| `maroon` | `#570B0B` | 490 C | Leads. Carries the most visual weight. |
| `chilli` | `#DE0202` | 032 C | Accent. One job per composition. |
| `offwhite` | `#F2F1EE` | Warm Gray 1 C | Breathing room. The light ground. |
| `ink` | `#262626` | Black 7 C | Type and fine detail. Not large fields. |

Tints are `color-mix` over those four — `ink-70`, `paper-20`, `chilli-30` and so
on. No new colour ever enters the system.

Only five ground/type pairings are approved. `<Section ground="…">` sets the
type colour along with the ground, so an unapproved pairing can't be typed by
accident.

### Typography

| | Face | Where |
|---|---|---|
| Display | **Bold Money** | Headlines, key brand messaging |
| Everything else | **Lenia Mono** | Sub-headings, body, buttons, labels |

Both ship a **single weight**. There is no bold, no light. Build emphasis from
case, colour and scale — never `font-weight`.

Use the type-role utilities rather than composing sizes by hand:
`type-hero`, `type-display`, `type-headline`, `type-headline-sm`,
`type-subhead`, `type-lead`, `type-body`, `type-button`, `type-label`.

Two rules that are easy to lose:

- **2% tracking at every level**, body copy included. It's what gives the mono
  its engineered feel. `--tracking-brand` is applied on `body`; don't override
  it to `0`.
- **Caps everywhere except body.** The guidelines table says "Title Case", but
  every specimen and every mockup is set in caps. The artwork wins.

---

## Motion

Three libraries, with a clear split. Keeping to it stops two libraries
animating the same property.

| Library | Owns |
|---|---|
| **GSAP** + ScrollTrigger | Anything bound to scroll position — reveals, parallax, pinning, split text |
| **Motion** | Component and gesture work — menus, hovers, layout animation, page transitions |
| **Lenis** | Smooth scrolling, and nothing else |

Lenis runs on the **GSAP ticker**, so both share one `requestAnimationFrame`
loop. Running two loops is the usual cause of jittery pinned sections — don't
add a second `lenis.raf()` anywhere.

GSAP's former premium plugins (SplitText, DrawSVG, ScrollSmoother) ship in the
public package as of 3.13, so no auth token is needed. `registerGsap()` in
`src/lib/gsap.ts` registers everything once and defines the brand easings
(`brand`, `brand-in`, `brand-out`, `snap`) so GSAP and CSS agree on feel.

**Reduced motion is handled globally.** `globals.css` neutralises the animation
primitives, `prefersReducedMotion()` guards the imperative code, and Lenis is
never constructed at all. Individual components don't need to branch.

### The primitives

| Component | What it does |
|---|---|
| `InkCursor` | Ink stroke that follows the pointer and drains behind it. Width comes from pointer **velocity** — slow pools thick, fast thins to a hairline. Mounted in the root layout. |
| `ScrubReveal` | Reveal tied to scroll **position**, not fired once. Reverses when you scroll back. |
| `StackCards` | Cards ride up and stack over one another, each scrubbed. Testimonials. |
| `ScrollCurtain` | The last section lifts away to uncover a panel behind it. Footers. |
| `SplitLines` | Masked line-by-line reveal for display type. Re-splits on resize. |
| `Parallax` | Scrubbed parallax on media. Wrap images, never whole sections. |
| `Marquee` | Seamless CSS ticker. Runs without a scroll trigger. |
| `Magnetic` | Pulls an element toward the cursor. Primary CTAs only. |
| `Counter` | Counts up on entry. Renders the final value server-side. |
| `Reveal` | One-shot fade-up entrance, with optional stagger. |
| `ArchFrame` | Flat-sided, round-topped portal frame for portraits. |

**Scrubbed vs one-shot** is the decision that sets the tone. Wonderkin scrubs
everything and pins nothing, which is why it reads composed — the page moves
exactly as much as you scroll it. `Reveal` pops instead, which is louder. Use
`ScrubReveal` for the calm editorial sections and `Reveal` where you want the
hit.

### On jarallax and lazyload

Deliberately **not** installed, because both are already covered here:

- **jarallax** — Wonderkin runs it on exactly one element. `Parallax` does the
  same job through ScrollTrigger, and adding jarallax would put a second scroll
  listener alongside Lenis, which is what causes drifting and jitter.
- **lazyload** — `next/image` lazy-loads natively and also gives responsive
  `srcset`, AVIF/WebP and no layout shift, none of which a lazyload script does.

Those libraries earn their place on a jQuery site with no framework. Here they
would each be a second implementation of something already in the stack.

---

## Brand assets

### Logos

Five lockups: `primary`, `secondary`, `brandmark`, `full-stack-1`,
`full-stack-2`. The Brand Identity PDF shows four — the asset library splits
Full Stack in two, and five is correct.

Each ships in fixed colours (`primary-maroon.svg`) **and** a `currentColor`
version (`primary.svg`). Prefer the `currentColor` one and colour it with a
text utility.

`brandmark.svg` is two-tone and driven by `--mark-fg` (line art) and
`--mark-bg` (body).

Clearspace is the caller's job: **one third** of the wordmark's height around
wordmark lockups, **one half** around the brandmark. Minimum sizes are in
`logoMinSize`.

### Icons

Eighteen, all ported as `currentColor` so a text utility colours them.

**The labels are functional, not descriptive.** "Bookings" is a diamond,
"Healed" is a rose, "Policy" is a leopard, "Events" is a pair of dice. The brand
reuses them freely — the website mockup labels the rose "Touch-ups" and the dice
"Custom Tattoos". Pick by what reads right, not by filename. `src/data/brand.ts`
records what each one actually depicts.

### Pattern

`public/brand/pattern/pattern-tile.svg` — **rebuilt, not supplied.** The
guidelines specify the pattern on p.30 and it appears on packaging, but the
asset drop ships no file. It was reconstructed from the logo artwork as a
seamless tile: elements are drawn either side of the tile so the repeat has no
seam. Recolour with `--pat-ground`, `--pat-mark`, `--pat-body`, or use the
`surface-pattern` utility.

---

## Before this goes live

Carried over from the brand audit. None block development; all block launch.

- [ ] **Replace every photograph.** Everything in `public/brand/photography` is
      unlicensed mood scrap with hash filenames and no releases.
- [ ] **Confirm the Instagram handle** — `@heartbreakerink_` on most artwork,
      `@heartbreakerink` on the business card.
- [ ] **Confirm the domain** — three variants appear across three mockups:
      `heartbreakerink.com`, `heartbreaker.com.au`, `heartbreakerink.com.au`.
- [ ] **Get the real phone number.** The business card reads `0123 456 789`.
- [ ] **Fill in `src/data/site.ts`** — phone and email are deliberately empty.
- [ ] **Turn indexing on.** `robots` in `src/app/layout.tsx` is set to
      `noindex` while the site is unbuilt.
- [ ] **Delete `src/app/page.tsx`** once the real homepage exists.
- [ ] Confirm the Title Case vs ALL CAPS reading with Full Cup if a
      client-facing deliverable depends on it.

---

Identity by Full Cup Design Studio, 2026.
