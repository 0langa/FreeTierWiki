import fs from "node:fs/promises";
import path from "node:path";

import { SITE_URL } from "@/lib/links";

export const CHANGES_REPORT_FILE = path.join(process.cwd(), "content", "reports", "free-tier-changes-2026.json");

export const REPORT_EVENT_KINDS = ["ended", "changed"] as const;
export type ReportEventKind = (typeof REPORT_EVENT_KINDS)[number];

/**
 * One provider event: a free tier ended or changed, with the vendor's own page as the source.
 * `records` ties the event to the site's data: entry ids (`services:slug`) or removed titles (`removed:Title`)
 * from content/changelog.json. A removal that no event claims counts as directory clean-up.
 */
export type ReportEvent = {
  date: string;
  service: string;
  provider: string;
  kind: ReportEventKind;
  change: string;
  source: string;
  records: string[];
};

export type ChangesReport = {
  slug: string;
  title: string;
  year: number;
  published: string;
  updated: string;
  events: ReportEvent[];
};

const DAY = /^\d{4}-\d{2}-\d{2}$/;
// Some vendors announce only the month a change took effect.
const DAY_OR_MONTH = /^\d{4}-\d{2}(-\d{2})?$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RECORD = /^(?:(?:services|tools):[a-z0-9]+(?:-[a-z0-9]+)*|removed:.+)$/;

function isRealDate(value: string, pattern: RegExp = DAY): boolean {
  if (!pattern.test(value)) return false;
  const day = value.length === 7 ? `${value}-01` : value;
  const parsed = new Date(`${day}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === day;
}

function text(record: Record<string, unknown>, key: string, where: string): string {
  const value = record[key];
  if (typeof value !== "string" || !value.trim()) throw new Error(`${where}: '${key}' is required`);
  return value.trim();
}

/** A vendor page: https, and never this site, since the report cites providers rather than itself. */
function isVendorSource(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname !== new URL(SITE_URL).hostname;
  } catch {
    return false;
  }
}

/** Validates the report file. Throws with the event index so a bad edit fails the build loudly. */
export function parseChangesReport(data: unknown): ChangesReport {
  const report = data && typeof data === "object" && !Array.isArray(data) ? (data as Record<string, unknown>) : undefined;
  if (!report) throw new Error("report: expected an object");
  const slug = text(report, "slug", "report");
  if (!SLUG.test(slug)) throw new Error("report: 'slug' must be lowercase words joined by '-'");
  const title = text(report, "title", "report");
  if (typeof report.year !== "number" || !Number.isInteger(report.year)) throw new Error("report: 'year' must be a whole number");
  const published = text(report, "published", "report");
  const updated = text(report, "updated", "report");
  if (!isRealDate(published) || !isRealDate(updated)) throw new Error("report: 'published' and 'updated' must be real YYYY-MM-DD dates");
  if (updated < published) throw new Error("report: 'updated' is before 'published'");
  if (!Array.isArray(report.events)) throw new Error("report: 'events' must be a list");

  const events = report.events.map((raw, index): ReportEvent => {
    const event = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
    const where = `report.events[${index}]`;
    const date = text(event, "date", where);
    if (!isRealDate(date, DAY_OR_MONTH)) throw new Error(`${where}: 'date' must be a real YYYY-MM-DD or YYYY-MM date`);
    if (!(REPORT_EVENT_KINDS as readonly unknown[]).includes(event.kind)) throw new Error(`${where}: 'kind' must be one of: ${REPORT_EVENT_KINDS.join(", ")}`);
    const source = text(event, "source", where);
    if (!isVendorSource(source)) throw new Error(`${where}: 'source' must be an https link to the vendor's own page`);
    if (!Array.isArray(event.records) || event.records.length === 0) throw new Error(`${where}: 'records' needs at least one entry id or removed title`);
    const records = event.records.map((record, i) => {
      if (typeof record !== "string" || !RECORD.test(record)) throw new Error(`${where}.records[${i}]: expected 'services:slug', 'tools:slug' or 'removed:Title'`);
      return record;
    });
    return {
      date,
      service: text(event, "service", where),
      provider: text(event, "provider", where),
      kind: event.kind as ReportEventKind,
      change: text(event, "change", where),
      source,
      records,
    };
  });
  return { slug, title, year: report.year, published, updated, events };
}

export async function readChangesReport(file: string = CHANGES_REPORT_FILE): Promise<ChangesReport> {
  return parseChangesReport(JSON.parse(await fs.readFile(file, "utf8")));
}
