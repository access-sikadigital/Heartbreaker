import localFont from "next/font/local";

/**
 * Heartbreaker Ink typography — Brand Identity, section 03.
 *
 * Bold Money — display only. Headlines and key brand messaging.
 * Lenia Mono — everything else: sub-headings, body, buttons, labels.
 *
 * Both ship as a SINGLE weight. There is no light, regular or extra-bold cut,
 * so never ask the browser to synthesise one — build emphasis from case,
 * colour and scale instead. `adjustFontFallback` is off because a synthetic
 * metric match against Arial Black misreports Bold Money's extended width.
 */

export const boldMoney = localFont({
  src: [{ path: "../assets/fonts/BoldMoney.woff2", weight: "400", style: "normal" }],
  variable: "--font-bold-money",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
  fallback: ["Arial Black", "Helvetica Neue", "Impact", "sans-serif"],
});

export const leniaMono = localFont({
  src: [
    { path: "../assets/fonts/LeniaMono-Medium.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-lenia-mono",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});

/** Both font variables, ready to spread onto <html>. */
export const fontVariables = `${boldMoney.variable} ${leniaMono.variable}`;
