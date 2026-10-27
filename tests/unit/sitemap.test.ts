import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { changelogRoutes } from "@/lib/changelog-view";
import { getAllEntries, getComparisons, getProviderGroups, getRemovals } from "@/lib/content.server";
import { latestChanges } from "@/lib/home-data";
import { absoluteUrl } from "@/lib/links";

describe("sitemap", () => {
  it("includes every changelog archive and filter once", async () => {
    const rows = latestChanges(await getAllEntries(), undefined, await getRemovals());
    const urls = (await sitemap()).filter((item) => item.url.includes("/changelog/")).map((item) => item.url);
    expect(urls).toEqual(changelogRoutes(rows).map(({ path }) => absoluteUrl(path)));
    expect(new Set(urls).size).toBe(urls.length);
  }, 60_000);

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

  it("dates list pages by their newest entry", async () => {
    const entries = await getAllEntries();
    const lastModified = new Map((await sitemap()).map((item) => [item.url, item.lastModified]));
    const newest = (list: { lastUpdated: string }[]) => list.map((entry) => entry.lastUpdated).sort().at(-1);

    expect(lastModified.get(absoluteUrl("/category/database/"))).toBe(newest(entries.filter((entry) => entry.domain === "database")));
    const [comparison] = await getComparisons();
    expect(lastModified.get(absoluteUrl(`/compare/${comparison.slug}/`))).toBe(newest(entries.filter((entry) => comparison.entries.includes(entry.id))));
    const [group] = await getProviderGroups();
    expect(lastModified.get(absoluteUrl(`/provider/${group.slug}/`))).toBe(newest(group.entries));
    const noCardDatabase = entries.filter(
      (entry) => entry.domain === "database" && entry.status !== "ended" && entry.freeTierDetails.requiresCard === false,
    );
    expect(lastModified.get(absoluteUrl("/category/database/no-card/"))).toBe(newest(noCardDatabase));
    // A page that only lists names and counts gets no date rather than a made-up one.
    expect(lastModified.get(absoluteUrl("/about/"))).toBeUndefined();
  }, 60_000);
});
