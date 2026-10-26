import { describe, expect, it } from "vitest";

import {
  DEAD_AFTER_RUNS,
  NOISY_AFTER_RUNS,
  classifyFetch,
  compareRuns,
  hashExcerpt,
  reviewQueue,
  renderReport,
} from "../../scripts/verify/lib/freshness.mjs";
import { HASH_VERSION } from "../../scripts/verify/lib/source-snapshot.mjs";

const NOW = "2026-10-05T04:17:00.000Z";

describe("hashExcerpt", () => {
  it("ignores case and spacing, but not numbers", () => {
    expect(hashExcerpt("Free plan\n5 GB")).toBe(hashExcerpt("  free   PLAN 5 gb "));
    expect(hashExcerpt("Free plan 5 GB")).not.toBe(hashExcerpt("Free plan 10 GB"));
  });
});

describe("classifyFetch", () => {
  it("is ok when a page has enough text", () => {
    expect(classifyFetch([{ status: 404, chars: 0 }, { status: 200, chars: 5000 }])).toBe("ok");
  });

  it("is thin when the only good answer has almost no text", () => {
    expect(classifyFetch([{ status: 200, chars: 40 }])).toBe("thin");
  });

  it("is thin when a long page has no price-related line, so its fixed hash can never confirm the entry", () => {
    // A script shell or a bot check: plenty of text, none of it about prices.
    expect(classifyFetch([{ status: 200, chars: 900, excerptChars: 0 }])).toBe("thin");
    expect(classifyFetch([{ status: 200, chars: 900, excerptChars: 0 }, { status: 200, chars: 5000, excerptChars: 1200 }])).toBe("ok");
  });

  it("is dead only when every attempt says the page is gone", () => {
    expect(classifyFetch([{ status: 404, chars: 0 }, { status: 0, chars: 0, error: "ENOTFOUND" }])).toBe("dead");
    expect(classifyFetch([{ status: 404, chars: 0 }, { status: 403, chars: 0 }])).toBe("blocked");
    expect(classifyFetch([{ status: 0, chars: 0, error: "TimeoutError" }])).toBe("blocked");
  });
});

describe("compareRuns", () => {
  const stored = (hash: string, extra = {}) => ({ hash, checkedAt: "2026-09-28", failures: 0, flaps: 0, state: "ok", ...extra });

  it("builds a baseline on the first run and flags nothing", () => {
    const run = compareRuns({}, [{ id: "services/a", state: "ok", hash: "h1", url: "https://a.test" }], NOW);
    expect(run.added).toEqual(["services/a"]);
    expect(run.changed).toEqual([]);
    expect(run.next["services/a"].hash).toBe("h1");
  });

  it("flags a changed hash and records when it changed", () => {
    const run = compareRuns({ "services/a": stored("h1") }, [{ id: "services/a", state: "ok", hash: "h2" }], NOW);
    expect(run.changed).toEqual(["services/a"]);
    expect(run.next["services/a"].changedAt).toBe(NOW);
  });

  it("does not flag an unchanged hash", () => {
    const run = compareRuns({ "services/a": stored("h1") }, [{ id: "services/a", state: "ok", hash: "h1" }], NOW);
    expect(run.changed).toEqual([]);
    expect(run.noisy).toEqual([]);
  });

  it("requires review when an identical excerpt comes from a different source document", () => {
    const before = { "services/a": stored("h1", { url: "https://example.com/docs?topic=free" }) };
    const run = compareRuns(before, [{ id: "services/a", state: "ok", hash: "h1", url: "https://example.com/docs?topic=paid" }], NOW);
    expect(run.changed).toEqual(["services/a"]);
  });

  it("calls a page noisy after it changed several runs in a row", () => {
    const before = { "services/a": stored("h1", { flaps: NOISY_AFTER_RUNS - 1 }) };
    const run = compareRuns(before, [{ id: "services/a", state: "ok", hash: "h2" }], NOW);
    expect(run.noisy).toEqual(["services/a"]);
    expect(run.changed).toEqual([]);
  });

  it("keeps the old hash when a page is blocked or thin, and never reports it as dead", () => {
    const before = { "services/a": stored("h1") };
    const run = compareRuns(before, [{ id: "services/a", state: "blocked" }], NOW);
    expect(run.next["services/a"].hash).toBe("h1");
    expect(run.dead).toEqual([]);
    expect(run.blocked).toEqual(["services/a"]);
    expect(run.thin).toEqual([]);
  });

  it("reports a dead page only after it failed in enough runs in a row", () => {
    let previous = { "services/a": stored("h1") };
    for (let i = 1; i < DEAD_AFTER_RUNS; i += 1) {
      const run = compareRuns(previous, [{ id: "services/a", state: "dead" }], NOW);
      expect(run.dead).toEqual([]);
      previous = run.next as typeof previous;
    }
    expect(compareRuns(previous, [{ id: "services/a", state: "dead" }], NOW).dead).toEqual(["services/a"]);
  });

  it("resets the failure count when the page comes back", () => {
    const before = { "services/a": stored("h1", { failures: 5 }) };
    const run = compareRuns(before, [{ id: "services/a", state: "ok", hash: "h1" }], NOW);
    expect(run.next["services/a"].failures).toBe(0);
  });

  it("does not count separated not-found responses as consecutive dead runs", () => {
    const blocked = compareRuns({ "services/a": stored("h1", { failures: 1 }) }, [{ id: "services/a", state: "blocked" }], NOW);
    const dead = compareRuns(blocked.next, [{ id: "services/a", state: "dead" }], NOW);
    expect(dead.dead).toEqual([]);
    const legacyBlocked = { "services/a": stored("h1", { state: "blocked", failures: 5 }) };
    expect(compareRuns(legacyBlocked, [{ id: "services/a", state: "dead" }], NOW).dead).toEqual([]);
  });
});

