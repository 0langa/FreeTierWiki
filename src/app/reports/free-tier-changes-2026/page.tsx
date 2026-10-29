import type { Metadata } from "next";
import Link from "next/link";

import { ChangePill } from "@/components/entry/labels";
import { JsonLd } from "@/components/site/json-ld";
import { PageHeader } from "@/components/site/page-header";
import { capRiskTable, reportDataPath, reportPath, selectReportRows, type CapRiskTable, type ReportRow } from "@/lib/changes-report";
import { OVERAGE_RISK_LABELS } from "@/lib/content";
import { getAllEntries, getChangesReport, getRemovals } from "@/lib/content.server";
import { formatDay, formatMonth } from "@/lib/format";
import { absoluteUrl, REPO_URL } from "@/lib/links";
import { OPEN_GRAPH, pageUrl } from "@/lib/metadata";
import { article, PUBLISHER } from "@/lib/structured-data";
import { OVERAGE_RISKS, type PolicyConfirmation } from "@/types/content";

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

const formatDate = (date: string) => (date.length === 7 ? formatMonth(date) : formatDay(date));
const sourceSite = (url: string) => new URL(url).hostname.replace(/^www\./, "");
const CAP_LABELS: Record<string, string> = { true: "Hard cap", unknown: "Not confirmed", false: "No hard cap" };
const capLabel = (cap: PolicyConfirmation) => CAP_LABELS[String(cap)];

async function load() {
  const [report, entries, removals] = [await getChangesReport(), await getAllEntries(), await getRemovals()];
  return { report, selection: selectReportRows(report, entries, removals), capRisk: capRiskTable(entries) };
}

