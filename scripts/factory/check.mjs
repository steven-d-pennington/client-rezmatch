// The factory contract for this repo, as code. Runs first in `npm run check`.
//   node scripts/factory/check.mjs            everyday checks
//   node scripts/factory/check.mjs --launch   also the launch checks (automatic once factory.json says launched)
// This file is managed by factory-onboarding. Change it there and sync, not here.
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { lintLessons } from "./lib/lessons.mjs";
import { automaticTriggers } from "./lib/workflows.mjs";

const root = process.cwd();
const errors = [];
const warnings = [];
const passed = [];
const read = (path) => readFileSync(join(root, path), "utf8");
const exists = (path) => existsSync(join(root, path));
const fail = (message) => errors.push(message);

function readJson(path) {
  try {
    return JSON.parse(read(path));
  } catch (error) {
    fail(`${path} is missing or not valid JSON (${error.message})`);
    return null;
  }
}

function walk(dir, out = []) {
  if (!exists(dir)) return out;
  for (const name of readdirSync(join(root, dir))) {
    if (name === "node_modules" || name.startsWith(".next")) continue;
    const path = `${dir}/${name}`;
    if (statSync(join(root, path)).isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

// 1. factory.json
const factory = readJson("factory.json");
const isTemplate = factory?.client?.slug === "__CLIENT_SLUG__";
if (factory) {
  const before = errors.length;
  if (factory.version !== 1) fail("factory.json: version must be 1");
  if (!isTemplate && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(factory.client?.slug ?? "")) {
    fail("factory.json: client.slug must be lowercase letters, digits and hyphens");
  }
  if (!factory.client?.name) fail("factory.json: client.name is required");
  if (!["S", "M", "L"].includes(factory.client?.tier)) fail("factory.json: client.tier must be S, M or L");
  if (typeof factory.launched !== "boolean") fail("factory.json: launched must be true or false");
  if (!factory.checks?.gate || !factory.checks?.e2e) fail("factory.json: checks.gate and checks.e2e are required");
  const reviewers = ["claude-session", "cursor", "github-action", "steven"];
  if (!reviewers.includes(factory.review?.reviewer)) {
    fail(`factory.json: review.reviewer must be one of ${reviewers.join(", ")}`);
  }
  if (!["steven-merges", "pre-auth"].includes(factory.merge?.mode)) {
    fail('factory.json: merge.mode must be "steven-merges" or "pre-auth"');
  }
  for (const key of ["production", "review"]) {
    const value = factory.deploy?.[key];
    if (value && !/^https:\/\/[^\s/]+$/.test(value)) {
      fail(`factory.json: deploy.${key} must look like https://example.com with no path`);
    }
  }
  if (errors.length === before) passed.push("factory.json");
}

// 2. The files every factory repo keeps.
{
  const required = [
    "AGENTS.md",
    "CLAUDE.md",
    "STATUS.md",
    "DECISIONS.md",
    "LESSONS.md",
    "WORKLOG.md",
    ".env.example",
    "docs/brief.md",
    "docs/features.json",
    ".github/workflows/ci.yml",
    ".github/pull_request_template.md",
  ];
  const missing = required.filter((path) => !exists(path));
  for (const path of missing) fail(`missing required file: ${path}`);
  if (exists("AGENTS.md")) {
    const agents = read("AGENTS.md");
    if (!agents.includes("<!-- factory:begin") || !agents.includes("<!-- factory:end -->")) {
      fail("AGENTS.md: the factory rules block (factory:begin / factory:end markers) is missing");
    }
  }
  if (!missing.length) passed.push("required files");
}

// 3. Feature list: the work queue. A feature only counts as passing with a browser test behind it.
{
  const features = readJson("docs/features.json");
  const before = errors.length;
  const statuses = ["todo", "building", "passing", "blocked", "cut"];
  if (features && !Array.isArray(features)) fail("docs/features.json must be an array");
  const ids = new Set();
  for (const feature of Array.isArray(features) ? features : []) {
    const where = `docs/features.json ${feature.id ?? "(no id)"}`;
    if (!/^F-\d{3}$/.test(feature.id ?? "")) fail(`${where}: id must look like F-001`);
    if (ids.has(feature.id)) fail(`${where}: duplicate id`);
    ids.add(feature.id);
    if (!feature.title) fail(`${where}: title is required`);
    if (!statuses.includes(feature.status)) fail(`${where}: status must be one of ${statuses.join(", ")}`);
    if (!Array.isArray(feature.acceptance) || feature.acceptance.length === 0) {
      fail(`${where}: acceptance must list at least one check a person could observe`);
    }
    if (feature.status === "passing") {
      if (!feature.e2e) fail(`${where}: a passing feature must name its browser test in "e2e"`);
      else if (!exists(feature.e2e)) fail(`${where}: e2e file not found: ${feature.e2e}`);
    }
    if (feature.status === "blocked" && !feature.blockedBy) fail(`${where}: a blocked feature must say what blocks it in "blockedBy"`);
  }
  if (errors.length === before) passed.push(`feature list (${ids.size} features)`);
}

// 4. Lessons: one format, kept short.
if (exists("LESSONS.md")) {
  const result = lintLessons(read("LESSONS.md"));
  errors.push(...result.errors);
  warnings.push(...result.warnings);
  if (!result.errors.length) passed.push(`lessons (${result.lessons.length} entries)`);
}

// 5. Every environment variable the code reads is named in .env.example.
if (exists(".env.example")) {
  const example = read(".env.example");
  const builtIn = /^(NODE_ENV|CI|PORT|VERCEL(_.*)?|GITHUB_.*|NEXT_RUNTIME)$/;
  const files = [...walk("src"), ...walk("e2e"), "next.config.ts", "playwright.config.ts"].filter(
    (path) => /\.(ts|tsx|mjs|js)$/.test(path) && exists(path),
  );
  const used = new Map();
  for (const path of files) {
    for (const match of read(path).matchAll(/process\.env\.([A-Z][A-Z0-9_]*)/g)) {
      if (!builtIn.test(match[1])) used.set(match[1], path);
    }
  }
  const before = errors.length;
  for (const [name, path] of used) {
    if (!new RegExp(`^#?\\s*${name}=`, "m").test(example)) {
      fail(`${path} reads ${name}, which is not listed in .env.example`);
    }
  }
  if (errors.length === before) passed.push(`.env.example (${used.size} variables)`);
}

// 6. Mockup directions on disk match the list the review page shows.
{
  const directions = readJson("content/directions.json") ?? [];
  const listed = directions.map((direction) => direction.id).sort();
  const onDisk = exists("src/app/directions")
    ? readdirSync(join(root, "src/app/directions")).filter((name) => exists(`src/app/directions/${name}/page.tsx`)).sort()
    : [];
  if (listed.join() !== onDisk.join()) {
    fail(`content/directions.json lists [${listed}] but src/app/directions has [${onDisk}]`);
  } else {
    passed.push(`directions (${listed.length})`);
  }
}

// 7. Workflow contract: nobody quietly weakens the gate, and nothing spends
// GitHub Actions minutes on its own. Checks run in agent sessions (decision D-013).
if (exists(".github/workflows/ci.yml") && factory?.checks) {
  const ci = read(".github/workflows/ci.yml");
  const before = errors.length;
  for (const command of [factory.checks.gate, factory.checks.e2e]) {
    if (command && !ci.includes(command)) fail(`.github/workflows/ci.yml must run "${command}"`);
  }
  if (/continue-on-error:\s*true/.test(ci)) fail(".github/workflows/ci.yml: continue-on-error is not allowed");
  if (/\|\|\s*true|;\s*true\s*$/m.test(ci)) fail('.github/workflows/ci.yml: "|| true" hides failures and is not allowed');
  for (const path of walk(".github/workflows").filter((file) => /\.ya?ml$/.test(file))) {
    const automatic = automaticTriggers(read(path));
    if (automatic.length) {
      fail(`${path}: automatic trigger "${automatic[0]}" is not allowed. Workflows here start by hand only (workflow_dispatch): checks run in agent sessions and spend no Actions minutes.`);
    }
  }
  if (errors.length === before) passed.push("workflow contract");
}

// 8. A scaffolded repo has no template tokens left.
if (!isTemplate) {
  const files = [
    "README.md",
    "AGENTS.md",
    "STATUS.md",
    "package.json",
    "docs/brief.md",
    ...walk("content"),
    ...walk("src"),
  ].filter((path) => exists(path));
  const before = errors.length;
  for (const path of files) {
    if (/__CLIENT_[A-Z]+__/.test(read(path))) fail(`${path} still contains a template token (__CLIENT_...__)`);
  }
  if (errors.length === before) passed.push("no template tokens");
}

// 9. Managed files are the factory's copy. Change them in factory-onboarding and sync.
if (!isTemplate) {
  const manifest = readJson(".factory/manifest.json");
  const before = errors.length;
  const overrides = Array.isArray(factory?.managedOverrides) ? factory.managedOverrides : [];
  const hash = (text) => createHash("sha256").update(text.replace(/\r\n/g, "\n")).digest("hex");
  const entries = Object.entries(manifest?.files ?? {});
  for (const [path, expected] of entries) {
    if (overrides.includes(path)) {
      warnings.push(`${path} is overridden here (factory.json managedOverrides); sync will not update it`);
      continue;
    }
    if (path === "AGENTS.md#factory-rules") {
      const block = exists("AGENTS.md") ? read("AGENTS.md").match(/<!-- factory:begin[^>]*-->[\s\S]*?<!-- factory:end -->/) : null;
      if (!block || hash(block[0]) !== expected) {
        fail("AGENTS.md: the factory rules block was edited here. Change rules in factory-onboarding and sync.");
      }
    } else if (!exists(path)) {
      fail(`managed file is missing: ${path} (restore it with factory-onboarding scripts/sync-client.mjs)`);
    } else if (hash(read(path)) !== expected) {
      fail(`managed file was edited here: ${path}. Change it in factory-onboarding and sync, or list it in factory.json managedOverrides and say why in DECISIONS.md.`);
    }
  }
  if (manifest && factory && manifest.factoryVersion !== factory.templateVersion) {
    fail(`factory.json templateVersion (${factory.templateVersion}) does not match .factory/manifest.json (${manifest.factoryVersion})`);
  }
  if (manifest && errors.length === before) passed.push(`managed files (${entries.length}, factory ${manifest.factoryVersion})`);
}

// 10. Launch checks. Run with --launch before Gate 3; automatic once launched.
const launchMode = process.argv.includes("--launch") || factory?.launched === true;
if (launchMode) {
  const before = errors.length;
  for (const path of walk("src/app").filter((file) => file.endsWith(".tsx"))) {
    if (path.startsWith("src/app/directions/") || path.startsWith("src/app/review/")) continue;
    if (/<Placeholder\b/.test(read(path))) fail(`launch: ${path} still shows a Placeholder`);
  }
  for (const path of walk("content").filter((file) => file.endsWith(".json"))) {
    if (path === "content/review.json" || path === "content/directions.json") continue;
    const drafts = read(path).match(/"\[[^"\]]+\]"/g) ?? [];
    if (drafts.length) fail(`launch: ${path} has ${drafts.length} [bracketed] draft strings the client must supply or approve`);
  }
  if (!factory?.deploy?.production) fail("launch: factory.json deploy.production is empty");
  if (exists("docs/launch-checklist.md")) {
    const open = (read("docs/launch-checklist.md").match(/^- \[ \]/gm) ?? []).length;
    if (open) fail(`launch: docs/launch-checklist.md has ${open} unchecked items`);
  } else {
    fail("launch: docs/launch-checklist.md is missing (copy it from .factory/templates/launch-checklist.md)");
  }
  if (errors.length === before) passed.push("launch checks");
}

for (const line of passed) console.log(`ok    ${line}`);
for (const line of warnings) console.log(`warn  ${line}`);
for (const line of errors) console.error(`FAIL  ${line}`);
if (errors.length) {
  console.error(`\n${errors.length} factory check${errors.length === 1 ? "" : "s"} failed.`);
  process.exit(1);
}
console.log(`\nFactory checks passed${launchMode ? " (launch mode)" : ""}.`);
