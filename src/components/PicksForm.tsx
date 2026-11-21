"use client";

import { useEffect, useMemo, useState } from "react";
import { buildPicksSummary, type PickQuestion, type Picks } from "@/lib/picks";

type ReplyTo = { name: string; sms: string; email: string };

const NOT_SURE = "";

/**
 * "Your picks": the client taps what they like and sends one line back.
 * No account and no server. Picks are kept in this browser so opening a look
 * and coming back does not lose them.
 */
export function PicksForm({
  clientName,
  storageKey,
  questions,
  noteLabel,
  replyTo,
}: {
  clientName: string;
  storageKey: string;
  questions: PickQuestion[];
  noteLabel: string;
  replyTo: ReplyTo;
}) {
  const [picks, setPicks] = useState<Picks>({});
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [restored, setRestored] = useState(false);

  // Restore after hydration so the server and first client render match.
  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "null");
      if (saved && typeof saved === "object") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore from browser storage
        setPicks(saved.picks ?? {});
        setNote(typeof saved.note === "string" ? saved.note : "");
      }
    } catch {
      // Private browsing or blocked storage: the form still works, it just forgets.
    }
    setRestored(true);
  }, [storageKey]);

  useEffect(() => {
    if (!restored) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ picks, note }));
    } catch {
      // See above.
    }
  }, [picks, note, restored, storageKey]);

  const summary = useMemo(
    () => buildPicksSummary(clientName, questions, picks, note),
    [clientName, questions, picks, note],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setStatus(`Copied. Paste it into a text or email to ${replyTo.name}.`);
    } catch {
      setStatus("Could not copy on this device. Press and hold the text above to copy it.");
    }
  }

  const encoded = encodeURIComponent(summary);

  return (
    <form className="space-y-8" onSubmit={(event) => event.preventDefault()} data-restored={restored}>
      {questions.map((question) => (
        <fieldset key={question.id} className="min-w-0">
          <legend className="font-display text-xl font-semibold">{question.label}</legend>
          <div className="mt-3 grid gap-2">
            {[...question.options, { id: NOT_SURE, label: "Not sure yet" }].map((option) => (
              <label
                key={option.id || "not-sure"}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-token border border-line bg-surface px-4 py-2 has-[:checked]:border-accent has-[:checked]:outline has-[:checked]:outline-2 has-[:checked]:outline-accent"
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.id}
                  checked={(picks[question.id] ?? NOT_SURE) === option.id}
                  onChange={() => {
                    setStatus("");
                    setPicks((current) => ({ ...current, [question.id]: option.id }));
                  }}
                  className="size-5 accent-accent"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <div>
        <label htmlFor="picks-note" className="font-display text-xl font-semibold">
          {noteLabel}
        </label>
        <textarea
          id="picks-note"
          rows={3}
          value={note}
          onChange={(event) => {
            setStatus("");
            setNote(event.target.value);
          }}
          className="mt-3 w-full rounded-token border border-line bg-surface p-3"
        />
      </div>

      <section aria-labelledby="picks-summary-heading" className="rounded-token border border-line bg-surface p-4">
        <h2 id="picks-summary-heading" className="font-display text-xl font-semibold">
          Your picks
        </h2>
        <p data-testid="picks-summary" className="mt-2 break-words select-all">
          {summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-11 items-center rounded-token bg-accent px-5 font-semibold text-on-accent"
          >
            Copy my picks
          </button>
          {replyTo.sms ? (
            <a
              href={`sms:${replyTo.sms}?&body=${encoded}`}
              className="inline-flex min-h-11 items-center rounded-token border border-line px-5 font-semibold"
            >
              Text it to {replyTo.name}
            </a>
          ) : null}
          {replyTo.email ? (
            <a
              href={`mailto:${replyTo.email}?subject=${encodeURIComponent(`Picks for ${clientName}`)}&body=${encoded}`}
              className="inline-flex min-h-11 items-center rounded-token border border-line px-5 font-semibold"
            >
              Email it to {replyTo.name}
            </a>
          ) : null}
        </div>
        <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm text-muted">
          {status}
        </p>
      </section>
    </form>
  );
}
