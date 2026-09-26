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

test("list items never render as [object Object]", async ({ page }) => {
  await page.goto("/services/render/");
  await expect(page.getByText("[object Object]")).toHaveCount(0);
});

test("the detail page has no horizontal scroll", async ({ page }) => {
  await page.goto("/services/supabase/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
