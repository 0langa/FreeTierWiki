import { describe, expect, it } from "vitest";

import { CHANGELOG_FILTERS, CHANGELOG_PAGE_SIZE, changelogPage, changelogPath, changelogRoutes, parseChangelogPath } from "@/lib/changelog-view";
import { getAllEntries, getRemovals } from "@/lib/content.server";
import { latestChanges } from "@/lib/home-data";

describe("changelog archives", () => {
  it("keeps the entire catalog history in order, exactly once per filter, across bounded pages", async () => {
    const rows = latestChanges(await getAllEntries(), undefined, await getRemovals());
    expect(rows.length).toBeGreaterThan(CHANGELOG_PAGE_SIZE);
    const routes = changelogRoutes(rows);
    expect(new Set(routes.map((route) => route.path)).size).toBe(routes.length);
    for (const { kind } of CHANGELOG_FILTERS) {
      const expected = kind === "all" ? rows : rows.filter((row) => row.kind === kind);
      const matchingRoutes = routes.filter((route) => route.filter === kind);
      const collected = matchingRoutes.flatMap((route) => {
        const page = changelogPage(rows, kind, route.page);
        expect(page.rows.length).toBeLessThanOrEqual(CHANGELOG_PAGE_SIZE);
        expect(page.rows.length).toBeGreaterThan(0);
        expect(page.total).toBe(expected.length);
        expect(page.pageCount).toBe(matchingRoutes.length);
        expect(parseChangelogPath(route.path.split("/").filter(Boolean).slice(1))).toEqual({ filter: kind, page: route.page });
        return page.rows;
      });
      expect(collected).toEqual(expected);
    }
  }, 60_000);

  it("keeps an empty root but does not produce empty filter pages", () => {
    expect(changelogRoutes([])).toEqual([{ filter: "all", page: 1, path: "/changelog/" }]);
    expect(changelogPage([])).toMatchObject({ rows: [], total: 0, pageCount: 1 });
  });

  it("uses one canonical URL for page one and preserves the filter on older pages", () => {
    expect(changelogPath("all", 1)).toBe("/changelog/");
    expect(changelogPath("changed", 1)).toBe("/changelog/changed/");
    expect(changelogPath("changed", 2)).toBe("/changelog/changed/page/2/");
    for (const path of ["all", "unknown", "page/1", "new/page/1", "page/0", "page/-1", "page/02", "page/2.5", "page/2/extra", "page/9007199254740992"]) {
      expect(parseChangelogPath(path.split("/"))).toBeUndefined();
    }
  });
});
