import { describe, expect, it } from "vitest";

import { chunkByProvider, readEntries, selectEntries } from "../../scripts/verify/lib/entries.mjs";

const e = (id: string, provider: string, domain = "hosting") => ({ id, kind: "services", slug: id, file: "", data: { provider, domain } });

describe("selectEntries", () => {
  it("filters by domain or by id", () => {
    const all = [e("a", "P", "hosting"), e("b", "Q", "ai")];
    expect(selectEntries(all, { domains: ["ai"] }).map((x) => x.id)).toEqual(["b"]);
    expect(selectEntries(all, { ids: ["a"] }).map((x) => x.id)).toEqual(["a"]);
  });

  it("throws on unknown ids", () => {
    expect(() => selectEntries([e("a", "P")], { ids: ["zzz"] })).toThrow("Unknown id: zzz");
  });

  it("returns nothing for an empty id list (never everything)", () => {
    expect(selectEntries([e("a", "P")], { ids: [] })).toEqual([]);
  });
});

describe("chunkByProvider", () => {
  it("keeps a provider together and fills chunks up to the size", () => {
    const list = [e("a1", "A"), e("a2", "A"), e("b1", "B"), e("c1", "C"), e("c2", "C"), e("c3", "C")];
    expect(chunkByProvider(list, 3)).toEqual([["a1", "a2", "b1"], ["c1", "c2", "c3"]]);
  });

  it("splits a provider larger than the size", () => {
    const list = ["1", "2", "3", "4", "5"].map((n) => e(`z${n}`, "Z"));
    expect(chunkByProvider(list, 2)).toEqual([["z1", "z2"], ["z3", "z4"], ["z5"]]);
  });
});

describe("readEntries", () => {
  it("reads the real content folder", () => {
    const all = readEntries();
    expect(all.length).toBeGreaterThan(100);
    expect(all[0].id).toMatch(/^(services|tools)\//);
  });
});
