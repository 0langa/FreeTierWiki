import { describe, expect, it } from "vitest";

import {
  compareSafety,
  fromExplorerData,
  fromExplorerRow,
  offerParts,
  pricingUrl,
  relatedItems,
  safetyScore,
  searchWords,
  toExplorerData,
  toExplorerRow,
  toListItem,
} from "@/lib/entry-view";
import { listContentFiles, readEntryFile } from "@/lib/content-files";
import { makeEntry, makeItem } from "../support/fixtures";

const now = new Date("2026-09-25T00:00:00Z");

describe("offerParts", () => {
  it("takes the first three limits", () => {
    expect(offerParts(makeEntry())).toEqual(["0.5 GB storage", "1 project", "190 compute hours"]);
  });
});

describe("pricingUrl", () => {
  it("prefers the explicit pricingUrl", () => {
    expect(pricingUrl(makeEntry({ pricingUrl: "https://neon.tech/plans" }))).toBe("https://neon.tech/plans");
  });

  it("then a source URL that looks like a pricing page", () => {
    expect(pricingUrl(makeEntry())).toBe("https://neon.tech/pricing");
  });

  it("then the official URL", () => {
    expect(pricingUrl(makeEntry({ sourceUrls: ["https://neon.tech/docs"] }))).toBe("https://neon.tech/");
  });

  it("ignores a source URL that is not http(s)", () => {
    expect(pricingUrl(makeEntry({ sourceUrls: ["docs/pricing.md", "mailto:pricing@neon.tech"] }))).toBe("https://neon.tech/");
  });
});

describe("safety ranking", () => {
  it("puts ended entries last", () => {
    expect(safetyScore(makeItem({ status: "ended" }))).toBeLessThan(safetyScore(makeItem({ risk: "high", card: true, cap: false })));
  });

  it("ranks checked, no-card, hard-capped, no-risk entries first", () => {
    const best = makeItem({ title: "B", freshness: { state: "checked", date: "2026-09-01" } });
    const worse = makeItem({ title: "A", card: true });
    expect([worse, best].sort(compareSafety).map((item) => item.title)).toEqual(["B", "A"]);
  });

  it("breaks ties by title", () => {
    expect([makeItem({ title: "Zeta" }), makeItem({ title: "Alpha" })].sort(compareSafety).map((i) => i.title)).toEqual([
      "Alpha",
      "Zeta",
    ]);
  });

  it("breaks safety ties by rank before title", () => {
    const zeta = makeItem({ title: "Zeta", rank: 9 });
    const alpha = makeItem({ title: "Alpha", rank: 5 });
    expect([alpha, zeta].sort(compareSafety).map((item) => item.title)).toEqual(["Zeta", "Alpha"]);
  });
});

describe("toListItem", () => {
  it("builds a slim row with a lowercase search haystack", () => {
    const item = toListItem(makeEntry(), now);
    expect(item).toMatchObject({
      id: "services:neon",
      url: "/services/neon/",
      offer: ["0.5 GB storage", "1 project", "190 compute hours"],
      risk: "none",
      card: false,
      cap: true,
      freshness: { state: "imported", date: "2024-06-09" },
    });
    expect(item.haystack).toContain("database");
    expect(item.haystack).toBe(item.haystack.toLowerCase());
    expect(item.rank).toBe(8);
  });
});

