import { expect, it } from "vitest";

import { sourceSnapshot } from "../../scripts/verify/lib/source-snapshot.mjs";
import { compareRuns, hasCurrentReview, reviewQueue } from "../../scripts/verify/lib/freshness.mjs";
import { classifyFetch } from "../../scripts/verify/lib/freshness.mjs";

const NOW = "2026-10-21T12:00:00Z";

it('ignores stale pricing and maintenance headings inside comments or scripts',()=>{
  const page=sourceSnapshot('<title>Pricing</title><!-- <h1>Security maintenance</h1><div>Old Free quota 9000</div> --><script>const old="<h1>Our apps are offline</h1>";</script><p>Free quota 5 GB</p>');
  expect(page.accessIssue).toBeUndefined();
  expect(page.text).not.toContain('9000');
  expect(page.text).toContain('5 GB');
});

it("rejects HTTP 200 maintenance and bot challenges even when a footer contains pricing words", () => {
  for (const heading of ["Security maintenance · StatusCake", "Making sure you're not a bot!"]) {
    const page = sourceSnapshot(`<title>${heading}</title><h1>${heading}</h1><p>${"Free pricing plan unavailable. ".repeat(40)}</p>`);
    expect(page.accessIssue).toBeDefined();
    expect(classifyFetch([{ status: 200, chars: page.text.length, excerptChars: page.text.length, accessIssue: page.accessIssue }])).toBe("blocked");
  }
  expect(sourceSnapshot('<title>Pricing</title><h1>Free plan</h1><p>Does your plan include scheduled maintenance?</p>').accessIssue).toBeUndefined();
});

it("detects pricing changes after the former 6,000-character excerpt cutoff", () => {
  const prefix = Array.from({ length: 400 }, (_, i) => `<p>Plan ${i} costs $1 per month.</p>`).join("");
  const a = sourceSnapshot(`${prefix}<p>Free storage 5 GB</p>`);
  const b = sourceSnapshot(`${prefix}<p>Free storage 10 GB</p>`);
  expect(a.legacyHash).toBe(b.legacyHash);
  expect(a.hash).not.toBe(b.hash);
});

it("detects feature-list and div-card changes without pricing keywords or table markup", () => {
  const prefix = '<h1>Pricing</h1><div>Free</div><div>$0</div><div>Features</div><div>Seats</div><div>Three</div><div>Options</div>';
  const a = sourceSnapshot(prefix + '<div>Social login included</div>');
  const b = sourceSnapshot(prefix + '<div>Social login excluded</div>');
  expect(a.markupHash).toBe(b.markupHash);
  expect(a.legacyHash).toBe(b.legacyHash);
  expect(a.hash).not.toBe(b.hash);
  const c = sourceSnapshot(prefix.replace('<div>Three</div>', '<div>One</div>') + '<div>Social login included</div>');
  expect(a.hash).not.toBe(c.hash);
});

it("preserves meaningful text case in units and suffixes", () => {
  expect(sourceSnapshot('<p>Free quota 5m</p>').hash).not.toBe(sourceSnapshot('<p>Free quota 5M</p>').hash);
});

it("detects CSS/accessibility feature indicators and structural changes in div-based comparisons", () => {
  const a = sourceSnapshot('<div class="plan">Free</div><li>Single sign-on<span aria-label="Included > basic" class="checkmark"></span></li>');
  const b = sourceSnapshot('<div class="plan">Free</div><li>Single sign-on<span aria-label="Excluded > basic" class="cross"></span></li>');
  expect(a.text).toBe(b.text);
  expect(a.hash).toBe(b.hash);
  expect(a.markupHash).not.toBe(b.markupHash);
  expect(sourceSnapshot('<link rel="stylesheet" href="/pricing-a.css">').markupHash).not.toBe(sourceSnapshot('<link rel="stylesheet" href="/pricing-b.css">').markupHash);
  expect(sourceSnapshot('<a href="/free">Get started</a>').markupHash).not.toBe(sourceSnapshot('<a href="/paid">Get started</a>').markupHash);
});

it("detects non-text feature icons and table-column changes", () => {
  const a = sourceSnapshot('<table><tr><th>Free</th><td>Custom responses<svg class="check"><path d="M1 2"/></svg></td></tr></table>');
  const b = sourceSnapshot('<table><tr><th>Free</th><td>Custom responses<svg class="cross"><path d="M3 4"/></svg></td></tr></table>');
  expect(a.text).toBe(b.text);
  expect(a.hash).toBe(b.hash);
  expect(a.markupHash).not.toBe(b.markupHash);
  const before = { "services/a": { ...a, checkedAt: NOW, failures: 0, flaps: 0, state: "ok" } };
  const run = compareRuns(before, [{ id: "services/a", state: "ok", ...b }], NOW);
  expect(run.changed).toEqual(["services/a"]);
  expect(hasCurrentReview(run.next['services/a'])).toBe(false);
});

it("migrates legacy hashes as an expanded baseline and requires a new source comparison", () => {
  const page = sourceSnapshot("<p>Free plan includes 5 GB per month.</p>".repeat(30));
  const previous = { "services/a": { hash: page.legacyHash, checkedAt: NOW, failures: 0, flaps: 0, state: "ok" } };
  const run = compareRuns(previous, [{ id: "services/a", state: "ok", ...page }], NOW);
  expect(run.added).toEqual(["services/a"]);
  expect(run.changed).toEqual([]);
  expect(hasCurrentReview(run.next['services/a'])).toBe(false);
  const next = compareRuns(run.next, [{ id: "services/a", state: "ok", ...page }], "2026-10-22T12:00:00Z");
  expect(reviewQueue(next, { "services/a": "2026-10-18" }).map(e => e.reason)).toEqual(["unreviewed-change"]);
});
