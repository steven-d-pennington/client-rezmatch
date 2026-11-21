import { expect, test } from "vitest";
import rules from "../../content/copy-rules.json";
import { listFiles, read } from "./files";

// Taste rule as a test: wording the client (or Steven) has ruled out never ships.
// Add a rule to content/copy-rules.json whenever a wording correction comes back.

const files = [...listFiles("content", [".json"]), ...listFiles("src", [".tsx"])].filter(
  (path) => !path.endsWith("copy-rules.json"),
);

test.each(rules.banned)("copy never contains $text", ({ text, why }) => {
  const needle = text.toLowerCase();
  const hits = files.filter((path) => read(path).toLowerCase().includes(needle));
  expect(hits, why).toEqual([]);
});
