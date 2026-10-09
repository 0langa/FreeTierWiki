import { describe, expect, it } from "vitest";

import type { Comparison } from "@/lib/comparisons-file";
import { comparisonsFor, comparisonsForDomain, jobLabel, liveComparisons } from "@/lib/comparison-view";

const postgres: Comparison = { slug: "postgres-hosting", title: "Free Postgres hosting compared", intro: "Managed Postgres.", entries: ["services:neon", "services:supabase", "services:gone"] };
const email: Comparison = { slug: "email-sending", title: "Free transactional email APIs compared", intro: "Email.", entries: ["services:resend", "services:neon"] };
const live = new Set(["services:neon", "services:supabase", "services:resend"]);

describe("jobLabel", () => {
  it("drops 'Free' and 'compared' so a card reads as a job", () => {
    expect(jobLabel("Free Postgres hosting compared")).toBe("Postgres hosting");
    expect(jobLabel("Free auth providers compared")).toBe("Auth providers");
    expect(jobLabel("Free CDNs")).toBe("CDNs");
    expect(jobLabel("Object storage")).toBe("Object storage");
  });
});

describe("liveComparisons", () => {
  it("keeps file order and counts only live entries", () => {
    expect(liveComparisons([postgres, email], live)).toEqual([
      { slug: "postgres-hosting", href: "/compare/postgres-hosting/", title: "Free Postgres hosting compared", label: "Postgres hosting", intro: "Managed Postgres.", count: 2 },
      { slug: "email-sending", href: "/compare/email-sending/", title: "Free transactional email APIs compared", label: "Transactional email APIs", intro: "Email.", count: 2 },
    ]);
  });
});

describe("comparisonsFor", () => {
  it("lists every comparison that includes the entry, in file order", () => {
    expect(comparisonsFor("services:neon", [postgres, email]).map((c) => c.slug)).toEqual(["postgres-hosting", "email-sending"]);
    expect(comparisonsFor("services:resend", [postgres, email]).map((c) => c.slug)).toEqual(["email-sending"]);
    expect(comparisonsFor("services:nope", [postgres, email])).toEqual([]);
  });
});

describe("comparisonsForDomain", () => {
  it("keeps tables where at least half the entries are in the category", () => {
    const tables = [
      { slug: "a", title: "A", intro: "", entries: ["x", "y"] },
      { slug: "b", title: "B", intro: "", entries: ["x", "z", "w"] },
    ];
    const domainOf = new Map([["x", "database"], ["y", "database"], ["z", "hosting"], ["w", "hosting"]]);
    expect(comparisonsForDomain("database", tables, domainOf).map((t) => t.slug)).toEqual(["a"]);
  });
});
