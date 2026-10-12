import { expect, test } from "@playwright/test";

test("sitemap lists pages on the real origin", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  const xml = await response.text();
  expect(xml).toContain("<loc>https://freetier.wiki/</loc>");
  expect(xml).toContain("<loc>https://freetier.wiki/services/supabase/</loc>");
  expect(xml).toContain("<loc>https://freetier.wiki/category/database/</loc>");
  expect(xml).not.toContain("/resources/");
});

test("robots.txt points at the sitemap", async ({ request }) => {
  const text = await (await request.get("/robots.txt")).text();
  expect(text).toContain("Sitemap: https://freetier.wiki/sitemap.xml");
});

test("detail pages carry canonical and Open Graph tags", async ({ page }) => {
  await page.goto("/services/supabase/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://freetier.wiki/services/supabase/");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/og\.png$/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Supabase/);
});

for (const query of ["domain=ai&tag=misc&provider=Supabase", "cat=ai&q=supabase"]) {
  test(`empty explorer results are excluded from indexing: ${query}`, async ({ page }) => {
    await page.goto(`/explorer/?${query}`);
    await expect(page.getByTestId("result-count")).toHaveText("0");
    await expect(page.getByText("No free tiers match these filters.")).toBeVisible();
    await expect(page.locator('head meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://freetier.wiki/explorer/");

    await page.getByRole("button", { name: "Clear filters", exact: true }).click();
    await expect(page.getByTestId("result-count")).not.toHaveText("0");
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);

    await page.goBack();
    await expect(page.getByTestId("result-count")).toHaveText("0");
    await expect(page.locator('head meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
    await page.getByRole("link", { name: "Compare", exact: true }).click();
    await expect(page).toHaveURL(/\/compare\/$/);
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
  });
}

test("nonempty explorer filters and important landing pages remain indexable", async ({ page }) => {
  for (const url of ["/explorer/", "/explorer/?cat=database&q=supabase", "/category/database/", "/services/supabase/"]) {
    await page.goto(url);
    if (url.startsWith("/explorer/")) {
      await expect(page.getByTestId("result-count")).toHaveText(/^[1-9]\d*$/);
    }
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
  }
});

test("loading or failed explorer data does not mark a page noindex", async ({ page }) => {
  let release!: () => void;
  const pending = new Promise<void>((resolve) => { release = resolve; });
  await page.route("**/data/explorer.json", async (route) => {
    await pending;
    await route.abort();
  });
  await page.goto("/explorer/?cat=ai&q=supabase");
  await expect(page.getByTestId("result-count")).toHaveText("…");
  await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
  release();
  await expect(page.getByRole("status")).toContainText("Could not load the full list.");
  await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
});
