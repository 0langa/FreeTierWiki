import { BUILD_DAY } from "@/lib/build-info";
import { getAllEntries, getRemovals } from "@/lib/content.server";
import { changelogFeed } from "@/lib/feed";
import { latestChanges } from "@/lib/home-data";

export const dynamic = "force-static";

export async function GET() {
  const rows = latestChanges(await getAllEntries(), undefined, await getRemovals());
  return new Response(changelogFeed(rows, BUILD_DAY), { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
