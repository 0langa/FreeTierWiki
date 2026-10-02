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

  it("risk and plan fields agree with each other", async () => {
    const problems: string[] = [];
    for (const file of await listContentFiles()) {
      const { entry } = await readEntryFile(file);
      const { requiresCard, overageRisk, hasHardCap, freeTierType } = entry.freeTierDetails;
      // "none" means you cannot be billed, which is impossible with a card on file.
      if (overageRisk === "none" && requiresCard) problems.push(`${entry.id}: overageRisk none with requiresCard`);
      // "high" means billing starts on its own; a hard cap stops the service instead.
      if (overageRisk === "high" && hasHardCap) problems.push(`${entry.id}: overageRisk high with hasHardCap`);
      if (freeTierType === "trial" && entry.pricingModel !== "trial") {
        problems.push(`${entry.id}: freeTierType trial but pricingModel ${entry.pricingModel}`);
      }
    }
    expect(problems).toEqual([]);
  }, 60_000);

  it("every entry has real search tags", async () => {
    const problems: string[] = [];
    for (const file of await listContentFiles()) {
      const { entry } = await readEntryFile(file);
      // Tags only feed search; "misc" matched everything and helped nothing.
      if (entry.tags.length === 0) problems.push(`${entry.id}: no tags`);
      if (entry.tags.includes("misc")) problems.push(`${entry.id}: tag misc`);
    }
    expect(problems).toEqual([]);
  }, 60_000);
});
