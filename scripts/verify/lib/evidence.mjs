// @ts-check
// Local store of fetched source text for the entry deepening. It lives under development/ (gitignored):
// the text is evidence for the writer and for check-depth, never content, and never committed.
import fs from "node:fs";
import path from "node:path";
import { parseNumericLocale, SOURCE_NUMERIC_LOCALES } from "./numeric-format.mjs";
import { normalizeUrl } from "./depth.mjs";

export const EVIDENCE_DIR = path.resolve("development", "verify", "deepen", "evidence");
export const REPORTS_DIR = path.resolve("development", "verify", "reports");

/**
 * @typedef {{ url: string, finalUrl?: string, status: number, fetchedAt: string, via: string, text: string, accessIssue?: string, numericLocale?: import("./numeric-format.mjs").NumericLocale }} StoredPage
 */

/** @param {string} id @param {string} [dir] */
export function evidenceFile(id, dir = EVIDENCE_DIR) {
  return path.join(dir, `${id.replace("/", "__")}.json`);
}

/**
 * @param {string} id
 * @param {string} [dir]
 * @returns {StoredPage[] | undefined}
 */
export function readEvidence(id, dir = EVIDENCE_DIR) {
  const file = evidenceFile(id, dir);
  if (!fs.existsSync(file)) return undefined;
  const pages = /** @type {StoredPage[]} */ (JSON.parse(fs.readFileSync(file, "utf8")).pages);
  /** @type {Map<string, StoredPage>} */
  const latest = new Map();
  /** @type {Map<string, {date: number, locale: import('./numeric-format.mjs').NumericLocale}>} */
  const hints = new Map();
  for (const page of pages) {
    const numericLocale = parseNumericLocale(page.numericLocale ?? SOURCE_NUMERIC_LOCALES[page.url]);
    const key = normalizeUrl(page.url);
    const fetched = Date.parse(page.fetchedAt) || 0;
    if (page.numericLocale !== undefined && (!hints.has(key) || fetched >= (hints.get(key)?.date ?? 0))) hints.set(key, {date: fetched, locale: page.numericLocale});
    const before = latest.get(key);
    if (!before || (Date.parse(page.fetchedAt) || 0) >= (Date.parse(before.fetchedAt) || 0)) latest.set(key, { ...page, ...(numericLocale ? { numericLocale } : {}) });
  }
  return [...latest].map(([key,page]) => ({...page,...(hints.has(key)?{numericLocale:hints.get(key)?.locale}:{})}));
}

/**
 * Adds or replaces pages by URL. Written atomically so an interrupted run never leaves half a file.
 * @param {string} id
 * @param {StoredPage[]} pages
 * @param {string} [dir]
 */
export function writeEvidence(id, pages, dir = EVIDENCE_DIR) {
  const byUrl = new Map((readEvidence(id, dir) ?? []).map((page) => [normalizeUrl(page.url), page]));
  for (const page of pages) {
    // Keep only the explicit interpretation hint; all fetched content and metadata are replaced.
    const key = normalizeUrl(page.url);
    const numericLocale = parseNumericLocale(page.numericLocale ?? byUrl.get(key)?.numericLocale ?? SOURCE_NUMERIC_LOCALES[page.url]);
    byUrl.set(key, { ...page, ...(numericLocale ? { numericLocale } : {}) });
  }
  fs.mkdirSync(dir, { recursive: true });
  const file = evidenceFile(id, dir);
  fs.writeFileSync(`${file}.tmp`, `${JSON.stringify({ id, pages: [...byUrl.values()] }, null, 1)}\n`);
  fs.renameSync(`${file}.tmp`, file);
}

/**
 * Entry ids listed in every `*-deepen-skipped.md` report: lines that start with "- services/x" or "- tools/x".
 * @param {string} [dir]
 * @returns {Set<string>}
 */
export function readSkipped(dir = REPORTS_DIR) {
  const ids = new Set();
  if (!fs.existsSync(dir)) return ids;
  for (const name of fs.readdirSync(dir).filter((n) => n.endsWith("-deepen-skipped.md"))) {
    for (const match of fs.readFileSync(path.join(dir, name), "utf8").matchAll(/^- `?((?:services|tools)\/[a-z0-9-]+)/gm)) {
      ids.add(match[1]);
    }
  }
  return ids;
}