describe("renderReport", () => {
  it("makes unreadable pages and unreviewed earlier changes actionable", () => {
    const run = compareRuns({}, [
      { id: "services/thin", state: "thin", url: "https://thin.test" },
      { id: "services/blocked", state: "blocked", url: "https://blocked.test" },
    ], NOW);
    const md = renderReport(run, { date: "2026-10-05", titles: {}, urls: {} });
    expect(md).toContain("`services/thin`");
    expect(md).toContain("`services/blocked`");
  });

  it("lists entries with title and URL, and caps long lists", () => {
    const changed = Array.from({ length: 5 }, (_, i) => `services/s${i}`);
    const titles = Object.fromEntries(changed.map((id) => [id, `Title ${id}`]));
    const md = renderReport(
      { changed, noisy: [], dead: [], added: [], counts: { ok: 5, thin: 0, dead: 0, blocked: 0 } },
      { date: "2026-10-05", titles, urls: { "services/s0": "https://s0.test/pricing" }, max: 3 },
    );
    expect(md).toContain("# Pricing check 2026-10-05");
    expect(md).toContain("Pricing source changed: re-check text, source URL and table/icon markup (5)");
    expect(md).toContain("- `services/s0` — Title services/s0 — `https://s0.test/pricing`");
    expect(md).toContain("… and 2 more");
    expect(md).not.toContain("Text keeps changing");
  });
});

