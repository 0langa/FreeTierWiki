import { describe, expect, it } from "vitest";

import type { Comparison } from "@/lib/comparisons-file";
import { comparisonsFor, jobLabel, liveComparisons } from "@/lib/comparison-view";

const postgres: Comparison = { slug: "postgres-hosting", title: "Free Postgres hosting compared", intro: "Managed Postgres.", entries: ["services:neon", "services:supabase", "services:gone"] };
const email: Comparison = { slug: "email-sending", title: "Free transactional email APIs compared", intro: "Email.", entries: ["services:resend", "services:neon"] };
const live = new Set(["services:neon", "services:supabase", "services:resend"]);

describe("jobLabel", () => {
  it("drops the trailing 'compared' so a card reads as a job", () => {
    expect(jobLabel("Free Postgres hosting compared")).toBe("Free Postgres hosting");
    expect(jobLabel("Free CDNs")).toBe("Free CDNs");
  });
});

describe("liveComparisons", () => {
  it("keeps file order and counts only live entries", () => {
    expect(liveComparisons([postgres, email], live)).toEqual([
      { slug: "postgres-hosting", href: "/compare/postgres-hosting/", title: "Free Postgres hosting compared", label: "Free Postgres hosting", intro: "Managed Postgres.", count: 2 },
      { slug: "email-sending", href: "/compare/email-sending/", title: "Free transactional email APIs compared", label: "Free transactional email APIs", intro: "Email.", count: 2 },
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
