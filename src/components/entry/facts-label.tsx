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
    <div className="flex items-center justify-between gap-3 border-t border-line py-1.5 first:border-t-0">
      <dt className="text-ink-2">{term}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}

const THICK = <div className="my-2.5 h-2 bg-line-strong" aria-hidden />;
const MEDIUM = <div className="my-2.5 h-[3px] bg-line-strong" aria-hidden />;

export function FactsLabel({ entry, freshness, compact = false }: { entry: AtlasEntry; freshness: Freshness; compact?: boolean }) {
  const details = entry.freeTierDetails;
  const ended = entry.status === "ended";
  const watchOut = [...details.caveats, ...details.billingRiskNotes];
  const pricing = pricingUrl(entry);
  const titleId = `facts-${entry.slug.replace(/[^a-z0-9-]/gi, "-")}`;
  const limits = compact ? details.limits.slice(0, 2) : details.limits;
  const showLastChecked = !(freshness.state === "ended" && !freshness.date);

  return (
    <aside aria-labelledby={titleId} className="rounded-[4px] border-2 border-line-strong bg-surface px-4 pb-3 pt-3.5 text-sm">
      <h2 id={titleId} className="text-[26px] font-bold leading-none tracking-tight">
        Free tier facts
      </h2>
      <p className="mt-1 text-[13px] text-ink-3">
        {entry.title} · {ended ? "No free plan" : FREE_TIER_TYPE_LABELS[details.freeTierType]}
      </p>
      {THICK}
      <dl>
        {compact ? null : <FactRow term="Plan type" value={ended ? "No free plan" : FREE_TIER_TYPE_LABELS[details.freeTierType]} />}
        <FactRow term="Card required" value={details.requiresCard ? "Yes" : "No"} />
        {!ended ? <FactRow term="Hard cap" value={details.hasHardCap ? "Yes" : "No"} /> : null}
        <FactRow term="Billing risk" value={<RiskPill risk={details.overageRisk} />} />
        {!ended && !compact && details.resetPeriod ? (
          <FactRow term="Resets" value={details.resetPeriod.replace(/^./, (c) => c.toUpperCase())} />
        ) : null}
        {!ended && !compact && details.trialDays ? <FactRow term="Trial length" value={`${details.trialDays} days`} /> : null}
        {!ended && !compact && details.monthlyCreditAmount ? <FactRow term="Credit" value={details.monthlyCreditAmount} /> : null}
        {!ended && !compact ? <FactRow term="Good for" value={PRODUCTION_READINESS_LABELS[entry.productionReadiness]} /> : null}
      </dl>
      {MEDIUM}
      {compact ? null : <h3 className="text-[13px] font-bold uppercase tracking-wide">Limits</h3>}
      <ul className="divide-y divide-line">
        {limits.map((limit, index) => (
          <li key={`${index}-${limit}`} className="py-1.5 text-[13.5px] text-ink-2">
            <OfferText text={limit} />
          </li>
        ))}
      </ul>
      {!compact && watchOut.length > 0 ? (
        <>
          {MEDIUM}
          <h3 className="text-[13px] font-bold uppercase tracking-wide">Watch out</h3>
          <ul className="divide-y divide-line">
            {watchOut.map((note, index) => (
              <li key={`${index}-${note}`} className="flex gap-2 py-1.5 text-[13.5px] text-ink-2">
                <span aria-hidden className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-risk-med-bg font-mono text-[11px] font-bold text-risk-med">
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
        {showLastChecked ? (
          <span>
            Last checked: <FreshnessLabel freshness={freshness} />
          </span>
        ) : null}
        {!compact && pricing ? (
          <span>
            Source:{" "}
            <a href={pricing} target="_blank" rel="noopener noreferrer" className="text-ink-2 underline underline-offset-2 hover:text-ink">
              {shortUrl(pricing)}
            </a>
          </span>
        ) : null}
        {compact ? null : (
          <a href={reportUrl(entry)} target="_blank" rel="noopener noreferrer" className="text-ink-2 underline underline-offset-2 hover:text-ink">
            Report outdated info
          </a>
        )}
      </div>
    </aside>
  );
}
