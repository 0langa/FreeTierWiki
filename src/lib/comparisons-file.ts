import fs from "node:fs/promises";
import path from "node:path";

export const COMPARISONS_FILE = path.join(process.cwd(), "content", "comparisons.json");

/** One hand-picked comparison page: a topic and the entry ids (`kind:slug`) to show, in any order. */
export type Comparison = {
  slug: string;
  title: string;
  intro: string;
  entries: string[];
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ENTRY_ID = /^(services|tools):[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Validates the comparison list. Throws with the index so a bad edit fails the build loudly. */
export function parseComparisons(data: unknown): Comparison[] {
  if (!Array.isArray(data)) throw new Error("comparisons.json: expected a list");
  const slugs = new Set<string>();
  return data.map((raw, index) => {
    const record = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
    const where = `comparisons.json[${index}]`;
    if (typeof record.slug !== "string" || !SLUG.test(record.slug)) throw new Error(`${where}: 'slug' must be lowercase words joined by '-'`);
    if (slugs.has(record.slug)) throw new Error(`${where}: duplicate slug '${record.slug}'`);
    slugs.add(record.slug);
    if (typeof record.title !== "string" || !record.title.trim()) throw new Error(`${where}: 'title' is required`);
    if (typeof record.intro !== "string" || !record.intro.trim()) throw new Error(`${where}: 'intro' is required`);
    if (!Array.isArray(record.entries) || record.entries.length < 2) throw new Error(`${where}: 'entries' needs at least two ids`);
    const entries = record.entries.map((id, i) => {
      if (typeof id !== "string" || !ENTRY_ID.test(id)) throw new Error(`${where}.entries[${i}]: expected 'services:slug' or 'tools:slug'`);
      return id;
    });
    if (new Set(entries).size !== entries.length) throw new Error(`${where}: 'entries' has a duplicate id`);
    return { slug: record.slug, title: record.title.trim(), intro: record.intro.trim(), entries };
  });
}

export async function readComparisons(file: string = COMPARISONS_FILE): Promise<Comparison[]> {
  let text: string;
  try {
    text = await fs.readFile(file, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
  return parseComparisons(JSON.parse(text));
}
