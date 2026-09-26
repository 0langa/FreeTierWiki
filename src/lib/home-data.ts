import { compareSafety, type ListItem } from "@/lib/entry-view";
import type { AtlasEntry, ChangelogKind, Domain, RemovalRecord } from "@/types/content";

export type CategorySummary = { domain: Domain; count: number; examples: string[] };

export function topCategories(items: ListItem[], limit: number): CategorySummary[] {
  const byDomain = new Map<Domain, ListItem[]>();
  for (const item of items) {
    if (item.status === "ended") continue;
    const list = byDomain.get(item.domain) ?? [];
    list.push(item);
    byDomain.set(item.domain, list);
  }
  return [...byDomain.entries()]
    .map(([domain, list]) => ({
      domain,
      count: list.length,
      examples: [...list].sort(compareSafety).slice(0, 3).map((item) => item.title),
    }))
    .sort((a, b) => b.count - a.count || a.domain.localeCompare(b.domain))
    .slice(0, limit);
}

export type ChangeRow = { date: string; kind: ChangelogKind; note: string; title: string; url: string };

export function latestChanges(entries: AtlasEntry[], limit?: number, removals: RemovalRecord[] = []): ChangeRow[] {
  const liveDomains = new Set(entries.map((entry) => entry.domain));
  const rows: ChangeRow[] = [
    ...entries.flatMap((entry) => entry.changes.map((change) => ({ ...change, title: entry.title, url: entry.url }))),
    ...removals.map((record) => ({
      date: record.date,
      kind: record.kind,
      note: record.note,
      title: record.title,
      url: liveDomains.has(record.category) ? `/category/${record.category}/` : "/explorer/",
    })),
  ];
  rows.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  return limit === undefined ? rows : rows.slice(0, limit);
}
