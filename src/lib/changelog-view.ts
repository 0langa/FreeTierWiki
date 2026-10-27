import type { ChangeRow } from "@/lib/home-data";
import type { ChangelogKind } from "@/types/content";

export const CHANGELOG_PAGE_SIZE = 100;
export const CHANGELOG_FILTERS = [
  { kind: "all", label: "All" },
  { kind: "new", label: "New" },
  { kind: "changed", label: "Changed" },
  { kind: "ended", label: "Ended" },
  { kind: "removed", label: "Removed" },
] as const;
export type ChangelogFilter = "all" | ChangelogKind;

export function changelogPath(filter: ChangelogFilter = "all", page = 1): string {
  const base = filter === "all" ? "/changelog/" : `/changelog/${filter}/`;
  return page === 1 ? base : `${base}page/${page}/`;
}

export function changelogPage(rows: ChangeRow[], filter: ChangelogFilter = "all", page = 1) {
  const matching = filter === "all" ? rows : rows.filter((row) => row.kind === filter);
  const pageCount = Math.max(1, Math.ceil(matching.length / CHANGELOG_PAGE_SIZE));
  const start = (page - 1) * CHANGELOG_PAGE_SIZE;
  return { rows: matching.slice(start, start + CHANGELOG_PAGE_SIZE), total: matching.length, pageCount, start };
}

/** Enumerate only canonical, nonempty filters and valid pages for the static export. */
export function changelogRoutes(rows: ChangeRow[]) {
  return CHANGELOG_FILTERS.flatMap(({ kind }) => {
    const { total, pageCount } = changelogPage(rows, kind);
    if (kind !== "all" && total === 0) return [];
    return Array.from({ length: pageCount }, (_, index) => ({
      filter: kind,
      page: index + 1,
      path: changelogPath(kind, index + 1),
    }));
  });
}

export function parseChangelogPath(segments: string[]): { filter: ChangelogFilter; page: number } | undefined {
  const parts = [...segments];
  let filter: ChangelogFilter = "all";
  const kind = CHANGELOG_FILTERS.find((item) => item.kind !== "all" && item.kind === parts[0]);
  if (kind) {
    filter = kind.kind;
    parts.shift();
  }
  if (!parts.length) return { filter, page: 1 };
  if (parts.length !== 2 || parts[0] !== "page" || !/^[1-9]\d*$/.test(parts[1])) return undefined;
  const page = Number(parts[1]);
  // Page one has a shorter canonical URL; reject duplicate or unsafe page numbers.
  return Number.isSafeInteger(page) && page > 1 ? { filter, page } : undefined;
}
