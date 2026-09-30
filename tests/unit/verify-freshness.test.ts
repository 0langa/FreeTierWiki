import { describe, expect, it } from "vitest";

import {
  DEAD_AFTER_RUNS,
  NOISY_AFTER_RUNS,
  classifyFetch,
  compareRuns,
  hashExcerpt,
  renderReport,
} from "../../scripts/verify/lib/freshness.mjs";

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
});

describe("renderReport", () => {
  it("lists entries with title and URL, and caps long lists", () => {
    const changed = Array.from({ length: 5 }, (_, i) => `services/s${i}`);
    const titles = Object.fromEntries(changed.map((id) => [id, `Title ${id}`]));
    const md = renderReport(
      { changed, noisy: [], dead: [], added: [], counts: { ok: 5, thin: 0, dead: 0, blocked: 0 } },
      { date: "2026-10-05", titles, urls: { "services/s0": "https://s0.test/pricing" }, max: 3 },
    );
    expect(md).toContain("# Pricing check 2026-10-05");
    expect(md).toContain("Pricing page text changed: re-check these entries (5)");
    expect(md).toContain("- `services/s0` — Title services/s0 — `https://s0.test/pricing`");
    expect(md).toContain("… and 2 more");
    expect(md).not.toContain("Text keeps changing");
  });
});
