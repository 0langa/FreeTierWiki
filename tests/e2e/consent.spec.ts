import { expect, test, type Page } from "@playwright/test";

// Every other spec starts with a stored "rejected" choice (see playwright.config.ts); these start fresh.
test.use({ storageState: { cookies: [], origins: [] } });

const GOOGLE = /googletagmanager\.com|google-analytics\.com/;

/** Records and stubs every request to Google, so tests never reach the network. */
async function watchGoogle(page: Page): Promise<string[]> {
  const hits: string[] = [];
  await page.route(GOOGLE, (route) => {
    hits.push(route.request().url());
    return route.fulfill({ status: 200, contentType: "application/javascript", body: "" });
  });
  return hits;
}

const banner = (page: Page) => page.getByRole("region", { name: "Your privacy choice" });

test("a first visit shows the banner and requests nothing from Google", async ({ page }) => {
  const hits = await watchGoogle(page);
  await page.goto("/");
  await expect(banner(page)).toBeVisible();
  await page.waitForLoadState("networkidle");
  expect(hits).toEqual([]);
});

test("Reject all and Accept all carry the same weight", async ({ page }) => {
  await page.goto("/");
  const reject = banner(page).getByRole("button", { name: "Reject all" });
  const accept = banner(page).getByRole("button", { name: "Accept all" });
  await expect(reject).toBeVisible();
  await expect(accept).toBeVisible();
  expect(await reject.getAttribute("class")).toBe(await accept.getAttribute("class"));
  const [r, a] = [await reject.boundingBox(), await accept.boundingBox()];
  expect(Math.abs(r!.width - a!.width)).toBeLessThanOrEqual(1);
  expect(Math.abs(r!.height - a!.height)).toBeLessThanOrEqual(1);
  expect(Math.abs(r!.y - a!.y)).toBeLessThanOrEqual(1);
});

test("the details explain what Google Analytics collects before anyone decides", async ({ page }) => {
  await page.goto("/");
  await banner(page).getByText("What Google Analytics collects").click();
  await expect(banner(page).getByText(/which last up to 2 years/)).toBeVisible();
});

test("Reject all keeps Google off on every page", async ({ page }) => {
  const hits = await watchGoogle(page);
  await page.goto("/");
  await banner(page).getByRole("button", { name: "Reject all" }).click();
  await expect(banner(page)).toBeHidden();
  await page.goto("/about/");
  await page.waitForLoadState("networkidle");
  await expect(banner(page)).toBeHidden();
  expect(hits).toEqual([]);
});

test("Accept all loads the Google tag, and a returning visit loads it straight away", async ({ page }) => {
  const hits = await watchGoogle(page);
  await page.goto("/");
  await banner(page).getByRole("button", { name: "Accept all" }).click();
  await expect(banner(page)).toBeHidden();
  await expect.poll(() => hits.length).toBeGreaterThan(0);

  hits.length = 0;
  await page.reload();
  await expect.poll(() => hits.length).toBeGreaterThan(0);
  await expect(banner(page)).toBeHidden();
});

test("Privacy settings in the footer reopens the banner and withdraws consent", async ({ page, context }) => {
  await watchGoogle(page);
  await page.goto("/");
  await banner(page).getByRole("button", { name: "Accept all" }).click();
  await context.addCookies([{ name: "_ga", value: "GA1.1.1.1", url: "http://127.0.0.1:4173" }]);

  await page.getByRole("contentinfo").getByRole("button", { name: "Privacy settings" }).click();
  await expect(banner(page)).toBeVisible();
  await expect(banner(page)).toBeFocused();
  await expect(banner(page).getByText("Current choice: Google Analytics is allowed.")).toBeVisible();

  await banner(page).getByRole("button", { name: "Reject all" }).click();
  await expect(banner(page)).toBeHidden();
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("ftw-consent") ?? "null"));
  expect(stored.analytics).toBe(false);
  expect((await context.cookies()).filter((cookie) => cookie.name.startsWith("_ga"))).toEqual([]);
});

test("closing the reopened banner keeps the earlier choice", async ({ page }) => {
  await page.goto("/");
  await banner(page).getByRole("button", { name: "Reject all" }).click();
  await page.getByRole("contentinfo").getByRole("button", { name: "Privacy settings" }).click();
  await page.keyboard.press("Escape");
  await expect(banner(page)).toBeHidden();
  await expect(page.getByRole("contentinfo").getByRole("button", { name: "Privacy settings" })).toBeFocused();
});
