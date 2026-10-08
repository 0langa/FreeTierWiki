import { describe, expect, it } from "vitest";

import { parseComparisons, readComparisons } from "@/lib/comparisons-file";
import { listContentFiles, readEntryFile } from "@/lib/content-files";

describe("parseComparisons", () => {
  const good = { slug: "a-b", title: "T", intro: "I", entries: ["services:x", "tools:y"] };

  it("accepts a valid list", () => {
    expect(parseComparisons([good])).toEqual([good]);
  });

  it.each([
    ["bad slug", [{ ...good, slug: "A B" }], /slug/],
    ["duplicate slug", [good, good], /duplicate slug/],
    ["empty title", [{ ...good, title: " " }], /title/],
    ["one entry", [{ ...good, entries: ["services:x"] }], /at least two/],
    ["bad id", [{ ...good, entries: ["services:x", "x"] }], /services:slug/],
    ["duplicate id", [{ ...good, entries: ["services:x", "services:x"] }], /duplicate id/],
  ])("rejects %s", (_name, input, message) => {
    expect(() => parseComparisons(input)).toThrow(message);
  });
});

describe("content/comparisons.json", () => {
  it("only points at live entries", async () => {
    const live = new Set<string>();
    for (const file of await listContentFiles()) {
      const { entry } = await readEntryFile(file);
      if (entry.status !== "ended") live.add(entry.id);
    }
    const problems: string[] = [];
    for (const comparison of await readComparisons()) {
      for (const id of comparison.entries) if (!live.has(id)) problems.push(`${comparison.slug}: ${id} is missing or ended`);
    }
    expect(problems).toEqual([]);
  }, 60_000);
});
