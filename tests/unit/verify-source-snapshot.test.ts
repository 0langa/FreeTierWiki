import { describe, expect, it } from "vitest";

import { HASH_VERSION, sourceSnapshot } from "../../scripts/verify/lib/source-snapshot.mjs";
import { acknowledgeSources, compareRuns, hasCurrentReview, reviewQueue } from "../../scripts/verify/lib/freshness.mjs";
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
  expect(sourceSnapshot('<a href="/free">Get started</a>').markupHash).not.toBe(sourceSnapshot('<a href="/paid">Get started</a>').markupHash);
});

it("ignores markup that changes per request or per deploy", () => {
  const pairs: Array<[string, string]> = [
    // Generated ids in ARIA references (Azure FAQ buttons, React useId).
    ['<button aria-controls="ce5dacfe" aria-expanded="false" class="faq__question">Q</button>', '<button aria-controls="75347147" aria-expanded="false" class="faq__question">Q</button>'],
    // Cloudflare email obfuscation uses a new key on every response.
    ['<a href="/cdn-cgi/l/email-protection#087c6d6965">[email protected]</a>', '<a href="/cdn-cgi/l/email-protection#ef9b8a8e82">[email protected]</a>'],
    // Hashed bundles, preloads and favicons in <link> tags.
    ['<link rel="stylesheet" href="/_next/static/css/10a967f21d7e8ed9.css"><link rel="modulepreload" href="/remix-chunks/index-go0QFyD4.js">', '<link rel="stylesheet" href="/_next/static/css/3bpk9jmwr_ywg.css"><link rel="preload" href="/remix-assets/global-CXxuNox5.css"><link rel="icon" href="/favicon.ico">'],
    // Deploy-specific CDN paths, cache busters and image proxies in front of the same image.
    ['<img alt="" src="/cdn-classic/cvt-92e6c8a972b2f733/svg/advisor.svg">', '<img alt="" src="/svg/advisor.svg?v=cceca6d43c36e28c">'],
    ['<img src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcheck.svg&amp;w=32&amp;q=75" srcset="/_next/image?url=%2Fcheck.svg&amp;w=32&amp;q=75 1x, /_next/image?url=%2Fcheck.svg&amp;w=64&amp;q=75 2x">', '<img src="/_do/d499c6c6/_next/static/media/check.svg?dpl=d499c6c6" srcset="/a/check.svg 1x, /b/check.svg 2x">'],
    // next/font class names, tracking parameters and anchors on the same link.
    ['<html class="__className_363b13 __variable_5c957b VF6YLG_className"><a href="/signup?utm_cta=banner">Start</a></html>', '<html class="__className_79824e __variable_a66b7f X0u9Hq_className"><a href="/signup?utm_cta=footer#top">Start</a></html>'],
    // Random ids inside inline SVG icons and build-scoped style attributes.
    ['<svg data-astro-cid-o54ltyzl><linearGradient id="advisor_b5b60882-abde-470c-a0f5-cd6e41418837-b54d502"/><linearGradient id="g-ce071d2e"/><path fill="url(#g-ce071d2e)" d="M1 2"/><clipPath id="«r1»"/></svg>', '<svg data-astro-cid-2vfgeueo><linearGradient id="advisor_b5b60882-abde-470c-a0f5-cd6e41418837-224d6d5"/><linearGradient id="g-b9201254"/><path fill="url(#g-b9201254)" d="M1 2"/><clipPath id="«r7»"/></svg>'],
    // Tracking elements that Google Cloud adds to some responses only.
    ['<main><p>Free tier</p></main>', '<main><cloudx-track></cloudx-track><p>Free tier</p></main>'],
  ];
  for (const [a, b] of pairs) expect(sourceSnapshot(a).markupHash, a).toBe(sourceSnapshot(b).markupHash);
  // The version 2 hash still covers the values as served, for the comparison with stored version 2 records.
  expect(sourceSnapshot(pairs[0][0]).legacyMarkupHash).not.toBe(sourceSnapshot(pairs[0][1]).legacyMarkupHash);
});

