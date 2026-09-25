import { expect, test } from "@playwright/test";

test("detail page shows the facts label, the pricing link, and freshness", async ({ page }) => {
  await page.goto("/services/supabase/");
  await expect(page.getByRole("heading", { level: 1, name: "Supabase" })).toBeVisible();
  const facts = page.getByRole("complementary", { name: "Free tier facts" });
  await expect(facts).toBeVisible();
  await expect(facts.getByText("Card required")).toBeVisible();
  await expect(page.getByRole("link", { name: /Official pricing/ })).toHaveAttribute("href", /supabase\.com/);
  await expect(page.getByRole("note")).toContainText("Not re-checked since");
});

test("an ended entry says so", async ({ page }) => {
  await page.goto("/services/planetscale/");
  await expect(page.getByRole("note")).toContainText("This free tier ended");
  await expect(page.getByRole("complementary", { name: "Free tier facts" })).toContainText("No free plan");
});

test("a changed entry shows what changed", async ({ page }) => {
  await page.goto("/services/fly-io/");
  await expect(page.getByRole("note")).toContainText("Changed in");
});

test("list items never render as [object Object]", async ({ page }) => {
  await page.goto("/services/render/");
  await expect(page.getByText("[object Object]")).toHaveCount(0);
});

test("the detail page has no horizontal scroll", async ({ page }) => {
  await page.goto("/services/supabase/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
