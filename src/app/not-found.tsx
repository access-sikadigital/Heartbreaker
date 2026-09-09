import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="on-dark flex min-h-dvh flex-col items-center justify-center bg-maroon px-6 text-center text-offwhite">
      <Logo lockup="brandmark" colour="offwhite" width={64} />
      <h1 className="type-display mt-10">Gone for good</h1>
      <p className="type-body mt-5 max-w-[42ch] text-paper-70">
        That page has been removed, renamed, or never existed. Some things are
        permanent. This is not one of them.
      </p>
      <Button href="/" variant="inverse" size="lg" className="mt-10">
        Back to the studio
      </Button>
      <Link href="/" className="type-label mt-6 text-paper-40 hover:text-chilli">
        heartbreakerink
      </Link>
    </div>
  );
}
