import { BUILD_DAY } from "@/lib/build-info";
import { getCatalogEntries } from "@/lib/content.server";
import { publicCatalog } from "@/lib/public-api";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(publicCatalog(await getCatalogEntries(), BUILD_DAY));
}
