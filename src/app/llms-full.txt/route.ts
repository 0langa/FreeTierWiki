import { BUILD_DAY } from "@/lib/build-info";
import { getAllEntries } from "@/lib/content.server";
import { llmsFullTxt } from "@/lib/llms-txt";

export const dynamic = "force-static";

export async function GET() {
  return new Response(llmsFullTxt(await getAllEntries(), BUILD_DAY), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
