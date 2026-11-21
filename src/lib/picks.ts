export type PickOption = { id: string; label: string };
export type PickQuestion = { id: string; label: string; options: PickOption[] };
export type Picks = Record<string, string>;

const sentence = (text: string) => (/[.?!]$/.test(text) ? text : `${text}.`);

/**
 * One line the client can paste into a text or email. Kept as a pure function
 * so the wording is unit-tested and stays stable for whoever reads the replies.
 */
export function buildPicksSummary(
  clientName: string,
  questions: PickQuestion[],
  picks: Picks,
  note: string,
): string {
  const answers = questions.map((question) => {
    const chosen = question.options.find((option) => option.id === picks[question.id]);
    return `${question.label} ${sentence(chosen ? chosen.label : "Not sure yet")}`;
  });
  const trimmed = note.replace(/\s+/g, " ").trim();
  return [
    `My picks for ${clientName}.`,
    ...answers,
    ...(trimmed ? [sentence(`Note: ${trimmed}`)] : []),
  ].join(" ");
}
