// @ts-check
import { createHash } from "node:crypto";
import { excerpt, htmlToText } from "./pages.mjs";

/** @param {string} text */
const digest = (text) => createHash("sha256").update(text).digest("hex").slice(0, 16);

/** @param {string} text */
export function hashExcerpt(text) {
  return digest(text.toLowerCase().replace(/\s+/g, " ").trim());
}

/**
 * Preserve all readable text, plus a separate structural signal for tables and non-text icons/images.
 * Markup changes require inspection, not an inference about which feature or price changed.
 * @param {string} html
 */
export function sourceSnapshot(html) {
  const inert = html.replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/gi, "").replace(/<!--[\s\S]*?-->/g, "");
  const text = htmlToText(inert);
  const headings = [...inert.matchAll(/<(?:title|h1)\b[^>]*>([\s\S]*?)<\/(?:title|h1)>/gi)].map((m) => htmlToText(m[1])).join("\n");
  const accessIssue = /(?:security|scheduled|precautionary|under(?:going)?|down for) maintenance|^maintenance(?:\s*[|·-].*)?$|^our apps are offline/im.test(headings)
    ? "maintenance"
    : /making sure.*not a bot|just a moment|checking your browser|verify (?:that )?you are human|attention required.*cloudflare/im.test(headings)
      ? "challenge"
      : /^(?:sign in|log in|login)\b/im.test(headings) && /<input\b[^>]*type\s*=\s*["']?password/i.test(html) ? "login" : undefined;
  // Preserve inert tag order and meaningful attributes, including CSS/span indicators in div-based cards.
  // A quoted '>' is part of an attribute value, not a tag boundary. Omit volatile IDs and analytics data.
  const tags = inert.match(/<\/?[a-z][a-z0-9:-]*(?:\s+[^\s=<>/'"]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*\s*\/?>/gi) ?? [];
  const structure = tags.map(tag => {
    const name = tag.match(/^<\/?([a-z][a-z0-9:-]*)/i)?.[1].toLowerCase();
    if (tag.startsWith('</')) return `</${name}>`;
    const attrs = [...tag.matchAll(/\s+([^\s=<>/'"]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s"'=<>`]+))?/g)]
      .filter(m => /^(?:class|style|role|title|alt|src|srcset|href|rel|type|checked|disabled|hidden|open|aria-.+|data-(?:icon|state|status))$/i.test(m[1]))
      .map(m => `${m[1].toLowerCase()}=${m[2] ? JSON.stringify(/^["']/.test(m[2]) ? m[2].slice(1,-1) : m[2]) : 'true'}`).sort();
    return `<${name}${attrs.length ? ' '+attrs.join(' ') : ''}>`;
  });
  const vectors = (inert.match(/<svg\b[\s\S]*?<\/svg>/gi) ?? []).map(block => block.replace(/\s+/g, ' ').trim());
  const markup = [...structure, ...vectors].join('\n');
  return {
    text,
    // Preserve case: 5m (minutes) and 5M (million) need not mean the same allowance.
    hash: digest(text.replace(/\s+/g, ' ').trim()),
    legacyHash: hashExcerpt(excerpt(text)),
    markupHash: digest(markup),
    hashVersion: 2,
    accessIssue,
  };
}
