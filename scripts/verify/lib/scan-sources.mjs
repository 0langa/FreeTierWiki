// Read every explicitly cited policy document, once per run. A readable pricing page cannot hide
// a changed billing/help page or a failed secondary source. This is source tracking, not verification.
import crypto from "node:crypto";
import { fetchText } from "./fetch.mjs";
import { classifyFetch } from "./freshness.mjs";
import { HASH_VERSION } from "./source-snapshot.mjs";

export const SOURCE_COVERAGE_VERSION = 1;

/** @param {Record<string, unknown>} data */
export function trackedSourceUrls(data) {
  const cited = [data.pricingUrl, ...(Array.isArray(data.sourceUrls) ? data.sourceUrls : [])];
  const valid = (value) => typeof value === "string" && /^https?:\/\//i.test(value);
  const sources = cited.filter(valid);
  if (!sources.length) sources.push(...[data.docsUrl, data.officialUrl].filter(valid));
  return [...new Set(sources.map((url) => {
    try { const parsed = new URL(url); parsed.hash = ""; return parsed.href; }
    catch { return url; } // fetchText records malformed URLs as failed sources without aborting the catalog.
  }))];
}

/** @param {string} value */
const digest = (value) => crypto.createHash("sha256").update(value).digest("hex");

/**
 * @param {string} id
 * @param {Array<Awaited<ReturnType<typeof fetchText>> & { requestedUrl: string }>} pages
 * @param {import('./freshness.mjs').SourceDocument[]} [previousDocuments]
 */
export function summarizeSources(id, pages, previousDocuments = []) {
  const previous = new Map(previousDocuments.map((source) => [source.requestedUrl, source]));
  const tried = [];
  const sourceDocuments = pages.map((page) => {
    const attempt = { status: page.status, chars: page.text.length, error: page.error, accessIssue: page.accessIssue };
    tried.push(attempt);
    // Secondary API/setup/policy documents need not contain a pricing keyword to be worth tracking.
    const state = classifyFetch([attempt]);
    const before = previous.get(page.requestedUrl);
    const retained = state !== "ok" && before?.hash && before?.markupHash ? before : undefined;
    return {
      requestedUrl: page.requestedUrl,
      url: retained?.url || page.finalUrl || page.url,
      state,
      status: page.status,
      ...(page.accessIssue ? { accessIssue: page.accessIssue } : {}),
      ...(page.error ? { error: page.error } : {}),
      ...(state === "ok" ? { hash: page.hash, markupHash: page.markupHash, hashVersion: page.hashVersion } : {}),
      ...(retained ? { hash: retained.hash, markupHash: retained.markupHash, hashVersion: retained.hashVersion, retainedFingerprint: true } : {}),
    };
  // Byte-wise URL ordering keeps Windows and Actions baselines identical regardless of locale.
  }).sort((a, b) => a.requestedUrl < b.requestedUrl ? -1 : a.requestedUrl > b.requestedUrl ? 1 : 0);
  const state = classifyFetch(tried);
  const vector = (field) => sourceDocuments.map((source) => source.hash
    ? [source.requestedUrl, source.url, "ok", source[field]]
    : [source.requestedUrl, source.requestedUrl, "unavailable", null]);
  // Requested source order determines the primary identity, never response size or a temporary fallback.
  const primary = sourceDocuments.find((source) => source.requestedUrl === pages[0]?.requestedUrl);
  return {
    id,
    state,
    url: (primary?.hash ? primary.url : primary?.requestedUrl) ?? null,
    coverageVersion: SOURCE_COVERAGE_VERSION,
    sourceDocuments,
    ...(state === "ok" ? {
      hash: digest(JSON.stringify(vector("hash"))),
      markupHash: digest(JSON.stringify(vector("markupHash"))),
      hashVersion: HASH_VERSION,
    } : {}),
  };
}

/**
 * @param {Array<{id: string, data: Record<string, unknown>}>} entries
 * @param {{fetchPage?: typeof fetchText, concurrency?: number, hostDelayMs?: number, previous?: Record<string, import('./freshness.mjs').StoredEntry>}} [options]
 */
export async function scanSources(entries, { fetchPage = fetchText, concurrency = 6, hostDelayMs = 250, previous = {} } = {}) {
  const urlsById = new Map(entries.map((entry) => [entry.id, trackedSourceUrls(entry.data)]));
  const pending = [...new Set([...urlsById.values()].flat())].map((url) => {
    let host;
    try { host = new URL(url).hostname; } catch { host = "invalid-url"; }
    return { url, host };
  });
  const fetched = new Map();
  const busy = new Set();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  async function worker() {
    while (pending.length) {
      const index = pending.findIndex(({ host }) => !busy.has(host));
      if (index < 0) { await sleep(10); continue; }
      const { url, host } = pending.splice(index, 1)[0];
      busy.add(host);
      try { fetched.set(url, { ...await fetchPage(url), requestedUrl: url }); }
      finally { if (hostDelayMs > 0) await sleep(hostDelayMs); busy.delete(host); }
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, Math.min(6, concurrency)) }, worker));
  return entries.filter((entry) => urlsById.get(entry.id).length).map((entry) => summarizeSources(entry.id, urlsById.get(entry.id).map((url) => fetched.get(url)), previous[entry.id]?.sourceDocuments));
}