describe("explorer rows", () => {
  it("ship without url and kind, and rebuild both from the id", () => {
    const item = toListItem(makeEntry(), now);
    const row = toExplorerRow(item);
    expect(row).not.toHaveProperty("url");
    expect(row).not.toHaveProperty("kind");
    expect({ ...fromExplorerRow(row), haystack: item.haystack }).toEqual(item);
  });

  it("drop haystack words that a longer word, the title, or the category already covers, without changing what search finds", () => {
    const entry = makeEntry({ title: "Neon Postgres", description: "Serverless Postgres database with data branching and branches." });
    const item = toListItem(entry, now);
    const row = toExplorerRow(item);
    const shipped = row.haystack.split(" ");
    expect(shipped).not.toContain("data");
    expect(shipped).not.toContain("neon");
    // "database" is the category name (domain: database), which the browser adds back from the row.
    expect(shipped).not.toContain("database");
    expect(shipped).toContain("serverless");
    const restored = fromExplorerRow(row).haystack;
    for (const word of item.haystack.split(" ")) expect(restored).toContain(word);
    for (const word of restored.split(" ")) expect(item.haystack.split(" ")).toContain(word);
  });

  it("find the same entries for every haystack word across the whole atlas", async () => {
    const problems: string[] = [];
    for (const file of await listContentFiles()) {
      const item = toListItem((await readEntryFile(file)).entry, now);
      const restored = fromExplorerRow(toExplorerRow(item)).haystack;
      const words = item.haystack.split(" ");
      for (const word of words) if (!restored.includes(word)) problems.push(`${item.id}: lost "${word}"`);
      for (const word of restored.split(" ")) if (!words.includes(word)) problems.push(`${item.id}: added "${word}"`);
    }
    expect(problems).toEqual([]);
  });

  it("rebuilds a tools url", () => {
    const item = toListItem(makeEntry({ id: "tools:postman", kind: "tools", slug: "postman", url: "/tools/postman/" }), now);
    expect(fromExplorerRow(toExplorerRow(item))).toMatchObject({ kind: "tools", url: "/tools/postman/" });
  });

  it("drop every word of a multi-word category name and add them back", () => {
    const item = toListItem(makeEntry({ domain: "devops", description: "Hosted CI pipelines for DevOps teams.", tags: ["ci"] }), now);
    const shipped = toExplorerRow(item).haystack.split(" ");
    expect(shipped).not.toContain("devops");
    expect(shipped).not.toContain("ci");
    expect(fromExplorerRow(toExplorerRow(item)).haystack.split(" ")).toEqual(expect.arrayContaining(["devops", "ci", "pipelines"]));
  });
});

describe("explorer data", () => {
  const items = [
    toListItem(makeEntry(), now),
    toListItem(makeEntry({ id: "tools:postman", kind: "tools", slug: "postman", url: "/tools/postman/", title: "Postman", provider: "Postman", status: "ended", lastVerified: "2026-09-01" }), now),
  ];

  it("ships one array per field instead of one object per row", () => {
    const data = toExplorerData(items);
    expect(Object.keys(data).sort()).toEqual(
      ["cap", "card", "domain", "freshness", "haystack", "id", "offer", "plan", "provider", "rank", "ready", "risk", "status", "title"],
    );
    for (const column of Object.values(data)) expect(column).toHaveLength(items.length);
    expect(data.id).toEqual(["services:neon", "tools:postman"]);
    expect(data.status).toEqual(["active", "ended"]);
  });

  it("round-trips through JSON to the same list items", () => {
    const restored = fromExplorerData(JSON.parse(JSON.stringify(toExplorerData(items))));
    expect(restored.map((item) => ({ ...item, haystack: "" }))).toEqual(items.map((item) => ({ ...item, haystack: "" })));
    restored.forEach((item, index) => expect(item.haystack.split(" ").sort()).toEqual(items[index].haystack.split(" ").sort()));
  });

  it("rejects anything else, such as the row array an older build shipped", () => {
    expect(() => fromExplorerData(items.map(toExplorerRow))).toThrow(/expected columns/);
    expect(() => fromExplorerData(null)).toThrow(/expected columns/);
    expect(() => fromExplorerData({ ...toExplorerData(items), rank: [1] })).toThrow(/expected columns/);
  });

  it("is smaller than the same rows as objects", () => {
    const all = Array.from({ length: 50 }, (_, index) => toListItem(makeEntry({ id: `services:neon-${index}`, slug: `neon-${index}` }), now));
    expect(JSON.stringify(toExplorerData(all)).length).toBeLessThan(JSON.stringify(all.map(toExplorerRow)).length * 0.8);
  });
});

describe("relatedItems", () => {
  it("returns other entries in the same category, safest first", () => {
    const self = makeEntry();
    const all = [
      self,
      makeEntry({ id: "services:a", title: "A", freeTierDetails: { ...self.freeTierDetails, requiresCard: true } }),
      makeEntry({ id: "services:b", title: "B" }),
      makeEntry({ id: "services:d", title: "D", domain: "hosting" }),
    ];
    expect(relatedItems(self, all, now).map((item) => item.title)).toEqual(["B", "A"]);
  });

  it("never suggests an ended offer", () => {
    const self = makeEntry();
    const all = [self, makeEntry({ id: "services:e", title: "E", status: "ended" }), makeEntry({ id: "services:b", title: "B" })];
    expect(relatedItems(self, all, now).map((item) => item.title)).toEqual(["B"]);
  });
});

describe("searchWords", () => {
  it("keeps each word once, lowercase, without filler words", () => {
    expect(searchWords(["Supabase", "Postgres for the web, and Postgres for apps", "next.js", "c#"])).toBe("supabase postgres web apps next.js c#");
  });
});
