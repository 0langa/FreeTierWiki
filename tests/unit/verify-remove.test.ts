import { describe, expect, it } from "vitest";

import { insertRedirects, pickTarget, redirectRules, removalRecord, retarget } from "../../scripts/verify/lib/remove.mjs";

const base = ["# header", "/resources/notion/ /services/notion/ 301", "/resources/notion /services/notion/ 301", "/resources/* /explorer/ 301", ""].join("\n");

describe("redirectRules", () => {
  it("covers both slash forms", () => {
    expect(redirectRules("services/foo", "/category/database/")).toEqual([
      "/services/foo/ /category/database/ 301",
      "/services/foo /category/database/ 301",
    ]);
  });
});

describe("insertRedirects", () => {
  it("inserts before the resources catch-all and skips duplicates", () => {
    const out = insertRedirects(base, ["/services/x/ /category/ai/ 301", "/resources/notion/ /somewhere/ 301"]);
    const lines = out.trim().split("\n");
    expect(lines.at(-1)).toBe("/resources/* /explorer/ 301");
    expect(lines).toContain("/services/x/ /category/ai/ 301");
    expect(lines.filter((l) => l.startsWith("/resources/notion/ "))).toHaveLength(1);
  });
});

describe("retarget", () => {
  it("retargets older rules that pointed at the deleted page", () => {
    const out = retarget(base, "/services/notion/", "/category/productivity/");
    expect(out).toContain("/resources/notion/ /category/productivity/ 301");
    expect(out).toContain("/resources/notion /category/productivity/ 301");
    expect(out).not.toContain("/services/notion/ 301");
  });
});

describe("pickTarget", () => {
  it("prefers an explicit target, then the category, then the explorer", () => {
    expect(pickTarget({ domain: "ai", redirectTo: "/services/neon/", remainingDomains: new Set(["ai"]) })).toBe("/services/neon/");
    expect(pickTarget({ domain: "ai", remainingDomains: new Set(["ai"]) })).toBe("/category/ai/");
  });

  it("falls back to the explorer when the domain empties", () => {
    expect(pickTarget({ domain: "design", remainingDomains: new Set(["ai"]) })).toBe("/explorer/");
  });
});

describe("removalRecord", () => {
  it("builds a changelog record", () => {
    expect(removalRecord({ title: "PlanetScale", domain: "database", reason: "Free plan ended.", date: "2024-04-08" })).toEqual({
      date: "2024-04-08",
      kind: "removed",
      title: "PlanetScale",
      category: "database",
      note: "Free plan ended.",
    });
  });
});
