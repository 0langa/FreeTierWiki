import type { ListItem } from "@/lib/entry-view";

/** The limit line that fits one row of a narrow card: the first short one, else the first one (the card clips it). */
export function shortOffer(offer: string[], max = 40): string | undefined {
  return offer.find((part) => part.length <= max) ?? offer[0];
}

/** The most visited entries, in visit order, skipping anything that ended or no longer exists. */
export function mostVisited(paths: string[], items: ListItem[], limit: number): ListItem[] {
  const byUrl = new Map(items.map((item) => [item.url, item]));
  const out: ListItem[] = [];
  for (const path of paths) {
    const item = byUrl.get(path);
    if (item && item.status !== "ended") out.push(item);
    if (out.length === limit) break;
  }
  return out;
}
