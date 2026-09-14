import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";
import { colors } from "@/lib/tokens";
import { MOTION_ENABLED } from "@/lib/motion-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name}, ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    title: `${site.name}, ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  // Nothing is live yet. Flip this on at launch.
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: colors.maroon,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /*
      `data-motion="off"` drives the CSS half of the site-wide motion switch.
      It is set here rather than from an effect so the attribute is in the
      server-rendered HTML: set it later and the page would paint its
      animated-from state first, which is the flash the switch exists to avoid.
    */
    <html
      lang={site.locale}
      className={fontVariables}
      data-motion={MOTION_ENABLED ? undefined : "off"}
    >
      <body className="bg-offwhite text-ink antialiased">
        <a
          href="#main"
          className="type-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-maroon focus:px-5 focus:py-3 focus:text-offwhite"
        >
          Skip to content
        </a>

        <SmoothScroll>
          {/*
            Ink cursor is parked, not deleted. The stroke profile still needs
            work, velocity and the tail taper compound into a blob rather than
            an even brush. Re-enable with <InkCursor /> once that is fixed.
          */}
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
