import type { AtlasEntry } from "@/types/content";

export const ANSWER_MIN_WORDS = 20;
export const ANSWER_MAX_WORDS = 45;

/** Whitespace-separated tokens, so a hyphenated word and a price like "$29" each count as one. */
export function answerWordCount(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

/** Periods inside decimals (1.5) do not end a sentence. A sentence ends at punctuation before a space or the end. */
export function sentenceCount(text: string): number {
  return text.match(/[.!?](?=\s|$)/g)?.length ?? 0;
}

const NO_CARD =
  /\b(no credit card|without a (credit )?card|no card\b|card not required|does not (need|require) a (credit )?card|doesn't (need|require) a (credit )?card|card-free)\b/i;
const CARD_REQUIRED =
  /\b(needs a (credit )?card|requires a (credit )?card|card is required|credit card is required|card required|card at signup|must add a (credit )?card)\b/i;
const NO_BILL =
  /\b(can(?:'|no)t bill|cannot bill|won'?t bill|will not bill|no (?:paid )?overage|does not bill|doesn't bill|doesn'?t charge|will not charge)\b/i;
const SAYS_ENDED = /\b(ended|discontinued|shut down|shuts down|closed|no longer)\b/i;
const SAYS_CHANGED = /\b(changed|no longer|used to|cut|reduced|replaced)\b/i;
const ENDED_ACTIVE = /\bfree (tier|plan) has ended\b|\bno longer offers a free\b|\bfree plan has ended\b/i;

type Claim = "yes" | "no" | "unknown" | "absent";

function cardClaim(text: string): Claim {
  if (/card[^.]{0,40}not confirmed|not confirmed[^.]{0,40}card/i.test(text)) return "unknown";
  if (NO_CARD.test(text)) return "no";
  if (CARD_REQUIRED.test(text)) return "yes";
  return "absent";
}

function capClaim(text: string): Claim {
  if (/hard cap[^.]{0,40}not confirmed|not confirmed[^.]{0,40}hard cap|cap is not confirmed/i.test(text)) return "unknown";
  if (/\bno hard cap\b|\bwithout a hard cap\b/i.test(text)) return "no";
  if (/\bhard cap\b/i.test(text)) return "yes";
  return "absent";
}

/** Problems in one entry's answer. Empty means the sentence agrees with the easy structured fields. */
export function answerProblems(entry: AtlasEntry): string[] {
  const answer = entry.answer?.trim() ?? "";
  if (!answer) return ["missing answer"];

  const problems: string[] = [];
  const words = answerWordCount(answer);
  if (words < ANSWER_MIN_WORDS || words > ANSWER_MAX_WORDS) problems.push(`answer is ${words} words`);
  if (sentenceCount(answer) !== 1 || !/[.!?]$/.test(answer)) problems.push("answer must be one sentence");
  if (answer.includes("\n")) problems.push("answer must be a single line");

  const named = answer.toLowerCase();
  if (!named.includes(entry.title.toLowerCase()) && !named.includes(entry.provider.toLowerCase())) {
    problems.push("answer does not name the service or provider");
  }

  const card = cardClaim(answer);
  const { requiresCard, hasHardCap, overageRisk, freeTierType } = entry.freeTierDetails;
  if (requiresCard === true && (card === "no" || card === "unknown")) problems.push("card claim contradicts requiresCard true");
  if (requiresCard === false && (card === "yes" || card === "unknown")) problems.push("card claim contradicts requiresCard false");
  if (requiresCard === "unknown" && (card === "yes" || card === "no")) problems.push("card claim contradicts requiresCard unknown");

  const cap = capClaim(answer);
  if (hasHardCap === true && (cap === "no" || cap === "unknown")) problems.push("cap claim contradicts hasHardCap true");
  if (hasHardCap === false && (cap === "yes" || cap === "unknown")) problems.push("cap claim contradicts hasHardCap false");
  if (hasHardCap === "unknown" && (cap === "yes" || cap === "no")) problems.push("cap claim contradicts hasHardCap unknown");

  if (overageRisk !== "none" && NO_BILL.test(answer)) problems.push(`says it cannot bill you but overageRisk is ${overageRisk}`);
  if (freeTierType === "trial" && /\b(always free|free forever)\b/i.test(answer)) problems.push("trial described as always free");
  if (freeTierType === "always-free" && entry.status === "active" && /\bonly a trial\b|\bjust a trial\b/i.test(answer)) {
    problems.push("always-free plan described as only a trial");
  }
  if (entry.productionReadiness === "prototype" && /\bproduction-ready\b/i.test(answer)) {
    problems.push("prototype described as production-ready");
  }
  if (entry.productionReadiness === "production-ready" && /\bnot for production\b/i.test(answer)) {
    problems.push("production-ready entry described as not for production");
  }

  if (entry.status === "ended" && !SAYS_ENDED.test(answer)) problems.push("ended entry does not say so");
  if (entry.status === "changed" && !SAYS_CHANGED.test(answer)) problems.push("changed entry does not say so");
  if (entry.status === "active" && ENDED_ACTIVE.test(answer)) problems.push("active entry says the free tier ended");

  return problems;
}

/** Shape with the product name and numbers removed, so a swapped-name template collides with itself. */
export function answerSkeleton(answer: string, names: string[]): string {
  let text = answer.toLowerCase();
  for (const name of [...names].filter(Boolean).sort((a, b) => b.length - a.length)) {
    text = text.split(name.toLowerCase()).join("name");
  }
  return text
    .replace(/\d[\d,.]*/g, "#")
    .replace(/[^a-z#\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Length, contradiction, and copy-paste checks across the whole catalog. */
export function catalogAnswerProblems(entries: AtlasEntry[]): string[] {
  const problems: string[] = [];
  const skeletons = new Map<string, string[]>();
  let yesOpeners = 0;

  for (const entry of entries) {
    for (const problem of answerProblems(entry)) problems.push(`${entry.id}: ${problem}`);
    if (!entry.answer?.trim()) continue;
    const skeleton = answerSkeleton(entry.answer, [entry.title, entry.provider]);
    const ids = skeletons.get(skeleton) ?? [];
    ids.push(entry.id);
    skeletons.set(skeleton, ids);
    if (/^yes\b/i.test(entry.answer.trim())) yesOpeners += 1;
  }

  for (const [skeleton, ids] of skeletons) {
    if (ids.length >= 4) {
      problems.push(`repeated sentence shape (${ids.length}): ${ids.slice(0, 8).join(", ")} :: ${skeleton.slice(0, 120)}`);
    }
  }
  if (entries.length >= 20 && yesOpeners / entries.length > 0.2) {
    problems.push(`${yesOpeners} of ${entries.length} answers start with "Yes"`);
  }
  return problems;
}
