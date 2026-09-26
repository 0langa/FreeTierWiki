import { describe, expect, it } from "vitest";

import {
  activeFilterCount,
  applyQuery,
  DEFAULT_QUERY,
  facetCounts,
  filterChips,
  isDefaultQuery,
  parseQuery,
  serializeQuery,
  toggleValue,
} from "@/lib/explorer-query";
import { makeItem } from "../support/fixtures";

const parse = (search: string) => parseQuery(new URLSearchParams(search));

describe("parseQuery", () => {
  it("returns the default for an empty URL", () => {
    expect(parse("")).toEqual(DEFAULT_QUERY);
    expect(isDefaultQuery(parse(""))).toBe(true);
  });

  it("reads the new parameters", () => {
    expect(parse("q=postgres&type=tools&cat=hosting,database&risk=none,low&plan=trial&ready=prototype&nocard=1&cap=1&recent=1&sort=az")).toEqual({
      q: "postgres",
      type: "tools",
      cats: ["hosting", "database"],
      risks: ["none", "low"],
      plans: ["trial"],
      ready: ["prototype"],
      noCard: true,
      hardCap: true,
      recent: true,
      sort: "az",
    });
  });

  it("maps the old parameters", () => {
    expect(parse("kind=services&domain=database&overageRisk=none&freeTierType=credit&productionReadiness=production-ready&requiresCard=no&sort=best-overall&provider=Supabase")).toMatchObject({
      q: "Supabase",
      type: "services",
      cats: ["database"],
      risks: ["none"],
      plans: ["credit"],
      ready: ["production-ready"],
      noCard: true,
      sort: "safest",
    });
    expect(parse("tag=serverless").q).toBe("serverless");
    expect(parse("tag=all&provider=all").q).toBe("");
  });

  it("ignores unknown values", () => {
    expect(parse("cat=foo,database,database&risk=&sort=evil&type=widgets&plan=gratis")).toEqual({
      ...DEFAULT_QUERY,
      cats: ["database"],
    });
  });

  it("treats the removed resources type as all", () => {
    expect(parse("type=resources").type).toBe("all");
    expect(parse("kind=resources").type).toBe("all");
  });
});

describe("serializeQuery", () => {
  it("is empty for the default", () => {
    expect(serializeQuery(DEFAULT_QUERY)).toBe("");
  });

  it("round-trips and keeps commas readable", () => {
    const query = parse("cat=hosting,database&risk=none&nocard=1&q=edge functions");
    const text = serializeQuery(query);
    expect(text).toBe("q=edge+functions&cat=hosting,database&risk=none&nocard=1");
    expect(parse(text)).toEqual(query);
  });
});

describe("applyQuery", () => {
  const items = [
    makeItem({ id: "a", title: "Alpha", domain: "hosting", haystack: "alpha hosting c++ tools" }),
    makeItem({ id: "b", title: "Beta", card: true }),
    makeItem({ id: "d", title: "Delta", status: "ended", freshness: { state: "ended" } }),
    makeItem({ id: "e", title: "Epsilon", freshness: { state: "checked", date: "2026-09-01" } }),
  ];
  const titles = (search: string) => applyQuery(items, parse(search)).map((item) => item.title);

  it("orders safest first and ended last", () => {
    expect(titles("")).toEqual(["Epsilon", "Alpha", "Beta", "Delta"]);
  });

  it("filters by card, category, and recency", () => {
    expect(titles("nocard=1")).not.toContain("Beta");
    expect(titles("cat=hosting")).toEqual(["Alpha"]);
    expect(titles("recent=1")).toEqual(["Epsilon"]);
  });

  it("treats search text literally and by words", () => {
    expect(titles("q=C%2B%2B")).toEqual(["Alpha"]);
    expect(titles("q=%20%20alpha%20%20hosting%20")).toEqual(["Alpha"]);
    expect(titles("q=(")).toEqual([]);
  });

  it("sorts A–Z, ended last", () => {
    expect(titles("sort=az")).toEqual(["Alpha", "Beta", "Epsilon", "Delta"]);
  });

  it("works on an empty list", () => {
    expect(applyQuery([], DEFAULT_QUERY)).toEqual([]);
  });

  it("ended entries never match free-tier filters", () => {
    const ended = makeItem({
      id: "z",
      title: "Zulu",
      haystack: "zulu database",
      status: "ended",
      freshness: { state: "ended" },
      card: false,
      cap: true,
      risk: "none",
    });
    const items2 = [...items, ended];
    const search = (q: string) => applyQuery(items2, parse(q)).map((item) => item.title);
    expect(search("nocard=1")).not.toContain("Zulu");
    expect(search("cap=1")).not.toContain("Zulu");
    expect(search("recent=1")).not.toContain("Zulu");
    expect(search("risk=none")).not.toContain("Zulu");
    expect(search("plan=always-free")).not.toContain("Zulu");
    expect(search("ready=side-project")).not.toContain("Zulu");
    // search text and category/type still match ended entries
    expect(search("q=zulu")).toContain("Zulu");
    expect(search("type=services")).toContain("Zulu");
  });

  it("ended entries sort last in A–Z", () => {
    const endedFirstAlphabetically = makeItem({ id: "z", title: "Aardvark", status: "ended", freshness: { state: "ended" } });
    const nonEnded = makeItem({ id: "y", title: "Zebra" });
    expect(applyQuery([endedFirstAlphabetically, nonEnded], parse("sort=az")).map((item) => item.title)).toEqual(["Zebra", "Aardvark"]);
  });
});

describe("counts and chips", () => {
  const items = [
    makeItem({ id: "a", domain: "hosting" }),
    makeItem({ id: "b", domain: "database" }),
  ];

  it("counts a facet while ignoring its own filter", () => {
    const counts = facetCounts(items, parse("cat=hosting"), "cats");
    expect(counts.get("hosting")).toBe(1);
    expect(counts.get("database")).toBe(1);
  });

  it("counts active filters and builds removable chips", () => {
    const query = parse("q=pg&cat=hosting,database&nocard=1");
    expect(activeFilterCount(query)).toBe(3);
    expect(filterChips(query)).toEqual([
      { key: "q", label: `“pg”`, patch: { q: "" } },
      { key: "cats", label: "Hosting, Database", patch: { cats: [] } },
      { key: "noCard", label: "No card", patch: { noCard: false } },
    ]);
  });

  it("toggles a value and keeps the canonical order", () => {
    expect(toggleValue(["database"], "hosting", true, ["hosting", "database"])).toEqual(["hosting", "database"]);
    expect(toggleValue(["hosting", "database"], "hosting", false, ["hosting", "database"])).toEqual(["database"]);
  });
});
