import { BUILD_NOW } from "@/lib/build-info";
import { getAllEntries } from "@/lib/content.server";
import { toExplorerRow, toListItem } from "@/lib/entry-view";

export const dynamic = "force-static";

export async function GET() {
  return Response.json((await getAllEntries()).map((entry) => toExplorerRow(toListItem(entry, BUILD_NOW))));
}
