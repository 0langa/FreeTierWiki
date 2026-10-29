import { getAllEntries } from "@/lib/content.server";
import { llmsTxt } from "@/lib/llms-txt";
import { getNavData } from "@/lib/nav-data";

export const dynamic = "force-static";

export async function GET() {
  const live = (await getAllEntries()).filter((entry) => entry.status !== "ended");
  return new Response(llmsTxt(await getNavData(), live.length), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
