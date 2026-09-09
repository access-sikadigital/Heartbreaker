# Sections

One file per page section — `Hero.tsx`, `Portfolio.tsx`, `Services.tsx`,
`Booking.tsx`. Each composes `ui/` and `motion/` primitives; none should reach
for GSAP or Motion directly unless it is doing something the primitives do not
already cover.

Wrap every section in `<Section ground="…">` so it can only land on one of the
five approved colour pairings.

Start here when the build begins. The website mockups in
`public/brand/mockups/website` are the reference to match.
