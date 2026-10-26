import { describe, expect, it } from "vitest";

import { BUILD_NOW } from "@/lib/build-info";
import { domainPhrase } from "@/lib/content";
import { getAllEntries } from "@/lib/content.server";
import { toListItem } from "@/lib/entry-view";
import { categoryFilterTitle, filterDomains, filterItems, MIN_CATEGORY_ENTRIES } from "@/lib/filter-pages";

async function catalog() {
  return (await getAllEntries()).map((entry) => toListItem(entry, BUILD_NOW));
}

describe("no-card and hard-cap lists", () => {
  it("hold only confirmed policies on live entries", async () => {
    const items = await catalog();
    const noCard = filterItems(items, "no-card");
    const hardCap = filterItems(items, "hard-cap");
    expect(noCard.length).toBeGreaterThan(0);
    expect(hardCap.length).toBeGreaterThan(0);
    expect(noCard.filter((item) => item.card !== false || item.status === "ended")).toEqual([]);
    expect(hardCap.filter((item) => item.cap !== true || item.status === "ended")).toEqual([]);
  }, 60_000);

  it("give a category its own page only when its list is long enough", async () => {
    const items = await catalog();
    for (const filter of ["no-card", "hard-cap"] as const) {
      const counts = new Map<string, number>();
      for (const item of filterItems(items, filter)) counts.set(item.domain, (counts.get(item.domain) ?? 0) + 1);
      const expected = [...counts].filter(([, count]) => count >= MIN_CATEGORY_ENTRIES).map(([domain]) => domain);
      expect([...filterDomains(items, filter)].sort()).toEqual(expected.sort());
    }
  }, 60_000);

  it("name the category and the promise in the title", () => {
    expect(categoryFilterTitle("Database", "no-card")).toBe("Free Database tiers with no credit card");
    expect(categoryFilterTitle("AI", "hard-cap")).toBe("Free AI tiers with a hard cap");
  });
});

describe("domainPhrase", () => {
  it("lowercases plain words and keeps acronyms", () => {
    expect(domainPhrase("database")).toBe("database");
    expect(domainPhrase("documents")).toBe("documents & PDF");
    expect(domainPhrase("ai")).toBe("AI");
    expect(domainPhrase("apis")).toBe("APIs & data");
    expect(domainPhrase("devops")).toBe("DevOps & CI");
  });
});
