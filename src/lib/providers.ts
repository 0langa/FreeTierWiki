import type { AtlasEntry } from "@/types/content";

// Some providers appear under two names in the content. Map the long form to the one most entries use.
const ALIASES: Record<string, string> = {
  "amazon web services": "AWS",
};

/** A provider page only pays off when it lists more than one entry; a single-entry page would be thin. */
export const MIN_PROVIDER_ENTRIES = 2;

export function providerName(provider: string): string {
  return ALIASES[provider.trim().toLowerCase()] ?? provider.trim();
}

export function providerSlug(provider: string): string {
  return providerName(provider)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type ProviderGroup = { slug: string; name: string; entries: AtlasEntry[] };

/** Providers with at least MIN_PROVIDER_ENTRIES entries, largest first. */
export function providerGroups(entries: AtlasEntry[]): ProviderGroup[] {
  const groups = new Map<string, ProviderGroup>();
  for (const entry of entries) {
    const slug = providerSlug(entry.provider);
    if (!slug) continue;
    const group = groups.get(slug) ?? { slug, name: providerName(entry.provider), entries: [] };
    group.entries.push(entry);
    groups.set(slug, group);
  }
  return [...groups.values()]
    .filter((group) => group.entries.length >= MIN_PROVIDER_ENTRIES)
    .sort((a, b) => b.entries.length - a.entries.length || a.name.localeCompare(b.name));
}

/** The provider page URL for this entry, or undefined when its provider has no page. */
export function providerHref(entry: AtlasEntry, groups: ProviderGroup[]): string | undefined {
  const slug = providerSlug(entry.provider);
  return groups.some((group) => group.slug === slug) ? `/provider/${slug}/` : undefined;
}
