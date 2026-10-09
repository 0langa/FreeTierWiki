import { describe, expect, it } from "vitest";

import { checkDepth, countWords, extractFigures, isDeep, splitSections, unsupportedFigures } from "../../scripts/verify/lib/depth.mjs";
import { readEntries } from "../../scripts/verify/lib/entries.mjs";

const words = (n: number, word = "word") => Array.from({ length: n }, () => word).join(" ");

function body({
  gives = `${words(95)} The plan gives 500 MB of storage and 2 million messages.`,
  limit = `${words(80)} It stops at the cap.`,
  gotchas = ["- One.", "- Two.", "- Three."],
  alternatives = ["- [Neon](/services/neon/): when you want branching.", "- [Koyeb](/services/koyeb/): when you also need an app server."],
  faq = "### Is it free?\n\nYes. It is.\n\n### Does it pause?\n\nYes.\n\n### Do I need a card?\n\nNo.",
  extra = words(110),
} = {}) {
  return [
    `Intro sentence. ${extra}`,
    `## What the free plan gives you\n\n${gives}`,
    `## When you hit a limit\n\n${limit}`,
    `## Gotchas\n\n${gotchas.join("\n")}`,
    `## Alternatives in this atlas\n\n${alternatives.join("\n")}`,
    `## Questions people ask\n\n${faq}`,
  ].join("\n\n");
}

const entries = new Map<string, { status?: unknown }>([
  ["services/neon", { status: "active" }],
  ["services/koyeb", {}],
  ["services/gone", { status: "ended" }],
  ["services/self", {}],
]);
const data = {
  pricingUrl: "https://example.com/pricing",
  sourceUrls: ["https://www.example.com/pricing/"],
  lastVerified: "2026-10-09",
  lastUpdated: "2026-10-09",
  freeTierDetails: { limits: ["500 MB storage", "2,000,000 messages"] },
};
const evidence = [{ url: "https://example.com/pricing", fetchedAt: "2026-10-09T10:00:00Z", text: "Storage 500 MB. 2,000,000 messages per month." }];

describe("figures", () => {
  it("reads numbers with separators and multipliers as the same value", () => {
    expect(extractFigures("2 million, 2,000,000, 2M and $25.50").map((f) => f.value)).toEqual([2e6, 2e6, 2e6, 25.5]);
  });

  it("reads a lowercase m as minutes, not million", () => {
    expect(extractFigures("60m and 1M and 5k").map((f) => f.value)).toEqual([60, 1e6, 5e3]);
  });

  it("does not take MB or GB for a multiplier", () => {
    expect(extractFigures("500 MB and 1GB").map((f) => f.value)).toEqual([500, 1]);
  });

  it("ignores numbers inside words and link targets", () => {
    expect(unsupportedFigures("Use [S3](/services/s3/) or v8 runtime", "")).toEqual([]);
  });

  it("lists every number the evidence lacks", () => {
    expect(unsupportedFigures("500 MB and 3 projects", "500 MB")).toEqual(["3"]);
  });
});

describe("shape helpers", () => {
  it("knows a deep body by its second-level headings", () => {
    expect(isDeep("One sentence.")).toBe(false);
    expect(isDeep(body())).toBe(true);
  });

  it("splits sections and counts only visible words", () => {
    const { intro, sections } = splitSections("Hi there.\n\n## A\n\none [two](/x/)\n\n## B\n\n- three");
    expect(intro).toBe("Hi there.");
    expect(sections.map((s) => s.title)).toEqual(["A", "B"]);
    expect(countWords(sections[0].text)).toBe(2);
  });
});

describe("checkDepth", () => {
  const run = (overrides: Partial<Parameters<typeof checkDepth>[0]> = {}) =>
    checkDepth({ id: "services/self", data, body: body(), entries, ...overrides });

  it("passes a body that follows the shape", () => {
    expect(run()).toEqual([]);
    expect(run({ evidence })).toEqual([]);
  });

  it("fails a body outside the word range", () => {
    expect(run({ body: body({ extra: words(500) }) }).join()).toMatch(/body has \d+ words/);
  });

  it("fails a missing, extra, or misplaced section", () => {
    const problems = run({ body: body().replace("## Gotchas", "## Tips") }).join("|");
    expect(problems).toContain('missing section "## Gotchas"');
    expect(problems).toContain('unexpected section "## Tips"');
    const swapped = body().replace("## When you hit a limit", "## TMP").replace("## What the free plan gives you", "## When you hit a limit").replace("## TMP", "## What the free plan gives you");
    expect(run({ body: swapped }).join()).toContain("out of order");
  });

  it("fails the wrong number of gotchas or questions", () => {
    expect(run({ body: body({ gotchas: ["- One.", "- Two."] }) }).join()).toContain("has 2 bullets");
    expect(run({ body: body({ faq: "### Only one?\n\nYes." }) }).join()).toContain("has 1 questions");
    expect(run({ body: body({ faq: "### A\n\nYes.\n\n### B?\n\nYes.\n\n### C?\n\nOne. Two. Three. Four." }) }).join("|")).toMatch(
      /must end with "\?".*has 4 sentences/,
    );
  });

  it("fails alternative links that are missing, ended, external, or self", () => {
    const bad = ["- [X](/services/nope/): a.", "- [Y](/services/gone/): b.", "- [Z](/services/self/): c.", "- [W](https://w.dev/): d."];
    const problems = run({ body: body({ alternatives: bad }) }).join("|");
    expect(problems).toContain("/services/nope/, which does not exist");
    expect(problems).toContain("/services/gone/, which has status: ended");
    expect(problems).toContain("links the entry to itself");
    expect(problems).toContain("must link only to entries in this atlas");
  });

  it("fails MDX-unsafe characters", () => {
    expect(run({ body: body({ extra: `${words(110)} a <b> c` }) }).join()).toContain("MDX");
  });

  it("needs the pricing page among the sources once the body states numbers", () => {
    expect(run({ data: { ...data, sourceUrls: [] } }).join()).toContain("'sourceUrls' is empty");
    expect(run({ data: { ...data, sourceUrls: ["https://example.com/docs"] } }).join()).toContain("does not list the 'pricingUrl'");
  });

  it("checks numbers and dates against fetched evidence", () => {
    const missing = run({ evidence: [{ ...evidence[0], text: "Storage 500 MB." }] }).join();
    expect(missing).toContain("numbers not found on any fetched source page: 2 million");
    const late = run({ evidence: [{ ...evidence[0], fetchedAt: "2026-10-10T08:00:00Z" }] }).join();
    expect(late).toContain("'lastVerified' (2026-10-09) is older than the fetch date 2026-10-10");
    const uncited = run({ evidence: [{ ...evidence[0], url: "https://other.dev/" }] }).join();
    expect(uncited).toContain("no fetched page for this entry matches 'sourceUrls'");
  });

  it("lets a skipped entry state only numbers its frontmatter holds", () => {
    expect(run({ skipped: true })).toEqual([]);
    expect(run({ skipped: true, body: body({ limit: `${words(80)} It stops at 7 days.` }) }).join()).toContain("frontmatter lacks: 7");
  });
});

describe("real content", () => {
  it("every deepened entry passes the shape check", () => {
    const all = readEntries();
    const index = new Map(all.map((entry) => [entry.id, { status: entry.data.status }]));
    const failures = all
      .filter((entry) => isDeep(entry.body))
      .map((entry) => ({ id: entry.id, problems: checkDepth({ id: entry.id, data: entry.data, body: entry.body, entries: index }) }))
      .filter((result) => result.problems.length > 0);
    expect(failures).toEqual([]);
  });
});
