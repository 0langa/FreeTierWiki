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
