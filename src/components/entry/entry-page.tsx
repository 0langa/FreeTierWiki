import Link from "next/link";
import { ArrowUpRight, CircleCheck, CircleX } from "lucide-react";

import { EntryBody } from "@/components/entry/entry-body";
import { EntryList } from "@/components/entry/entry-list";
import { FactsLabel } from "@/components/entry/facts-label";
import { FreshnessNotice } from "@/components/entry/freshness-notice";
import { FreshnessLabel } from "@/components/entry/labels";
import { MdxContent } from "@/components/entry/mdx-content";
import { OnThisPage, type JumpItem } from "@/components/entry/on-this-page";
import { Breadcrumb, ChipRow } from "@/components/site/page-header";
import { BUILD_NOW } from "@/lib/build-info";
import { jobLabel } from "@/lib/comparison-view";
import type { Comparison } from "@/lib/comparisons-file";
import { DOMAIN_LABELS } from "@/lib/content";
import { bodyOutline, SECTION_TITLES } from "@/lib/entry-body";
import { pricingUrl, type ListItem } from "@/lib/entry-view";
import { getFreshness } from "@/lib/freshness";
import type { AtlasEntryWithBody } from "@/types/content";

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

// Short names for the jump menu; the section headings keep their full wording.
const JUMP_LABELS: Record<string, string> = {
  [SECTION_TITLES.gives]: "Free plan",
  [SECTION_TITLES.limit]: "At the limit",
  [SECTION_TITLES.alternatives]: "Alternatives",
  [SECTION_TITLES.questions]: "Questions",
};

function FitCard({ good, title, text, items }: { good: boolean; title: string; text: string; items: string[] }) {
  const Icon = good ? CircleCheck : CircleX;
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <h3 className={`flex items-center gap-2 text-[15px] font-semibold ${good ? "text-risk-none" : "text-risk-med"}`}>
        <Icon className="h-[18px] w-[18px]" aria-hidden />
        {title}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed">{text}</p>
      {items.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {items.map((item, index) => (
            <li key={`${index}-${item}`} className="rounded-md bg-surface-2 px-2 py-0.5 text-[13px] text-ink-2">
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

type EntryPageProps = { entry: AtlasEntryWithBody; related: ListItem[]; comparisons?: Comparison[]; providerHref?: string };

export function EntryPage({ entry, related, comparisons = [], providerHref }: EntryPageProps) {
  const freshness = getFreshness(entry, BUILD_NOW);
  const pricing = pricingUrl(entry);
  const category = DOMAIN_LABELS[entry.domain];
  const ended = entry.status === "ended";
  // A deepened body brings its own "##" sections; an older one-sentence body gets the "Overview" heading.
  const outline = bodyOutline(entry.body.raw);
  const sectioned = outline.length > 0;
  const jumps: JumpItem[] = [
    ...(!ended ? [{ id: "fit", title: "Fit" }] : []),
    ...outline.map((heading) => ({ ...heading, title: JUMP_LABELS[heading.title] ?? heading.title })),
    ...(!ended && entry.quickstartSteps.length > 0 ? [{ id: "quickstart", title: "Get started" }] : []),
    ...(related.length > 0 ? [{ id: "other-options", title: "Other options" }] : []),
  ];
  const showJumps = sectioned && jumps.length > 1;

  return (
    <article className="grid gap-y-7 pt-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-x-14 lg:pt-8 xl:grid-cols-[minmax(0,1fr)_360px]">
      {/* On a phone the DOM order is what shows: title, then the facts label, then the buttons, then the body. */}
      <header className="grid content-start gap-4 lg:col-start-1 lg:row-start-1">
        <Breadcrumb
          crumbs={[
            { href: "/explorer/", label: "Explore" },
            { href: `/category/${entry.domain}/`, label: category },
          ]}
          current={entry.title}
        />
        <div className="grid gap-3">
          <h1 className="text-[34px] font-bold leading-[1.05] tracking-tight sm:text-[42px] lg:text-[46px]">{entry.title}</h1>
          <p className="max-w-[62ch] text-[16px] leading-relaxed text-ink-2 sm:text-[17px]">{entry.description}</p>
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13.5px] text-ink-3">
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
            {freshness.state === "checked" || freshness.state === "stale" ? (
              <>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1.5">
                  Checked <FreshnessLabel freshness={freshness} />
                </span>
              </>
            ) : freshness.state === "imported" ? (
              <>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1.5">
                  Data from <FreshnessLabel freshness={freshness} />
                </span>
              </>
            ) : null}
          </p>
        </div>
        <FreshnessNotice entry={entry} freshness={freshness} hasAlternatives={related.length > 0} />
      </header>

      <div className="lg:col-start-2 lg:row-span-3 lg:row-start-1">
        <FactsLabel entry={entry} freshness={freshness} />
        {showJumps ? (
          <div className="hidden lg:sticky lg:top-24 lg:mt-8 lg:block">
            <OnThisPage items={jumps} />
          </div>
        ) : null}
      </div>

      <div className="grid content-start gap-4 lg:col-start-1 lg:row-start-2">
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
        </div>
        {comparisons.length > 0 ? (
          <ChipRow label="Compared in">
            {comparisons.map((comparison) => (
              <Link key={comparison.slug} href={`/compare/${comparison.slug}/`} className="chip">
                {jobLabel(comparison.title)}
              </Link>
            ))}
          </ChipRow>
        ) : null}
        {showJumps ? <OnThisPage items={jumps} variant="strip" className="lg:hidden" /> : null}
      </div>

      <div className="grid content-start gap-9 lg:col-start-1 lg:row-start-3 lg:gap-10">
        {!ended ? (
          <section id="fit" aria-labelledby="fit-title" className="scroll-mt-24">
            <h2 id="fit-title" className="sr-only">
              Is it a fit?
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <FitCard good title="Good fit" text={entry.whenToUse} items={entry.bestFor} />
              <FitCard good={false} title="Not a fit" text={entry.whenNotToUse} items={entry.avoidIf} />
            </div>
          </section>
        ) : null}
        {entry.body.raw && sectioned ? (
          <EntryBody raw={entry.body.raw} />
        ) : entry.body.raw ? (
          <section className="border-t border-line pt-8">
            <h2 className="section-title">Overview</h2>
            <MdxContent source={entry.body.raw} className="reading mt-4" />
          </section>
        ) : null}
        {!ended && entry.quickstartSteps.length > 0 ? (
          <section id="quickstart" aria-labelledby="quickstart-title" className="scroll-mt-24 border-t border-line pt-8">
            <h2 id="quickstart-title" className="section-title">
              How to get started
            </h2>
            <ol className="steps mt-5 grid gap-4 text-[15.5px] leading-relaxed">
              {entry.quickstartSteps.map((step, index) => (
                <li key={`${index}-${step}`}>{step}</li>
              ))}
            </ol>
          </section>
        ) : null}
        {related.length > 0 ? (
          <section id="other-options" className="scroll-mt-24 border-t border-line pt-8">
            <h2 className="section-title">Other free {category.toLowerCase()} options</h2>
            <p className="mt-1.5 text-[14.5px] text-ink-3">Same category, safest first.</p>
            <div className="mt-4">
              <EntryList items={related} showChecked={false} label={`Other free ${category} options`} />
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
