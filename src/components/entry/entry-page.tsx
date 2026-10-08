import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { EntryList } from "@/components/entry/entry-list";
import { FactsLabel } from "@/components/entry/facts-label";
import { FreshnessNotice } from "@/components/entry/freshness-notice";
import { MdxContent } from "@/components/entry/mdx-content";
import { BUILD_NOW } from "@/lib/build-info";
import { jobLabel } from "@/lib/comparison-view";
import type { Comparison } from "@/lib/comparisons-file";
import { DOMAIN_LABELS } from "@/lib/content";
import { pricingUrl, type ListItem } from "@/lib/entry-view";
import { getFreshness } from "@/lib/freshness";
import { reportUrl } from "@/lib/links";
import type { AtlasEntryWithBody } from "@/types/content";

function FitCard({ title, text, items, good }: { title: string; text: string; items: string[]; good: boolean }) {
  return (
    <div className={`rounded-xl border border-line border-l-[3px] bg-surface px-[18px] py-4 ${good ? "border-l-risk-none" : "border-l-risk-med"}`}>
      <h3 className="mb-1.5 text-sm font-semibold">{title}</h3>
      <p className="text-sm text-ink-2">{text}</p>
      {items.length > 0 ? (
        <ul className="mt-2 list-disc pl-[18px] text-sm text-ink-2">
          {items.map((item, index) => (
            <li key={`${index}-${item}`}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

export function EntryPage({ entry, related, comparisons = [] }: { entry: AtlasEntryWithBody; related: ListItem[]; comparisons?: Comparison[] }) {
  const freshness = getFreshness(entry, BUILD_NOW);
  const pricing = pricingUrl(entry);
  const category = DOMAIN_LABELS[entry.domain];
  const ended = entry.status === "ended";
  // A deepened body brings its own "##" sections; an older one-sentence body gets the "Overview" heading.
  const sectioned = /^##\s/m.test(entry.body.raw);

  return (
    <div className="grid gap-6 pt-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-x-12 lg:pt-7">
      {/* On a phone the DOM order is what shows: title, then the facts label, then the buttons, then the body. */}
      <header className="grid content-start gap-3.5 lg:col-start-1 lg:row-start-1">
        <nav aria-label="Breadcrumb" className="flex min-w-0 gap-2 text-[13.5px] text-ink-3">
          <Link href="/explorer/" className="hover:text-ink">
            Explore
          </Link>
          <span aria-hidden>/</span>
          <Link href={`/category/${entry.domain}/`} className="hover:text-ink">
            {category}
          </Link>
          <span aria-hidden>/</span>
          <span aria-current="page" className="truncate">
            {entry.title}
          </span>
        </nav>
        <h1 className="text-[34px] font-bold leading-[1.05] tracking-tight lg:text-[44px]">{entry.title}</h1>
        <p className="text-[15px] text-ink-2">
          {entry.description} · {entry.provider} · {category}
        </p>
        <FreshnessNotice entry={entry} freshness={freshness} hasAlternatives={related.length > 0} />
      </header>

      <div className="lg:col-start-2 lg:row-span-3 lg:row-start-1">
        <div className="lg:sticky lg:top-20">
          <FactsLabel entry={entry} freshness={freshness} />
        </div>
      </div>

      <div className="grid content-start gap-3.5 lg:col-start-1 lg:row-start-2">
        <div className="flex flex-wrap gap-2">
          {pricing ? (
            <a className="btn btn-primary" href={pricing} {...EXTERNAL}>
              Official pricing <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          ) : null}
          {entry.docsUrl && entry.docsUrl !== pricing ? (
            <a className="btn" href={entry.docsUrl} {...EXTERNAL}>
              Docs <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          ) : null}
          <a className="btn btn-ghost" href={reportUrl(entry)} {...EXTERNAL}>
            Report outdated info
          </a>
        </div>
        {comparisons.length > 0 ? (
          <nav aria-label="Compared in" className="flex flex-wrap items-center gap-2 text-[13.5px] text-ink-2">
            <span>Compared in</span>
            {comparisons.map((comparison) => (
              <Link
                key={comparison.slug}
                href={`/compare/${comparison.slug}/`}
                className="inline-flex h-7 items-center rounded-full border border-line bg-surface px-2.5 hover:border-ink-3 hover:text-ink"
              >
                {jobLabel(comparison.title)}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>

      <div className="grid content-start gap-9 lg:col-start-1 lg:row-start-3">
        {entry.body.raw && sectioned ? (
          <section aria-label="About the free plan">
            <MdxContent source={entry.body.raw} />
          </section>
        ) : entry.body.raw ? (
          <section>
            <h2 className="mb-2.5 text-lg font-semibold">Overview</h2>
            <MdxContent source={entry.body.raw} />
          </section>
        ) : null}
        {!ended ? (
          <section className="grid gap-4 sm:grid-cols-2" aria-label="Fit">
            <FitCard good title="Good fit" text={entry.whenToUse} items={entry.bestFor} />
            <FitCard good={false} title="Not a fit" text={entry.whenNotToUse} items={entry.avoidIf} />
          </section>
        ) : null}
        {!ended && entry.quickstartSteps.length > 0 ? (
          <details className="group rounded-xl border border-line bg-surface">
            <summary className="flex cursor-pointer list-none justify-between px-[18px] py-3.5 font-semibold">
              Quickstart · {entry.quickstartSteps.length} steps
              <span className="font-mono text-ink-3 group-open:hidden" aria-hidden>
                +
              </span>
              <span className="hidden font-mono text-ink-3 group-open:inline" aria-hidden>
                –
              </span>
            </summary>
            <ol className="list-decimal pb-4 pl-[38px] pr-[18px] text-sm text-ink-2">
              {entry.quickstartSteps.map((step, index) => (
                <li key={`${index}-${step}`}>{step}</li>
              ))}
            </ol>
          </details>
        ) : null}
        {related.length > 0 ? (
          <section>
            <h2 className="mb-2.5 text-lg font-semibold">Other free {category.toLowerCase()} options</h2>
            <EntryList items={related} showChecked={false} label={`Other free ${category} options`} />
          </section>
        ) : null}
      </div>
    </div>
  );
}
