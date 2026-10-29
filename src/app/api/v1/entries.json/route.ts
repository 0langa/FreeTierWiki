import { BUILD_DAY } from "@/lib/build-info";
import { getAllEntries } from "@/lib/content.server";
import { publicCatalog } from "@/lib/public-api";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(publicCatalog(await getAllEntries(), BUILD_DAY));
}
