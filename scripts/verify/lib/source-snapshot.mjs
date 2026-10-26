// @ts-check
import { createHash } from "node:crypto";
import { excerpt, htmlToText } from "./pages.mjs";

/** Version of the hashed inputs. compareRuns reads an older stored record through the matching legacy hash. */
export const HASH_VERSION = 3;

/** @param {string} text */
const digest = (text) => createHash("sha256").update(text).digest("hex").slice(0, 16);

/** @param {string} text */
export function hashExcerpt(text) {
  return digest(text.toLowerCase().replace(/\s+/g, " ").trim());
}

const KEPT_ATTRIBUTE = /^(?:class|style|role|title|alt|src|srcset|href|rel|type|checked|disabled|hidden|open|aria-.+|data-(?:icon|state|status))$/i;
// ARIA attributes that point at another element's id. Generated ids change per request or deploy; the link itself stays.
const ID_REFERENCE = /^aria-(?:activedescendant|controls|describedby|details|errormessage|flowto|labelledby|owns)$/i;
// Bundles, fonts, favicons and data files get a new name or path on every deploy and never show an offer.
const ASSET_FILE = /\.(?:css|m?js|json|map|woff2?|ttf|otf|eot|ico|webmanifest)$/i;
// Ids that a framework generates per render or per build: UUIDs (with any random suffix) and React useId values.
const GENERATED_ID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(?:-[0-9a-f]+)?|:r[0-9a-z]+:|«r[0-9a-z]+»|_R_[0-9a-z]+_/gi;
// An SVG id or id reference (url(#…), href="#…") and, inside it, a random hex suffix such as "paint0_linear-ce071d2e".
const SVG_ID = /(\bid\s*=\s*["']?|url\(\s*["']?#|href\s*=\s*["']?#)([^"'()\s>]+)/gi;
const HEX_SUFFIX = /(?<![0-9a-z])(?=[0-9a-f]*\d)(?=[0-9a-f]*[a-f])[0-9a-f]{8,}(?![0-9a-z])/gi;
// Font class names that next/font derives from a build hash: __className_1a2b3c, __variable_1a2b3c, VF6YLG_className.
const FONT_CLASS = /(?<![\w-])(?:__(className|variable)_[0-9a-f]{6}|[\w-]{6}_(className|variable))(?![\w-])/g;
// Empty tracking elements that Google Cloud pages include in some responses and not in others.
const INJECTED_TAG = /^cloudx-/;
// Scoped-style attributes whose names carry a build hash (Astro, Vue).
const BUILD_ATTRIBUTE = /\s(?:data-astro-cid-[\w-]+|data-v-[0-9a-f]+)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?/gi;

/**
 * A URL without its deploy-specific parts. Query strings and fragments (cache busters, tracking, generated anchors,
 * Cloudflare email obfuscation) are dropped, a code, font or icon asset keeps only its extension, and anything but a
 * link keeps only its file name: CDN and build directories change on deploy, the file name tells a check icon from a cross.
 * @param {string} raw
 * @param {boolean} keepPath
 * @returns {string}
 */
function stableUrl(raw, keepPath) {
  const proxied = raw.match(/[?&]url=([^&#]+)/);
  if (proxied) {
    try {
      return stableUrl(decodeURIComponent(proxied[1]), keepPath);
    } catch {
      // A malformed image-proxy parameter: fall back to the outer URL.
    }
  }
  const urlPath = raw.trim().replace(/[?#][\s\S]*$/, "");
  const asset = urlPath.match(ASSET_FILE);
  if (asset) return `*${asset[0].toLowerCase()}`;
  return keepPath ? urlPath : urlPath.slice(urlPath.lastIndexOf("/") + 1);
}

/**
 * @param {string} tag
 * @param {string} name lower-case attribute name
 * @param {string} value
 */
function stableAttribute(tag, name, value) {
  if (ID_REFERENCE.test(name)) return "ref";
  if (name === "class") return value.replace(FONT_CLASS, (_match, hashed, named) => `_${hashed ?? named}`);
  if (name === "href" || name === "src") return stableUrl(value, tag === "a" && name === "href");
  if (name === "srcset") return value.split(/,\s+/).map((candidate) => candidate.trim().replace(/^\S+/, (url) => stableUrl(url, false))).join(", ");
  return value;
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
  // Stable markup leaves out <link> resource hints, whose number and names change with each deploy,
  // injected tracking elements, and the per-render or per-build parts of attribute values and inline SVGs.
  /** @param {boolean} stable */
  const structure = (stable) => tags.flatMap(tag => {
    const name = tag.match(/^<\/?([a-z][a-z0-9:-]*)/i)?.[1].toLowerCase() ?? "";
    if (stable && (name === "link" || INJECTED_TAG.test(name))) return [];
    if (tag.startsWith('</')) return [`</${name}>`];
    const attrs = [...tag.matchAll(/\s+([^\s=<>/'"]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s"'=<>`]+))?/g)]
      .filter(m => KEPT_ATTRIBUTE.test(m[1]))
      .map(m => {
        if (!m[2]) return `${m[1].toLowerCase()}=true`;
        const value = /^["']/.test(m[2]) ? m[2].slice(1,-1) : m[2];
        return `${m[1].toLowerCase()}=${JSON.stringify(stable ? stableAttribute(name, m[1].toLowerCase(), value) : value)}`;
      }).sort();
    return [`<${name}${attrs.length ? ' '+attrs.join(' ') : ''}>`];
  });
  const vectors = (inert.match(/<svg\b[\s\S]*?<\/svg>/gi) ?? []).map(block => block.replace(/\s+/g, ' ').trim());
  const stableVectors = vectors.map(block => block.replace(BUILD_ATTRIBUTE, '').replace(GENERATED_ID, 'id')
    .replace(SVG_ID, (_match, lead, id) => lead + id.replace(HEX_SUFFIX, 'id')));
  return {
    text,
    // Preserve case: 5m (minutes) and 5M (million) need not mean the same allowance.
    hash: digest(text.replace(/\s+/g, ' ').trim()),
    legacyHash: hashExcerpt(excerpt(text)),
    markupHash: digest([...structure(true), ...stableVectors].join('\n')),
    // Version 2 hashed attribute values as served. Kept so the first version 3 scan compares like with like.
    legacyMarkupHash: digest([...structure(false), ...vectors].join('\n')),
    hashVersion: HASH_VERSION,
    accessIssue,
  };
}
