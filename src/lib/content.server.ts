import "server-only";

import { cache } from "react";

import { readRemovals } from "@/lib/changelog-file";
import { readComparisons, type Comparison } from "@/lib/comparisons-file";
import { CONTENT_DIR, listContentFiles, readEntryFile } from "@/lib/content-files";
import type { AtlasEntry, AtlasEntryWithBody, ContentKind, RemovalRecord } from "@/types/content";

async function load() {
  const files = await listContentFiles(CONTENT_DIR);
  const loaded = await Promise.all(files.map((file) => readEntryFile(file)));
  const entries = loaded.map(({ entry }) => entry).sort((a, b) => a.title.localeCompare(b.title));
  const byPath = new Map<string, AtlasEntryWithBody>(
    loaded.map(({ entry, body }) => [`${entry.kind}/${entry.slug}`, { ...entry, body: { raw: body } }]),
  );
  const removals = await readRemovals();
  const comparisons = await readComparisons();
  return { entries, byPath, removals, comparisons };
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

export async function getRemovals(): Promise<RemovalRecord[]> {
  return (await loadAll()).removals;
}

export async function getComparisons(): Promise<Comparison[]> {
  return (await loadAll()).comparisons;
}

export async function getComparison(slug: string): Promise<Comparison | undefined> {
  return (await loadAll()).comparisons.find((comparison) => comparison.slug === slug);
}
