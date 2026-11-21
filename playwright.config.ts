import { existsSync } from "node:fs";
import { defineConfig } from "@playwright/test";

// Browser tests run against a real production build, so they catch what unit tests cannot.
// Set E2E_BASE_URL to point the same tests at a Vercel preview or the live site instead.
const PORT = 4317; // an owned port: 3000 is often taken by a dev server
const baseURL = process.env.E2E_BASE_URL || `http://127.0.0.1:${PORT}`;

// Cloud agent sessions often ship one pre-installed Chromium. Use it when the
// version Playwright wants is not downloaded, instead of failing or downloading.
const preinstalled = "/opt/pw-browsers/chromium";
const executablePath =
  process.env.PLAYWRIGHT_CHROMIUM_PATH || (!process.env.CI && existsSync(preinstalled) ? preinstalled : undefined);

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: executablePath ? { executablePath } : {},
  },
  projects: [
    { name: "phone", use: { browserName: "chromium", viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } },
    { name: "desktop", use: { browserName: "chromium", viewport: { width: 1440, height: 900 } } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `npm run build && npm run start -- --port ${PORT} --hostname 127.0.0.1`,
        url: `http://127.0.0.1:${PORT}/version.json`,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});