it("still detects feature indicators behind deploy-specific paths and generated ids", () => {
  const pairs: Array<[string, string]> = [
    ['<img alt="" src="/cdn/v1a2b3c4d/icons/check.svg">', '<img alt="" src="/cdn/v1a2b3c4d/icons/cross.svg">'],
    ['<img src="/_next/image?url=%2Ficons%2Fcheck.svg&amp;w=32">', '<img src="/_next/image?url=%2Ficons%2Fcross.svg&amp;w=32">'],
    ['<svg><use href="#icon-check"></use></svg>', '<svg><use href="#icon-cross"></use></svg>'],
    ['<svg><linearGradient id="g-ce071d2e"/><path fill="url(#g-ce071d2e)" d="M1 2"/></svg>', '<svg><linearGradient id="g-ce071d2e"/><path fill="url(#g-ce071d2e)" d="M3 4"/></svg>'],
    ['<span class="__className_363b13 icon-check"></span>', '<span class="__className_363b13 icon-cross"></span>'],
    ['<button aria-controls="r1" aria-expanded="false">Q</button>', '<button aria-controls="r1" aria-expanded="true">Q</button>'],
    ['<a href="/free?utm_cta=x">Get started</a>', '<a href="/paid?utm_cta=x">Get started</a>'],
  ];
  for (const [a, b] of pairs) expect(sourceSnapshot(a).markupHash, a).not.toBe(sourceSnapshot(b).markupHash);
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

describe("version 2 records", () => {
  const SOURCE = "https://a.test/pricing";
  const html = '<p>Free plan includes 5 GB per month.</p>'.repeat(30) + '<button aria-controls="ce5dacfe">FAQ</button>';
  const page = sourceSnapshot(html);
  const v2 = { hash: page.hash, hashVersion: 2, markupHash: page.legacyMarkupHash, url: SOURCE };
  const reviewedFingerprint = { ...v2, url: "a.test/pricing", verificationDate: "2026-10-26", acknowledgedAt: "2026-10-26T10:00:00Z" };
  const previous = { "services/a": { ...v2, reviewedFingerprint, checkedAt: NOW, changedAt: NOW, failures: 0, flaps: 3, state: "ok" } };

  it("are compared through the version 2 markup hash and keep their review when the page is unchanged", () => {
    expect(page.hashVersion).toBe(HASH_VERSION);
    const run = compareRuns(previous, [{ id: "services/a", state: "ok", url: SOURCE, ...page }], "2026-11-01T19:23:00Z");
    expect([...run.changed, ...run.noisy, ...run.added]).toEqual([]);
    expect(run.next["services/a"]).toMatchObject({ hashVersion: HASH_VERSION, markupHash: page.markupHash, changedAt: NOW, flaps: 0 });
    expect(run.next["services/a"].reviewedFingerprint).toEqual({ ...reviewedFingerprint, hashVersion: HASH_VERSION, markupHash: page.markupHash });
    expect(reviewQueue(run, { "services/a": "2026-10-26" })).toEqual([]);
    // Later scans compare version 3 hashes, so a new generated id is no longer a change.
    const later = sourceSnapshot(html.replace("ce5dacfe", "75347147"));
    const next = compareRuns(run.next, [{ id: "services/a", state: "ok", url: SOURCE, ...later }], "2026-11-08T19:23:00Z");
    expect([...next.changed, ...next.noisy]).toEqual([]);
    expect(reviewQueue(next, { "services/a": "2026-10-26" })).toEqual([]);
  });

  it("are flagged and lose their review when the served markup changed", () => {
    const changed = sourceSnapshot(html.replace("<button", '<button class="cross"'));
    const run = compareRuns(previous, [{ id: "services/a", state: "ok", url: SOURCE, ...changed }], "2026-11-01T19:23:00Z");
    expect([...run.changed, ...run.noisy]).toEqual(["services/a"]);
    expect(run.next["services/a"].reviewedFingerprint).toBeUndefined();
  });

  it("can still be acknowledged, and the acknowledgement survives the first version 3 scan", () => {
    const unreviewed = { "services/a": { ...previous["services/a"], reviewedFingerprint: undefined } };
    const acknowledged = acknowledgeSources(unreviewed, ["services/a"], { "services/a": "2026-10-26" }, "2026-10-26T10:00:00Z");
    const run = compareRuns(acknowledged, [{ id: "services/a", state: "ok", url: SOURCE, ...page }], "2026-11-01T19:23:00Z");
    expect(hasCurrentReview(run.next["services/a"])).toBe(true);
  });

  it("keep their review while the page is unreadable and move it to version 3 once it reads unchanged", () => {
    const blocked = compareRuns(previous, [{ id: "services/a", state: "blocked", url: SOURCE }], "2026-11-01T19:23:00Z");
    expect(blocked.next["services/a"].reviewedFingerprint).toEqual(reviewedFingerprint);
    const back = compareRuns(blocked.next, [{ id: "services/a", state: "ok", url: SOURCE, ...page }], "2026-11-08T19:23:00Z");
    expect(back.next["services/a"].reviewedFingerprint?.hashVersion).toBe(HASH_VERSION);
    expect(reviewQueue(back, { "services/a": "2026-10-26" })).toEqual([]);
  });
});
