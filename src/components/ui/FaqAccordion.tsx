"use client";

import { useState } from "react";
import type { Faq } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * FAQ list.
 *
 * Built on <details>/<summary> semantics via a controlled disclosure so it is
 * keyboard operable and announced correctly, without pulling in a UI library
 * for what is fundamentally a list of headings and paragraphs.
 *
 * Only one panel opens at a time — with eight or more questions, several open
 * at once turns the page into a wall and the reader loses their place.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t rule-ink">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b rule-ink">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="type-subhead text-[1.0625rem] text-maroon md:text-[1.1875rem]">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 shrink-0 text-chilli transition-transform duration-(--duration-fast) ease-(--ease-brand)",
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
            </h3>

            <div
              id={`faq-panel-${i}`}
              hidden={!isOpen}
              className="type-body max-w-[62ch] pb-7 text-ink-70"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** FAQPage schema for the same list. Render alongside the accordion. */
export function FaqSchema({ items }: { items: Faq[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
