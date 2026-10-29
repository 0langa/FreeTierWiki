import { describe, expect, it } from "vitest";

import { GET as csvRoute } from "@/app/api/v1/reports/free-tier-changes-2026.csv/route";
import { GET as jsonRoute } from "@/app/api/v1/reports/free-tier-changes-2026.json/route";
import { capRiskTable, reportCsv, reportJson, selectReportRows } from "@/lib/changes-report";
import { getAllEntries, getRemovals } from "@/lib/content.server";
import { parseChangesReport, readChangesReport, type ChangesReport, type ReportEvent } from "@/lib/report-file";
import type { RemovalRecord } from "@/types/content";

import { makeEntry } from "../support/fixtures";

const removal = (title: string, date = "2026-09-28", note = "The product's website no longer works."): RemovalRecord => ({
  date, kind: "removed", title, category: "devops", note,
});

const event = (overrides: Partial<ReportEvent> = {}): ReportEvent => ({
  date: "2026-06-01",
  service: "Cirrus CI",
  provider: "Cirrus Labs",
  kind: "ended",
  change: "The hosted CI service shut down.",
  source: "https://cirrus-ci.org/blog/",
  records: ["removed:Cirrus CI"],
  ...overrides,
});

const report = (events: ReportEvent[], overrides: Partial<ChangesReport> = {}): ChangesReport => ({
  slug: "free-tier-changes-2026",
  title: "Free tiers that ended or changed in 2026",
  year: 2026,
  published: "2026-10-29",
  updated: "2026-10-29",
  events,
  ...overrides,
});

describe("selectReportRows", () => {
  it("counts only sourced provider events as ended or changed, and every other removal that year as clean-up", () => {
    const removals = [removal("Cirrus CI", "2026-06-01", "Cirrus CI shut down."), removal("Temptr"), removal("Dafont", "2026-09-27", "A font download site.")];
    const entries = [makeEntry({ id: "tools:tugboat", url: "/tools/tugboat/", status: "ended" })];
    const selection = selectReportRows(
      report([event(), event({ service: "Tugboat", kind: "changed", date: "2026-10", records: ["tools:tugboat"] })]),
      entries,
      removals,
    );
    expect(selection.events.map((row) => row.service)).toEqual(["Tugboat", "Cirrus CI"]);
    expect(selection.cleanup.map((row) => row.title)).toEqual(["Temptr", "Dafont"]);
    expect(selection.counts).toEqual({ ended: 1, changed: 1, cleanup: 2 });
  });

  it("keeps a removal that looks like a shutdown out of the counts when no event claims it", () => {
    const selection = selectReportRows(report([]), [], [removal("Webhook-test.com", "2026-09-28", "The service has shut down.")]);
    expect(selection.events).toEqual([]);
    expect(selection.counts).toEqual({ ended: 0, changed: 0, cleanup: 1 });
  });

  it("lets one provider event claim several removals", () => {
    const aws = event({ date: "2025-07-15", service: "AWS Free Tier", records: ["removed:EC2", "removed:S3"] });
    const selection = selectReportRows(report([aws]), [], [removal("EC2", "2026-09-26"), removal("S3", "2026-09-26"), removal("Temptr")]);
    expect(selection.cleanup.map((row) => row.title)).toEqual(["Temptr"]);
  });

  it("moves events from before the report year to the earlier list, and ignores older removals", () => {
    const selection = selectReportRows(
      report([event({ date: "2024-04-08", service: "PlanetScale", records: ["removed:PlanetScale"] }), event()]),
      [],
      [removal("PlanetScale", "2024-04-08"), removal("Cirrus CI", "2026-06-01"), removal("StatHat", "2025-12-01")],
    );
    expect(selection.events.map((row) => row.service)).toEqual(["Cirrus CI"]);
    expect(selection.earlier.map((row) => row.service)).toEqual(["PlanetScale"]);
    expect(selection.counts.cleanup).toBe(0);
  });

  it("links a row to the catalog entry and marks changes that have not taken effect yet", () => {
    const entries = [makeEntry({ id: "services:azure-maps", url: "/services/azure-maps/" })];
    const [row] = selectReportRows(report([event({ date: "2026-12-01", records: ["services:azure-maps"] })]), entries, []).events;
    expect(row).toMatchObject({ entryUrl: "/services/azure-maps/", scheduled: true });
    const [monthOnly] = selectReportRows(report([event({ date: "2026-10", records: ["services:azure-maps"] })]), entries, []).events;
    expect(monthOnly.scheduled).toBe(false);
  });

  it("fails when an event points at a record the site does not have", () => {
    expect(() => selectReportRows(report([event()]), [], [])).toThrow("report.events[0]: no removal titled 'Cirrus CI'");
    expect(() => selectReportRows(report([event({ records: ["tools:missing"] })]), [], [])).toThrow("report.events[0]: no entry 'tools:missing'");
    expect(() => selectReportRows(report([event({ date: "2027-01-01" })]), [], [removal("Cirrus CI")])).toThrow("dated after 2026");
  });
});

