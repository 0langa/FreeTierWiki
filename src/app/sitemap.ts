import type { MetadataRoute } from "next";

import { BUILD_NOW } from "@/lib/build-info";
import { changelogRoutes } from "@/lib/changelog-view";
import { getAllEntries, getComparisons, getPopular, getProviderGroups, getRemovals } from "@/lib/content.server";
import { toListItem } from "@/lib/entry-view";
import { FILTER_SLUGS, filterDomains, filterItems } from "@/lib/filter-pages";
import { latestChanges } from "@/lib/home-data";
import { absoluteUrl } from "@/lib/links";
import type { AtlasEntry } from "@/types/content";

export const dynamic = "force-static";

/** The newest content change among a page's entries: a list page changes when one of its rows does. */
function newest(entries: AtlasEntry[]): string | undefined {
  return entries.reduce<string | undefined>((date, entry) => (date && date >= entry.lastUpdated ? date : entry.lastUpdated), undefined);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getAllEntries();
  const comparisons = await getComparisons();
  const providers = await getProviderGroups();
  const domains = [...new Set(entries.map((entry) => entry.domain))];
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  const catalogDate = newest(entries);
  // The home page also lists the most visited entries, which the weekly job refreshes.
  const popular = await getPopular();
  const homeDate = [catalogDate, popular?.updated].filter((date): date is string => Boolean(date)).sort().at(-1);
  const changes = latestChanges(entries, undefined, await getRemovals());
  const changelogDate = changes[0]?.date;
  const items = entries.map((entry) => toListItem(entry, BUILD_NOW));
  // The no-card and hard-cap lists: a hub each, plus the categories with a page of their own.
  const filterPages = FILTER_SLUGS.flatMap((filter) => {
    const ids = new Set(filterItems(items, filter).map((item) => item.id));
    const matching = entries.filter((entry) => ids.has(entry.id));
    return [
      { url: absoluteUrl(`/${filter}/`), lastModified: newest(matching), changeFrequency: "weekly" as const, priority: 0.8 },
      ...filterDomains(items, filter).map((domain) => ({
        url: absoluteUrl(`/category/${domain}/${filter}/`),
        lastModified: newest(matching.filter((entry) => entry.domain === domain)),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ];
  });
  // The category and comparison indexes and the about page only list names and counts, so they get no date.
  return [
    { url: absoluteUrl("/"), lastModified: homeDate, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/explorer/"), lastModified: catalogDate, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/category/"), changeFrequency: "weekly", priority: 0.8 },
    ...changelogRoutes(changes).map(({ path }) => ({
      url: absoluteUrl(path), lastModified: changelogDate, changeFrequency: "weekly" as const, priority: 0.6,
    })),
    { url: absoluteUrl("/about/"), changeFrequency: "monthly", priority: 0.4 },
    { url: absoluteUrl("/compare/"), changeFrequency: "weekly", priority: 0.8 },
    ...comparisons.map((comparison) => ({
      url: absoluteUrl(`/compare/${comparison.slug}/`),
      lastModified: newest(comparison.entries.flatMap((id) => byId.get(id) ?? [])),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...domains.map((domain) => ({
      url: absoluteUrl(`/category/${domain}/`),
      lastModified: newest(entries.filter((entry) => entry.domain === domain)),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...filterPages,
    ...providers.map((group) => ({
      url: absoluteUrl(`/provider/${group.slug}/`),
      lastModified: newest(group.entries),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...entries.map((entry) => ({
      url: absoluteUrl(entry.url),
      // Date the actual content change, not a verification that left the content unchanged.
      lastModified: entry.lastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
