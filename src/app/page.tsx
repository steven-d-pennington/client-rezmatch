import Link from "next/link";
import { prelaunchOnly, site } from "@/lib/site";

/**
 * Before the client picks a direction this is a plain holding page.
 * After Gate 2 the chosen direction is rebuilt here and becomes the real home page.
 */
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-4 py-16">
      <h1 className="font-display text-4xl font-semibold break-words">{site.name}</h1>
      <p className="text-lg text-muted">Something new is on the way.</p>
      {prelaunchOnly ? (
        <p>
          <Link
            href="/review"
            className="inline-flex min-h-11 items-center rounded-token bg-accent px-5 font-semibold text-on-accent"
          >
            See the early looks
          </Link>
        </p>
      ) : null}
    </main>
  );
}
