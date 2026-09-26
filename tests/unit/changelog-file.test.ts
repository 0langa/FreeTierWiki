import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { CHANGELOG_FILE, parseRemovals, readRemovals } from "@/lib/changelog-file";

const good = { date: "2024-04-08", kind: "removed", title: "PlanetScale", category: "database", note: "The free Hobby plan ended." };

describe("parseRemovals", () => {
  it("parses valid records", () => {
    expect(parseRemovals([good])).toEqual([good]);
  });

  it("names the bad record", () => {
    expect(() => parseRemovals([good, { ...good, category: "space" }])).toThrow("changelog.json[1]: 'category'");
    expect(() => parseRemovals([{ ...good, date: "2024-02-30" }])).toThrow("changelog.json[0]: 'date'");
    expect(() => parseRemovals([{ ...good, kind: "ended" }])).toThrow("changelog.json[0]: 'kind'");
    expect(() => parseRemovals([{ ...good, note: " " }])).toThrow("changelog.json[0]: 'note'");
  });

  it("rejects a non-list", () => {
    expect(() => parseRemovals({})).toThrow("expected a list");
  });
});

describe("readRemovals", () => {
  it("treats a missing file as empty", async () => {
    expect(await readRemovals(path.join(os.tmpdir(), "freetier-missing-changelog.json"))).toEqual([]);
  });

  it("reads the real file", async () => {
    expect(fs.existsSync(CHANGELOG_FILE)).toBe(true);
    await expect(readRemovals()).resolves.toBeInstanceOf(Array);
  });
});
