"use client";

import { useState } from "react";

const prompts = [
  "Where's home for you?",
  "Coffee or a drive?",
  "Two hours is close if",
  "Best advice from an auntie",
  "My go-to snack run",
  "Early riser or night owl?",
  "What I'm listening to",
  "A perfect Sunday",
];

const MAX = 3;

/** A taste of building a profile: pick up to three prompts. Nothing is saved. */
export function PromptPicker() {
  const [picked, setPicked] = useState<string[]>([prompts[1], prompts[2]]);
  const left = MAX - picked.length;

  function toggle(prompt: string) {
    setPicked((current) => {
      if (current.includes(prompt)) return current.filter((item) => item !== prompt);
      if (current.length >= MAX) return current;
      return [...current, prompt];
    });
  }

  return (
    <>
      <div role="group" aria-label="Sample prompts" className="c-picker">
        {prompts.map((prompt) => (
          <button key={prompt} type="button" aria-pressed={picked.includes(prompt)} onClick={() => toggle(prompt)} className="c-chip">
            {prompt}
          </button>
        ))}
      </div>
      <p className="c-picker-note" aria-live="polite">
        {left > 0 ? `Picked ${picked.length} of ${MAX}. Choose ${left} more.` : "Three picked. Nice."}
      </p>
    </>
  );
}
