// @ts-check
// Pure helpers for deleting catalog entries without breaking old links.

/**
 * @param {string} id
 * @param {string} target
 * @returns {string[]}
 */
export function redirectRules(id, target) {
  const [kind, slug] = id.split("/");
  return [`/${kind}/${slug}/ ${target} 301`, `/${kind}/${slug} ${target} 301`];
}

/**
 * Points every rule whose target is `deletedPath` (with or without trailing slash) at `target` instead.
 * @param {string} redirectsText
 * @param {string} deletedPath
 * @param {string} target
 * @returns {string}
 */
export function retarget(redirectsText, deletedPath, target) {
  const bare = deletedPath.replace(/\/$/, "");
  return redirectsText
    .split("\n")
    .map((line) => {
      const parts = line.trim().split(/\s+/);
      if (parts.length === 3 && (parts[1] === bare || parts[1] === `${bare}/`)) return `${parts[0]} ${target} ${parts[2]}`;
      return line;
    })
    .join("\n");
}

/**
 * Adds rules before the `/resources/*` catch-all (which must stay last); skips sources that already have a rule.
 * @param {string} redirectsText
 * @param {string[]} rules
 * @returns {string}
 */
export function insertRedirects(redirectsText, rules) {
  const lines = redirectsText.replace(/\r\n/g, "\n").replace(/\n+$/, "").split("\n");
  const sources = new Set(lines.map((line) => line.trim().split(/\s+/)[0]));
  const fresh = rules.filter((rule) => !sources.has(rule.split(/\s+/)[0]));
  const catchAll = lines.findIndex((line) => line.startsWith("/resources/* "));
  lines.splice(catchAll === -1 ? lines.length : catchAll, 0, ...fresh);
  return `${lines.join("\n")}\n`;
}

/**
 * @param {{ domain: string, redirectTo?: string, remainingDomains: Set<string> }} options
 * @returns {string}
 */
export function pickTarget({ domain, redirectTo, remainingDomains }) {
  if (redirectTo) return redirectTo;
  return remainingDomains.has(domain) ? `/category/${domain}/` : "/explorer/";
}

/**
 * @typedef {{ date: string, kind: "removed", title: string, category: string, note: string }} RemovalRecord
 */

/**
 * @param {{ title: string, domain: string, reason: string, date: string }} options
 * @returns {RemovalRecord}
 */
export function removalRecord({ title, domain, reason, date }) {
  return { date, kind: "removed", title, category: domain, note: reason };
}