function summary({ report, selection, capRisk }: Awaited<ReturnType<typeof load>>): string {
  const { ended, changed, cleanup } = selection.counts;
  const capped = capRisk.rows.find((row) => row.cap === true)?.total ?? 0;
  const billed = capRisk.byRisk.medium + capRisk.byRisk.high;
  return (
    `As of ${formatDay(report.updated)}, ${ended} free tiers ended and ${changed} changed in ${report.year}. `
    + "Each one is confirmed on the provider's own site, and the row links to that page. "
    + `Another ${cleanup} listings left the directory this year without a vendor-confirmed event, mostly dead websites, offers with no real free amount, and duplicates. They are not counted here. `
    + `Of the ${capRisk.total} free tiers still listed, ${capped} stop at the free limit and ${billed} carry a medium or high billing risk.`
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await load();
  const path = reportPath(data.report);
  return {
    title: data.report.title,
    description: summary(data).split(". ").slice(0, 2).join(". ").concat("."),
    ...pageUrl(path),
    openGraph: { ...OPEN_GRAPH, type: "article", url: path, publishedTime: data.report.published, modifiedTime: data.report.updated },
  };
}

function Section({ id, title, lede, children }: { id: string; title: string; lede?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="section-title">{title}</h2>
      {lede ? <p className="mt-2 max-w-[68ch] text-[14.5px] leading-relaxed text-ink-2">{lede}</p> : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Stat({ value, label, note }: { value: number; label: string; note: string }) {
  return (
    <div className="px-3 py-4 sm:px-5">
      <p className="font-mono text-[24px] font-semibold leading-none tracking-tight sm:text-[28px]">{value}</p>
      <p className="mt-2 text-[13.5px] font-semibold leading-snug sm:text-[14.5px]">{label}</p>
      {/* Phones get the numbers in one row; the summary above already says what each one means. */}
      <p className="mt-0.5 hidden text-[13px] leading-snug text-ink-3 sm:block">{note}</p>
    </div>
  );
}

const EVENT_COLS = "lg:grid-cols-[120px_minmax(160px,220px)_1fr_minmax(150px,200px)]";

function EventTable({ rows, label }: { rows: ReportRow[]; label: string }) {
  return (
    <div role="table" aria-label={label} className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
      <div role="row" className={`hidden h-10 items-center gap-4 bg-surface-2 px-5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-ink-3 lg:grid ${EVENT_COLS}`}>
        <span role="columnheader">Date</span>
        <span role="columnheader">Service</span>
        <span role="columnheader">What changed</span>
        <span role="columnheader">Source</span>
      </div>
      {rows.map((row) => (
        <div key={`${row.service}-${row.date}`} role="row" data-kind={row.kind} className={`grid gap-1 px-4 py-4 lg:items-baseline lg:gap-4 lg:px-5 ${EVENT_COLS}`}>
          <span role="cell" className="font-mono text-xs font-medium text-ink-3">
            {formatDate(row.date)}
            {row.scheduled ? <span className="ml-1.5 text-warn">(scheduled)</span> : null}
          </span>
          <span role="cell" className="flex flex-wrap items-center gap-2">
            <span className="text-[15.5px] font-semibold leading-snug">
              {row.entryUrl ? <Link href={row.entryUrl} className="hover:underline">{row.service}</Link> : row.service}
            </span>
            <ChangePill kind={row.kind} />
          </span>
          <span role="cell" className="text-[14.5px] leading-relaxed text-ink-2">{row.change}</span>
          <span role="cell" className="min-w-0 text-[13.5px]">
            <a href={row.source} {...EXTERNAL} className="break-words text-ink-2 underline underline-offset-[3px] hover:text-ink">
              {sourceSite(row.source)}
            </a>
          </span>
        </div>
      ))}
    </div>
  );
}

function CapRiskGrid({ table }: { table: CapRiskTable }) {
  const cols = "grid-cols-[minmax(0,1.6fr)_repeat(5,minmax(0,1fr))]";
  const cell = "text-right font-mono tabular-nums";
  return (
    <div role="table" aria-label="Hard cap against billing risk" className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface text-[14px]">
      <div role="row" className={`grid ${cols} items-center gap-2 bg-surface-2 px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-ink-3 sm:gap-4 sm:px-5`}>
        <span role="columnheader">Cap</span>
        {OVERAGE_RISKS.map((risk) => (
          <span key={risk} role="columnheader" className="text-right">{OVERAGE_RISK_LABELS[risk]}</span>
        ))}
        <span role="columnheader" className="text-right">All</span>
      </div>
      {table.rows.map((row) => (
        <div key={String(row.cap)} role="row" className={`grid ${cols} items-center gap-2 px-4 py-3 sm:gap-4 sm:px-5`}>
          <span role="cell" className="font-medium">{capLabel(row.cap)}</span>
          {OVERAGE_RISKS.map((risk) => (
            <span key={risk} role="cell" className={`${cell} ${row.byRisk[risk] === 0 ? "text-ink-3" : ""}`}>{row.byRisk[risk]}</span>
          ))}
          <span role="cell" className={`${cell} font-semibold`}>{row.total}</span>
        </div>
      ))}
      <div role="row" className={`grid ${cols} items-center gap-2 bg-surface-2 px-4 py-3 sm:gap-4 sm:px-5`}>
        <span role="cell" className="font-medium">All</span>
        {OVERAGE_RISKS.map((risk) => (
          <span key={risk} role="cell" className={`${cell} font-semibold`}>{table.byRisk[risk]}</span>
        ))}
        <span role="cell" className={`${cell} font-semibold`}>{table.total}</span>
      </div>
    </div>
  );
}

export default async function ChangesReportPage() {
  const data = await load();
  const { report, selection, capRisk } = data;
  const path = reportPath(report);
  const csvPath = reportDataPath(report, "csv");
  const jsonPath = reportDataPath(report, "json");
  const description = summary(data);
  const earlierYears = [...new Set(selection.earlier.map((row) => row.date.slice(0, 4)))].sort();
  const citation = `freetier.wiki. “${report.title}.” Updated ${formatDay(report.updated)}. ${absoluteUrl(path)}`;

  return (
    <article className="max-w-5xl">
      <PageHeader
        crumbs={[{ href: "/changelog/", label: "Changelog" }]}
        current={`${report.year} report`}
        title={report.title}
        lede={description}
        note={<>Updated <time dateTime={report.updated}>{formatDay(report.updated)}</time> · First published <time dateTime={report.published}>{formatDay(report.published)}</time></>}
      >
        <div className="flex flex-wrap gap-2">
          <a href={csvPath} download className="btn h-9 px-3 text-[13.5px]">Download CSV</a>
          <a href={jsonPath} className="btn h-9 px-3 text-[13.5px]">JSON</a>
        </div>
      </PageHeader>
      <JsonLd graph={[
        { ...article(path, report.title, description, report.updated), datePublished: report.published, author: PUBLISHER },
        {
          "@type": "Dataset",
          "@id": absoluteUrl(`${path}#dataset`),
          name: report.title,
          description,
          url: absoluteUrl(path),
          datePublished: report.published,
          dateModified: report.updated,
          temporalCoverage: String(report.year),
          isAccessibleForFree: true,
          license: "https://opensource.org/license/mit",
          creator: PUBLISHER,
          distribution: [
            { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: absoluteUrl(csvPath) },
            { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: absoluteUrl(jsonPath) },
          ],
        },
      ]} />

      <div className="tile-grid mt-8 grid-cols-3">
        <Stat value={selection.counts.ended} label="Ended" note="Free tier or service gone, or closed to new users" />
        <Stat value={selection.counts.changed} label="Changed" note="Free tier cut back or turned into credits or a trial" />
        <Stat value={selection.counts.cleanup} label="Removed from the directory" note="No vendor-confirmed event, mostly dead sites and duplicates. Not counted." />
      </div>

      <Section id="events" title={`What changed in ${report.year}`} lede="Newest first. Dates are when the change took effect, from the linked source.">
        <EventTable rows={selection.events} label={`Free tier changes in ${report.year}`} />
      </Section>

      <Section
        id="hard-cap"
        title="Hard cap vs surprise bill"
        lede={<>Every free tier still listed, by whether usage stops at the free limit and how likely it is to cost money. The labels are explained in <Link href="/about/" className="underline underline-offset-[3px]">how we rate</Link>.</>}
      >
        <CapRiskGrid table={capRisk} />
        <p className="mt-3 text-[13.5px] text-ink-3">
          See the lists of <Link href="/hard-cap/" className="underline underline-offset-[3px]">free tiers with a hard cap</Link> and{" "}
          <Link href="/no-card/" className="underline underline-offset-[3px]">free tiers that need no card</Link>.
        </p>
      </Section>

      {selection.earlier.length > 0 ? (
        <Section
          id="earlier"
          title={`Earlier changes (${earlierYears[0]}${earlierYears.length > 1 ? `–${earlierYears.at(-1)}` : ""})`}
          lede={`Older events behind entries the directory changed or removed. They are not in the ${report.year} counts.`}
        >
          <EventTable rows={selection.earlier} label="Earlier free tier changes" />
        </Section>
      ) : null}

      <Section id="method" title="How this was checked">
        <ul className="grid max-w-[68ch] list-disc gap-2 pl-5 text-[15px] leading-relaxed text-ink-2 marker:text-ink-3">
          <li>Started from the site&apos;s own records: every listing removed in {report.year} and the change notes on every entry.</li>
          <li>Kept a row only when the provider&apos;s own announcement, docs, pricing page or official repository confirms it. A delisting alone does not count.</li>
          <li>Left out events with no vendor source rather than guessing.</li>
          <li>The cap and risk figures are each entry&apos;s current data on the build day.</li>
        </ul>
        <p className="mt-4 text-[14px] text-ink-3">
          Every removal is in the <Link href="/changelog/removed/" className="underline underline-offset-[3px]">changelog</Link>. Spotted a mistake?{" "}
          <a href={`${REPO_URL}/issues/new`} {...EXTERNAL} className="underline underline-offset-[3px]">Open an issue</a>.
        </p>
      </Section>

      <Section id="cite" title="Cite this page">
        <p className="max-w-[68ch] rounded-xl border border-line bg-surface-2 px-4 py-3 text-[14px] leading-relaxed text-ink-2">{citation}</p>
        <p className="mt-3 text-[13.5px] text-ink-3">The data is MIT licensed. Download it as <a href={csvPath} download className="underline underline-offset-[3px]">CSV</a> or <a href={jsonPath} className="underline underline-offset-[3px]">JSON</a>.</p>
      </Section>
    </article>
  );
}
