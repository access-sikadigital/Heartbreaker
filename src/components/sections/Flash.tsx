import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { flashIcons } from "@/data/brand";

/**
 * Flash reveal.
 *
 * A scattered cluster of the flash icons on an off-white field is the brand's
 * signature editorial layout — it appears in both the email template and the
 * social set. "flash tattoo" is 1,000/mo at KD 25 and the scope flags it as the
 * natural hook for Meta ads, which is why this block links out rather than
 * simply decorating.
 */

/** Slight vertical offsets so the cluster scatters rather than sits on a rail. */
const DRIFT = ["mt-0", "mt-8", "mt-3", "mt-10", "mt-1", "mt-6", "mt-4", "mt-9", "mt-2"];

export function Flash() {
  return (
    <Section id="flash" ground="paper" className="border-t rule-ink">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="type-label text-chilli">Flash</p>
          <h2 className="type-headline mt-4 max-w-[12ch] text-maroon">
            Drawn once. Tattooed once.
          </h2>
          <p className="type-body mt-7 max-w-[44ch] text-ink-70">
            Flash days are a limited set of designs, released together and
            claimed first come. Each one is tattooed a single time, so the piece
            you take home stays yours alone.
          </p>
          <Link
            href="/flash/"
            className="type-button mt-9 inline-flex items-center gap-3 border border-maroon px-7 py-3.5 text-maroon transition-colors duration-(--duration-fast) hover:bg-maroon hover:text-offwhite"
          >
            See the current flash
            <span aria-hidden="true">&#8599;</span>
          </Link>
        </div>

        <Reveal
          stagger={0.06}
          className="grid grid-cols-3 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-5 lg:grid-cols-5"
        >
          {flashIcons.map((icon, i) => (
            <RevealItem key={icon.slug} className={DRIFT[i % DRIFT.length]}>
              <Icon
                name={icon.slug}
                size={76}
                title={icon.depicts}
                className="opacity-90 transition-transform duration-(--duration-base) ease-(--ease-brand) hover:-translate-y-1.5 hover:opacity-100"
              />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
