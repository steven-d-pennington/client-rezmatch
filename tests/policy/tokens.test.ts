import { expect, test } from "vitest";
import { listFiles, read } from "./files";

// Taste rule as a test: colors come from design tokens, never from literals.
// To change a color, edit src/styles/tokens.css. To allow a rare exception,
// put the comment `token-ok` on the same line and say why.

const TOKEN_FILE = "src/styles/tokens.css";
const LITERAL_COLOR = /#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch)\(/i;
const PALETTE_CLASS =
  /\b(?:bg|text|border|ring|outline|fill|stroke|from|via|to|decoration|divide|accent|shadow|caret|placeholder)-(?:(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}|white|black)\b/;

const files = listFiles("src", [".ts", ".tsx", ".css"]).filter((path) => path !== TOKEN_FILE);

function offenders(pattern: RegExp) {
  return files.flatMap((path) =>
    read(path)
      .split("\n")
      .map((line, index) => ({ line, where: `${path}:${index + 1}` }))
      .filter(({ line }) => pattern.test(line) && !line.includes("token-ok"))
      .map(({ where, line }) => `${where}  ${line.trim()}`),
  );
}

test("no literal colors outside the token file", () => {
  expect(offenders(LITERAL_COLOR)).toEqual([]);
});

test("no built-in Tailwind palette colors: use the token names", () => {
  expect(offenders(PALETTE_CLASS)).toEqual([]);
});
