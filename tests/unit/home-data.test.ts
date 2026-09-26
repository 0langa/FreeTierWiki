import { describe, expect, it } from "vitest";

import { latestChanges, topCategories } from "@/lib/home-data";
import { makeEntry, makeItem } from "../support/fixtures";

describe("topCategories", () => {
  it("counts active entries per category, biggest first, with the safest examples", () => {
    const items = [
      makeItem({ id: "1", title: "A", domain: "hosting" }),
      makeItem({ id: "2", title: "B", domain: "hosting", card: true }),
      makeItem({ id: "3", title: "C", domain: "database" }),
      makeItem({ id: "4", title: "D", domain: "database", status: "ended" }),
    ];
    expect(topCategories(items, 12)).toEqual([
      { domain: "hosting", count: 2, examples: ["A", "B"] },
      { domain: "database", count: 1, examples: ["C"] },
    ]);
    expect(topCategories(items, 1)).toHaveLength(1);
  });
});

describe("latestChanges", () => {
  it("flattens changes from all entries, newest first", () => {
    const rows = latestChanges([
      makeEntry({ title: "Old", url: "/services/old/", changes: [{ date: "2023-08-01", kind: "changed", note: "Trial only." }] }),
      makeEntry({ title: "New", url: "/services/new/", changes: [{ date: "2024-04-08", kind: "ended", note: "Ended." }] }),
    ]);
    expect(rows.map((row) => row.title)).toEqual(["New", "Old"]);
    expect(rows[0]).toEqual({ date: "2024-04-08", kind: "ended", note: "Ended.", title: "New", url: "/services/new/" });
  });

  it("returns nothing when no entry has changes", () => {
    expect(latestChanges([makeEntry()], 5)).toEqual([]);
  });

  it("merges removal records and links them to their category", () => {
    const rows = latestChanges([makeEntry({ domain: "database" })], undefined, [
      { date: "2024-04-08", kind: "removed", title: "PlanetScale", category: "database", note: "Ended." },
    ]);
    expect(rows).toEqual([{ date: "2024-04-08", kind: "removed", title: "PlanetScale", note: "Ended.", url: "/category/database/" }]);
  });

  it("links a removal to the explorer when its category is gone", () => {
    const rows = latestChanges([makeEntry({ domain: "hosting" })], undefined, [
      { date: "2024-04-08", kind: "removed", title: "Gone", category: "design", note: "Closed." },
    ]);
    expect(rows[0].url).toBe("/explorer/");
  });

  it("applies the limit after merging", () => {
    const rows = latestChanges(
      [makeEntry({ changes: [{ date: "2025-01-01", kind: "changed", note: "A." }] })],
      1,
      [{ date: "2024-04-08", kind: "removed", title: "Old", category: "database", note: "B." }],
    );
    expect(rows.map((row) => row.note)).toEqual(["A."]);
  });
});
