import { expect, test } from "@playwright/test";

test("GitHub Pages cap wording agrees across list and entry views", async ({ page }) => {
  for (const path of ["/compare/static-site-hosting/", "/provider/github/", "/category/hosting/no-card/", "/explorer/?q=github%20pages"]) {
    await page.goto(path);
    const row = page.getByRole("row").filter({ has: page.getByRole("link", { name: "GitHub Pages", exact: true }) });
    await expect(row).toContainText("Billing risk: None");
    await expect(row).not.toContainText("Soft cap");
    if (path.startsWith("/compare/") || path.startsWith("/provider/")) await expect(row).toContainText("No hard cap");
  }
  await page.goto("/services/github-pages/");
  await expect(page.getByRole("complementary", { name: "Free tier facts" })).toContainText("Hard capNo");
  await expect(page.getByRole("complementary", { name: "Free tier facts" })).toContainText("Billing riskNone");
});

test("comparison index links to a comparison page with a table", async ({ page }) => {
  await page.goto("/compare/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Compare free tiers");
  await page.getByRole("link", { name: /^Postgres hosting compared/ }).click();
  await expect(page).toHaveURL(/\/compare\/postgres-hosting\//);
  await expect(page.getByRole("table", { name: "Free Postgres hosting compared" }).getByRole("row").nth(1)).toBeVisible();
  await expect(page.getByRole("link", { name: "Neon", exact: true })).toBeVisible();
});
