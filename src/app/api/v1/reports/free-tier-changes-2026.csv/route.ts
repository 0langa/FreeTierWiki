import { reportCsv, selectReportRows } from "@/lib/changes-report";
import { getAllEntries, getChangesReport, getRemovals } from "@/lib/content.server";

export const dynamic = "force-static";

export async function GET() {
  const report = await getChangesReport();
  const csv = reportCsv(report, selectReportRows(report, await getAllEntries(), await getRemovals()));
  return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8" } });
}
