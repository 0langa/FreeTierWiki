import { expect, test, type APIRequestContext } from "@playwright/test";

type Row = { url: string; status: string; freshness: { state: string } };

async function findEntry(request: APIRequestContext, match: (row: Row) => boolean): Promise<Row | undefined> {
  const rows: Row[] = await (await request.get("/data/explorer.json")).json();
  return rows.find(match);
}

test("detail page shows the facts label and the pricing link", async ({ page }) => {
  await page.goto("/services/supabase/");
  await expect(page.getByRole("heading", { level: 1, name: "Supabase" })).toBeVisible();
  const facts = page.getByRole("complementary", { name: "Free tier facts" });
  await expect(facts).toBeVisible();
  await expect(facts.getByText("Card required")).toBeVisible();
  await expect(page.getByRole("link", { name: /Official pricing/ })).toHaveAttribute("href", /supabase\.com/);
});

test("a deepened entry shows its sections and links its alternatives", async ({ page }) => {
  await page.goto("/services/supabase/");
  const about = page.getByRole("region", { name: "About the free plan" });
  await expect(about.getByRole("heading", { level: 2, name: "What the free plan gives you" })).toBeVisible();
  await expect(about.getByRole("heading", { level: 2, name: "Questions people ask" })).toBeVisible();
  await expect(about.getByRole("link", { name: "Neon" })).toHaveAttribute("href", "/services/neon/");
  await expect(page.getByRole("heading", { name: "Overview" })).toHaveCount(0);
});

test("the jump menu links to the sections on the page", async ({ page }) => {
  await page.goto("/services/supabase/");
  const jumps = page.getByRole("navigation", { name: "On this page" });
  await jumps.getByRole("link", { name: "Gotchas" }).click();
  await expect(page).toHaveURL(/#gotchas$/);
  await expect(page.locator("#gotchas")).toBeInViewport();
  await expect(page.getByRole("heading", { level: 2, name: "How to get started" })).toBeVisible();
});

test("a deepened entry carries breadcrumb and FAQ structured data", async ({ page }) => {
  await page.goto("/services/supabase/");
  const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) ?? "{}");
  const types = data["@graph"].map((node: { "@type": string }) => node["@type"]);
  expect(types).toEqual(["BreadcrumbList", "FAQPage"]);
  expect(data["@graph"][1].mainEntity).toHaveLength(3);
});

test("a provider page lists every free tier from that provider", async ({ page }) => {
  await page.goto("/services/supabase/");
  await page.getByRole("link", { name: "Supabase", exact: true }).first().click();
  await expect(page).toHaveURL(/\/provider\/supabase\/$/);
  await expect(page.getByRole("heading", { level: 1, name: "Supabase free tiers" })).toBeVisible();
  await expect(page.getByRole("table", { name: "Supabase free tiers" }).getByRole("row")).not.toHaveCount(0);
});

test("an unchecked entry says so", async ({ page, request }) => {
  const row = await findEntry(request, (r) => r.freshness.state === "imported");
  test.skip(!row, "every entry is checked");
  await page.goto(row!.url);
  await expect(page.getByRole("note")).toContainText("Not re-checked since");
});

test("an ended entry says so", async ({ page, request }) => {
  const row = await findEntry(request, (r) => r.status === "ended");
  test.skip(!row, "no ended entry in the catalog");
  await page.goto(row!.url);
  await expect(page.getByRole("note")).toContainText("This free tier ended");
  await expect(page.getByRole("heading", { name: "Good fit" })).toHaveCount(0);
});

test("a changed entry shows what changed", async ({ page, request }) => {
  const row = await findEntry(request, (r) => r.status === "changed");
  test.skip(!row, "no changed entry in the catalog");
  await page.goto(row!.url);
  await expect(page.getByRole("note")).toContainText("Changed in");
});

test("an entry links to the comparison tables it is in", async ({ page }) => {
  await page.goto("/services/neon/");
  const compared = page.getByRole("navigation", { name: "Compared in" });
  await expect(compared.getByRole("link", { name: "Postgres hosting" })).toHaveAttribute("href", "/compare/postgres-hosting/");
});

test("on a phone the facts label comes before the pricing button", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "phone", "desktop shows the facts label in a side column");
  await page.goto("/services/supabase/");
  const facts = await page.getByRole("complementary", { name: "Free tier facts" }).boundingBox();
  const pricing = await page.getByRole("link", { name: /Official pricing/ }).boundingBox();
  expect(facts && pricing && facts.y < pricing.y).toBe(true);
});

test("list items never render as [object Object]", async ({ page }) => {
  await page.goto("/services/render/");
  await expect(page.getByText("[object Object]")).toHaveCount(0);
});

test("the detail page has no horizontal scroll", async ({ page }) => {
  await page.goto("/services/supabase/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
