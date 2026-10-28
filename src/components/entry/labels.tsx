import { OVERAGE_RISK_LABELS } from "@/lib/content";
import { formatDay, formatMonth } from "@/lib/format";
import type { Freshness } from "@/lib/freshness";
import type { ChangelogKind, EntryStatus, OverageRisk, PolicyConfirmation } from "@/types/content";

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

const CHANGE_CLASS: Record<ChangelogKind, string> = {
  ended: RISK_CLASS.high,
  removed: RISK_CLASS.high,
  changed: RISK_CLASS.medium,
  new: RISK_CLASS.low,
};
const CHANGE_TEXT: Record<ChangelogKind, string> = { ended: "Ended", removed: "Removed", changed: "Changed", new: "New" };

export function ChangePill({ kind }: { kind: ChangelogKind }) {
  return <span className={`pill ${CHANGE_CLASS[kind]}`}>{CHANGE_TEXT[kind]}</span>;
}

export function CardLabel({ card }: { card: PolicyConfirmation }) {
  if (card === "unknown") return <span className="text-[13px] text-ink-3" title="Card requirement not confirmed">Not confirmed</span>;
  return card ? (
    <span className="text-[13px] font-medium text-risk-med">Card</span>
  ) : (
    <span className="text-[13px] text-ink-2">No card</span>
  );
}

/**
 * Whether the free amount is a hard cap (service stops), matching the entry page's "Hard cap: Yes/No" row.
 * The absence of a hard cap does not establish continued service or billing; the risk pill covers billing.
 */
export function CapLabel({ cap }: { cap: PolicyConfirmation }) {
  if (cap === "unknown") return <span className="block text-[12px] text-ink-3" title="Cap policy not confirmed">Not confirmed</span>;
  return <span className={`block text-[12px] ${cap ? "text-ink-2" : "text-ink-3"}`}>{cap ? "Hard cap" : "No hard cap"}</span>;
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
