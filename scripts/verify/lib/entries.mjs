// @ts-check
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const KINDS = ["services", "tools"];

/**
 * @param {string} [contentDir]
 * @returns {Array<{ id: string, kind: string, slug: string, file: string, data: Record<string, unknown> }>}
 */
export function readEntries(contentDir = path.resolve("content")) {
  const out = [];
  for (const kind of KINDS) {
    const dir = path.join(contentDir, kind);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir).filter((n) => n.endsWith(".mdx")).sort()) {
      const file = path.join(dir, name);
      const slug = name.replace(/\.mdx$/, "");
      out.push({ id: `${kind}/${slug}`, kind, slug, file, data: matter(fs.readFileSync(file, "utf8")).data });
    }
  }
  return out;
}

/**
 * @param {Array<{ id: string, data: Record<string, unknown> }>} entries
 * @param {{ domains?: string[], ids?: string[] }} [options]
 * @returns {Array<{ id: string, data: Record<string, unknown> }>}
 */
export function selectEntries(entries, { domains, ids } = {}) {
  // An explicit id list (even an empty one) always means "only these" — never fall through to "everything".
  if (ids) {
    const byId = new Map(entries.map((entry) => [entry.id, entry]));
    return ids.map((id) => {
      const entry = byId.get(id);
      if (!entry) throw new Error(`Unknown id: ${id}`);
      return entry;
    });
  }
  if (domains && domains.length) return entries.filter((entry) => domains.includes(String(entry.data.domain)));
  return entries;
}

/**
 * Groups entries by provider (so one pricing page is read once) and packs the groups into chunks of at most `size`.
 * @param {Array<{ id: string, data: Record<string, unknown> }>} entries
 * @param {number} size
 * @returns {string[][]}
 */
export function chunkByProvider(entries, size) {
  const groups = new Map();
  for (const entry of entries) {
    const key = String(entry.data.provider ?? "").toLowerCase();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(entry.id);
  }
  const chunks = [];
  let current = [];
  for (const key of [...groups.keys()].sort()) {
    const ids = groups.get(key);
    if (ids.length > size) {
      if (current.length) chunks.push(current);
      current = [];
      for (let i = 0; i < ids.length; i += size) chunks.push(ids.slice(i, i + size));
      continue;
    }
    if (current.length + ids.length > size) {
      chunks.push(current);
      current = [];
    }
    current.push(...ids);
  }
  if (current.length) chunks.push(current);
  return chunks;
}

/**
 * @param {string[]} argv
 * @param {string} name
 * @returns {string[] | undefined}
 */
export function parseListArg(argv, name) {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1].split(",").map((s) => s.trim()).filter(Boolean) : undefined;
}
