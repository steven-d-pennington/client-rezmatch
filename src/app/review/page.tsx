import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PicksForm } from "@/components/PicksForm";
import type { PickQuestion } from "@/lib/picks";
import { client, directions, prelaunchOnly, review, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Early looks for ${site.name}`,
  robots: { index: false, follow: false },
};

type RawQuestion = {
  id: string;
  label: string;
  optionsFrom?: string;
  options?: { id: string; label: string }[];
};

/**
 * The one page to send the client: every option in one place and a "Your picks"
 * form that turns their choices into one line they can text or email back.
 * Edit content/review.json and content/directions.json, not this file.
 */
export default function ReviewPage() {
  if (!prelaunchOnly) notFound();

  const questions: PickQuestion[] = (review.questions as RawQuestion[]).map((question) => ({
    id: question.id,
    label: question.label,
    options:
      question.optionsFrom === "directions"
        ? directions.map((direction) => ({
            id: direction.id,
            label: `${direction.id.toUpperCase()}: ${direction.name}`,
          }))
        : (question.options ?? []),
  }));

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
      <p className="text-sm uppercase tracking-widest text-muted">{site.name}</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">{review.heading}</h1>
      <p className="mt-4 text-lg text-muted">{review.intro}</p>

      <ul className="mt-8 grid gap-3">
        {directions.map((direction) => (
          <li key={direction.id} className="min-w-0 rounded-token border border-line bg-surface p-4">
            <h2 className="font-display text-xl font-semibold">
              {direction.id.toUpperCase()}: {direction.name}
            </h2>
            <p className="mt-1 text-muted">{direction.idea}</p>
            <Link
              href={`/directions/${direction.id}`}
              className="mt-3 inline-flex min-h-11 items-center rounded-token bg-accent px-5 font-semibold text-on-accent"
            >
              Open look {direction.id.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <PicksForm
          clientName={site.name}
          storageKey={`picks:${client.slug}`}
          questions={questions}
          noteLabel={review.noteLabel}
          replyTo={review.replyTo}
        />
      </div>
    </main>
  );
}