describe("parseChangesReport", () => {
  const good = report([event()]);

  it("parses a valid report", () => {
    expect(parseChangesReport(good)).toEqual(good);
  });

  it("requires a vendor source on every event", () => {
    expect(() => parseChangesReport({ ...good, events: [{ ...event(), source: "http://cirrus-ci.org/" }] })).toThrow("report.events[0]: 'source'");
    expect(() => parseChangesReport({ ...good, events: [{ ...event(), source: "https://freetier.wiki/changelog/" }] })).toThrow("'source'");
    expect(() => parseChangesReport({ ...good, events: [{ ...event(), source: undefined }] })).toThrow("'source' is required");
  });

  it("names the bad event", () => {
    expect(() => parseChangesReport({ ...good, events: [event(), { ...event(), date: "2026-02-30" }] })).toThrow("report.events[1]: 'date'");
    expect(() => parseChangesReport({ ...good, events: [{ ...event(), kind: "removed" }] })).toThrow("'kind'");
    expect(() => parseChangesReport({ ...good, events: [{ ...event(), records: [] }] })).toThrow("'records'");
    expect(() => parseChangesReport({ ...good, events: [{ ...event(), records: ["Cirrus CI"] }] })).toThrow("records[0]");
  });

  it("accepts a month when the vendor gives no day", () => {
    expect(parseChangesReport({ ...good, events: [event({ date: "2026-06" })] }).events[0].date).toBe("2026-06");
  });
});

describe("capRiskTable", () => {
  it("cross-tabulates live entries by hard cap and billing risk", () => {
    const entry = (cap: boolean | "unknown", risk: "none" | "low" | "medium" | "high", status: "active" | "ended" = "active") =>
      makeEntry({ status, freeTierDetails: { ...makeEntry().freeTierDetails, hasHardCap: cap, overageRisk: risk } });
    const table = capRiskTable([entry(true, "none"), entry(true, "low"), entry(false, "medium"), entry("unknown", "low"), entry(false, "high", "ended")]);
    expect(table.total).toBe(4);
    expect(table.rows.map((row) => [row.cap, row.total])).toEqual([[true, 2], ["unknown", 1], [false, 1]]);
    expect(table.rows[2].byRisk).toEqual({ none: 0, low: 0, medium: 1, high: 0 });
    expect(table.byRisk).toEqual({ none: 1, low: 2, medium: 1, high: 0 });
  });
});

describe("reportCsv", () => {
  it("quotes fields with commas and quotes, and labels each row's section", () => {
    const selection = selectReportRows(
      report([event({ change: 'Shut down, "for good".' }), event({ date: "2024-04-08", service: "PlanetScale", records: ["removed:PlanetScale"] })]),
      [],
      [removal("Cirrus CI"), removal("PlanetScale", "2024-04-08")],
    );
    const lines = reportCsv(report([]), selection).split("\r\n");
    expect(lines[0]).toBe("date,service,provider,kind,change,source,scheduled,section");
    expect(lines[1]).toBe('2026-06-01,Cirrus CI,Cirrus Labs,ended,"Shut down, ""for good"".",https://cirrus-ci.org/blog/,false,2026');
    expect(lines[2]).toMatch(/,earlier$/);
    expect(lines.at(-1)).toBe("");
  });
});

describe("the real report", () => {
  it("resolves every event against the catalog and changelog, each with a vendor source", async () => {
    const real = await readChangesReport();
    const selection = selectReportRows(real, await getAllEntries(), await getRemovals());
    expect(selection.events.length).toBeGreaterThan(0);
    expect(selection.counts.ended + selection.counts.changed).toBe(selection.events.length);
    for (const row of [...selection.events, ...selection.earlier]) expect(row.source, row.service).toMatch(/^https:\/\//);
    expect(new Set(real.events.map((row) => `${row.service} ${row.date}`)).size).toBe(real.events.length);
  }, 60_000);

  it("serves the same rows as CSV and JSON", async () => {
    const json = (await (await jsonRoute()).json()) as ReturnType<typeof reportJson>;
    const csv = await (await csvRoute()).text();
    expect(csv.trim().split("\r\n")).toHaveLength(1 + json.events.length + json.earlier.length);
    expect(json.counts.ended + json.counts.changed).toBe(json.events.length);
    expect(json.hardCapVsBillingRisk.rows.reduce((sum, row) => sum + row.total, 0)).toBe(json.hardCapVsBillingRisk.total);
  }, 60_000);
});
