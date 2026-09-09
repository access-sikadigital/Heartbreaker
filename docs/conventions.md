# Conventions

## Components

- **`ui/`** — presentational primitives with no page-specific knowledge.
- **`motion/`** — animation wrappers. A section should reach for these rather
  than importing GSAP directly.
- **`sections/`** — one file per page section. Composes `ui/` and `motion/`.
- **`layout/`** — chrome that persists across routes.
- **`providers/`** — context providers mounted in the root layout.

Named exports, not default. One component per file, filename matches.

## Styling

Tailwind utilities first. Reach for `globals.css` only when adding a token or a
new `@utility`, and add tokens to `src/lib/tokens.ts` at the same time.

Never hard-code a hex value in a component. If a colour isn't in the palette it
doesn't belong on the page.

Wrap sections in `<Section ground="…">` rather than setting background and text
colour by hand — the component only allows approved pairings.

## Animation

Never animate the same property with two libraries. The split:

- Scroll-bound → GSAP + ScrollTrigger
- Gesture, layout, presence → Motion
- Smooth scrolling → Lenis, on the GSAP ticker

Use `useGSAP()` with a `scope` rather than raw `useEffect` — it handles cleanup
and reverts tweens on unmount.

Guard imperative motion with `prefersReducedMotion()`. The CSS primitives are
already handled globally.

## Images

Always `next/image`. Brand SVGs are cached immutably by a header rule in
`next.config.ts`, so a changed asset needs a changed filename.

For an icon that should inherit text colour, import it through SVGR:

```tsx
import Flash from "@/../public/brand/icons/flash.svg";
<Flash className="size-10 text-chilli" />
```

For a fixed colour, `<Icon name="flash" />` is cheaper.

## Before committing

```bash
npm run check
```

Typecheck and lint both have to be clean. React 19's rules are strict about
`setState` in effects, refs read during render, and components created during
render — those are real bugs, so fix them rather than disabling the rule.
