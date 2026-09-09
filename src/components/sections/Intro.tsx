import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { ScrubReveal } from "@/components/motion/ScrubReveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Parallax } from "@/components/motion/Parallax";

/**
 * Positioning, alongside an offset image pair.
 *
 * The two images run at different parallax speeds and overlap — the smaller
 * one breaks the larger one's edge, which is what stops a two-image block
 * reading as a stock grid. Straight out of the reference's `multi-img-ct`.
 *
 * Copy is empath-led and deliberately not street-shop, per the positioning
 * sheet in the scope.
 */
export function Intro() {
  return (
    <Section ground="paper">
      <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-24">
        <ScrubReveal y={44} from={0.25}>
          <p className="type-label text-chilli">The studio</p>

          <SplitLines as="h2" className="type-headline mt-6 max-w-[13ch] text-maroon">
            Your story deserves intention
          </SplitLines>

          <p className="type-lead mt-8 max-w-[46ch] text-ink-70">
            Heartbreaker Ink is a fine line tattoo studio rooted in intention,
            authenticity and care — creating timeless pieces that celebrate
            individuality through refined detail and thoughtful design.
          </p>

          <p className="type-body mt-6 max-w-[50ch] text-ink-50">
            A private studio, one artist, and as much time as the piece needs.
            Whether it is your first or your fifteenth, you will not be rushed
            and you will not be talked into anything.
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-8 border-t rule-ink pt-8 sm:grid-cols-3">
            {[
              { k: "Since", v: "2017" },
              { k: "Specialism", v: "Fine line" },
              { k: "Studio", v: "Private" },
            ].map((stat) => (
              <div key={stat.k}>
                <dt className="type-label text-ink-50">{stat.k}</dt>
                <dd className="type-subhead mt-2 text-maroon">{stat.v}</dd>
              </div>
            ))}
          </dl>
        </ScrubReveal>

        {/* Offset pair — different speeds, overlapping edges. */}
        <div className="relative">
          <Parallax speed={0.14} className="aspect-4/5 w-[82%]">
            <Image
              src="/brand/photography/fine-line/back-red-knit.jpg"
              alt="Delicate script and stars across an upper back"
              width={900}
              height={1125}
              sizes="(max-width: 1024px) 82vw, 40vw"
              className="h-[118%] w-full object-cover"
            />
          </Parallax>

          <Parallax
            speed={0.3}
            direction="down"
            className="absolute right-0 bottom-[-8%] aspect-square w-[46%] border-8 border-offwhite"
          >
            <Image
              src="/brand/photography/small-micro/heart-hands.jpg"
              alt="Matching heart tattoos on two hands"
              width={620}
              height={620}
              sizes="(max-width: 1024px) 46vw, 22vw"
              className="h-[122%] w-full object-cover"
            />
          </Parallax>
        </div>
      </div>
    </Section>
  );
}
