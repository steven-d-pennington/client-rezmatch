// Runs before every build. Writes public/version.json so anyone (or any script)
// can prove which commit a deployment is serving: "merged is not deployed".
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

function gitSha() {
  try {
    return execSync("git rev-parse HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "unknown";
  }
}

const version = {
  sha: process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || gitSha(),
  ref: process.env.VERCEL_GIT_COMMIT_REF || process.env.GITHUB_REF_NAME || "",
  env: process.env.VERCEL_ENV || "local",
  builtAt: new Date().toISOString(),
};

mkdirSync("public", { recursive: true });
writeFileSync("public/version.json", `${JSON.stringify(version, null, 2)}\n`);
console.log(`version.json: ${version.sha.slice(0, 12)} (${version.env})`);
