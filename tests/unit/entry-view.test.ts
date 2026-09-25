import { describe, expect, it } from "vitest";

import { compareSafety, offerParts, pricingUrl, relatedItems, safetyScore, toListItem } from "@/lib/entry-view";
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
});
