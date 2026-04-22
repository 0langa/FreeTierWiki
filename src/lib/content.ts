import {
  allComparisons,
  allGuides,
  allPlaybooks,
  allResources,
  allServices,
  allTools,
} from "contentlayer/generated";

import type { AtlasEntry, ContentKind, RegistryItem } from "@/types/content";

export const KIND_LABELS: Record<ContentKind, string> = {
  services: "Services",
  tools: "Tools",
  resources: "Resources",
  guides: "Guides",
  playbooks: "Playbooks",
  comparisons: "Comparisons",
};

export const PRICING_MODEL_LABELS = {
  free: "Free",
  freemium: "Freemium",
  trial: "Trial",
} as const;

export const allEntries: AtlasEntry[] = [
  ...allServices,
  ...allTools,
  ...allResources,
  ...allGuides,
  ...allPlaybooks,
  ...allComparisons,
].sort((a, b) => {
  if (b.usefulnessScore !== a.usefulnessScore) {
    return b.usefulnessScore - a.usefulnessScore;
  }
  if (b.popularityScore !== a.popularityScore) {
    return b.popularityScore - a.popularityScore;
  }
  return a.title.localeCompare(b.title);
});

export const featuredEntries = allEntries.filter((entry) => entry.featured).slice(0, 6);

export function isContentKind(value: string): value is ContentKind {
  return ["services", "tools", "resources", "guides", "playbooks", "comparisons"].includes(
    value,
  );
}

export function getEntryByPath(kind: ContentKind, slug: string): AtlasEntry | undefined {
  return allEntries.find((entry) => entry.kind === kind && entry.slug === slug);
}

export function getEntriesByKind(kind: ContentKind): AtlasEntry[] {
  return allEntries.filter((entry) => entry.kind === kind);
}

function buildRegistry(values: string[]): RegistryItem[] {
  const counts = new Map<string, number>();

  for (const value of values) {
    const key = value.trim();
    if (!key) {
      continue;
    }
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.value.localeCompare(b.value);
    });
}

export const providerRegistry = buildRegistry(allEntries.map((entry) => entry.provider));
export const categoryRegistry = buildRegistry(allEntries.map((entry) => entry.category));
export const tagRegistry = buildRegistry(allEntries.flatMap((entry) => entry.tags));

export const navTypeItems = Object.entries(KIND_LABELS).map(([value, label]) => ({
  value: value as ContentKind,
  label,
  count: allEntries.filter((entry) => entry.kind === value).length,
}));