import { describe, expect, it } from "vitest";

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { chunkByProvider, readEntries, selectEntries, setLastVerified } from "../../scripts/verify/lib/entries.mjs";

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

describe("setLastVerified", () => {
  const write = (text: string) => {
    const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "ftw-")), "entry.mdx");
    fs.writeFileSync(file, text);
    return file;
  };

  it("moves the date forward and leaves the rest of the file alone", () => {
    const file = write("---\ntitle: Neon\nlastVerified: '2026-10-09'\nlastUpdated: 2026-10-09\n---\n\nBody with lastVerified: 2020-01-01 in it.\n");
    expect(setLastVerified(file, "2026-10-19")).toBe(true);
    expect(fs.readFileSync(file, "utf8")).toBe("---\ntitle: Neon\nlastVerified: 2026-10-19\nlastUpdated: 2026-10-09\n---\n\nBody with lastVerified: 2020-01-01 in it.\n");
  });

  it("keeps Windows line endings", () => {
    const file = write("---\r\nlastVerified: 2026-10-09\r\n---\r\nBody\r\n");
    expect(setLastVerified(file, "2026-10-19")).toBe(true);
    expect(fs.readFileSync(file, "utf8")).toBe("---\r\nlastVerified: 2026-10-19\r\n---\r\nBody\r\n");
  });

  it("does nothing for a same or later date, or without a date", () => {
    const same = write("---\nlastVerified: 2026-10-19\n---\n");
    expect(setLastVerified(same, "2026-10-19")).toBe(false);
    const later = write("---\nlastVerified: 2026-10-20\n---\n");
    expect(setLastVerified(later, "2026-10-19")).toBe(false);
    const none = write("---\nlastUpdated: 2026-10-09\n---\n");
    expect(setLastVerified(none, "2026-10-19")).toBe(false);
    expect(fs.readFileSync(none, "utf8")).toBe("---\nlastUpdated: 2026-10-09\n---\n");
  });
});
