// Pure helpers for turning pricing pages into short text a reviewer can read.

const ENTITIES = { "&nbsp;": " ", "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&apos;": "'" };

/** @param {string} html */
export function htmlToText(html) {
  return html
    .replace(/<(script|style|noscript|svg)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<(br|\/p|\/div|\/li|\/h[1-6]|\/tr|\/td|\/th|\/section|\/article|\/header|\/footer)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(nbsp|amp|lt|gt|quot|apos|#39);/g, (m) => ENTITIES[m] ?? m)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}

const KEYWORDS = /free|price|pricing|plan|limit|month|credit|trial|card|\$|€|quota|request|\bGB\b|\bMB\b/i;

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
 * @param {{ pricingUrl?: string, sourceUrls?: string[], officialUrl?: string }} entry
 * @returns {string[]}
 */
export function candidateUrls(entry) {
  const urls = [];
  const add = (url) => {
    if (typeof url === "string" && /^https?:\/\//i.test(url) && !urls.includes(url)) urls.push(url);
  };
  add(entry.pricingUrl);
  for (const url of entry.sourceUrls ?? []) if (/pricing|plans|free/i.test(url)) add(url);
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

/**
 * @param {string} text
 * @returns {boolean}
 */
export function isThin(text) {
  return (text ?? "").length < 400;
}
