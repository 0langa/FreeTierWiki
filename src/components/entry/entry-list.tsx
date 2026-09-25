import Link from "next/link";

import { CardLabel, FreshnessLabel, RiskPill, StatusPill } from "@/components/entry/labels";
import { OfferText } from "@/components/entry/offer-text";
import { DOMAIN_LABELS } from "@/lib/content";
import type { ListItem } from "@/lib/entry-view";

const COLS_WITH_CHECK = "lg:grid-cols-[minmax(180px,1.1fr)_minmax(0,1.6fr)_92px_78px_112px]";
const COLS_NO_CHECK = "lg:grid-cols-[minmax(160px,1fr)_minmax(0,1.6fr)_92px_78px]";

export function EntryList({ items, showChecked = true, label = "Free tiers" }: { items: ListItem[]; showChecked?: boolean; label?: string }) {
  const cols = showChecked ? COLS_WITH_CHECK : COLS_NO_CHECK;
  return (
    <div
      role="table"
      aria-label={label}
      className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface [&>*:nth-child(2)]:!border-t-0 lg:[&>*:nth-child(2)]:!border-t"
    >
      <div
        role="row"
        className={`hidden h-[38px] items-center gap-4 bg-surface-2 px-[18px] font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-ink-3 lg:grid ${cols}`}
      >
        <span role="columnheader">Free tier</span>
        <span role="columnheader">What you get free</span>
        <span role="columnheader">Risk</span>
        <span role="columnheader">Card</span>
        {showChecked ? <span role="columnheader">Checked</span> : null}
      </div>
      {items.map((item) => {
        const ended = item.status === "ended";
        return (
          <div
            key={item.id}
            role="row"
            className={`relative grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1.5 px-4 py-3.5 hover:bg-surface-2 lg:min-h-16 lg:items-center lg:gap-4 lg:px-[18px] lg:py-2.5 ${cols} ${ended ? "opacity-60" : ""}`}
          >
            <div role="cell" className="col-start-1 row-start-1 min-w-0 lg:col-auto lg:row-auto">
              <div className="flex flex-wrap items-center gap-1.5">
                <Link href={item.url} className={`text-[14.5px] font-semibold after:absolute after:inset-0 ${ended ? "line-through decoration-1" : ""}`}>
                  {item.title}
                </Link>
                <StatusPill status={item.status} />
              </div>
              <div className="text-[12.5px] text-ink-3">
                {item.provider} · {DOMAIN_LABELS[item.domain]}
              </div>
            </div>
            <div role="cell" className="col-span-2 row-start-2 line-clamp-2 font-mono text-[12.5px] leading-normal text-ink-2 lg:col-auto lg:row-auto">
              {item.offer.length > 0 ? (
                item.offer.map((part, index) => (
                  <span key={index}>
                    {index > 0 ? " · " : ""}
                    <OfferText text={part} />
                  </span>
                ))
              ) : (
                <span>See the official pricing page</span>
              )}
            </div>
            <div role="cell" className="col-start-2 row-start-1 self-start lg:col-auto lg:row-auto lg:self-center">
              <RiskPill risk={item.risk} />
            </div>
            <div role="cell" className="col-start-1 row-start-3 lg:col-auto lg:row-auto">
              <CardLabel card={item.card} />
            </div>
            {showChecked ? (
              <div role="cell" className="col-start-2 row-start-3 justify-self-end lg:col-auto lg:row-auto lg:justify-self-start">
                <FreshnessLabel freshness={item.freshness} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
