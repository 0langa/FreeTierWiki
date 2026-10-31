import { absoluteUrl, REPO_URL } from "@/lib/links";
import { API_BASE } from "@/lib/public-api";
import type { ChangesReport, ReportEvent } from "@/lib/report-file";
import { OVERAGE_RISKS, type AtlasEntry, type OverageRisk, type PolicyConfirmation, type RemovalRecord } from "@/types/content";

export const reportPath = (report: Pick<ChangesReport, "slug">) => `/reports/${report.slug}/`;
export const reportDataPath = (report: Pick<ChangesReport, "slug">, format: "json" | "csv") => `${API_BASE}reports/${report.slug}.${format}`;

export type ReportRow = Omit<ReportEvent, "records"> & {
  /** The catalog entry page, when the service still has one. */
  entryUrl?: string;
  /** Announced but not yet in effect on the report's update day. */
  scheduled: boolean;
};

export type ReportSelection = {
  /** Provider events dated in the report year, newest first. */
  events: ReportRow[];
  /** Older provider events behind entries the site still tracks or removed. */
  earlier: ReportRow[];
  /** Removals in the report year that no provider event explains: dead sites, delistings, merges. */
  cleanup: RemovalRecord[];
  counts: { ended: number; changed: number; cleanup: number };
};

const REMOVED = "removed:";

/**
 * Splits the year's records into provider events and directory clean-up. Only an event in the report file, with
 * a vendor source, counts as ended or changed; every other removal that year is clean-up. Throws when an event
 * points at a record the site does not have, so the report cannot drift from the catalog.
 */
export function selectReportRows(report: ChangesReport, entries: AtlasEntry[], removals: RemovalRecord[]): ReportSelection {
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  const removedTitles = new Set(removals.map((removal) => removal.title));
  const claimed = new Set<string>();
  const year = String(report.year);

  const rows = report.events.map(({ records, ...event }, index): ReportRow => {
    let entryUrl: string | undefined;
    for (const record of records) {
      if (record.startsWith(REMOVED)) {
        const title = record.slice(REMOVED.length);
        if (!removedTitles.has(title)) throw new Error(`report.events[${index}]: no removal titled '${title}' in changelog.json`);
        claimed.add(title);
      } else {
        const entry = byId.get(record);
        if (!entry) throw new Error(`report.events[${index}]: no entry '${record}'`);
        entryUrl ??= entry.url;
      }
    }
    if (event.date.slice(0, 4) > year) throw new Error(`report.events[${index}]: dated after ${year}`);
    // A month-only date sorts before every day in that month, so it counts as in effect once the month starts.
    return { ...event, ...(entryUrl ? { entryUrl } : {}), scheduled: event.date > report.updated };
  });

  const newestFirst = (a: ReportRow, b: ReportRow) => b.date.localeCompare(a.date) || a.service.localeCompare(b.service);
  const events = rows.filter((row) => row.date.startsWith(year)).sort(newestFirst);
  const earlier = rows.filter((row) => !row.date.startsWith(year)).sort(newestFirst);
  const cleanup = removals.filter((removal) => removal.date.startsWith(year) && !claimed.has(removal.title));
  return {
    events,
    earlier,
    cleanup,
    counts: {
      ended: events.filter((row) => row.kind === "ended").length,
      changed: events.filter((row) => row.kind === "changed").length,
      cleanup: cleanup.length,
    },
  };
}

export const CAP_STATES = [true, "unknown", false] as const satisfies readonly PolicyConfirmation[];

export type CapRiskRow = { cap: PolicyConfirmation; total: number; byRisk: Record<OverageRisk, number> };
export type CapRiskTable = { total: number; rows: CapRiskRow[]; byRisk: Record<OverageRisk, number> };

function countByRisk(entries: AtlasEntry[]): Record<OverageRisk, number> {
  return Object.fromEntries(
    OVERAGE_RISKS.map((risk) => [risk, entries.filter((entry) => entry.freeTierDetails.overageRisk === risk).length]),
  ) as Record<OverageRisk, number>;
}

/** Live free tiers by hard cap (rows) and billing risk (columns). Ended entries have no plan left to bill. */
export function capRiskTable(entries: AtlasEntry[]): CapRiskTable {
  const live = entries.filter((entry) => entry.status !== "ended");
  return {
    total: live.length,
    rows: CAP_STATES.map((cap) => {
      const matching = live.filter((entry) => entry.freeTierDetails.hasHardCap === cap);
      return { cap, total: matching.length, byRisk: countByRisk(matching) };
    }),
    byRisk: countByRisk(live),
  };
}

const CSV_COLUMNS = ["date", "service", "provider", "kind", "change", "source", "scheduled", "section"] as const;

function csvField(value: string): string {
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

/** RFC 4180 CSV of every provider event; `section` tells the report year's rows from the earlier ones. */
export function reportCsv(report: ChangesReport, selection: ReportSelection): string {
  const sections = [
    ...selection.events.map((row) => ({ row, section: String(report.year) })),
    ...selection.earlier.map((row) => ({ row, section: "earlier" })),
  ];
  const lines = sections.map(({ row, section }) =>
    [row.date, row.service, row.provider, row.kind, row.change, row.source, String(row.scheduled), section].map(csvField).join(","),
  );
  return `${[CSV_COLUMNS.join(","), ...lines].join("\r\n")}\r\n`;
}

const publicRow = (row: ReportRow) => ({
  date: row.date,
  service: row.service,
  provider: row.provider,
  kind: row.kind,
  change: row.change,
  source: row.source,
  scheduled: row.scheduled,
  entryUrl: row.entryUrl ? absoluteUrl(row.entryUrl) : null,
});

/** The report's data as one JSON file, with the same numbers the page shows. */
export function reportJson(report: ChangesReport, selection: ReportSelection, capRisk: CapRiskTable) {
  return {
    version: 1,
    title: report.title,
    url: absoluteUrl(reportPath(report)),
    published: report.published,
    updated: report.updated,
    license: "MIT",
    source: REPO_URL,
    counts: selection.counts,
    events: selection.events.map(publicRow),
    earlier: selection.earlier.map(publicRow),
    hardCapVsBillingRisk: {
      total: capRisk.total,
      rows: capRisk.rows.map((row) => ({ hardCap: row.cap, total: row.total, ...row.byRisk })),
    },
  };
}
