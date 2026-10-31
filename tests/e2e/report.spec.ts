import { expect, test } from "@playwright/test";

const PATH = "/reports/free-tier-changes-2026/";

test("the 2026 report lists sourced events and offers its data", async ({ page, request }) => {
  await page.goto(PATH);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Free tiers that ended or changed in 2026");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://freetier.wiki${PATH}`);

  const events = page.getByRole("table", { name: "Free tier changes in 2026" });
  const rows = events.locator("[role=row][data-kind]");
  expect(await rows.count()).toBeGreaterThan(0);
  // Every event row links out to the vendor's page, never back to this site.
  for (const link of await rows.locator("a[target=_blank]").all()) {
    await expect(link).toHaveAttribute("href", /^https:\/\/(?!freetier\.wiki)/);
  }
  expect(await rows.locator("a[target=_blank]").count()).toBe(await rows.count());

  await expect(page.getByRole("table", { name: "Hard cap against billing risk" }).getByRole("row")).toHaveCount(5);
  await expect(page.getByRole("heading", { name: "Cite this page" })).toBeVisible();

  const graph = JSON.parse((await page.locator('script[type="application/ld+json"]').allTextContents()).find((text) => text.includes("Dataset")) ?? "{}");
  const dataset = graph["@graph"].find((node: { "@type": string }) => node["@type"] === "Dataset");
  expect(dataset.distribution.map((item: { encodingFormat: string }) => item.encodingFormat)).toEqual(["text/csv", "application/json"]);

  const csvHref = await page.getByRole("link", { name: "Download CSV" }).getAttribute("href");
  const csv = await request.get(csvHref!);
  expect(csv.ok()).toBe(true);
  const lines = (await csv.text()).trim().split("\r\n");
  expect(lines[0]).toBe("date,service,provider,kind,change,source,scheduled,section");
  expect(lines.filter((line) => line.endsWith(",2026"))).toHaveLength(await rows.count());

  const json = await (await request.get(PATH.replace("/reports/", "/api/v1/reports/").replace(/\/$/, ".json"))).json();
  expect(json.events).toHaveLength(await rows.count());
});

test("the report has a Markdown version with its tables", async ({ request }) => {
  const response = await request.get(`${PATH}index.md`);
  expect(response.ok()).toBe(true);
  const markdown = await response.text();
  expect(markdown).toContain("# Free tiers that ended or changed in 2026");
  expect(markdown).toMatch(/\| Date \| Service \| What changed \| Source \|/);
  expect(markdown).toContain("updated: \"2026-");
});
