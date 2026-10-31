import { describe, expect, it } from "vitest";

import { ContentError } from "@/lib/content-schema";
import { listContentFiles, readEntryFile } from "@/lib/content-files";
import type { AtlasEntry } from "@/types/content";
import { makeEntry } from "../support/fixtures";

function riskProblems(entry: AtlasEntry): string[] {
  const problems: string[] = [];
  const { requiresCard, overageRisk, hasHardCap, freeTierType } = entry.freeTierDetails;
  // "none" means you cannot be billed, which is impossible with a card on file.
  if (overageRisk === "none" && requiresCard === true) problems.push(`${entry.id}: overageRisk none with requiresCard`);
  // No-risk credits and trials need a confirmed stopping cap; always-free offers can have no paid overage.
  if (overageRisk === "none" && hasHardCap !== true && freeTierType !== "always-free") {
    problems.push(`${entry.id}: overageRisk none without a hard cap or an always-free plan`);
  }
  if (overageRisk === "high" && hasHardCap === true) problems.push(`${entry.id}: overageRisk high with hasHardCap`);
  return problems;
}

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
      problems.push(...riskProblems(entry));
    }
    expect(problems).toEqual([]);
  }, 60_000);

  it("rejects no-risk trials whose stopping cap is unconfirmed", () => {
    const base = makeEntry();
    const trial = makeEntry({
      freeTierDetails: { ...base.freeTierDetails, freeTierType: "trial", hasHardCap: "unknown", overageRisk: "none" },
    });
    expect(riskProblems(trial)).toEqual(["services:neon: overageRisk none without a hard cap or an always-free plan"]);
    expect(riskProblems({ ...trial, freeTierDetails: { ...trial.freeTierDetails, hasHardCap: true } })).toEqual([]);
    expect(riskProblems({ ...trial, freeTierDetails: { ...trial.freeTierDetails, overageRisk: "low" } })).toEqual([]);
  });

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
