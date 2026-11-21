// Proves a deployment serves the commit you expect.
//   node scripts/factory/verify-deploy.mjs --url https://example.com --sha <commit> [--timeout 600]
// With no --url it reads deploy.production from factory.json. With no --sha it uses the current commit.
// Exit codes: 0 verified, 1 not verified, 2 nothing to verify (no URL configured).
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const arg = (name) => {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? undefined : args[index + 1];
};

const factory = JSON.parse(readFileSync("factory.json", "utf8"));
const url = (arg("url") || factory.deploy?.production || "").replace(/\/$/, "");
const timeoutSeconds = Number(arg("timeout") ?? 600);
const intervalSeconds = Number(arg("interval") ?? 15);

if (!url) {
  console.log("No production URL in factory.json (deploy.production). Nothing to verify.");
  process.exit(2);
}

const expected =
  arg("sha") ||
  process.env.GITHUB_SHA ||
  execSync("git rev-parse HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();

const deadline = Date.now() + timeoutSeconds * 1000;
let last = "no response yet";

while (true) {
  try {
    const response = await fetch(`${url}/version.json?t=${Date.now()}`, { cache: "no-store" });
    if (response.ok) {
      const live = await response.json();
      if (live.sha === expected) {
        console.log(`VERIFIED: ${url} serves ${expected.slice(0, 12)} (built ${live.builtAt}).`);
        process.exit(0);
      }
      last = `serving ${String(live.sha).slice(0, 12)}`;
    } else {
      last = `HTTP ${response.status}`;
    }
  } catch (error) {
    last = error.message;
  }
  if (Date.now() >= deadline) break;
  console.log(`waiting: ${url} is ${last}, want ${expected.slice(0, 12)}`);
  await new Promise((resolve) => setTimeout(resolve, intervalSeconds * 1000));
}

console.error(`NOT VERIFIED: after ${timeoutSeconds}s ${url} is ${last}, expected ${expected.slice(0, 12)}.`);
console.error("Merged is not deployed. Check the Vercel deployment before telling anyone it is live.");
process.exit(1);
