import { NextResponse } from "next/server";

/**
 * Enquiry endpoint.
 *
 * DELIVERY IS NOT WIRED UP YET. Everything below — parsing, validation, spam
 * rejection — is real, but the submission currently goes to the server log
 * rather than to Beth. See the marked section for where the provider slots in.
 *
 * This is deliberate: the scope lists the booking system as an unresolved
 * client dependency, and the right delivery target depends on which tool is
 * chosen. What matters is that the form never silently swallows a submission —
 * if delivery fails, the visitor is told, so nobody walks away believing they
 * have made contact when they have not.
 */

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

const MAX_MESSAGE = 2000;
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function validate(body: Payload) {
  const errors: Record<string, string> = {};

  const name = str(body.name);
  const email = str(body.email);
  const idea = str(body.idea);

  if (name.length < 2) errors.name = "Name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "A valid email is required.";
  if (idea.length < 10) errors.idea = "Tell us a little about the idea.";
  if (idea.length > MAX_MESSAGE) errors.idea = "Message is too long.";
  if (!body.consent) errors.consent = "Consent is required.";

  return { errors, clean: { name, email, idea } };
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Could not read that request." }, { status: 400 });
  }

  // Honeypot. Answer 200 so a bot cannot learn it was caught, but do nothing.
  if (str(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const { errors, clean } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", errors },
      { status: 422 },
    );
  }

  const enquiry = {
    receivedAt: new Date().toISOString(),
    name: clean.name,
    email: clean.email,
    phone: str(body.phone),
    service: str(body.service),
    placement: str(body.placement),
    size: str(body.size),
    availability: str(body.availability),
    firstTattoo: str(body.firstTattoo),
    idea: clean.idea,
  };

  try {
    /* ----------------------------------------------------------------------
     * TODO — wire the delivery provider here.
     *
     * Whatever goes in, it must THROW on failure so the catch below reports it
     * to the visitor. Returning ok on a failed send is the one behaviour this
     * endpoint must never have.
     *
     * Options, in the order the scope favours them:
     *   1. The chosen booking tool's API, so enquiries land in one inbox.
     *   2. A transactional email provider (Resend, Postmark) to the studio.
     *   3. A CRM webhook, if GoHighLevel or similar is adopted.
     *
     * Whichever it is, keep the API key in an environment variable and never
     * in this file.
     * -------------------------------------------------------------------- */
    console.info("[enquiry] received (delivery not yet configured)", enquiry);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return NextResponse.json(
      {
        error:
          "We could not send that just now. Please message us on Instagram instead.",
      },
      { status: 502 },
    );
  }
}
