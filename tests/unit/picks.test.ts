import { expect, test } from "vitest";
import { buildPicksSummary, type PickQuestion } from "@/lib/picks";

const questions: PickQuestion[] = [
  {
    id: "look",
    label: "Which look feels most like you?",
    options: [
      { id: "a", label: "A: Field notes" },
      { id: "b", label: "B: Shop window" },
    ],
  },
  { id: "words", label: "How should the words sound?", options: [{ id: "warm", label: "Warm and chatty" }] },
];

test("writes one pasteable line with every answer", () => {
  expect(buildPicksSummary("Sample Co", questions, { look: "b", words: "warm" }, "")).toBe(
    "My picks for Sample Co. Which look feels most like you? B: Shop window. How should the words sound? Warm and chatty.",
  );
});

test("an unanswered question reads as not sure, never as a choice", () => {
  expect(buildPicksSummary("Sample Co", questions, {}, "")).toContain(
    "Which look feels most like you? Not sure yet.",
  );
});

test("the note is flattened to one line and keeps its own punctuation", () => {
  expect(buildPicksSummary("Sample Co", questions, {}, "  Love the green!\nLess text  ")).toMatch(
    /Note: Love the green! Less text\.$/,
  );
});
