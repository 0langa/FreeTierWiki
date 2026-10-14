import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { getAllEntries } from "@/lib/content.server";
import { absoluteUrl } from "@/lib/links";

describe("sitemap", () => {
  it("dates each entry by its last content change, not by the weekly check", async () => {
    const entries = await getAllEntries();
    const lastModified = new Map((await sitemap()).map((item) => [item.url, item.lastModified]));

    // Entries the weekly check confirmed after their last edit: lastVerified is newer than lastUpdated.
    const confirmed = entries.filter((entry) => entry.lastVerified && entry.lastVerified > entry.lastUpdated);
    expect(confirmed.length).toBeGreaterThan(0);

    const problems = entries
      .filter((entry) => lastModified.get(absoluteUrl(entry.url)) !== entry.lastUpdated)
      .map((entry) => `${entry.id}: ${String(lastModified.get(absoluteUrl(entry.url)))} instead of ${entry.lastUpdated}`);
    expect(problems).toEqual([]);
  }, 60_000);
});
