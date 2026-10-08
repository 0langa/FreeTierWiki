import { expect, test } from "@playwright/test";

test("comparison index links to a comparison page with a table", async ({ page }) => {
  await page.goto("/compare/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Compare free tiers");
  await page.getByRole("link", { name: /Free Postgres hosting compared/ }).click();
  await expect(page).toHaveURL(/\/compare\/postgres-hosting\//);
  await expect(page.getByRole("table", { name: "Free Postgres hosting compared" }).getByRole("row").nth(1)).toBeVisible();
  await expect(page.getByRole("link", { name: "Neon", exact: true })).toBeVisible();
});
