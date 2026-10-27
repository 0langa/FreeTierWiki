import { expect, it } from "vitest";

import { listContentFiles, readEntryFile } from "@/lib/content-files";
import { entryDescription, entryTitle } from "@/lib/entry-metadata";
import { makeEntry } from "../support/fixtures";

it("keeps every catalog title and description within the editorial length budget", async () => {
  const problems: string[] = [];
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const file of await listContentFiles()) {
    const { entry } = await readEntryFile(file);
    const title = entryTitle(entry);
    const description = entryDescription(entry);
    if (title.length > 60) problems.push(`${entry.id}: title ${title.length}`);
    if (description.length < 110 || description.length > 160) problems.push(`${entry.id}: description ${description.length}`);
    if (titles.has(title) || descriptions.has(description)) problems.push(`${entry.id}: duplicate metadata`);
    titles.add(title);
    descriptions.add(description);
  }
  expect(problems).toEqual([]);
}, 60_000);

it("does not truncate qualifications in a long free-tier summary", () => {
  const entry = makeEntry();
  entry.freeTierDetails.summary = "Free for personal projects only. ".repeat(12);
  expect(entryDescription(entry)).not.toContain("...");
  expect(entryDescription(entry)).toContain("card");
});

it("keeps ended plans explicit in search previews", () => {
  const entry = makeEntry({ status: "ended" });
  expect(entryDescription(entry)).toContain("free tier has ended");
  expect(entryTitle(entry)).toContain("(ended)");
});
