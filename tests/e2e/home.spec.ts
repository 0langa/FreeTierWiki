import { expect, test } from "@playwright/test";

test("home shows the promise, popular picks, jobs, categories, and the changelog", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Free tiers, with the fine print.");
  await expect(page.getByText("Every entry is checked against its official pricing page")).toBeVisible();
  await expect(page.getByRole("region", { name: /^(Common first picks|Most visited)$/ }).getByRole("link").first()).toBeVisible();
  await expect(page.getByRole("region", { name: "Pick by job" }).getByRole("link", { name: /^Postgres hosting/ })).toHaveAttribute(
    "href",
    "/compare/postgres-hosting/",
  );
  await expect(page.getByRole("link", { name: /^Database/ }).first()).toHaveAttribute("href", "/category/database/");
  const changelog = page.getByRole("region", { name: "Free tier changelog" });
  await expect(changelog.getByRole("listitem").first()).toBeVisible();
  // Removed listings and new entries are housekeeping; the home page only shows plans that changed or ended.
  await expect(changelog.getByText(/^(Removed|New)$/)).toHaveCount(0);
  await expect(page.getByRole("region", { name: "Recently added" })).toHaveCount(0);
});

test("the hero card clips long limit lines inside its box", async ({ page }) => {
  await page.goto("/");
  const card = page.getByRole("region", { name: /^(Common first picks|Most visited)$/ });
  const box = await card.boundingBox();
  expect(box).not.toBeNull();
  for (const link of await card.getByRole("link").all()) {
    const linkBox = await link.boundingBox();
    expect(linkBox).not.toBeNull();
    expect(linkBox!.x + linkBox!.width).toBeLessThanOrEqual(box!.x + box!.width + 1);
    // The limit line itself must stay inside the row, not spill past the card edge.
    const spill = await link.evaluate((el) => {
      const r = el.getBoundingClientRect();
      return Math.max(0, ...[...el.querySelectorAll("span")].map((s) => s.getBoundingClientRect().right - r.right));
    });
    expect(spill).toBeLessThanOrEqual(1);
  }
});

test("a quick chip opens the filtered explorer", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "No card needed" }).click();
  await expect(page).toHaveURL(/\/explorer\/\?nocard=1/);
  await expect(page.getByRole("button", { name: "Remove filter: No card" })).toBeVisible();
});

test("the hero search box opens search", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: /Try “postgres”/ }).click();
  await expect(page.getByRole("combobox", { name: "Search free tiers" })).toBeVisible();
});

test("changelog and about pages render", async ({ page }) => {
  await page.goto("/changelog/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Free tier changelog");
  await expect(page.getByRole("link", { name: "PlanetScale" })).toBeVisible();
  await page.goto("/about/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("How we rate free tiers");
});

test("unknown pages show the 404 page", async ({ page }) => {
  const response = await page.goto("/nope/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
  await expect(page).toHaveTitle("Page not found · freetier.wiki");
});

test("home has no horizontal scroll", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("the header buttons fit on a phone screen", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "phone", "desktop has room");
  await page.goto("/");
  const width = page.viewportSize()?.width ?? 0;
  const toggle = await page.locator("header button").last().boundingBox();
  expect(toggle && toggle.x + toggle.width <= width).toBe(true);
});

test("the header fits narrow phones and tablets without a sideways scroll", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "phone", "one project is enough: the test sets its own widths");
  // 320px is the WCAG reflow width, 360px a common Android width, 768px a tablet held upright,
  // 1024px the first width that shows every link.
  for (const width of [320, 360, 768, 1024]) {
    await page.setViewportSize({ width, height: 740 });
    await page.goto("/compare/");
    // Measure with the self-hosted fonts, not the wider fallback a slow font load would leave in place.
    const fit = await page.evaluate(async () => {
      await document.fonts.ready;
      const nav = document.querySelector("header nav");
      // A label that wraps spills out of the header row without always making anything wider, so the width
      // checks can miss it ("How we rate" took three lines at 768px). Count each visible label's line boxes.
      const wrapped = [...(nav?.querySelectorAll("a") ?? [])]
        .filter((link) => getComputedStyle(link).display !== "none")
        .filter((link) => {
          const range = document.createRange();
          range.selectNodeContents(link);
          return range.getClientRects().length > 1;
        })
        .map((link) => link.textContent?.trim());
      return {
        page: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        links: nav ? nav.scrollWidth - nav.clientWidth : 0,
        wrapped,
      };
    });
    expect(fit.page, `${width}px page`).toBeLessThanOrEqual(0);
    // Below 360px the links may scroll inside the header; from 360px every link shows in full.
    if (width >= 360) expect(fit.links, `${width}px links`).toBeLessThanOrEqual(0);
    expect(fit.wrapped, `${width}px labels on more than one line`).toEqual([]);
    const toggle = await page.locator("header button").last().boundingBox();
    expect(toggle && toggle.x + toggle.width <= width, `${width}px toggle`).toBe(true);
  }
});
