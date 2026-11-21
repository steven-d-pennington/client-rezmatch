#!/usr/bin/env node
// Checks run in agent sessions, not in GitHub Actions (factory decision D-013).
// Nothing puts a green tick on a pull request, so this is the record instead:
// it runs the whole gate on the committed work and prints a block to paste
// into the pull request. The reviewer runs it again on the head commit.
//   npm run evidence              the gate and the browser tests
//   npm run evidence -- --no-e2e  the gate only (say why in the pull request)
// It refuses to run with uncommitted changes, because evidence for a tree that
// is not the commit proves nothing about the commit.
import { execFileSync, spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const ANSI = /\u001b\[[0-9;]*[A-Za-z]/g;

/** Pulls the counts out of Vitest and Playwright output. Returns e.g. "48 passed, 2 skipped". */
export function summarise(output) {
  const text = output.replace(ANSI, "");
  const parts = [];
  const unit = text.match(/^\s*Tests\s+(?:(\d+) failed \| )?(\d+) passed/m);
  if (unit) parts.push(`${unit[2]} unit and policy tests passed${unit[1] ? `, ${unit[1]} failed` : ""}`);
  const browser = {};
  for (const match of text.matchAll(/^\s*(\d+) (passed|failed|flaky|skipped|did not run)\b/gm)) {
    browser[match[2]] = Number(match[1]);
  }
  for (const key of ["passed", "failed", "flaky", "skipped", "did not run"]) {
    if (browser[key] !== undefined) parts.push(`${browser[key]} ${key}`);
  }
  return parts.join(", ");
}

/** The block that goes into the pull request. */
export function renderEvidence({ sha, branch, steps, when, node, target }) {
  const lines = ["<!-- gate-evidence:start -->", "### Gate evidence", "", `- **Commit:** \`${sha}\` on \`${branch}\`, working tree clean`];
  for (const step of steps) {
    const detail = step.summary ? ` (${step.summary})` : "";
    lines.push(`- **\`${step.command}\`:** ${step.result}${step.seconds === null ? "" : ` in ${step.seconds}s`}${detail}`);
  }
  lines.push(`- **Run:** ${when}, Node ${node}${target ? `, browser tests against ${target}` : ""}`);
  lines.push("<!-- gate-evidence:end -->");
  return lines.join("\n");
}

const git = (...args) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

function run(command) {
  return new Promise((resolve) => {
    const started = Date.now();
    let output = "";
    const child = spawn(command, { shell: true, env: { ...process.env, FORCE_COLOR: "0" } });
    const keep = (stream) => (chunk) => {
      output += chunk;
      stream.write(chunk);
    };
    child.stdout.on("data", keep(process.stdout));
    child.stderr.on("data", keep(process.stderr));
    child.on("close", (code) => resolve({ code, output, seconds: Math.round((Date.now() - started) / 1000) }));
  });
}

async function main() {
  let sha;
  try {
    sha = git("rev-parse", "HEAD");
  } catch {
    console.error("evidence: this folder has no commit yet. Commit first: evidence is tied to a commit.");
    process.exit(1);
  }
  const dirty = () => git("status", "--porcelain");
  if (dirty()) {
    console.error("evidence: there are uncommitted changes. Commit them first: evidence is tied to a commit.\n");
    console.error(dirty());
    process.exit(1);
  }
  const factory = JSON.parse(readFileSync("factory.json", "utf8"));
  const commands = [factory.checks.gate];
  if (process.argv.includes("--no-e2e")) console.log("evidence: browser tests skipped (--no-e2e). Say why in the pull request.\n");
  else commands.push(factory.checks.e2e);

  const steps = [];
  let failed = false;
  for (const command of commands) {
    if (failed) {
      steps.push({ command, result: "NOT RUN (an earlier step failed)", seconds: null, summary: "" });
      continue;
    }
    console.log(`\n$ ${command}`);
    const { code, output, seconds } = await run(command);
    failed = code !== 0;
    steps.push({ command, result: code === 0 ? "passed" : "FAILED", seconds, summary: summarise(output) });
  }
  if (dirty()) {
    failed = true;
    steps.push({ command: "git status", result: "FAILED: the gate changed tracked files; commit them and run again", seconds: null, summary: "" });
  }
  if (process.argv.includes("--no-e2e")) steps.push({ command: factory.checks.e2e, result: "NOT RUN (--no-e2e)", seconds: null, summary: "" });

  const block = renderEvidence({
    sha,
    branch: git("branch", "--show-current") || "(detached)",
    steps,
    when: `${new Date().toISOString().slice(0, 16)}Z`,
    node: process.version,
    target: process.env.E2E_BASE_URL ?? "",
  });
  console.log(`\nPaste this into the pull request under "Gate evidence":\n\n${block}\n`);
  process.exit(failed ? 1 : 0);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) await main();