describe("reviewQueue", () => {
  it("keeps a change detected after an earlier same-day review pending on later stable runs", () => {
    const prior = { "services/a": { hash: "h1", hashVersion: HASH_VERSION, markupHash: "m", url: "https://a.test/pricing", checkedAt: NOW, failures: 0, flaps: 0, state: "ok" } };
    const result = { id: "services/a", state: "ok" as const, hash: "h2", hashVersion: HASH_VERSION, markupHash: "m", url: "https://a.test/pricing" };
    const changed = compareRuns(prior, [result], "2026-10-21T20:00:00Z");
    const stable = compareRuns(changed.next, [result], "2026-10-28T20:00:00Z");
    expect(reviewQueue(stable, { "services/a": "2026-10-21" }).map(x => x.id)).toEqual(["services/a"]);
  });

  it("preserves explicit review only while the full source fingerprint matches", () => {
    const reviewedFingerprint = { hash: "h1", hashVersion: HASH_VERSION, markupHash: "m", url: "https://a.test/pricing", verificationDate: "2026-10-21", acknowledgedAt: "2026-10-21T22:00:00Z" };
    const prior = { "services/a": { ...reviewedFingerprint, reviewedFingerprint, checkedAt: NOW, failures: 0, flaps: 0, state: "ok" } };
    const result = { id: "services/a", state: "ok" as const, hash: "h1", hashVersion: HASH_VERSION, markupHash: "m", url: "https://a.test/pricing" };
    const stable = compareRuns(prior, [result], "2026-10-28T20:00:00Z");
    expect(stable.next["services/a"].reviewedFingerprint).toEqual(reviewedFingerprint);
    expect(reviewQueue(stable, {})).toEqual([]);
    expect(reviewQueue(stable, { "services/a": "2026-10-18" }).map(x => x.id)).toEqual(["services/a"]);
    for (const change of [{ hash: "h2" }, { markupHash: "m2" }, { url: "https://a.test/new" }, { hashVersion: HASH_VERSION + 1 }]) {
      const run = compareRuns(prior, [{ ...result, ...change }], "2026-10-28T20:00:00Z");
      expect(run.next["services/a"].reviewedFingerprint).toBeUndefined();
      const next = compareRuns(run.next, [{ ...result, ...change }], "2026-11-04T20:00:00Z");
      expect(reviewQueue(next, { "services/a": "2026-11-04" }).map(x => x.id)).toEqual(["services/a"]);
    }
  });

  it("keeps a new baseline pending on later unchanged runs until someone reviews it", () => {
    const baseline = compareRuns({}, [{ id: "services/new", state: "ok", hash: "h1" }], NOW);
    const next = compareRuns(baseline.next, [{ id: "services/new", state: "ok", hash: "h1" }], "2026-10-12T00:00:00Z");
    expect(reviewQueue(next, { "services/new": "2026-10-04" })).toEqual([{ id: "services/new", reason: "unreviewed-change", url: null }]);
    expect(reviewQueue(next, { "services/new": "2026-10-05" }).map(x => x.id)).toEqual(["services/new"]);
  });
  it("retains every unreadable and noisy entry even when there are no newly changed or dead pages", () => {
    const run = compareRuns({
      "services/noisy": { hash: "h1", checkedAt: NOW, failures: 0, flaps: 3, state: "ok" },
    }, [
      { id: "services/thin", state: "thin" },
      { id: "services/blocked", state: "blocked" },
      { id: "services/noisy", state: "ok", hash: "h2" },
    ], NOW);
    expect(reviewQueue(run, {}).map(({ id, reason }) => [id, reason])).toEqual([
      ["services/blocked", "blocked"], ["services/noisy", "noisy"], ["services/thin", "thin"],
    ]);
  });

  it("keeps older changes pending until their source comparison has been reviewed", () => {
    const previous = { "services/pending": { hash: "h1", checkedAt: NOW, changedAt: "2026-10-04T12:00:00Z", failures: 0, flaps: 0, state: "ok" } };
    const run = compareRuns(previous, [{ id: "services/pending", state: "ok", hash: "h1" }], NOW);
    expect(reviewQueue(run, { "services/pending": "2026-10-03" })).toEqual([
      { id: "services/pending", reason: "unreviewed-change", url: null },
    ]);
    expect(reviewQueue(run, { "services/pending": "2026-10-04" }).map(x => x.id)).toEqual(["services/pending"]);
  });

  it("keeps the complete queue independently of a capped human report", () => {
    const results = Array.from({ length: 120 }, (_, i) => ({ id: `services/s${i}`, state: "thin" as const }));
    const run = compareRuns({}, results, NOW);
    expect(reviewQueue(run, {})).toHaveLength(120);
    expect(renderReport(run, { date: "2026-10-05", titles: {}, urls: {}, max: 3 })).toContain("117 more");
  });
});
