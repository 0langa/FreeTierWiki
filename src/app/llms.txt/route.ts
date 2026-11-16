import { getCatalogEntries } from "@/lib/content.server";
import { llmsTxt } from "@/lib/llms-txt";
import { getNavData } from "@/lib/nav-data";

export const dynamic = "force-static";

export async function GET() {
  const entries = await getCatalogEntries();
  return new Response(llmsTxt(await getNavData(), entries.length), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
