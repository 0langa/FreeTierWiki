import { getAllEntries } from "@/lib/content.server";
import type { SearchRecord } from "@/types/content";

export const dynamic = "force-static";

export async function GET() {
  const records: SearchRecord[] = (await getAllEntries()).map((entry) => ({
    id: entry.id,
    url: entry.url,
    title: entry.title,
    provider: entry.provider,
    domain: entry.domain,
    description: entry.description,
    tags: entry.tags,
  }));
  return Response.json(records);
}
