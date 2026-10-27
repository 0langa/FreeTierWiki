import { expect, test } from "@playwright/test";

test("changelog pages have separate content and canonical URLs", async ({ page }) => {
  await page.goto("/changelog/");
  const rows = page.locator("li[data-kind]");
  await expect(rows).toHaveCount(100);
  const newest = (await rows.first().textContent()) ?? "";
  expect(newest).not.toBe("");
  await page.getByRole("link", { name: "Older changes", exact: true }).click();
  await expect(page).toHaveURL(/\/changelog\/page\/2\/$/);
  await expect(rows).toHaveCount(100);
  await expect(rows.first()).not.toHaveText(newest);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://freetier.wiki/changelog/page/2/");
  await expect(page).toHaveTitle(/Page 2/);
  await page.getByRole("link", { name: "Newer changes", exact: true }).click();
  await expect(page).toHaveURL(/\/changelog\/$/);
  await expect(rows.first()).toHaveText(newest);
});

test.describe("changelog without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the main archive links directly to older removed entries", async ({ page }) => {
    await page.goto("/changelog/");
    const archives = page.getByRole("navigation", { name: "Changelog archives" });
    await archives.locator('a[href="/changelog/removed/page/2/"]').click();
    await expect(page).toHaveURL(/\/changelog\/removed\/page\/2\/$/);
    await expect(page.locator("li[data-kind]").first()).toBeVisible();
  });

  test("filters cover the full history and retain their type across pages", async ({ page }) => {
    await page.goto("/changelog/");
    const filters = page.getByRole("navigation", { name: "Change type" });
    const rows = page.locator("li[data-kind]");
    await filters.getByRole("link", { name: /^New \d/ }).click();
    await expect(page).toHaveURL(/\/changelog\/new\/$/);
    await expect(rows).toHaveCount(100);
    await expect(page.locator('li[data-kind]:not([data-kind="new"])')).toHaveCount(0);
    await page.getByRole("link", { name: "Older changes", exact: true }).click();
    await expect(page).toHaveURL(/\/changelog\/new\/page\/2\/$/);
    await expect(rows).toHaveCount(100);
    await expect(page.locator('li[data-kind]:not([data-kind="new"])')).toHaveCount(0);
    await filters.getByRole("link", { name: /^Removed \d/ }).click();
    await expect(page).toHaveURL(/\/changelog\/removed\/$/);
    await expect(rows.first()).toBeVisible();
    await expect(page.locator('li[data-kind]:not([data-kind="removed"])')).toHaveCount(0);
    await filters.getByRole("link", { name: /^All \d/ }).click();
    await expect(page).toHaveURL(/\/changelog\/$/);
    await expect(rows).toHaveCount(100);
  });
});
