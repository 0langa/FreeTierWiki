import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { EntryList } from "@/components/entry/entry-list";
import { FactsLabel } from "@/components/entry/facts-label";
import { FreshnessNotice } from "@/components/entry/freshness-notice";
import { MdxContent } from "@/components/content/mdx-content";
import { BUILD_NOW } from "@/lib/build-info";
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

export function EntryPage({ entry, related }: { entry: AtlasEntryWithBody; related: ListItem[] }) {
  const freshness = getFreshness(entry, BUILD_NOW);
  const pricing = pricingUrl(entry);
  const category = DOMAIN_LABELS[entry.domain];
  const ended = entry.status === "ended";

  return (
    <div className="grid gap-7 pt-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-x-12 lg:pt-7">
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
        <FreshnessNotice entry={entry} freshness={freshness} hasAlternatives={related.length > 0} />
      </header>

      <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <div className="lg:sticky lg:top-20">
          <FactsLabel entry={entry} freshness={freshness} />
        </div>
      </div>

      <div className="grid content-start gap-9 lg:col-start-1 lg:row-start-2">
        {entry.body.raw ? (
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
