import Script from "next/script";

type GhlBookingEmbedProps = {
  /** A GHL calendar or calendar-group widget URL. */
  src: string;
  title: string;
  /** Plain link shown under the frame, for anyone the iframe fails for. */
  fallbackUrl: string;
};

/**
 * A GoHighLevel booking widget, embedded on the page.
 *
 * GHL's own form_embed.js listens for the widget's postMessage and grows the
 * iframe to fit each step, so the visitor scrolls the page rather than a box
 * inside it. The script matches iframes by id prefix, which is why the id is
 * derived from the src.
 *
 * Until that script runs (or if it is blocked) the frame sits at a minimum
 * height with its own scrollbar, tall enough to show the service list and
 * calendar without a cramped box on a phone.
 */
export function GhlBookingEmbed({ src, title, fallbackUrl }: GhlBookingEmbedProps) {
  const id = `${src.split("/").pop()}_embed`;

  return (
    <div>
      <div className="overflow-hidden bg-offwhite">
        <iframe
          id={id}
          src={src}
          title={title}
          className="block min-h-[900px] w-full border-0"
        />
      </div>

      <p className="type-label mt-5 text-ink-50">
        Booking not loading?{" "}
        <a href={fallbackUrl} className="underline underline-offset-4 hover:text-maroon">
          Open it on its own page
        </a>
      </p>

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </div>
  );
}
