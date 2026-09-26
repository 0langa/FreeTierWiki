import { describe, expect, it } from "vitest";

import { emphasizeNumbers, formatDay, formatMonth, shortUrl } from "@/lib/format";

describe("dates", () => {
  it("formats month and day", () => {
    expect(formatMonth("2024-06-09")).toBe("Jun 2024");
    expect(formatDay("2026-09-25")).toBe("25 Sep 2026");
  });

  it("is time-zone independent", () => {
    expect(formatMonth("2024-06-30")).toBe("Jun 2024");
    expect(formatDay("2026-01-01")).toBe("1 Jan 2026");
    expect(formatDay("2026-12-31")).toBe("31 Dec 2026");
  });
});

describe("emphasizeNumbers", () => {
  const strong = (text: string) => emphasizeNumbers(text).filter((s) => s.strong).map((s) => s.text);

  it("marks numbers with their unit", () => {
    expect(strong("500 MB database")).toEqual(["500 MB"]);
    expect(strong("100,000 requests/day · 10 ms CPU")).toEqual(["100,000", "10 ms"]);
    expect(strong("$5/month usage credit")).toEqual(["$5"]);
    expect(strong("3GB persistent volume")).toEqual(["3GB"]);
  });

  it("ignores digits inside words", () => {
    expect(strong("M0 shared cluster")).toEqual([]);
    expect(strong("Auth0 tenants")).toEqual([]);
  });

  it("keeps the full text", () => {
    expect(emphasizeNumbers("500 MB database").map((s) => s.text).join("")).toBe("500 MB database");
  });
});

describe("shortUrl", () => {
  it("drops the protocol and trailing slash", () => {
    expect(shortUrl("https://supabase.com/pricing/")).toBe("supabase.com/pricing");
    expect(shortUrl("https://www.neon.tech/")).toBe("neon.tech");
  });

  it("returns bad input unchanged", () => {
    expect(shortUrl("not a url")).toBe("not a url");
  });
});
