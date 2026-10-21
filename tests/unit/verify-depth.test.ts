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

  it("matches Open-Meteo's localized call limits without changing fractional call costs", () => {
    const source = "5.000 calls / hour; 10.000 calls / day; 300.000 calls / month; 1.5 calls";
    expect(unsupportedFigures("5,000 hourly, 10,000 daily, 300,000 monthly and 1.5 calls", source, { numericLocale: "de-DE" })).toEqual([]);
  });

  it("reads European decimal prices and mixed separators", () => {
    expect(extractFigures("€9,99; 1.234,56; 1,234.56; 0,001", { numericLocale: "de-DE" }).map((f) => f.value)).toEqual([9.99, 1234.56, 1234.56, 0.001]);
  });

  it("supports an explicitly reviewed mixed-notation page without accepting both ambiguous magnitudes", () => {
    const source = '€4,99/mo; 2,000 requests/month; €0.00372 per additional request';
    expect(unsupportedFigures('4.99 euros, 2,000 requests and 0.00372 euros', source, { numericLocale:'mixed' })).toEqual([]);
    expect(unsupportedFigures('2 requests', source, { numericLocale:'mixed' })).toEqual(['2']);
    expect(unsupportedFigures('123 requests', '1,2,3 requests', { numericLocale:'mixed' })).toEqual(['123']);
  });

  it("reads complete space-grouped numbers without matching their component groups", () => {
    expect(extractFigures("5 000; 300\u00a0000; 1\u202f234\u202f567; 1 234,56").map((f) => f.value)).toEqual([5000, 300000, 1234567, 1234.56]);
    expect(unsupportedFigures("5 requests", "5 000 requests")).toEqual(["5"]);
  });

  it("keeps decimal prices, fractional multipliers and unit suffixes", () => {
    expect(extractFigures("0.001, $0.03, 1.5, 1.5M, 500 MB and 60m").map((f) => f.value)).toEqual([0.001, 0.03, 1.5, 1.5e6, 500, 60]);
    expect(extractFigures("2,5 million", { numericLocale: "de-DE" }).map((f) => f.value)).toEqual([2.5e6]);
  });

  it("uses English decimal notation by default and never accepts both ambiguous magnitudes", () => {
    expect(unsupportedFigures("1,234 requests", "1.234 requests")).toEqual(["1,234"]);
    expect(unsupportedFigures("1.234 requests", "1.234 requests")).toEqual([]);
    expect(unsupportedFigures("1,234 requests", "1.234 requests", { numericLocale: "de-DE" })).toEqual([]);
    expect(unsupportedFigures("1.234 requests", "1.234 requests", { numericLocale: "en-US" })).toEqual([]);
    expect(unsupportedFigures("1.234 requests", "1.234 requests", { numericLocale: "de-DE" })).toEqual(["1.234"]);
  });

  it("does not turn malformed separator groups into supporting magnitudes", () => {
    expect(unsupportedFigures("123 requests", "1,2,3 requests")).toEqual(["123"]);
    expect(unsupportedFigures("100000 requests", "1.00.000 requests", { numericLocale: "de-DE" })).toEqual(["100000"]);
    expect(unsupportedFigures("1,2,3 requests", "123 requests")).toEqual(["1,2,3"]);
    expect(unsupportedFigures("1.00.000 requests", "1.00.000 requests")).toEqual(["1.00.000"]);
  });

  it("compares dotted software versions and IPv4 examples literally, without interpreting their components as prices", () => {
    expect(unsupportedFigures('Use Wrangler 3.71.0 with example address 8.8.8.8', 'Wrangler 3.71.0 supports address 8.8.8.8')).toEqual([]);
    expect(unsupportedFigures('Wrangler 3.72.0 and address 8.8.4.4', 'Wrangler 3.71.0 and address 8.8.8.8')).toEqual(['3.72.0', '8.8.4.4']);
    expect(unsupportedFigures('3.71.0', 'Prices are 3, 71 and 0')).toEqual(['3.71.0']);
    expect(unsupportedFigures('3 requests', 'Wrangler 3.71.0')).toEqual(['3']);
  });

  it("checks leading-dot decimal prices instead of silently omitting them", () => {
    expect(unsupportedFigures("$.03 per request", "$0.03 per request")).toEqual([]);
    expect(unsupportedFigures("$.03 per request", "$3 per request")).toEqual([".03"]);
  });

  it("checks scientific notation as its full magnitude rather than just its mantissa", () => {
    expect(unsupportedFigures("1e6 requests", "1 million requests")).toEqual([]);
    expect(unsupportedFigures("1e6 requests", "1 request")).toEqual(["1e6"]);
    expect(extractFigures("1.5e-3 and 2,5e3", { numericLocale: "de-DE" }).map((f) => f.value)).toEqual([0.0015, 2500]);
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

  it('rejects a heading accidentally inserted into a price sentence',()=>{
    expect(run({body:body().replace('The plan gives','Paid plans start at ## What the free plan gives you\n5 monthly. The plan gives')}).join()).toContain('embedded heading inside prose');
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

  it("accepts a verification-only review without changing the publication date", () => {
    expect(run({ data: { ...data, lastUpdated: "2026-10-01" }, evidence })).toEqual([]);
  });

  it("does not use a failed or challenged source as numeric evidence", () => {
    expect(run({ evidence: [{ ...evidence[0], status: 403 }] })).toContain("no fetched page for this entry matches 'sourceUrls'");
    expect(run({ evidence: [{ ...evidence[0], status: 200, accessIssue: "maintenance" }] })).toContain("no fetched page for this entry matches 'sourceUrls'");
  });

  it("interprets numeric locale separately for each cited evidence page", () => {
    const sources = [
      { ...evidence[0], numericLocale: "de-DE" as const, text: "500 MB; 2.000.000 messages; 5.000 calls; €0,03 per request." },
      { ...evidence[0], url: "https://example.com/rates", numericLocale: "en-US" as const, text: "$0.001 per GB and 1.234 credits." },
    ];
    const cited = { ...data, sourceUrls: [...data.sourceUrls, sources[1].url] };
    const content = body({ limit: `${words(80)} 5,000 calls cost $0.03 each; storage costs $0.001 and uses 1.234 credits.` });
    expect(run({ data: cited, body: content, evidence: sources })).toEqual([]);
    expect(run({ data: cited, body: content.replace("1.234 credits", "1,234 credits"), evidence: sources }).join()).toContain("numbers not found on any fetched source page: 1,234");
    expect(run({ body: content, evidence: sources }).join()).toContain("numbers not found on any fetched source page: 0.001, 1.234");
  });

  it.each([
    ["https://cloud.ibm.com/docs/cloud-object-storage?topic=billing", "https://cloud.ibm.com/docs/cloud-object-storage?topic=provision"],
    ["https://example.com/pricing?plan=Free", "https://example.com/pricing?plan=Pro"],
    ["https://example.com/pricing?plan=Free", "https://example.com/pricing?plan=free"],
    ["https://example.com/Plans", "https://example.com/plans"],
    ["https://example.com:8443/pricing", "https://example.com:9443/pricing"],
  ])("does not accept another source's numbers when citing %s", (cited, fetched) => {
    const problems = run({ data: { ...data, pricingUrl: cited, sourceUrls: [cited] }, evidence: [{ ...evidence[0], url: fetched }] });
    expect(problems).toContain("no fetched page for this entry matches 'sourceUrls'");
  });

  it("matches reordered query keys while preserving www, trailing slash and fragment equivalence", () => {
    const cited = "https://www.example.com/Plans/?plan=Free&region=EU#limits";
    const fetched = "https://example.com/Plans?region=EU&plan=Free#pricing";
    expect(run({ data: { ...data, pricingUrl: cited, sourceUrls: [cited] }, evidence: [{ ...evidence[0], url: fetched }] })).toEqual([]);
  });

  it("preserves repeated query value order when identifying cited sources", () => {
    const cited = "https://example.com/pricing?plan=Free&plan=Pro";
    const fetched = "https://example.com/pricing?plan=Pro&plan=Free";
    expect(run({ data: { ...data, pricingUrl: cited, sourceUrls: [cited] }, evidence: [{ ...evidence[0], url: fetched }] })).toContain("no fetched page for this entry matches 'sourceUrls'");
  });

  it.each([undefined, "2026-10-08"])("rejects a missing or stale verification date (%s) even when publication is current", (lastVerified) => {
    const problems = run({ data: { ...data, lastVerified }, evidence }).join();
    expect(problems).toContain(`'lastVerified' (${lastVerified ?? "none"}) is older than the fetch date 2026-10-09`);
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
