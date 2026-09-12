import { redirect } from "next/navigation";

/**
 * /book/ has been folded into /contact/.
 *
 * It carried the same enquiry form against the same intent, and once "Book
 * now" started going to the live booking widget it had no inbound links left.
 * Its four-step explainer now runs below the form on /contact/.
 *
 * The real redirect is the permanent one in next.config.ts, which Next applies
 * before filesystem routing, so this component does not normally run. It stays
 * as a backstop: if that config entry is ever edited away, this keeps the URL
 * behaving instead of silently resurrecting a duplicate page.
 *
 * SAFE TO DELETE: remove the whole src/app/book directory whenever convenient.
 * It is only still here because the sandbox could not delete files at the time
 * this change was made.
 */
export default function BookPage() {
  redirect("/contact/");
}
