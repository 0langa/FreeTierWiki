// @ts-check
// Local store of fetched source text for the entry deepening. It lives under development/ (gitignored):
// the text is evidence for the writer and for check-depth, never content, and never committed.
import fs from "node:fs";
import path from "node:path";

export const EVIDENCE_DIR = path.resolve("development", "verify", "deepen", "evidence");
export const REPORTS_DIR = path.resolve("development", "verify", "reports");

/**
 * @typedef {{ url: string, finalUrl?: string, status: number, fetchedAt: string, via: string, text: string }} StoredPage
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
  return JSON.parse(fs.readFileSync(file, "utf8")).pages;
}

/**
 * Adds or replaces pages by URL. Written atomically so an interrupted run never leaves half a file.
 * @param {string} id
 * @param {StoredPage[]} pages
 * @param {string} [dir]
 */
export function writeEvidence(id, pages, dir = EVIDENCE_DIR) {
  fs.mkdirSync(dir, { recursive: true });
  const byUrl = new Map((readEvidence(id, dir) ?? []).map((page) => [page.url, page]));
  for (const page of pages) byUrl.set(page.url, page);
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
