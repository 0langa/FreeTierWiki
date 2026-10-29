import { OPENAPI } from "@/lib/public-api";

export const dynamic = "force-static";

export function GET() {
  return Response.json(OPENAPI);
}
