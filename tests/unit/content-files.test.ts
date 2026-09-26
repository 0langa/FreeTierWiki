import { describe, expect, it } from "vitest";

import { ContentError } from "@/lib/content-schema";
import { listContentFiles, readEntryFile } from "@/lib/content-files";

describe("content files", () => {
  it("every file in content/ parses, and titles are unique", async () => {
    const files = await listContentFiles();
    expect(files.length).toBeGreaterThan(100);

    const problems: string[] = [];
    const titles = new Map<string, string>();
    for (const file of files) {
      try {
        const { entry } = await readEntryFile(file);
        const key = entry.title.toLowerCase();
        const other = titles.get(key);
        if (other) problems.push(`${entry.id}: same title as ${other}`);
        titles.set(key, entry.id);
      } catch (error) {
        problems.push(error instanceof ContentError ? error.message : `${file}: ${String(error)}`);
      }
    }

    expect(problems).toEqual([]);
  }, 60_000);
});
