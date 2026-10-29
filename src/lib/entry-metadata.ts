import { plainText } from "@/lib/entry-body";
import { SITE_NAME } from "@/lib/metadata";
import type { AtlasEntry } from "@/types/content";

function searchName(entry: AtlasEntry): string {
  return entry.title.replace(/ \((?:formerly [^)]+|Azure Security Center)\)$/, "");
}

/** Keep product names intact; spend the remaining title space on useful context. */
export function entryTitle(entry: AtlasEntry): string {
  const name = searchName(entry);
  const suffix = entry.status === "ended" ? "free tier (ended)" : "free tier";
  const candidates = [
    `${name} ${suffix}: limits & billing · ${SITE_NAME}`,
    `${name} ${suffix} · ${SITE_NAME}`,
    `${name} ${suffix}`,
  ];
  return candidates.find((title) => title.length <= 60) ?? candidates.at(-1)!;
}

export function entryDescription(entry: AtlasEntry): string {
  const name = searchName(entry);
  if (entry.status === "ended") {
    return `${name}'s free tier has ended. Read the recorded changes, previous limits, billing details, and links to alternatives.`;
  }
  const summary = plainText(entry.freeTierDetails.summary);
  const answer = entry.answer?.trim();
  const firstLimit = plainText(entry.freeTierDetails.limits[0] ?? "").replace(/[.;]$/, "");
  const candidates = [
    ...(answer ? [answer] : []),
    `${name} free tier: ${summary}`,
    `${name} free tier: ${summary} See limits, card rules, and billing risks.`,
    ...(firstLimit ? [`${name} free tier: ${firstLimit}. See card rules, billing risks, and plan restrictions.`] : []),
    `${name} free tier guide: usage limits, card requirements, billing risks, and alternatives, with dated checks and official sources.`,
    `${name}: free plan limits, card requirements, billing risks, and alternatives. Read the details and official sources.`,
  ];
  // Use complete summaries or a complete guide description, never cut a limit's
  // qualification or a billing warning in half just to reach a character count.
  return candidates.find((text) => text.length >= 110 && text.length <= 160) ?? candidates.at(-1)!;
}
