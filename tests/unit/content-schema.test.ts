import { describe, expect, it } from "vitest";

import { ContentError, normalizeListItem, parseEntry } from "@/lib/content-schema";

function baseData(): Record<string, unknown> {
  return {
    title: "Neon",
    description: "Serverless Postgres.",
    provider: "Neon",
    category: "database",
    domain: "database",
    tags: ["postgres"],
    pricingModel: "freemium",
    freeTierDetails: {
      summary: "Free plan.",
      limits: ["0.5 GB storage"],
      freeTierType: "always-free",
      overageRisk: "none",
      hasHardCap: true,
      requiresCard: false,
    },
    useCases: ["Prototypes"],
    whenToUse: "Small apps.",
    whenNotToUse: "Large apps.",
    difficulty: "beginner",
    productionReadiness: "side-project",
    lastUpdated: new Date("2024-06-09T00:00:00.000Z"),
    popularityScore: 8,
    usefulnessScore: 8,
    officialUrl: "https://neon.tech/",
  };
}

function problemsOf(data: Record<string, unknown>): string[] {
  try {
    parseEntry({ kind: "services", slug: "x", data });
  } catch (error) {
    if (error instanceof ContentError) return error.problems;
    throw error;
  }
  return [];
}

describe("normalizeListItem", () => {
  it("keeps text and strips bullet prefixes", () => {
    expect(normalizeListItem("• 5 GB storage")).toBe("5 GB storage");
    expect(normalizeListItem("  - 3 projects ")).toBe("3 projects");
  });

  it("turns a YAML key-value object back into text", () => {
    expect(normalizeListItem({ "WireGuard peers": 2 })).toBe("WireGuard peers: 2");
    expect(normalizeListItem({ Run: "npm i", Then: "deploy" })).toBe("Run: npm i; Then: deploy");
  });

  it("turns numbers into text", () => {
    expect(normalizeListItem(100)).toBe("100");
  });

  it("rejects empty values", () => {
    expect(() => normalizeListItem(null)).toThrow(TypeError);
  });
});

describe("parseEntry", () => {
  it("parses a valid entry and fills defaults for the new fields", () => {
    const entry = parseEntry({ kind: "services", slug: "neon", data: baseData() });
    expect(entry).toMatchObject({
      id: "services:neon",
      url: "/services/neon/",
      status: "active",
      changes: [],
      lastUpdated: "2024-06-09",
      sourceUrls: [],
    });
    expect(entry.lastVerified).toBeUndefined();
    expect(entry.freeTierDetails.caveats).toEqual([]);
    expect(entry.bestFor).toEqual(["Prototypes"]);
  });

  it("reads the freshness fields and sorts changes newest first", () => {
    const entry = parseEntry({
      kind: "services",
      slug: "planetscale",
      data: {
        ...baseData(),
        status: "ended",
        lastVerified: "2026-09-25",
        pricingUrl: "https://planetscale.com/pricing",
        changes: [
          { date: "2023-01-01", kind: "changed", note: "Older." },
          { date: "2024-04-08", kind: "ended", note: "Hobby plan ended." },
        ],
      },
    });
    expect(entry.status).toBe("ended");
    expect(entry.lastVerified).toBe("2026-09-25");
    expect(entry.pricingUrl).toBe("https://planetscale.com/pricing");
    expect(entry.changes.map((change) => change.date)).toEqual(["2024-04-08", "2023-01-01"]);
  });

  it("reports every problem at once", () => {
    const problems = problemsOf({
      ...baseData(),
      domain: "space",
      lastVerified: "last week",
      freeTierDetails: { ...(baseData().freeTierDetails as object), limits: [null] },
    });
    expect(problems).toEqual(
      expect.arrayContaining([
        expect.stringContaining("'domain'"),
        expect.stringContaining("'lastVerified'"),
        expect.stringContaining("'freeTierDetails.limits[0]'"),
      ]),
    );
  });

  it("requires at least one limit", () => {
    const problems = problemsOf({ ...baseData(), freeTierDetails: { ...(baseData().freeTierDetails as object), limits: [] } });
    expect(problems).toEqual([expect.stringContaining("'freeTierDetails.limits' needs at least one item")]);
  });

  it("treats a blank limit as no limit at all", () => {
    const problems = problemsOf({ ...baseData(), freeTierDetails: { ...(baseData().freeTierDetails as object), limits: [""] } });
    expect(problems).toEqual([expect.stringContaining("'freeTierDetails.limits' needs at least one item")]);
  });

  it("requires a change note and a check date when status is not active", () => {
    const problems = problemsOf({ ...baseData(), status: "changed" });
    expect(problems).toEqual(
      expect.arrayContaining([
        expect.stringContaining("needs at least one 'changes' item"),
        expect.stringContaining("needs 'lastVerified'"),
      ]),
    );
  });

  it("rejects a pricing URL that is not http(s)", () => {
    expect(problemsOf({ ...baseData(), pricingUrl: "javascript:alert(1)" })).toEqual([
      expect.stringContaining("'pricingUrl' must be an http(s) URL"),
    ]);
  });

  it("rejects an impossible date", () => {
    expect(problemsOf({ ...baseData(), lastVerified: "2024-02-30" })).toEqual([
      expect.stringContaining("'lastVerified' must be a date like 2026-09-25"),
    ]);
  });

  it("accepts numbers in optional text fields", () => {
    const entry = parseEntry({
      kind: "services",
      slug: "azure",
      data: { ...baseData(), freeTierDetails: { ...(baseData().freeTierDetails as object), monthlyCreditAmount: 200 } },
    });
    expect(entry.freeTierDetails.monthlyCreditAmount).toBe("200");
  });
});
