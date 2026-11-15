import { expect, it } from "vitest";
import { scanSources, summarizeSources, trackedSourceUrls } from "../../scripts/verify/lib/scan-sources.mjs";
import { sourceSnapshot } from "../../scripts/verify/lib/source-snapshot.mjs";
import { acknowledgeSources, compareRuns, hasCurrentReview, reviewQueue } from "../../scripts/verify/lib/freshness.mjs";

const NOW = "2026-11-15T00:00:00Z";
const id = "services/example";
const pricingUrl = "https://example.test/pricing";
const policyUrl = "https://example.test/docs/limits?plan=free";
const page = (url: string, text: string) => ({ url, requestedUrl: url, status: 200, ...sourceSnapshot(`<title>Documentation</title><p>${text.repeat(30)}</p>`) });
const pricing = page(pricingUrl, "Free plan includes 5 GB per month. ");
const policy = page(policyUrl, "The system stops accepting events after the allowance is exhausted. ");

it("tracks every explicit document without inventing routes or collapsing semantic query parameters", () => {
  expect(trackedSourceUrls({ pricingUrl, sourceUrls: [pricingUrl + "#free", policyUrl, "https://example.test/docs/limits?plan=paid", "ftp://bad"], officialUrl: "https://example.test" })).toEqual([pricingUrl, policyUrl, "https://example.test/docs/limits?plan=paid"]);
  expect(trackedSourceUrls({ officialUrl: "https://example.test" })).toEqual(["https://example.test/"]);
});

it("detects a secondary policy change even when the pricing page and its markup are unchanged", () => {
  const initial = summarizeSources(id, [pricing, policy]);
  const first = compareRuns({}, [initial], NOW);
  const reviewed = acknowledgeSources(first.next, [id], { [id]: "2026-11-15" }, NOW);
  const changed = summarizeSources(id, [pricing, page(policyUrl, "The system bills additional events after the allowance is exhausted. ")]);
  const next = compareRuns(reviewed, [changed], NOW);
  expect(initial.sourceDocuments.find((p) => p.requestedUrl === policyUrl)?.state).toBe("ok");
  expect(next.changed).toEqual([id]);
  expect(hasCurrentReview(next.next[id])).toBe(false);
  expect(reviewQueue(compareRuns(next.next, [changed], NOW), { [id]: "2026-11-15" })).toHaveLength(1);
});

it("refuses partial acknowledgement and keeps failed secondary URLs actionable on stable runs", () => {
  const blocked = { url: policyUrl, requestedUrl: policyUrl, status: 403, text: "" };
  const result = summarizeSources(id, [pricing, blocked]);
  const first = compareRuns({}, [result], NOW);
  expect(() => acknowledgeSources(first.next, [id], { [id]: "2026-11-15" }, NOW))
    .toThrow("readable fingerprint for every cited source");
  const stable = compareRuns(first.next, [result], NOW);
  expect(stable.next[id].state).toBe("ok");
  expect(reviewQueue(stable, { [id]: "2026-11-15" })).toEqual([{ id, reason: "unreviewed-change", url: pricingUrl, sourceIssues: [{ url: policyUrl, state: "blocked", status: 403 }] }]);
  const recovered = compareRuns(stable.next, [summarizeSources(id, [pricing, policy])], NOW);
  expect(recovered.changed).toEqual([id]);
  expect(hasCurrentReview(recovered.next[id])).toBe(false);
});

it("excludes changing failure statuses and redirects until a source first becomes readable", () => {
  const failed = { url: pricingUrl, requestedUrl: pricingUrl, finalUrl: "https://example.test/challenge", status: 403, text: "" };
  const initial = compareRuns({}, [summarizeSources(id, [failed, policy])], NOW);
  const timeout = { ...failed, finalUrl: "https://example.test/maintenance", status: 0, error: "TimeoutError" };
  const attempt = summarizeSources(id, [timeout, policy], initial.next[id].sourceDocuments);
  const repeated = compareRuns(initial.next, [attempt], NOW);

  expect(attempt.url).toBe(pricingUrl);
  expect(attempt.hash).toBe(initial.next[id].hash);
  expect(repeated.changed).toEqual([]);
  expect(reviewQueue(repeated, { [id]: "2026-11-15" })).toEqual([{
    id, reason: "unreviewed-change", url: pricingUrl,
    sourceIssues: [{ url: pricingUrl, state: "blocked", status: 0, error: "TimeoutError" }],
  }]);

  const recovered = compareRuns(repeated.next, [summarizeSources(id, [pricing, policy], attempt.sourceDocuments)], NOW);
  expect(recovered.changed).toEqual([id]);
  expect(hasCurrentReview(recovered.next[id])).toBe(false);
});

it("treats expansion from a reviewed single page as a new comparison baseline", () => {
  const first = compareRuns({}, [{ id, state: "ok", ...pricing }], NOW);
  const reviewed = acknowledgeSources(first.next, [id], { [id]: "2026-11-15" }, NOW);
  const expanded = compareRuns(reviewed, [summarizeSources(id, [pricing, policy])], NOW);
  expect(expanded.added).toEqual([id]);
  expect(expanded.changed).toEqual([]);
  expect(hasCurrentReview(expanded.next[id])).toBe(false);
});

