import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { launched, liveRoutes, prelaunchRoutes } from "./routes";

// The checks every page gets. Rendering is not design verification: these catch
// the mechanical problems so a human review can spend its time on how it feels.
const WIDTHS = [320, 390, 768, 1440];

for (const route of liveRoutes) {
  test.describe(route, () => {
    test("loads with one main heading and no console errors", async ({ page }) => {
      const problems: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") problems.push(message.text());
      });
      page.on("pageerror", (error) => problems.push(error.message));
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(problems).toEqual([]);
    });

    test("never scrolls sideways at phone, tablet or desktop widths", async ({ page }) => {
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `sideways scroll at ${width}px`).toBeLessThanOrEqual(0);
      }
    });

    test("has no serious accessibility problems", async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      const serious = results.violations
        .filter((violation) => violation.impact === "serious" || violation.impact === "critical")
        .map((violation) => `${violation.id}: ${violation.nodes.map((node) => node.target.join(" ")).join(", ")}`);
      expect(serious).toEqual([]);
    });

    test("buttons and links are big enough to tap", async ({ page }) => {
      await page.goto(route);
      const small = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("a, button, label:has(input)")]
          .filter((element) => element.offsetParent !== null)
          .map((element) => ({ text: element.innerText.trim().slice(0, 40), height: element.getBoundingClientRect().height }))
          .filter((target) => target.height < 44),
      );
      expect(small).toEqual([]);
    });
  });
}

test("search engines are kept out until launch, and let in after", async ({ page, request }) => {
  await page.goto("/");
  const robots = await (await request.get("/robots.txt")).text();
  const meta = (await page.locator('meta[name="robots"]').getAttribute("content")) ?? "";
  if (launched) {
    expect(meta).not.toContain("noindex");
    expect(robots).not.toMatch(/Disallow: \/\s*$/m);
  } else {
    expect(meta).toContain("noindex");
    expect(robots).toMatch(/Disallow: \/\s*$/m);
  }
});

test("pre-launch pages are gone after launch", async ({ request }) => {
  test.skip(!launched, "site is not launched yet");
  for (const route of prelaunchRoutes) {
    expect((await request.get(route)).status(), route).toBe(404);
  }
});

test("version.json says which commit is being served", async ({ request }) => {
  const version = await (await request.get("/version.json")).json();
  expect(typeof version.sha).toBe("string");
  expect(version.sha.length).toBeGreaterThan(6);
});
