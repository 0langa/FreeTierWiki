import { expect, test } from "@playwright/test";

test("category page lists entries, safest first", async ({ page }) => {
  await page.goto("/category/database/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Free Database tiers");
  await expect(page.getByRole("table", { name: "Free Database tiers" }).getByRole("link", { name: "Supabase", exact: true })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Providers" }).getByRole("link", { name: "Supabase" })).toHaveAttribute("href", "/provider/supabase/");
  await expect(page.getByRole("navigation", { name: "Comparison tables" }).getByRole("link", { name: "Postgres hosting" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Filter these in the Explorer/ })).toHaveAttribute("href", "/explorer/?cat=database");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the list is in the HTML", async ({ page }) => {
    await page.goto("/category/hosting/");
    await expect(page.getByRole("table", { name: "Free Hosting tiers" }).getByRole("row").nth(1)).toBeVisible();
  });
});
