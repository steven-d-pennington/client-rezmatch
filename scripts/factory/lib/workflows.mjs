// Which events start a GitHub Actions workflow on their own. Checks run in
// agent sessions (factory decision D-013), so the only triggers allowed are the
// ones a person or another workflow starts: workflow_dispatch and workflow_call.
const MANUAL = ["workflow_dispatch", "workflow_call"];

/** Returns the automatic triggers in a workflow file's text, e.g. ["push", "schedule"]. */
export function automaticTriggers(yaml) {
  const lines = yaml.split(/\r?\n/).map((line) => line.replace(/\s+#.*$|^#.*$/, ""));
  const start = lines.findIndex((line) => /^(on|"on"|'on')\s*:/.test(line));
  if (start === -1) return [];
  // Triggers are inline (`on: push`, `on: [push, pull_request]`) or the keys one level below `on:`.
  const inline = lines[start].replace(/^[^:]+:/, "").match(/[a-z_]+/g) ?? [];
  const children = [];
  let indent = null;
  for (const line of lines.slice(start + 1)) {
    if (!line.trim()) continue;
    const depth = line.match(/^\s*/)[0].length;
    if (depth === 0) break;
    indent ??= depth;
    if (depth === indent) children.push(line.trim().replace(/^- /, "").split(":")[0].trim());
  }
  return [...inline, ...children].filter((trigger) => !MANUAL.includes(trigger));
}
