import { expect, test } from "@playwright/test";

test("the changelog filter shows only one kind of change", async ({ page }) => {
  await page.goto("/changelog/");
  const rows = page.getByRole("listitem");
  const all = await rows.count();
  expect(all).toBeGreaterThan(10);

  await page.locator('label[for="kind-new"]').click();
  const visible = await rows.filter({ visible: true }).count();
  expect(visible).toBeGreaterThan(0);
  expect(visible).toBeLessThan(all);
  await expect(rows.filter({ visible: true }).first().getByText("New", { exact: true })).toBeVisible();

  await page.locator('label[for="kind-all"]').click();
  await expect(rows.filter({ visible: true })).toHaveCount(all);
});
