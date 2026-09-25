import type { AtlasEntry } from "@/types/content";

export const STALE_AFTER_DAYS = 180;
const DAY_MS = 86_400_000;

export type Freshness =
  | { state: "checked" | "stale" | "imported"; date: string }
  | { state: "ended"; date?: string };

export type FreshnessState = Freshness["state"];

export function getFreshness(
  entry: Pick<AtlasEntry, "status" | "lastVerified" | "lastUpdated">,
  now: Date,
): Freshness {
  if (entry.status === "ended") return entry.lastVerified ? { state: "ended", date: entry.lastVerified } : { state: "ended" };
  if (entry.lastVerified) {
    const ageDays = (now.getTime() - Date.parse(`${entry.lastVerified}T00:00:00Z`)) / DAY_MS;
    return { state: ageDays <= STALE_AFTER_DAYS ? "checked" : "stale", date: entry.lastVerified };
  }
  return { state: "imported", date: entry.lastUpdated };
}

export function freshnessDate(freshness: Freshness): string | undefined {
  return "date" in freshness ? freshness.date : undefined;
}
