import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { TextScrub } from "@/components/motion/TextScrub";

/** Target: "tattoo gift voucher" — 90/mo, KD 3. A free win and a revenue line. */
export const metadata: Metadata = {
  title: "Tattoo Gift Vouchers | Heartbreaker Ink, Mornington",
  description:
    "Gift vouchers for fine line tattoo work on the Mornington Peninsula. Any amount, no expiry pressure, and they choose their own piece.",
  alternates: { canonical: "/gift-vouchers/" },
};

export default function GiftVouchersPage() {
  return (
    <>
      <PageHero
        eyebrow="Gift vouchers"
        heading="Give the sitting, not the design"
        intro="A voucher covers the session. They pick the piece, the placement and the date — which is the only sensible way to gift a tattoo."
        trail={[{ label: "Gift vouchers", href: "/gift-vouchers/" }]}
      />

      <Section ground="paper">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <TextScrub as="p" className="type-lead max-w-[44ch] text-maroon">
              Never choose someone else&rsquo;s tattoo for them. A voucher gives
              them the room to work it out properly, with the awkward part —
              paying — already handled.
            </TextScrub>

            <ul className="mt-12 flex flex-col">
              {[
                "Any amount. Most people cover a small piece or put it toward something larger.",
                "Redeemable against any service, including flash days.",
                "Sent as a printable card, or posted if you would rather hand it over.",
                "Booked like any other session, whenever they are ready.",
              ].map((line) => (
                <li key={line} className="type-body border-t rule-ink py-5 text-ink-70">
                  {line}
                </li>
              ))}
            </ul>

            <Link
              href="/contact/"
              className="type-button mt-10 inline-flex items-center gap-3 border border-maroon px-8 py-4 text-maroon transition-colors duration-(--duration-fast) hover:bg-maroon hover:text-offwhite"
            >
              Order a voucher
              <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>

          <ImageReveal className="aspect-4/5">
            <Image
              src="/brand/mockups/packaging/packaging-02.png"
              alt="Heartbreaker Ink gift card"
              width={900}
              height={1125}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="h-full w-full object-cover"
            />
          </ImageReveal>
        </div>
      </Section>
    </>
  );
}
