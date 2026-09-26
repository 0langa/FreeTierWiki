import { OVERAGE_RISK_LABELS } from "@/lib/content";
import { formatDay, formatMonth } from "@/lib/format";
import type { Freshness } from "@/lib/freshness";
import type { ChangeKind, EntryStatus, OverageRisk } from "@/types/content";

const RISK_CLASS: Record<OverageRisk, string> = {
  none: "bg-risk-none-bg text-risk-none",
  low: "bg-risk-low-bg text-risk-low",
  medium: "bg-risk-med-bg text-risk-med",
  high: "bg-risk-high-bg text-risk-high",
};

export function RiskPill({ risk, withLabel = true }: { risk: OverageRisk; withLabel?: boolean }) {
  return (
    <span className={`pill ${RISK_CLASS[risk]}`}>
      {withLabel ? <span className="sr-only">Billing risk: </span> : null}
      {OVERAGE_RISK_LABELS[risk]}
    </span>
  );
}

export function StatusPill({ status }: { status: EntryStatus }) {
  if (status === "active") return null;
  return <span className={`pill ${status === "ended" ? RISK_CLASS.high : RISK_CLASS.medium}`}>{status === "ended" ? "Ended" : "Changed"}</span>;
}

const CHANGE_CLASS: Record<ChangeKind, string> = {
  ended: RISK_CLASS.high,
  changed: RISK_CLASS.medium,
  new: RISK_CLASS.low,
};
const CHANGE_TEXT: Record<ChangeKind, string> = { ended: "Ended", changed: "Changed", new: "New" };

export function ChangePill({ kind }: { kind: ChangeKind }) {
  return <span className={`pill ${CHANGE_CLASS[kind]}`}>{CHANGE_TEXT[kind]}</span>;
}

export function CardLabel({ card }: { card: boolean }) {
  return card ? (
    <span className="text-[13px] font-medium text-risk-med">Card</span>
  ) : (
    <span className="text-[13px] text-ink-2">No card</span>
  );
}

const BASE = "whitespace-nowrap font-mono text-xs font-medium";
const DASHED = "border-b border-dashed pb-px";

export function FreshnessLabel({ freshness }: { freshness: Freshness }) {
  switch (freshness.state) {
    case "checked":
      return (
        <span className={`${BASE} text-risk-none`} title="Checked against the official pricing page">
          ✓ {formatDay(freshness.date)}
        </span>
      );
    case "stale":
      return (
        <span className={`${BASE} ${DASHED} border-warn text-warn`} title="Checked more than 6 months ago">
          {formatMonth(freshness.date)}
        </span>
      );
    case "imported":
      return (
        <span className={`${BASE} ${DASHED} border-ink-3 text-ink-3`} title="Data from about this month. Not re-checked since.">
          {formatMonth(freshness.date)}
        </span>
      );
    case "ended":
      return <span className={`${BASE} text-ink-3`}>{freshness.date ? `✓ ${formatDay(freshness.date)}` : "Ended"}</span>;
  }
}
