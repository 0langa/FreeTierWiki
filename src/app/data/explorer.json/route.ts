import { BUILD_NOW } from "@/lib/build-info";
import { getCatalogEntries } from "@/lib/content.server";
import { toExplorerData, toListItem } from "@/lib/entry-view";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(toExplorerData((await getCatalogEntries()).map((entry) => toListItem(entry, BUILD_NOW))));
}
