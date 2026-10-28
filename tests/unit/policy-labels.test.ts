import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { FactsLabel } from "@/components/entry/facts-label";
import { EntryList } from "@/components/entry/entry-list";
import { CardLabel, CapLabel } from "@/components/entry/labels";
import { toListItem } from "@/lib/entry-view";
import { makeEntry } from "../support/fixtures";

describe("policy labels", () => {
  it("keeps the list and detail cap facts independent of billing risk", () => {
    for (const hasHardCap of [true, false, "unknown"] as const) {
      for (const overageRisk of ["none", "low", "medium", "high"] as const) {
        const base = makeEntry();
        const entry = makeEntry({ freeTierDetails: { ...base.freeTierDetails, hasHardCap, overageRisk } });
        const item = toListItem(entry, new Date("2026-10-28T00:00:00Z"));
        const list = renderToStaticMarkup(createElement(EntryList, { items: [item], showCap: true }));
        const detail = renderToStaticMarkup(createElement(FactsLabel, { entry, freshness: item.freshness }));
        const capLabel = hasHardCap === "unknown" ? "Not confirmed" : hasHardCap ? "Hard cap" : "No hard cap";
        const fact = hasHardCap === "unknown" ? "Not confirmed" : hasHardCap ? "Yes" : "No";
        expect(list).toContain(`>${capLabel}</span>`);
        expect(list).not.toContain("Soft cap");
        expect(detail).toMatch(new RegExp(`Hard cap</dt><dd[^>]*>${fact}</dd>`));
        if (overageRisk === "none") expect(list).toContain("Billing risk: </span>None");
      }
    }
  });

  it("shows unknown card and cap policies without claiming yes, no, hard or soft", () => {
    expect(renderToStaticMarkup(createElement(CardLabel, { card: "unknown" }))).toContain(">Not confirmed</span>");
    expect(renderToStaticMarkup(createElement(CapLabel, { cap: "unknown" }))).toContain(">Not confirmed</span>");
  });

  it("preserves the labels for confirmed boolean policies", () => {
    expect(renderToStaticMarkup(createElement(CardLabel, { card: false }))).toContain(">No card</span>");
    expect(renderToStaticMarkup(createElement(CardLabel, { card: true }))).toContain(">Card</span>");
    expect(renderToStaticMarkup(createElement(CapLabel, { cap: true }))).toContain(">Hard cap</span>");
    expect(renderToStaticMarkup(createElement(CapLabel, { cap: false }))).toContain(">No hard cap</span>");
  });

  it("renders unconfirmed detail facts as unknown rather than yes or no", () => {
    const base = makeEntry();
    const entry = makeEntry({ freeTierDetails: { ...base.freeTierDetails, requiresCard: "unknown", hasHardCap: "unknown" } });
    const markup = renderToStaticMarkup(createElement(FactsLabel, { entry, freshness: { state: "imported", date: "2024-06-09" } }));
    expect(markup).toMatch(/Card required<\/dt><dd[^>]*>Not confirmed<\/dd>/);
    expect(markup).toMatch(/Hard cap<\/dt><dd[^>]*>Not confirmed<\/dd>/);
  });
});

vi.mock("@/lib/content.server", () => ({
  getProviderGroups: async () => {
    const base = makeEntry();
    return [{ slug: "neon", name: "Neon", entries: [
      makeEntry({ id: "services:a", freeTierDetails: { ...base.freeTierDetails, requiresCard: "unknown" } }),
      makeEntry({ id: "services:b", freeTierDetails: { ...base.freeTierDetails, requiresCard: false } }),
    ] }];
  },
}));

describe("provider policy summary", () => {
  it("does not count unknown card policies as required or no-card", async () => {
    const { default: ProviderPage } = await import("@/app/provider/[slug]/page");
    const markup = renderToStaticMarkup(await ProviderPage({ params: Promise.resolve({ slug: "neon" }) }));
    expect(markup).toContain("Card requirements are not confirmed for 1 of them.");
    expect(markup).not.toContain("1 of them need a card.");
    expect(markup).not.toContain("None of them needs a card.");
  });
});
