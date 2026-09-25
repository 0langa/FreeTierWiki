import { Clock, TriangleAlert } from "lucide-react";

import { formatMonth } from "@/lib/format";
import type { Freshness } from "@/lib/freshness";
import type { AtlasEntry } from "@/types/content";

const TONES = {
  neutral: "border-dashed border-ink-3 text-ink-2",
  warn: "border-dashed border-warn bg-warn-bg text-ink-2",
  high: "border-risk-high bg-risk-high-bg text-ink",
} as const;

function Notice({ tone, children }: { tone: keyof typeof TONES; children: React.ReactNode }) {
  const Icon = tone === "neutral" ? Clock : TriangleAlert;
  return (
    <div role="note" className={`flex max-w-3xl gap-2.5 rounded-xl border px-3.5 py-3 text-sm ${TONES[tone]}`}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <p>{children}</p>
    </div>
  );
}

export function FreshnessNotice({
  entry,
  freshness,
  hasAlternatives,
}: {
  entry: AtlasEntry;
  freshness: Freshness;
  hasAlternatives: boolean;
}) {
  const latest = entry.changes[0];
  if (entry.status === "ended") {
    const tail = [latest?.note, hasAlternatives ? "See the other options below." : undefined]
      .filter((part): part is string => Boolean(part && part.trim()))
      .join(" ");
    return (
      <Notice tone="high">
        <strong>This free tier ended{latest ? ` in ${formatMonth(latest.date)}` : ""}.</strong>
        {tail ? ` ${tail}` : null}
      </Notice>
    );
  }
  if (entry.status === "changed" && latest) {
    return (
      <Notice tone="warn">
        <strong>Changed in {formatMonth(latest.date)}:</strong> {latest.note}
      </Notice>
    );
  }
  switch (freshness.state) {
    case "stale":
      return (
        <Notice tone="warn">
          Last checked in <strong>{formatMonth(freshness.date)}</strong>, more than 6 months ago. Confirm the limits on the official pricing page.
        </Notice>
      );
    case "imported":
      return (
        <Notice tone="neutral">
          Not re-checked since <strong>{formatMonth(freshness.date)}</strong>. Limits may have changed. Confirm them on the official pricing
          page before you rely on them.
        </Notice>
      );
    default:
      return null;
  }
}
