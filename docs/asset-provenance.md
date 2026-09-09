# Asset provenance

Where every file in `public/brand` and `src/assets` came from, and what was
changed on the way in. Source is the client drop at
`Heart Breakers/NEW Brand Guidelines`, with the 46-page
`Heartbreaker Ink _ Brand Identity.pdf` as the fallback authority.

Precedence rule applied throughout: **the asset library wins; the PDF fills
gaps.**

## Fonts — `src/assets/fonts`

| Shipped | From | Change |
|---|---|---|
| `BoldMoney.woff2` (22 KB) | `02_Tyopgraphy/Bold Money/BOLDMONEY.otf` (44 KB) | Converted to woff2 |
| `LeniaMono-Medium.woff2` (31 KB) | `02_Tyopgraphy/Lenia Mono/LeniaMono-Medium.ttf` (81 KB) | Converted to woff2 |
| `source/*` | as above | Originals kept for designers |

Internal names: `BOLDMONEY` / subfamily `Bold`, and `Lenia Mono Medium`
(typographic family `Lenia Mono`). One weight each — confirmed by reading the
font name tables, not the filenames.

## Logos — `public/brand/logo`

From `01_Logosuite/RGB [Digital]`. 37 files.

- Colourway numbers were resolved to names by reading the actual fill values,
  not by assuming an order: `1 → maroon`, `2 → chilli`, `3 → offwhite`,
  `4 → ink`.
- **The brandmark does not follow that mapping.** Its six SVG colourways were
  identified by rendering them: `1/2/4` are coloured line art on an off-white
  body, `3/5/6` are a solid coloured bird with an off-white halo. Named
  `-maroon` / `-chilli` / `-ink` and `-maroon-solid` / `-chilli-solid` /
  `-ink-solid` accordingly.
- `primary.svg`, `secondary.svg`, `full-stack-1.svg`, `full-stack-2.svg` are
  generated `currentColor` versions — these lockups are single-fill, so the
  substitution is safe.
- `brandmark.svg` is two-tone, so it uses `--mark-fg` / `--mark-bg` instead.
- XML prolog and Illustrator's `id="Capa_1"` stripped from every file.

Not ported: the CMYK set, and the PDF/JPEG colourway lockups. Those are for
print and stay in the client folder. **The CMYK files carry different hex values
(`#561112`, `#DE0A14`) — that is a print separation, not a palette change.**

## Icons — `public/brand/icons`

18 SVGs from `03_Iconography/RGB [Digital]`, each taken from its "colour 4"
(Ink) variant with `fill:#262626` replaced by `fill:currentColor`. Safe because
every icon is single-fill.

`manifest.json` records the slug, the brand's label, what the drawing actually
depicts, and which set it belongs to. `src/data/brand.ts` is generated from it.

The other five colourways per icon were not ported — `currentColor` plus a text
utility covers all of them.

## Pattern — `public/brand/pattern`

**Reconstructed. No source file exists.** Built from `primary-ink.svg` and
`brandmark-maroon.svg` to the description on PDF p.30: chilli wordmark and
swallow, alternating, staggered rows, on a maroon ground.

An 840×400 tile. Every element is drawn at `x−840`, `x` and `x+840` and clipped
to the tile, so anything crossing an edge reappears on the opposite one — that
is what makes the repeat seamless. Verified by rendering a 2×2 grid.

Both files validate as strict XML, which matters: an earlier draft put the
custom property names inside an XML comment, and `--` is illegal there — it
would have failed the moment the file was served as `image/svg+xml`.

## Mockups — `public/brand/mockups`

All 33 from `04_Mockups`, grouped by surface, resized to max 1800 px and
recompressed at quality 82. 14 MB → 12 MB. Design reference for the build.

## Photography — `public/brand/photography`

18 files from `05_Imagery (Inspirational)`, resized to max 2000 px at quality
80. 52 MB → 8.8 MB.

**Prefixed `placeholder-` deliberately.** These have hash filenames, no credits
and no releases — they are mood reference, not licensed photography. Every one
must be replaced before launch.

## Video — `public/brand/video`

Empty. The client drop contains no video of any kind.

## Generated — `src/app`

| File | Built from |
|---|---|
| `icon.svg` | Brandmark on maroon, clearspace a third of the icon, nudged right of centre per PDF p.32 |
| `apple-icon.png` | 180×180 render of the above |
| `opengraph-image.png` | Full Stack 1 in off-white on maroon, chilli rule at the foot |
| `twitter-image.png` | Same artwork |
