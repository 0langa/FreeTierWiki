import { capRiskTable, reportJson, selectReportRows } from "@/lib/changes-report";
import { getAllEntries, getChangesReport, getRemovals } from "@/lib/content.server";

export const dynamic = "force-static";

export async function GET() {
  const [report, entries, removals] = [await getChangesReport(), await getAllEntries(), await getRemovals()];
  return Response.json(reportJson(report, selectReportRows(report, entries, removals), capRiskTable(entries)));
}
