import { expect, test } from "@playwright/test";

test("home shows the promise, popular picks, jobs, categories, and the changelog", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Free tiers, with the fine print.");
  await expect(page.getByText("Every entry is checked against its official pricing page")).toBeVisible();
  await expect(page.getByRole("region", { name: /^(Common first picks|Most visited)$/ }).getByRole("link").first()).toBeVisible();
  await expect(page.getByRole("region", { name: "Pick by job" }).getByRole("link", { name: /^Postgres hosting/ })).toHaveAttribute(
    "href",
    "/compare/postgres-hosting/",
  );
  await expect(page.getByRole("link", { name: /^Database/ }).first()).toHaveAttribute("href", "/category/database/");
  const changelog = page.getByRole("region", { name: "Free tier changelog" });
  await expect(changelog.getByRole("listitem").first()).toBeVisible();
  // Removed listings and new entries are housekeeping; the home page only shows plans that changed or ended.
  await expect(changelog.getByText(/^(Removed|New)$/)).toHaveCount(0);
  await expect(page.getByRole("region", { name: "Recently added" })).toHaveCount(0);
});

test("the hero card clips long limit lines inside its box", async ({ page }) => {
  await page.goto("/");
  const card = page.getByRole("region", { name: /^(Common first picks|Most visited)$/ });
  const box = await card.boundingBox();
  expect(box).not.toBeNull();
  for (const link of await card.getByRole("link").all()) {
    const linkBox = await link.boundingBox();
    expect(linkBox).not.toBeNull();
    expect(linkBox!.x + linkBox!.width).toBeLessThanOrEqual(box!.x + box!.width + 1);
    // The limit line itself must stay inside the row, not spill past the card edge.
    const spill = await link.evaluate((el) => {
      const r = el.getBoundingClientRect();
      return Math.max(0, ...[...el.querySelectorAll("span")].map((s) => s.getBoundingClientRect().right - r.right));
    });
    expect(spill).toBeLessThanOrEqual(1);
  }
});

test("a quick chip opens the filtered explorer", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "No card needed" }).click();
  await expect(page).toHaveURL(/\/explorer\/\?nocard=1/);
  await expect(page.getByRole("button", { name: "Remove filter: No card" })).toBeVisible();
});

test("the hero search box opens search", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: /Try “postgres”/ }).click();
  await expect(page.getByRole("combobox", { name: "Search free tiers" })).toBeVisible();
});

test("changelog and about pages render", async ({ page }) => {
  await page.goto("/changelog/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Free tier changelog");
  await expect(page.getByRole("link", { name: "PlanetScale" })).toBeVisible();
  await page.goto("/about/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("How we rate free tiers");
});

test("unknown pages show the 404 page", async ({ page }) => {
  const response = await page.goto("/nope/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
});

test("home has no horizontal scroll", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
