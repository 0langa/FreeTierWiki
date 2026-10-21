// @ts-check
// Pure helpers for turning pricing pages into short text a reviewer can read.

/** @type {Record<string, string>} */
const ENTITIES = { "&nbsp;": " ", "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'", "&euro;": "€", "&pound;": "£", "&yen;": "¥", "&times;": "×", "&copy;": "©", "&ndash;": "–", "&mdash;": "—", "&check;": "✓", "&cross;": "✗" };

/** @param {number} n */
const codepoint = (n) => Number.isInteger(n) && n > 0 && n <= 0x10ffff && !(n >= 0xd800 && n <= 0xdfff) ? String.fromCodePoint(n) : "�";

/** @param {string} html */
export function htmlToText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|svg)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<(br|\/p|\/div|\/li|\/h[1-6]|\/tr|\/td|\/th|\/section|\/article|\/header|\/footer)\b(?:[^<>"']|"[^"]*"|'[^']*')*>/gi, "\n")
    .replace(/<(?:[^<>"']|"[^"]*"|'[^']*')*>/g, " ")
    .replace(/&(?:nbsp|amp|lt|gt|quot|apos|euro|pound|yen|times|copy|ndash|mdash|check|cross);/g, (m) => ENTITIES[m] ?? m)
    .replace(/&#x([a-f\d]+);/gi, (_, n) => codepoint(Number.parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => codepoint(Number(n)))
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}

const KEYWORDS = /free|price|pricing|plan|limit|month|credit|trial|card|\$|€|quota|request|\bprojects?\b|projets?|gratuit|tarif|requêtes?|stockage|kostenlos|preise?|anfragen|kontingent|\bGB\b|\bMB\b/i;

/**
 * Keyword lines plus one line before and after, capped at `max` characters.
 * @param {string} text
 * @param {number} [max]
 * @returns {string}
 */
export function excerpt(text, max = 6000) {
  if (!text) return "";
  const lines = text.split("\n");
  const keep = new Set();
  lines.forEach((line, i) => {
    if (KEYWORDS.test(line)) [i - 1, i, i + 1].forEach((j) => j >= 0 && j < lines.length && keep.add(j));
  });
  let out = "";
  for (const i of [...keep].sort((a, b) => a - b)) {
    const next = out ? `${out}\n${lines[i]}` : lines[i];
    if (next.length > max) break;
    out = next;
  }
  return out;
}

/**
 * @param {{ pricingUrl?: string, sourceUrls?: string[], docsUrl?: string, officialUrl?: string }} entry
 * @returns {string[]}
 */
export function candidateUrls(entry) {
  /** @type {string[]} */
  const urls = [];
  /** @param {string | undefined} url */
  const add = (url) => {
    if (typeof url === "string" && /^https?:\/\//i.test(url) && !urls.includes(url)) urls.push(url);
  };
  add(entry.pricingUrl);
  for (const url of entry.sourceUrls ?? []) if (/pricing|plans|free/i.test(url)) add(url);
  // Explicitly cited documentation is a better fallback than an invented /pricing route or a generic homepage.
  for (const url of entry.sourceUrls ?? []) add(url);
  add(entry.docsUrl);
  add(entry.officialUrl);
  if (entry.officialUrl) {
    try {
      add(new URL("/pricing", entry.officialUrl).toString());
    } catch {
      // not a valid URL; skip the guess
    }
  }
  return urls;
}

/** All explicitly cited source pages for an evidence review, with no silent per-entry cutoff.
 * @param {{ pricingUrl?: unknown, sourceUrls?: unknown, docsUrl?: unknown, officialUrl?: unknown }} entry
 * @returns {string[]}
 */
export function evidenceUrls(entry) {
  const sources = Array.isArray(entry.sourceUrls) ? entry.sourceUrls : [];
  return [...new Set([entry.pricingUrl, ...sources, entry.docsUrl, entry.officialUrl].filter((url) => typeof url === "string" && /^https?:\/\//i.test(url)))];
}

/**
 * @param {string} text
 * @returns {boolean}
 */
export function isThin(text) {
  return (text ?? "").length < 400;
}
