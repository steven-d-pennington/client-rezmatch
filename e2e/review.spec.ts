import { expect, test } from "@playwright/test";
import { clientName, launched } from "./routes";

// F-001: the client can open every look, choose, and send one line back.
test.describe("review page", () => {
  test.skip(launched, "the review page is removed at launch");

  test("links to every look and each look links back", async ({ page }) => {
    await page.goto("/review");
    const links = page.getByRole("link", { name: /^Open look/ });
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(2);
    for (let index = 0; index < count; index += 1) {
      await page.goto("/review");
      await links.nth(index).click();
      await expect(page).toHaveURL(/\/directions\//);
      await expect(page.getByText(/^Early look:/)).toBeVisible();
      await page.getByRole("link", { name: "Back to all looks" }).click();
      await expect(page).toHaveURL(/\/review$/);
    }
  });

  test("picks become one line that can be copied, and survive a reload", async ({ page, context, browserName }) => {
    await page.goto("/review");
    await expect(page.locator("form[data-restored=true]")).toBeVisible();
    const summary = page.getByTestId("picks-summary");
    await expect(summary).toContainText(`My picks for ${clientName}.`);
    await expect(summary).toContainText("Not sure yet.");

    const firstQuestion = page.getByRole("group").first();
    const choice = firstQuestion.getByRole("radio").first();
    const choiceLabel = (await firstQuestion.locator("label").first().innerText()).trim();
    await choice.check();
    await page.getByRole("textbox").fill("Love the second one");
    await expect(summary).toContainText(choiceLabel);
    await expect(summary).toContainText("Note: Love the second one.");

    if (browserName === "chromium") {
      await context.grantPermissions(["clipboard-read", "clipboard-write"]);
      await page.getByRole("button", { name: "Copy my picks" }).click();
      await expect(page.getByRole("status")).toContainText("Copied");
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(await summary.innerText());
    }

    await page.reload();
    await expect(page.locator("form[data-restored=true]")).toBeVisible();
    await expect(page.getByTestId("picks-summary")).toContainText(choiceLabel);
    await expect(page.getByRole("textbox")).toHaveValue("Love the second one");
  });
});
