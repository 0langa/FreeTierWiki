import { expect, test } from "@playwright/test";

test("the search index loads only when search opens", async ({ page }) => {
  const requested: string[] = [];
  page.on("request", (request) => requested.push(new URL(request.url()).pathname));
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(requested).not.toContain("/data/search.json");

  await page.keyboard.press("Control+k");
  await expect(page.getByRole("combobox", { name: "Search free tiers" })).toBeVisible();
  await expect.poll(() => requested.includes("/data/search.json")).toBe(true);
});

test("search finds an entry and Enter opens it", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Search free tiers" }).click();
  const input = page.getByRole("combobox", { name: "Search free tiers" });
  await input.fill("supabase");
  await expect(page.getByRole("option").first()).toContainText("Supabase");
  await input.press("Enter");
  await expect(page).toHaveURL(/\/services\/supabase/);
});

test("Enter with no match opens the explorer search", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Control+k");
  const input = page.getByRole("combobox", { name: "Search free tiers" });
  await input.fill("zzqqxx");
  await expect(page.getByText(/No match for/)).toBeVisible();
  await input.press("Enter");
  await expect(page).toHaveURL(/\/explorer\/\?q=zzqqxx/);
});