it("has an order-independent aggregate that notices added, removed and redirected documents", () => {
  const original = summarizeSources(id, [pricing, policy]);
  expect(summarizeSources(id, [policy, pricing]).hash).toBe(original.hash);
  expect(summarizeSources(id, [pricing]).hash).not.toBe(original.hash);
  expect(summarizeSources(id, [pricing, { ...policy, finalUrl: "https://example.test/docs/new-policy" }]).hash).not.toBe(original.hash);
});

it("orders case-sensitive source identities independently of the machine locale", () => {
  const sources = [page("https://example.test/a", "First source. "), page("https://example.test/B", "Second source. ")];
  expect(summarizeSources(id, sources).sourceDocuments.map((source) => source.requestedUrl))
    .toEqual(["https://example.test/B", "https://example.test/a"]);
});

it("tracks a substantive technical source even without a pricing keyword", () => {
  const result = summarizeSources(id, [policy]);
  expect(result.state).toBe("ok");
  expect(result.hash).toBeDefined();
});

it("retains prior readable fingerprints through partial outages while keeping the access problem queued", () => {
  const original = summarizeSources(id, [pricing, policy]);
  const first = compareRuns({}, [original], NOW);
  const reviewed = acknowledgeSources(first.next, [id], { [id]: "2026-11-15" }, NOW);
  const outage = summarizeSources(id, [pricing, {url:policyUrl,requestedUrl:policyUrl,status:403,text:""}], original.sourceDocuments);
  const interrupted = compareRuns(reviewed, [outage], NOW);
  expect(outage.hash).toBe(original.hash);
  expect(interrupted.changed).toEqual([]);
  expect(hasCurrentReview(interrupted.next[id])).toBe(true);
  expect(() => acknowledgeSources(interrupted.next, [id], { [id]: "2026-11-15" }, NOW))
    .toThrow("readable fingerprint for every cited source");
  expect(reviewQueue(interrupted, { [id]: "2026-11-15" })).toMatchObject([{reason:"partial-source-access"}]);
  const recovered = compareRuns(interrupted.next, [summarizeSources(id, [pricing, policy], outage.sourceDocuments)], NOW);
  expect(recovered.changed).toEqual([]);
  expect(reviewQueue(recovered, { [id]: "2026-11-15" })).toEqual([]);
  const genuinelyChanged = summarizeSources(id, [page(pricingUrl,"Free plan includes 8 GB per month. "),{url:policyUrl,requestedUrl:policyUrl,status:403,text:""}], original.sourceDocuments);
  expect(compareRuns(reviewed,[genuinelyChanged],NOW).changed).toEqual([id]);
});

it("isolates an invalid source URL while continuing the remaining catalog", async () => {
  const results=await scanSources([{id,data:{pricingUrl:"https://",sourceUrls:[pricingUrl]}},{id:"services/other",data:{pricingUrl}}],{hostDelayMs:0,fetchPage:async(url:string)=>url==="https://"?{url,status:0,error:"ERR_INVALID_URL",text:""}:pricing});
  expect(results).toHaveLength(2);
  expect(results[0].sourceDocuments).toContainEqual(expect.objectContaining({ requestedUrl: "https://", state: "dead", error: "ERR_INVALID_URL" }));
  expect(results[1].state).toBe("ok");
});

it("deduplicates shared URLs and never overlaps requests to the same hostname", async () => {
  const calls: string[] = [];
  const hosts = new Set<string>();
  let active = 0;
  let maximum = 0;
  const results = await scanSources([
    { id: "services/a", data: { pricingUrl, sourceUrls: [policyUrl] } },
    { id: "services/b", data: { pricingUrl, sourceUrls: ["https://another.test/free"] } },
  ], { hostDelayMs: 0, concurrency: 50, fetchPage: async (url: string) => {
    const host = new URL(url).hostname;
    expect(hosts.has(host)).toBe(false);
    hosts.add(host); calls.push(url); active++; maximum = Math.max(maximum, active);
    await new Promise((resolve) => setTimeout(resolve, 2));
    hosts.delete(host); active--;
    return page(url, "Free plan $0, 5 GB monthly. ");
  } });
  expect(calls).toHaveLength(3);
  expect(new Set(calls).size).toBe(3);
  expect(maximum).toBeLessThanOrEqual(6);
  expect(results).toHaveLength(2);
});

it("queues rendered evidence after seven days and all other comparisons after ninety days despite matching hashes", () => {
  const first = compareRuns({}, [summarizeSources(id, [pricing, policy])], NOW);
  const reviewed = acknowledgeSources(first.next, [id], { [id]: "2026-11-15" }, NOW);
  const later = (date: string) => compareRuns(reviewed, [summarizeSources(id, [pricing, policy])], date);
  const browserPolicy = { browserSources: { [id]: [pricingUrl] } };
  expect(reviewQueue(later("2026-11-21T19:23:00Z"), { [id]: "2026-11-15" }, browserPolicy)).toEqual([]);
  expect(reviewQueue(later("2026-11-22T19:23:00Z"), { [id]: "2026-11-15" }, browserPolicy)).toEqual([{ id, reason:"rendered-source-review", url:pricingUrl, browserSources:[pricingUrl] }]);
  expect(reviewQueue(later("2027-02-13T19:23:00Z"), { [id]: "2026-11-15" })).toMatchObject([{ id, reason:"overdue-review" }]);
});
