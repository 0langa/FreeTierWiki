import { expect, test, type Page, type TestInfo } from "@playwright/test";

async function openFilters(page: Page, info: TestInfo) {
  if (info.project.name === "phone") await page.getByRole("button", { name: /^Filters/ }).click();
}

async function closeFilters(page: Page, info: TestInfo) {
  if (info.project.name === "phone") await page.getByRole("button", { name: /^Show \d+ results$/ }).click();
}

async function readCount(page: Page): Promise<number> {
  const count = page.getByTestId("result-count");
  await expect(count).toHaveText(/^\d+$/);
  return Number(await count.textContent());
}

test("a filter updates the URL and the results, and back restores them", async ({ page }, info) => {
  await page.goto("/explorer/");
  const count = page.getByTestId("result-count");
  const before = String(await readCount(page));
  expect(Number(before)).toBeGreaterThan(0);

  await openFilters(page, info);
  await page.getByRole("checkbox", { name: /^Database/ }).check();
  await closeFilters(page, info);

  await expect(page).toHaveURL(/cat=database/);
  await expect(count).not.toHaveText(before);
  await expect(page.getByRole("link", { name: "Supabase", exact: true })).toBeVisible();

  await page.goBack();
  await expect(page).not.toHaveURL(/cat=database/);
  await expect(count).toHaveText(before);
});

test("back restores the search text", async ({ page }) => {
  await page.goto("/explorer/");
  const input = page.getByRole("searchbox", { name: "Search the explorer" });
  await input.fill("supabase");
  await expect(page).toHaveURL(/q=supabase/);
  await page.getByRole("link", { name: "Supabase", exact: true }).click();
  await expect(page).toHaveURL(/\/services\/supabase\//);
  await page.goBack();
  await expect(input).toHaveValue("supabase");
});

test("old explorer links still filter", async ({ page }) => {
  await page.goto("/explorer/?kind=services&domain=database");
  await expect(page.getByRole("button", { name: "Remove filter: Services" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Remove filter: Database" })).toBeVisible();
});

test("show more adds 50 rows", async ({ page }) => {
  await page.goto("/explorer/");
  const links = page.getByRole("table", { name: "Free tiers" }).getByRole("link");
  await expect(links).toHaveCount(50);
  await page.getByRole("button", { name: "Show 50 more" }).click();
  await expect(links).toHaveCount(100);
});

test("keeps the default list when data fails to load", async ({ page }) => {
  await page.route("**/data/explorer.json", (route) => route.abort());
  await page.goto("/explorer/");
  await expect(page.getByText("Could not load the full list")).toBeVisible();
  await expect(page.getByRole("table", { name: "Free tiers" }).getByRole("row").nth(1)).toBeVisible();
});

test("the explorer has no horizontal scroll", async ({ page }) => {
  await page.goto("/explorer/");
  await expect(page.getByTestId("result-count")).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
