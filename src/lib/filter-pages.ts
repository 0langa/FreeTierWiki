import { DEFAULT_QUERY, matches, type ExplorerQuery } from "@/lib/explorer-query";
import type { ListItem } from "@/lib/entry-view";
import { DOMAINS, type Domain } from "@/types/content";

/**
 * Indexable versions of the explorer's "No card needed" and "Hard cap only" filters: a hub for each, plus one page
 * per category. They reuse the explorer's matching, so an entry whose policy is not confirmed, or whose free tier
 * ended, never appears.
 */
export const FILTER_SLUGS = ["no-card", "hard-cap"] as const;
export type FilterSlug = (typeof FILTER_SLUGS)[number];

type FilterPage = {
  query: ExplorerQuery;
  /** The explorer parameter that shows the same list. */
  param: string;
  /** Breadcrumb and chip label. */
  name: string;
  hubTitle: string;
  hubHeading: string;
  /** What every entry on the page has in common, after "N free tiers". */
  promise: string;
  /** What each row still tells you. */
  rest: string;
  /** The facts named in meta descriptions. */
  facts: string;
};

export const FILTER_PAGES: Record<FilterSlug, FilterPage> = {
  "no-card": {
    query: { ...DEFAULT_QUERY, noCard: true },
    param: "nocard=1",
    name: "No credit card",
    hubTitle: "Free tiers with no credit card required",
    hubHeading: "Free tiers with no credit card",
    promise: "you can start without a credit card",
    rest: "the limits, whether it stops at the limit, and how fresh the data is",
    facts: "limits, billing risk, and how fresh each entry is",
  },
  "hard-cap": {
    query: { ...DEFAULT_QUERY, hardCap: true },
    param: "cap=1",
    name: "Hard cap",
    hubTitle: "Free tiers with a hard spending cap",
    hubHeading: "Free tiers with a hard cap",
    promise: "that stop at the free limit",
    rest: "the limits, whether it needs a card, and how fresh the data is",
    facts: "limits, card rules, and how fresh each entry is",
  },
};

/** A category gets its own page only with at least this many entries, so no page is a near-empty list. */
export const MIN_CATEGORY_ENTRIES = 3;

export function isFilterSlug(value: string): value is FilterSlug {
  return (FILTER_SLUGS as readonly string[]).includes(value);
}

export function otherFilter(filter: FilterSlug): FilterSlug {
  return filter === "no-card" ? "hard-cap" : "no-card";
}

export function filterItems(items: ListItem[], filter: FilterSlug): ListItem[] {
  return items.filter((item) => matches(item, FILTER_PAGES[filter].query));
}

/** Categories with enough matching entries for their own page, in catalog order. */
export function filterDomains(items: ListItem[], filter: FilterSlug): Domain[] {
  const counts = new Map<Domain, number>();
  for (const item of filterItems(items, filter)) counts.set(item.domain, (counts.get(item.domain) ?? 0) + 1);
  return DOMAINS.filter((domain) => (counts.get(domain) ?? 0) >= MIN_CATEGORY_ENTRIES);
}

export function categoryFilterTitle(label: string, filter: FilterSlug): string {
  return filter === "no-card" ? `Free ${label} tiers with no credit card` : `Free ${label} tiers with a hard cap`;
}
