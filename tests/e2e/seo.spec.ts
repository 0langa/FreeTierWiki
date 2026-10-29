import { expect, type Page, test } from "@playwright/test";

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
  expect(text).toContain("Disallow: /explorer?\n");
  expect(text).toContain("Disallow: /explorer/?\n");
  expect(text).toContain("Allow: /\n");
});

test("detail pages carry canonical and Open Graph tags", async ({ page }) => {
  await page.goto("/services/supabase/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://freetier.wiki/services/supabase/");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/og\.png$/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Supabase/);
});

async function structuredData(page: Page): Promise<Record<string, unknown>[]> {
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  return scripts.flatMap((text) => JSON.parse(text)["@graph"] ?? []);
}

test("the home page names the site for search results", async ({ page }) => {
  await page.goto("/");
  expect(await structuredData(page)).toContainEqual(expect.objectContaining({ "@type": "WebSite", name: "freetier.wiki", url: "https://freetier.wiki/" }));
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://freetier.wiki/");
});

test("detail pages date their content and point at the site", async ({ page }) => {
  await page.goto("/services/supabase/");
  const node = (await structuredData(page)).find((item) => item["@id"] === "https://freetier.wiki/services/supabase/");
  expect(node?.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(node?.isPartOf).toEqual({ "@id": "https://freetier.wiki/#website" });
  const graph = await structuredData(page);
  const guide = graph.find((item) => item["@type"] === "Article");
  const product = graph.find((item) => item["@type"] === "Product");
  expect(guide?.about).toEqual({ "@id": product?.["@id"] });
  expect(product?.name).toBe("Supabase");
  expect(product).not.toHaveProperty("offers");
  expect(product).not.toHaveProperty("aggregateRating");
});

test("collection markup matches the visible category list in order", async ({ page }) => {
  await page.goto("/category/database/");
  const collection = (await structuredData(page)).find((item) => item["@type"] === "CollectionPage");
  const list = collection?.mainEntity as { itemListElement: { url: string }[]; numberOfItems: number };
  const links = await page.getByRole("table", { name: "Free Database tiers" }).getByRole("link").evaluateAll((elements) => elements.map((element) => new URL(element.getAttribute("href")!, "https://freetier.wiki").href));
  expect(list.itemListElement.map((item) => item.url)).toEqual(links);
  expect(list.numberOfItems).toBe(links.length);
});

test("list pages mark up the breadcrumb they show and share their own URL", async ({ page }) => {
  await page.goto("/category/database/");
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toContainText("Categories");
  const [crumbs] = await structuredData(page);
  expect(crumbs.itemListElement).toEqual([
    { "@type": "ListItem", position: 1, name: "Categories", item: "https://freetier.wiki/category/" },
    { "@type": "ListItem", position: 2, name: "Database" },
  ]);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://freetier.wiki/category/database/");
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
    await page.getByRole("navigation", { name: "Main" }).locator("summary", { hasText: "Compare" }).click();
    await page.getByRole("link", { name: /^All comparisons/ }).click();
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

test("every page has a Markdown version for agents", async ({ request }) => {
  // The build writes index.md next to each index.html; functions/_middleware.ts serves it for Accept: text/markdown.
  for (const path of ["/", "/services/supabase/", "/category/database/", "/compare/postgres-hosting/"]) {
    const response = await request.get(`${path}index.md`);
    expect(response.ok(), path).toBe(true);
    const markdown = await response.text();
    expect(markdown, path).toMatch(/^---\n[\s\S]*?\n---\n\n/);
    expect(markdown, path).toContain(`\nurl: "https://freetier.wiki${path}"\n`);
    expect(markdown, path).toMatch(/^# /m);
    expect(markdown, path).not.toContain("<");
  }
});
