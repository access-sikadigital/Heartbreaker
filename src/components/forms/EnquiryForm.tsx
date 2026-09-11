"use client";

import { useRef, useState, type FormEvent } from "react";
import { allServices } from "@/data/services";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Tattoo enquiry form.
 *
 * Fields follow the booking flow in the scope's Page Blueprint — style first,
 * then the idea, then availability — because that is the order the studio
 * actually needs the information in, and it is the order the client is already
 * used to typing it into a DM.
 *
 * On reference images: there is deliberately NO file input. Uploads need
 * storage, virus scanning and a size policy, none of which exist yet, and a
 * file picker that silently drops the file is worse than no file picker. The
 * form asks people to send images on Instagram instead, which is what they do
 * today anyway.
 *
 * Validation runs on the client for immediate feedback and again on the server,
 * because client-side validation is a convenience, never a control.
 */

type Errors = Partial<Record<string, string>>;

const MAX_MESSAGE = 2000;

export function EnquiryForm({ className }: { className?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const idea = String(data.get("idea") ?? "").trim();

    if (name.length < 2) next.name = "Tell us your name.";
    // Deliberately loose. Anything stricter rejects valid addresses, and the
    // only real test of an address is sending to it.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "We need a working email to reply to.";
    if (idea.length < 10)
      next.idea = "A sentence or two about the idea is enough to start.";
    if (idea.length > MAX_MESSAGE)
      next.idea = `Keep it under ${MAX_MESSAGE.toLocaleString()} characters.`;
    if (!data.get("consent")) next.consent = "Please accept the privacy policy.";
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the summary so a screen reader announces the problem
      // rather than leaving the user at the submit button wondering.
      summaryRef.current?.focus();
      return;
    }

    setStatus("sending");
    setServerError(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong sending that.");
      }

      setStatus("sent");
      form.reset();
    } catch (error) {
      setStatus("failed");
      setServerError(
        error instanceof Error ? error.message : "Something went wrong sending that.",
      );
    }
  };

  if (status === "sent") {
    return (
      <div
        className={cn("border rule-ink bg-paper-warm p-8 md:p-10", className)}
        role="status"
      >
        <h2 className="type-subhead text-maroon">Enquiry sent</h2>
        <p className="type-body mt-4 max-w-[42ch] text-ink-70">
          Thanks, Beth will come back to you, usually the same day. If you have
          reference images, send them through on Instagram and we will match them
          to your enquiry.
        </p>
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noreferrer noopener"
          className="type-button mt-8 inline-flex items-center gap-3 border border-maroon px-7 py-3.5 text-maroon transition-colors duration-(--duration-fast) hover:bg-maroon hover:text-offwhite"
        >
          Send references
          <span aria-hidden="true">&#8599;</span>
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("border rule-ink bg-paper-warm p-8 md:p-10", className)}
    >
      <h2 className="type-subhead text-maroon">Send an enquiry</h2>
      <p className="type-body mt-3 max-w-[44ch] text-ink-70">
        Tell us the idea, however half-formed. You will get an honest answer on
        whether it works as fine line.
      </p>

      {/* Error summary. Focusable so it can be moved to on failed submit. */}
      {(Object.keys(errors).length > 0 || serverError) && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="type-body mt-8 border-l-2 border-chilli bg-offwhite p-5 text-maroon"
        >
          {serverError ?? "Please check the highlighted fields."}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-6">
        <Field
          name="name"
          label="Your name"
          required
          error={errors.name}
          autoComplete="name"
        />
        <Field
          name="email"
          label="Email"
          type="email"
          required
          error={errors.email}
          autoComplete="email"
        />
        <Field
          name="phone"
          label="Phone"
          hint="Optional"
          type="tel"
          autoComplete="tel"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="type-label text-ink-50">What kind of piece</span>
            <select
              name="service"
              defaultValue=""
              className="type-body border rule-ink bg-offwhite px-4 py-3 text-ink"
            >
              <option value="">Not sure yet</option>
              {allServices.map((s) => (
                <option key={s.slug} value={s.name}>
                  {s.name}
                </option>
              ))}
              <option value="Flash">Flash day</option>
            </select>
          </label>

          <Field name="placement" label="Placement" hint="Where on the body" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field name="size" label="Rough size" hint="In centimetres is fine" />
          <Field name="availability" label="When suits" hint="Days or weeks" />
        </div>

        <label className="flex flex-col gap-2">
          <span className="type-label text-ink-50">
            The idea <span className="text-chilli">*</span>
          </span>
          <textarea
            name="idea"
            rows={5}
            required
            maxLength={MAX_MESSAGE}
            aria-invalid={errors.idea ? true : undefined}
            aria-describedby={errors.idea ? "idea-error" : undefined}
            className={cn(
              "type-body border bg-offwhite px-4 py-3 text-ink",
              errors.idea ? "border-chilli" : "rule-ink",
            )}
          />
          {errors.idea && (
            <span id="idea-error" className="type-label text-chilli">
              {errors.idea}
            </span>
          )}
        </label>

        <fieldset className="flex flex-col gap-3">
          <legend className="type-label text-ink-50">Is this your first tattoo?</legend>
          <div className="flex gap-6">
            {["Yes", "No"].map((value) => (
              <label key={value} className="type-body flex items-center gap-2 text-ink-70">
                <input type="radio" name="firstTattoo" value={value} />
                {value}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="type-body flex items-start gap-3 text-ink-70">
          <input
            type="checkbox"
            name="consent"
            className="mt-1.5"
            aria-invalid={errors.consent ? true : undefined}
          />
          <span>
            I have read the{" "}
            <a href="/privacy-policy/" className="text-maroon underline underline-offset-4">
              privacy policy
            </a>{" "}
            and am happy to be contacted about this enquiry.{" "}
            <span className="text-chilli">*</span>
            {errors.consent && (
              <span className="type-label mt-1 block text-chilli">{errors.consent}</span>
            )}
          </span>
        </label>

        {/* Honeypot. Real people never fill this; bots fill everything. */}
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label>
            Do not fill this in
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <button
            type="submit"
            disabled={status === "sending"}
            className="type-button inline-flex items-center gap-3 bg-maroon px-8 py-4 text-offwhite transition-colors duration-(--duration-fast) hover:bg-chilli disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send enquiry"}
            <span aria-hidden="true">&#8599;</span>
          </button>
          <p className="type-label text-ink-50">
            Reference images? Send them on Instagram.
          </p>
        </div>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------------- */

function Field({
  name,
  label,
  type = "text",
  required,
  hint,
  error,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="type-label text-ink-50">
        {label} {required && <span className="text-chilli">*</span>}
        {hint && <span className="ml-2 normal-case opacity-70">{hint}</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          "type-body border bg-offwhite px-4 py-3 text-ink",
          error ? "border-chilli" : "rule-ink",
        )}
      />
      {error && (
        <span id={`${name}-error`} className="type-label text-chilli">
          {error}
        </span>
      )}
    </label>
  );
}
