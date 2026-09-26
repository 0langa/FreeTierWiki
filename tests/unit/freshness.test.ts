import { describe, expect, it } from "vitest";

import { freshnessDate, getFreshness } from "@/lib/freshness";

const now = new Date("2026-09-25T00:00:00Z");
const base = { status: "active" as const, lastUpdated: "2024-06-09", lastVerified: undefined };

describe("getFreshness", () => {
  it("is 'ended' for ended entries, whatever else is set", () => {
    expect(getFreshness({ ...base, status: "ended", lastVerified: "2026-09-25" }, now)).toEqual({ state: "ended", date: "2026-09-25" });
  });

  it("is 'checked' within 180 days of lastVerified", () => {
    expect(getFreshness({ ...base, lastVerified: "2026-03-29" }, now)).toEqual({ state: "checked", date: "2026-03-29" });
  });

  it("is 'stale' after 180 days", () => {
    expect(getFreshness({ ...base, lastVerified: "2026-03-28" }, now)).toEqual({ state: "stale", date: "2026-03-28" });
  });

  it("falls back to the import date", () => {
    expect(getFreshness(base, now)).toEqual({ state: "imported", date: "2024-06-09" });
  });

  it("exposes the date when there is one", () => {
    expect(freshnessDate({ state: "ended" })).toBeUndefined();
    expect(freshnessDate({ state: "checked", date: "2026-09-25" })).toBe("2026-09-25");
  });
});
