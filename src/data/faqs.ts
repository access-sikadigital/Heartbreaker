/**
 * Studio FAQs.
 *
 * Built from the question keywords the scope validated, so the FAQ hub earns
 * search traffic rather than just answering the phone. Marked up with FAQPage
 * schema on the pages that use them.
 */

import type { Faq } from "@/data/services";

export const studioFaqs: { group: string; items: Faq[] }[] = [
  {
    group: "Booking",
    items: [
      {
        q: "How do I book?",
        a: "Send an enquiry with your idea, rough size and placement, and any reference images. Beth will come back with whether it works as fine line, what it needs, and a quote. A non-refundable deposit is required to secure the appointment.",
      },
      {
        q: "Do you take walk-ins?",
        a: "No. The studio is private and runs one client at a time, so everything is by appointment. It means you are never rushed and never waiting.",
      },
      {
        q: "What if I need to reschedule?",
        a: "Cancellations and reschedules need at least 48 hours notice. Inside that window the deposit is lost. You can reschedule once on the same deposit; any reschedule after that needs a new one. Full details are on the studio policy page.",
      },
    ],
  },
  {
    group: "The tattoo",
    items: [
      {
        q: "Does a fine line tattoo hurt?",
        a: "It is uncomfortable rather than unbearable, and placement matters far more than size. Fine line uses a single needle, which most people find less aggressive than shading. Breaks are always available.",
      },
      {
        q: "How long does an appointment take?",
        a: "A small piece is often under an hour including setup and stencil. Larger custom work runs two to four hours, and anything beyond that is usually split across sessions so the skin gets a rest.",
      },
      {
        q: "Can I bring someone with me?",
        a: "One person, yes. The studio is small, and a quiet room is part of why people come here.",
      },
    ],
  },
  {
    group: "Aftercare",
    items: [
      {
        q: "How long does a tattoo take to heal?",
        a: "The surface heals in about two weeks. The deeper layers take closer to two months, which is why a piece can look settled long before it is finished healing. Full aftercare comes with your appointment.",
      },
      {
        q: "When can I swim?",
        a: "Two to four weeks, once it is fully healed. Soaking lifts scabs early, and on fine line that can cost you a whole line rather than a bit of saturation.",
      },
      {
        q: "Do you offer touch-ups?",
        a: "Yes. Fine line sometimes wants a light refresh after a few years, and that is maintenance rather than a fault. Get in touch and we will book a short session.",
      },
    ],
  },
  {
    group: "Practical",
    items: [
      {
        q: "How old do I have to be?",
        a: "Eighteen, with photo ID on the day. There are no exceptions to this, including with a parent present.",
      },
      {
        q: "Can I get tattooed while pregnant or breastfeeding?",
        a: "We do not tattoo during pregnancy. For breastfeeding, talk to your GP first and we will follow their advice. It is a wait-and-book-later answer rather than a never.",
      },
      {
        q: "Can I donate blood after being tattooed?",
        a: "In Australia there is a waiting period after any tattoo before donating. Lifeblood publishes the current rule, and it changes from time to time, check with them directly rather than relying on a studio website.",
      },
    ],
  },
];

export const flatFaqs: Faq[] = studioFaqs.flatMap((g) => g.items);
