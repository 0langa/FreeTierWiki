// @ts-check
// Pure rules for a "deep" entry body (see docs/plans/2026-10-09-deepen-every-entry.md).
// The CLI in scripts/verify/check-depth.mjs feeds real files in; the unit tests feed fixtures.

export const SECTIONS = [
  { title: "What the free plan gives you", minWords: 80, maxWords: 140 },
  { title: "When you hit a limit", minWords: 60, maxWords: 120 },
  { title: "Gotchas", bullets: 3 },
  { title: "Alternatives in this atlas", minLinks: 2, maxLinks: 3 },
  { title: "Questions people ask", questions: 3 },
];

export const BODY_MIN_WORDS = 350;
export const BODY_MAX_WORDS = 700;

/** A body counts as deepened once it has at least one `##` heading. Older entries hold one sentence. */
/** @param {string} body */
export function isDeep(body) {
  return /^##\s/m.test(body ?? "");
}

/** Link targets do not count as words or figures; only the visible text does. */
/** @param {string} markdown */
export function visibleText(markdown) {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/[*_`]/g, "");
}

/** @param {string} markdown */
export function countWords(markdown) {
  return visibleText(markdown).split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
}

/**
 * Splits a body into the text before the first `##` heading and one part per `##` heading.
 * @param {string} body
 * @returns {{ intro: string, sections: Array<{ title: string, text: string }> }}
 */
export function splitSections(body) {
  const parts = body.split(/^##\s+(.+)$/m);
  const intro = parts[0].trim();
  const sections = [];
  for (let i = 1; i < parts.length; i += 2) sections.push({ title: parts[i].trim(), text: (parts[i + 1] ?? "").trim() });
  return { intro, sections };
}

const MULTIPLIERS = /** @type {Record<string, number>} */ ({ k: 1e3, thousand: 1e3, m: 1e6, million: 1e6, b: 1e9, billion: 1e9 });
const FIGURE = /(?<![\p{L}\d.])(\d[\d,]*(?:\.\d+)?)(?:\s?(thousand|million|billion)\b|(k|m|b)(?![\p{L}\d]))?/giu;

/**
 * Every number in the text, as the value a reader would take from it ("2 million" and "2,000,000" are the same).
 * @param {string} text
 * @returns {Array<{ raw: string, value: number }>}
 */
export function extractFigures(text) {
  const out = [];
  for (const match of text.matchAll(FIGURE)) {
    const digits = match[1].replace(/,(?=\d{3}\b)/g, "");
    const base = Number(digits.replace(/,/g, ""));
    if (!Number.isFinite(base)) continue;
    // A lowercase single "m" or "b" is minutes, meters, or bits ("60m"), never million or billion.
    const letter = match[3] === "m" || match[3] === "b" ? "" : match[3];
    const word = (match[2] ?? letter ?? "").toLowerCase();
    out.push({ raw: match[0].trim(), value: word ? base * MULTIPLIERS[word] : base });
  }
  return out;
}

/**
 * Figures in `body` that never appear in `evidence`. The body may only state numbers the source shows.
 * @param {string} body
 * @param {string} evidence
 * @returns {string[]}
 */
export function unsupportedFigures(body, evidence) {
  const known = new Set(extractFigures(evidence).map((figure) => figure.value));
  const missing = new Set();
  for (const figure of extractFigures(visibleText(body))) if (!known.has(figure.value)) missing.add(figure.raw);
  return [...missing];
}

/** @param {string} url */
export function normalizeUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.hostname.replace(/^www\./, "")}${parsed.pathname.replace(/\/+$/, "")}`.toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

/** @param {unknown} value */
function dateString(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10);
  return typeof value === "string" ? value.slice(0, 10) : undefined;
}

/**
 * @typedef {{ url: string, fetchedAt: string, text: string }} EvidencePage
 * @typedef {{
 *   id: string,
 *   data: Record<string, unknown>,
 *   body: string,
 *   entries: Map<string, { status?: unknown }>,
 *   evidence?: EvidencePage[],
 *   skipped?: boolean,
 * }} DepthInput
 */

/**
 * Every rule a deep body must pass. Returns problems; an empty list means the entry passes.
 * `evidence` is the fetched page text for this entry (local runs only). Without it the number check
 * is skipped, which is what CI does: the fetched pages are never committed.
 * A `skipped` entry (no page could be fetched) may only state numbers its frontmatter already holds.
 * @param {DepthInput} input
 * @returns {string[]}
 */
export function checkDepth({ id, data, body, entries, evidence, skipped = false }) {
  const problems = [];
  const words = countWords(body);
  if (words < BODY_MIN_WORDS || words > BODY_MAX_WORDS) {
    problems.push(`body has ${words} words; needs ${BODY_MIN_WORDS} to ${BODY_MAX_WORDS}`);
  }
  if (/[<>{}]/.test(body)) problems.push("body contains < > { or }; MDX would read them as code");

  const { sections } = splitSections(body);
  const titles = sections.map((section) => section.title);
  const expected = SECTIONS.map((section) => section.title);
  for (const title of expected) if (!titles.includes(title)) problems.push(`missing section "## ${title}"`);
  for (const title of titles) if (!expected.includes(title)) problems.push(`unexpected section "## ${title}"`);
  const order = titles.filter((title) => expected.includes(title));
  if (order.join("|") !== expected.filter((title) => order.includes(title)).join("|")) {
    problems.push(`sections out of order; expected: ${expected.join(", ")}`);
  }

  for (const rule of SECTIONS) {
    const section = sections.find((candidate) => candidate.title === rule.title);
    if (!section) continue;
    const name = `"${rule.title}"`;
    if (rule.minWords !== undefined && rule.maxWords !== undefined) {
      const count = countWords(section.text);
      if (count < rule.minWords || count > rule.maxWords) {
        problems.push(`${name} has ${count} words; needs ${rule.minWords} to ${rule.maxWords}`);
      }
    }
    if (rule.bullets !== undefined) {
      const bullets = section.text.split("\n").filter((line) => /^\s*[-*]\s+\S/.test(line)).length;
      if (bullets !== rule.bullets) problems.push(`${name} has ${bullets} bullets; needs ${rule.bullets}`);
    }
    if (rule.minLinks !== undefined && rule.maxLinks !== undefined) {
      const links = [...section.text.matchAll(/\]\(\/(services|tools)\/([^)#?]+?)\/?\)/g)].map((m) => `${m[1]}/${m[2]}`);
      const unique = [...new Set(links)];
      if (unique.length < rule.minLinks || unique.length > rule.maxLinks) {
        problems.push(`${name} links ${unique.length} entries; needs ${rule.minLinks} to ${rule.maxLinks}`);
      }
      for (const target of unique) {
        const found = entries.get(target);
        if (!found) problems.push(`${name} links /${target}/, which does not exist`);
        else if (found.status === "ended") problems.push(`${name} links /${target}/, which has status: ended`);
        if (target === id) problems.push(`${name} links the entry to itself`);
      }
      const external = [...section.text.matchAll(/\]\((https?:[^)]+)\)/g)];
      if (external.length) problems.push(`${name} must link only to entries in this atlas`);
    }
    if (rule.questions !== undefined) {
      const parts = section.text.split(/^###\s+(.+)$/m);
      const questions = [];
      for (let i = 1; i < parts.length; i += 2) questions.push({ q: parts[i].trim(), a: (parts[i + 1] ?? "").trim() });
      if (questions.length !== rule.questions) problems.push(`${name} has ${questions.length} questions; needs ${rule.questions}`);
      for (const { q, a } of questions) {
        if (!q.endsWith("?")) problems.push(`question "${q}" must end with "?"`);
        const sentences = a.split(/(?<=[.!?])\s+/).filter((s) => /[\p{L}\p{N}]/u.test(s)).length;
        if (sentences < 1 || sentences > 3) problems.push(`answer to "${q}" has ${sentences} sentences; needs 1 to 3`);
      }
    }
  }

  const sourceUrls = Array.isArray(data.sourceUrls) ? data.sourceUrls.map(String) : [];
  const figures = extractFigures(visibleText(body));
  if (figures.length && sourceUrls.length === 0) problems.push("body states numbers but 'sourceUrls' is empty");
  const pricingUrl = typeof data.pricingUrl === "string" ? data.pricingUrl : undefined;
  if (figures.length && pricingUrl && !sourceUrls.some((url) => normalizeUrl(url) === normalizeUrl(pricingUrl))) {
    problems.push("body states numbers but 'sourceUrls' does not list the 'pricingUrl'");
  }

  if (skipped) {
    const ft = /** @type {Record<string, unknown>} */ (data.freeTierDetails ?? {});
    const frontmatter = JSON.stringify([ft, data.description, data.whenToUse, data.whenNotToUse]);
    const missing = unsupportedFigures(body, frontmatter);
    if (missing.length) problems.push(`skipped entry states numbers its frontmatter lacks: ${missing.join(", ")}`);
  } else if (evidence) {
    const listed = new Set(sourceUrls.map(normalizeUrl));
    // Only pages the entry cites count as evidence: a number from an uncited page has no matching source.
    const usable = evidence.filter((page) => listed.has(normalizeUrl(page.url)));
    if (usable.length === 0) {
      problems.push("no fetched page for this entry matches 'sourceUrls'");
    } else {
      const missing = unsupportedFigures(body, usable.map((page) => page.text).join("\n"));
      if (missing.length) problems.push(`numbers not found on any fetched source page: ${missing.join(", ")}`);
      const fetched = usable.map((page) => page.fetchedAt.slice(0, 10)).sort().at(-1) ?? "";
      const verified = dateString(data.lastVerified);
      const updated = dateString(data.lastUpdated);
      if (!verified || verified < fetched) problems.push(`'lastVerified' (${verified ?? "none"}) is older than the fetch date ${fetched}`);
      if (!updated || updated < fetched) problems.push(`'lastUpdated' (${updated ?? "none"}) is older than the fetch date ${fetched}`);
    }
  }

  return problems;
}
