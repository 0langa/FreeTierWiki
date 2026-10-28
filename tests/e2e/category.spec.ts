import { expect, test } from "@playwright/test";

test("a category page has its own intro, one FAQ block, and one FAQPage node", async ({ page }) => {
  await page.goto("/category/hosting/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Free Hosting tiers");
  await expect(page.getByText(/Sleep, bandwidth, and a card hold/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Questions people ask" })).toBeVisible();
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const nodes = scripts.flatMap((text) => JSON.parse(text)["@graph"] ?? []);
  const faqs = nodes.filter((node: { "@type": string }) => node["@type"] === "FAQPage");
  expect(faqs).toHaveLength(1);
  expect(faqs[0].mainEntity.length).toBeGreaterThanOrEqual(4);
  expect(faqs[0].mainEntity.length).toBeLessThanOrEqual(6);
});

test("a filtered category page does not repeat the base FAQ questions", async ({ page }) => {
  await page.goto("/category/hosting/");
  const base = await page.getByRole("heading", { level: 3 }).allTextContents();
  await page.goto("/category/hosting/no-card/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Free Hosting tiers with no credit card");
  const filtered = await page.getByRole("heading", { level: 3 }).allTextContents();
  expect(filtered.length).toBeGreaterThanOrEqual(3);
  expect(filtered.filter((question) => base.includes(question))).toEqual([]);
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const nodes = scripts.flatMap((text) => JSON.parse(text)["@graph"] ?? []);
  expect(nodes.filter((node: { "@type": string }) => node["@type"] === "FAQPage")).toHaveLength(1);
});

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

  test("every catalog entry is reachable through category links without JavaScript or filter URLs", async ({ page, request }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "All categories", exact: true }).click();
    await expect(page).toHaveURL(/\/category\/$/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://freetier.wiki/category/");

    const categoryLinks = await page.getByRole("navigation", { name: "All categories" }).getByRole("link").evaluateAll(
      (links) => links.map((link) => link.getAttribute("href")),
    );
    const sitemap = await (await request.get("/sitemap.xml")).text();
    const paths = [...sitemap.matchAll(/<loc>https:\/\/freetier\.wiki([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(paths).toContain("/category/");
    expect([...categoryLinks].sort()).toEqual(paths.filter((url) => /^\/category\/[^/]+\/$/.test(url)).sort());

    const linkedEntries = new Set<string>();
    for (const href of categoryLinks) {
      const response = await request.get(href!);
      expect(response.ok(), href!).toBe(true);
      // Read the emitted HTML, not hydrated components or the search data file.
      for (const match of (await response.text()).matchAll(/<a\s[^>]*href="(\/(?:services|tools)\/[^"?]+\/?)"/g)) {
        linkedEntries.add(match[1]);
      }
    }
    expect(paths.filter((url) => /^\/(services|tools)\//.test(url) && !linkedEntries.has(url))).toEqual([]);
  });
});

test("a category links to its no-card list, which leaves out plans that need a card", async ({ page }) => {
  await page.goto("/category/database/");
  await page.getByRole("navigation", { name: "Filtered lists" }).getByRole("link", { name: /No credit card/ }).click();
  await expect(page).toHaveURL(/\/category\/database\/no-card\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Free Database tiers with no credit card");
  const table = page.getByRole("table", { name: "Free Database tiers with no credit card", exact: true });
  await expect(table.getByRole("link", { name: "Neon", exact: true })).toBeVisible();
  await expect(table.getByRole("link", { name: "Azure PostgreSQL Flexible Server", exact: true })).toHaveCount(0);
  await expect(table.getByText("Card", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Filter these in the Explorer/ })).toHaveAttribute("href", "/explorer/?cat=database&nocard=1");
});

test("the hard-cap hub links every category list and shows the safest picks", async ({ page }) => {
  await page.goto("/hard-cap/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Free tiers with a hard cap");
  await expect(page.getByRole("navigation", { name: "Categories", exact: true }).getByRole("link", { name: /^Database/ })).toHaveAttribute(
    "href",
    "/category/database/hard-cap/",
  );
  const picks = page.getByRole("table", { name: "Safest picks: Hard cap", exact: true });
  await expect(picks.getByText("Hard cap", { exact: true }).first()).toBeVisible();
  await expect(picks.getByText("No hard cap", { exact: true })).toHaveCount(0);
});
