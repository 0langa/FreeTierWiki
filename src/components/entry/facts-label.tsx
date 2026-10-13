import { ChevronDown } from "lucide-react";

import { FreshnessLabel, RiskPill } from "@/components/entry/labels";
import { OfferText } from "@/components/entry/offer-text";
import { FREE_TIER_TYPE_LABELS, PRODUCTION_READINESS_LABELS } from "@/lib/content";
import { pricingUrl } from "@/lib/entry-view";
import { shortUrl } from "@/lib/format";
import type { Freshness } from "@/lib/freshness";
import { reportUrl } from "@/lib/links";
import type { AtlasEntry } from "@/types/content";

function FactRow({ term, value }: { term: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-line py-2 first:border-t-0">
      <dt className="text-ink-2">{term}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}

const THICK = <div className="my-3 h-2 bg-line-strong" aria-hidden />;
const MEDIUM = <div className="my-3 h-[3px] bg-line-strong" aria-hidden />;

export function FactsLabel({ entry, freshness }: { entry: AtlasEntry; freshness: Freshness }) {
  const details = entry.freeTierDetails;
  const ended = entry.status === "ended";
  const watchOut = [...details.caveats, ...details.billingRiskNotes];
  const pricing = pricingUrl(entry);
  // The pricing page first, then the other official pages the entry was checked against.
  const sources = [...new Set([pricing, ...entry.sourceUrls].filter((url): url is string => Boolean(url && /^https?:\/\//i.test(url))))].slice(0, 5);
  const titleId = `facts-${entry.slug.replace(/[^a-z0-9-]/gi, "-")}`;
  const showLastChecked = !(freshness.state === "ended" && !freshness.date);

  return (
    <aside aria-labelledby={titleId} className="rounded-[4px] border-2 border-line-strong bg-surface px-4 pb-3.5 pt-4 text-[14.5px] md:max-w-[560px] lg:max-w-none">
      <h2 id={titleId} className="text-[26px] font-bold leading-none tracking-tight">
        Free tier facts
      </h2>
      <p className="mt-1.5 text-[13px] text-ink-3">
        {entry.title} · {ended ? "No free plan" : FREE_TIER_TYPE_LABELS[details.freeTierType]}
      </p>
      {THICK}
      <dl>
        <FactRow term="Plan type" value={ended ? "No free plan" : FREE_TIER_TYPE_LABELS[details.freeTierType]} />
        <FactRow term="Card required" value={details.requiresCard ? "Yes" : "No"} />
        {!ended ? <FactRow term="Hard cap" value={details.hasHardCap ? "Yes" : "No"} /> : null}
        <FactRow term="Billing risk" value={<RiskPill risk={details.overageRisk} withLabel={false} />} />
        {!ended && details.resetPeriod ? <FactRow term="Resets" value={details.resetPeriod.replace(/^./, (c) => c.toUpperCase())} /> : null}
        {!ended && details.trialDays ? <FactRow term="Trial length" value={`${details.trialDays} days`} /> : null}
        {!ended && details.monthlyCreditAmount ? <FactRow term="Credit" value={details.monthlyCreditAmount} /> : null}
        {!ended ? <FactRow term="Good for" value={PRODUCTION_READINESS_LABELS[entry.productionReadiness]} /> : null}
      </dl>
      {MEDIUM}
      <h3 className="text-[12.5px] font-bold uppercase tracking-wide">Limits</h3>
      <ul className="divide-y divide-line">
        {details.limits.map((limit, index) => (
          <li key={`${index}-${limit}`} className="py-2 text-[14px] leading-snug text-ink-2">
            <OfferText text={limit} />
          </li>
        ))}
      </ul>
      {watchOut.length > 0 ? (
        <>
          {MEDIUM}
          <h3 className="text-[12.5px] font-bold uppercase tracking-wide">Watch out</h3>
          <ul className="divide-y divide-line">
            {watchOut.map((note, index) => (
              <li key={`${index}-${note}`} className="flex gap-2.5 py-2 text-[14px] leading-snug text-ink-2">
                <span aria-hidden className="mt-px grid h-4 w-4 shrink-0 place-items-center rounded-full bg-risk-med-bg font-mono text-[11px] font-bold text-risk-med">
                  !
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {THICK}
      <div className="grid gap-1.5 text-[12.5px] text-ink-3">
        {freshness.state === "imported" ? (
          <span>
            Not checked yet · data from <FreshnessLabel freshness={freshness} />
          </span>
        ) : showLastChecked ? (
          <span>
            Last checked: <FreshnessLabel freshness={freshness} />
          </span>
        ) : null}
        {sources.length > 0 ? (
          <details className="group">
            <summary className="inline-flex items-center gap-1 text-ink-2 hover:text-ink">
              {sources.length === 1 ? "Source" : `${sources.length} sources`}
              <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <ul className="mt-1 grid gap-1">
              {sources.map((url) => (
                <li key={url} className="truncate">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-ink-2 underline underline-offset-2 hover:text-ink">
                    {shortUrl(url)}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        ) : null}
        <a href={reportUrl(entry)} target="_blank" rel="noopener noreferrer" className="text-ink-2 underline underline-offset-2 hover:text-ink">
          Report outdated info
        </a>
      </div>
    </aside>
  );
}
