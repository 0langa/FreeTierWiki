import { BUILD_NOW } from "@/lib/build-info";
import { liveComparisons, type ComparisonCard } from "@/lib/comparison-view";
import { DOMAIN_LABELS } from "@/lib/content";
import { getAllEntries, getComparisons, getProviderGroups } from "@/lib/content.server";
import { toListItem } from "@/lib/entry-view";
import { filterItems } from "@/lib/filter-pages";
import type { Domain } from "@/types/content";

/** What the header menus list: every category and comparison, the quick lists, and the biggest providers. */
export type NavData = {
  categories: { domain: Domain; label: string; count: number }[];
  lists: { href: string; label: string; count: number }[];
  providers: { href: string; name: string }[];
  comparisons: ComparisonCard[];
};

const PROVIDERS = 8;

async function load(): Promise<NavData> {
  const entries = await getAllEntries();
  const live = entries.filter((entry) => entry.status !== "ended");
  const items = entries.map((entry) => toListItem(entry, BUILD_NOW));
  const counts = new Map<Domain, number>();
  for (const entry of live) counts.set(entry.domain, (counts.get(entry.domain) ?? 0) + 1);
  const groups = [...(await getProviderGroups())].sort((a, b) => b.entries.length - a.entries.length || a.name.localeCompare(b.name));
  return {
    categories: [...counts]
      .map(([domain, count]) => ({ domain, label: DOMAIN_LABELS[domain], count }))
      .sort((a, b) => a.label.localeCompare(b.label)),
    lists: [
      { href: "/no-card/", label: "No credit card needed", count: filterItems(items, "no-card").length },
      { href: "/hard-cap/", label: "Hard spending cap", count: filterItems(items, "hard-cap").length },
      { href: "/explorer/", label: "All free tiers", count: live.length },
    ],
    providers: groups.slice(0, PROVIDERS).map((group) => ({ href: `/provider/${group.slug}/`, name: group.name })),
    comparisons: liveComparisons(await getComparisons(), new Set(live.map((entry) => entry.id))),
  };
}

// Every page renders the header, so production builds the menus once per process, like content.server does.
let memoized: Promise<NavData> | undefined;

export function getNavData(): Promise<NavData> {
  return process.env.NODE_ENV === "production" ? (memoized ??= load()) : load();
}
