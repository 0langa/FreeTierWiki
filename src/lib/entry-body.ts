// Reads structure out of an entry's Markdown body: the "##" outline for the jump menu, the
// sections the page renders one by one, the question/answer pairs for structured data.

export type BodyHeading = { id: string; title: string };
export type BodySection = BodyHeading & { markdown: string };
export type BodyParts = { intro: string; sections: BodySection[] };
export type FaqItem = { id: string; question: string; markdown: string };
export type BodyQuestion = { question: string; answer: string };

/** Section titles the deep-entry shape uses; the page gives these a rendering of their own. */
export const SECTION_TITLES = {
  gives: "What the free plan gives you",
  limit: "When you hit a limit",
  gotchas: "Gotchas",
  alternatives: "Alternatives in this atlas",
  questions: "Questions people ask",
} as const;

/** "When you hit a limit" → "when-you-hit-a-limit". Shared by the outline and the rendered headings. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** The second-level headings in body order. An older one-sentence body has none. */
export function bodyOutline(raw: string): BodyHeading[] {
  return [...raw.matchAll(/^##\s+(.+?)\s*$/gm)].map((match) => ({ id: headingId(match[1]), title: match[1] }));
}

/** The text before the first "##" heading, then each "##" section with its own Markdown. */
export function bodySections(raw: string): BodyParts {
  const parts = raw.split(/^##\s+(.+?)\s*$/m);
  const sections: BodySection[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i].trim();
    sections.push({ id: headingId(title), title, markdown: (parts[i + 1] ?? "").trim() });
  }
  return { intro: parts[0].trim(), sections };
}

/** The "### Question?" blocks of a section, each with its answer Markdown, plus any text before the first one. */
export function splitFaq(markdown: string): { lead: string; items: FaqItem[] } {
  const parts = markdown.split(/^###\s+(.+?)\s*$/m);
  const items: FaqItem[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    const question = parts[i].trim();
    const answer = (parts[i + 1] ?? "").trim();
    if (answer) items.push({ id: headingId(question), question, markdown: answer });
  }
  return { lead: parts[0].trim(), items };
}

/** Markdown down to plain text: link text without targets, no emphasis marks, single spaces. */
export function plainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** The "### Question?" pairs under the "Questions people ask" section, as plain text. */
export function bodyQuestions(raw: string): BodyQuestion[] {
  const section = bodySections(raw).sections.find((candidate) => candidate.title === SECTION_TITLES.questions);
  if (!section) return [];
  return splitFaq(section.markdown).items.map((item) => ({ question: item.question, answer: plainText(item.markdown) }));
}
