import "server-only";

import { cache } from "react";

import { KIND_LABELS } from "@/lib/content";
import { CONTENT_DIR, listContentFiles, readEntryFile } from "@/lib/content-files";
import { CONTENT_KINDS, type AtlasEntry, type AtlasEntryWithBody, type ContentKind, type RegistryItem } from "@/types/content";

async function load() {
  const files = await listContentFiles(CONTENT_DIR);
  const loaded = await Promise.all(files.map((file) => readEntryFile(file)));
  const entries = loaded.map(({ entry }) => entry).sort((a, b) => a.title.localeCompare(b.title));
  const byPath = new Map<string, AtlasEntryWithBody>(
    loaded.map(({ entry, body }) => [`${entry.kind}/${entry.slug}`, { ...entry, body: { raw: body } }]),
  );
  return { entries, byPath };
}

// Static export prerenders every one of the ~765 entry pages as its own render. React's `cache()`
// only dedupes calls within a single render — it does not share results across pages in the same
// build worker — so without memoization every page re-walks and re-parses all ~760 content files.
// That multiplies into thousands of concurrent file reads per worker and made local builds OOM.
// Content is static for the lifetime of a build/server process, so memoize per process in
// production; dev keeps the per-request `cache()` so editing content shows up without a restart.
let memoized: ReturnType<typeof load> | undefined;
const loadAll: () => ReturnType<typeof load> =
  process.env.NODE_ENV === "production" ? () => (memoized ??= load()) : cache(load);

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
