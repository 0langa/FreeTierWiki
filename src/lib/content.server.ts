import "server-only";

import { cache } from "react";

import { KIND_LABELS } from "@/lib/content";
import { CONTENT_DIR, listContentFiles, readEntryFile } from "@/lib/content-files";
import { CONTENT_KINDS, type AtlasEntry, type AtlasEntryWithBody, type ContentKind, type RegistryItem } from "@/types/content";

// Static export prerenders every entry page in its own render, so `cache()` below does not dedupe
// across pages within a worker: each of the 765 pages re-triggers this loader. Reading all ~760
// files with a single unbounded Promise.all multiplies into thousands of concurrent file handles
// across the build's worker processes, which is unstable on Windows. Bound the concurrency instead.
const READ_CONCURRENCY = 24;

async function readAllEntryFiles(files: string[]) {
  const loaded: Awaited<ReturnType<typeof readEntryFile>>[] = [];
  for (let i = 0; i < files.length; i += READ_CONCURRENCY) {
    const batch = files.slice(i, i + READ_CONCURRENCY);
    loaded.push(...(await Promise.all(batch.map((file) => readEntryFile(file)))));
  }
  return loaded;
}

const loadAll = cache(async () => {
  const files = await listContentFiles(CONTENT_DIR);
  const loaded = await readAllEntryFiles(files);
  const entries = loaded.map(({ entry }) => entry).sort((a, b) => a.title.localeCompare(b.title));
  const byPath = new Map<string, AtlasEntryWithBody>(
    loaded.map(({ entry, body }) => [`${entry.kind}/${entry.slug}`, { ...entry, body: { raw: body } }]),
  );
  return { entries, byPath };
});

export async function getAllEntries(): Promise<AtlasEntry[]> {
  return (await loadAll()).entries;
}

export async function getEntryWithBody(kind: ContentKind, slug: string): Promise<AtlasEntryWithBody | undefined> {
  return (await loadAll()).byPath.get(`${kind}/${slug}`);
}

// ---- Legacy API for the old pages. Removed in Task 10. ----

function buildRegistry(values: string[]): RegistryItem[] {
  const counts = new Map<string, number>();
  for (const value of values) {
    const key = value.trim();
    if (key) counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
}

export const getContentData = cache(async () => {
  const { entries: byTitle, byPath } = await loadAll();
  const entries = [...byTitle].sort(
    (a, b) =>
      b.usefulnessScore - a.usefulnessScore || b.popularityScore - a.popularityScore || a.title.localeCompare(b.title),
  );
  const entryByPath = new Map<string, AtlasEntry>([...byPath.entries()]);
  const bodyById = new Map<string, string>([...byPath.values()].map((entry) => [entry.id, entry.body.raw]));

  return {
    allEntries: entries,
    featuredEntries: entries.filter((entry) => entry.featured).slice(0, 6),
    providerRegistry: buildRegistry(entries.map((entry) => entry.provider)),
    categoryRegistry: buildRegistry(entries.map((entry) => entry.category)),
    domainRegistry: buildRegistry(entries.map((entry) => entry.domain)),
    freeTierTypeRegistry: buildRegistry(entries.map((entry) => entry.freeTierDetails.freeTierType)),
    overageRiskRegistry: buildRegistry(entries.map((entry) => entry.freeTierDetails.overageRisk)),
    productionReadinessRegistry: buildRegistry(entries.map((entry) => entry.productionReadiness)),
    audienceRegistry: buildRegistry(entries.flatMap((entry) => entry.audiences)),
    subtypeRegistry: buildRegistry(entries.flatMap((entry) => entry.subtypes)),
    tagRegistry: buildRegistry(entries.flatMap((entry) => entry.tags)),
    navTypeItems: CONTENT_KINDS.map((value) => ({
      value,
      label: KIND_LABELS[value],
      count: entries.filter((entry) => entry.kind === value).length,
    })),
    entryByPath,
    bodyById,
  };
});

export async function getEntryByPath(kind: ContentKind, slug: string): Promise<AtlasEntry | undefined> {
  return (await loadAll()).byPath.get(`${kind}/${slug}`);
}

export async function getEntryWithBodyByPath(kind: ContentKind, slug: string): Promise<AtlasEntryWithBody | undefined> {
  return getEntryWithBody(kind, slug);
}
