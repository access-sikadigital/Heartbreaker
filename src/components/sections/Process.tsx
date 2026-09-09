import { Section } from "@/components/ui/Section";
import { ProcessScroller, type ProcessStep } from "@/components/motion/ProcessScroller";

/**
 * How booking works — from the booking flow in the scope's Page Blueprint.
 *
 * Its job is removing friction. The studio currently runs on Instagram DMs, and
 * the most common reason someone does not send that DM is not knowing what
 * happens after they do. So each step gets its own image: you can see the whole
 * process before committing to any of it.
 *
 * Numbered because it genuinely is a sequence, and the media follows the step
 * you are reading rather than sitting still beside four of them.
 */
const steps: ProcessStep[] = [
  {
    title: "Talk it through",
    body: "Send your idea, references and rough placement. We will tell you honestly whether it will work as fine line, and what it needs.",
    image: "/brand/photography/small-micro/urban-pair.jpg",
    alt: "Two people talking through a tattoo idea",
  },
  {
    title: "Design & deposit",
    body: "Beth draws your piece custom, and you see it before the day. A deposit holds the date and comes off the final price.",
    image: "/brand/photography/script-lettering/hand-script.jpg",
    alt: "Hand-drawn script along the inside of a forearm",
  },
  {
    title: "Your session",
    body: "A private studio, one client at a time, and no rush. Breaks whenever you need them.",
    image: "/brand/photography/placeholder-05.jpg",
    alt: "Beth at work in the studio",
  },
  {
    title: "Healing & aftercare",
    body: "You leave with written aftercare and a way to reach us. Fine line needs care in the first fortnight — we will walk you through it.",
    image: "/brand/photography/fine-line/neck-crane.jpg",
    alt: "A healed origami crane behind the ear",
  },
];

export function Process() {
  return (
    <Section id="process" ground="ink">
      <ProcessScroller
        steps={steps}
        eyebrow="How it works"
        heading="From first message to healed"
      />
    </Section>
  );
}
