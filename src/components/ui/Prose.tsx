import type { Block } from "@/data/journal";

/**
 * Long-form body copy.
 *
 * Measure is capped near 68 characters regardless of how wide the container
 * gets — the site runs to 1520px, and body text at that width is genuinely
 * hard to read back to the start of the next line.
 */
export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex max-w-[68ch] flex-col gap-6">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2 key={i} className="type-subhead mt-6 text-maroon">
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="flex flex-col gap-3 pl-5">
              {block.items.map((item) => (
                <li key={item} className="type-body list-disc text-ink-70">
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="type-body text-ink-70">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
