import Link from "next/link";

/** Shown on every pre-launch mockup so nobody mistakes it for a finished page. */
export function DraftNotice({ name }: { name: string }) {
  return (
    <p className="border-b border-line bg-surface px-4 py-3 text-sm text-muted">
      <strong className="text-ink">Early look: {name}.</strong> Words and pictures are stand-ins.{" "}
      <Link href="/review" className="inline-flex min-h-11 items-center underline">
        Back to all looks
      </Link>
    </p>
  );
}
