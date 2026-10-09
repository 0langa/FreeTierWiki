import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { EntryList } from "@/components/entry/entry-list";
import { FactsLabel } from "@/components/entry/facts-label";
import { FreshnessNotice } from "@/components/entry/freshness-notice";
import { MdxContent } from "@/components/entry/mdx-content";
import { bodyOutline } from "@/lib/entry-body";
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

// Short names for the jump menu; the section headings keep their full wording.
const JUMP_LABELS: Record<string, string> = {
  "What the free plan gives you": "Free plan",
  "When you hit a limit": "Limits",
  "Alternatives in this atlas": "Alternatives",
  "Questions people ask": "Questions",
};

type EntryPageProps = { entry: AtlasEntryWithBody; related: ListItem[]; comparisons?: Comparison[]; providerHref?: string };

export function EntryPage({ entry, related, comparisons = [], providerHref }: EntryPageProps) {
  const freshness = getFreshness(entry, BUILD_NOW);
  const pricing = pricingUrl(entry);
  const category = DOMAIN_LABELS[entry.domain];
  const ended = entry.status === "ended";
  // A deepened body brings its own "##" sections; an older one-sentence body gets the "Overview" heading.
  const outline = bodyOutline(entry.body.raw);
  const sectioned = outline.length > 0;
  const jumps = [
    ...(!ended ? [{ id: "fit", title: "Fit" }] : []),
    ...outline.map((heading) => ({ ...heading, title: JUMP_LABELS[heading.title] ?? heading.title })),
    ...(!ended && entry.quickstartSteps.length > 0 ? [{ id: "quickstart", title: "Get started" }] : []),
    ...(related.length > 0 ? [{ id: "other-options", title: "Other options" }] : []),
  ];

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
        <p className="text-[15px] text-ink-2">{entry.description}</p>
        <p className="flex flex-wrap gap-x-2 text-[13.5px] text-ink-3">
          <span>
            By{" "}
            {providerHref ? (
              <Link href={providerHref} className="text-ink-2 underline underline-offset-2 hover:text-ink">
                {entry.provider}
              </Link>
            ) : (
              <span className="text-ink-2">{entry.provider}</span>
            )}
          </span>
          <span aria-hidden>·</span>
          <Link href={`/category/${entry.domain}/`} className="text-ink-2 underline underline-offset-2 hover:text-ink">
            {category}
          </Link>
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
        {sectioned && jumps.length > 1 ? (
          <nav aria-label="On this page" className="flex flex-wrap items-center gap-2 text-[13.5px] text-ink-2">
            <span>On this page</span>
            {jumps.map((jump) => (
              <a
                key={jump.id}
                href={`#${jump.id}`}
                className="inline-flex h-7 items-center rounded-full border border-line bg-surface px-2.5 hover:border-ink-3 hover:text-ink"
              >
                {jump.title}
              </a>
            ))}
          </nav>
        ) : null}
      </div>

      <div className="grid content-start gap-9 lg:col-start-1 lg:row-start-3">
        {!ended ? (
          <section id="fit" aria-labelledby="fit-title" className="scroll-mt-20">
            <h2 id="fit-title" className="sr-only">
              Is it a fit?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FitCard good title="Good fit" text={entry.whenToUse} items={entry.bestFor} />
              <FitCard good={false} title="Not a fit" text={entry.whenNotToUse} items={entry.avoidIf} />
            </div>
          </section>
        ) : null}
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
        {!ended && entry.quickstartSteps.length > 0 ? (
          <section id="quickstart" aria-labelledby="quickstart-title" className="scroll-mt-20">
            <h2 id="quickstart-title" className="mb-2.5 text-lg font-semibold">
              How to get started
            </h2>
            <ol className="grid gap-2 rounded-xl border border-line bg-surface py-4 pl-[38px] pr-[18px] text-sm text-ink-2 [list-style:decimal]">
              {entry.quickstartSteps.map((step, index) => (
                <li key={`${index}-${step}`} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </section>
        ) : null}
        {related.length > 0 ? (
          <section id="other-options" className="scroll-mt-20">
            <h2 className="mb-2.5 text-lg font-semibold">Other free {category.toLowerCase()} options</h2>
            <EntryList items={related} showChecked={false} label={`Other free ${category} options`} />
          </section>
        ) : null}
      </div>
    </div>
  );
}
