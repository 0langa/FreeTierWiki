// Reads structure out of an entry's Markdown body: the "##" outline for the jump menu, the
// heading ids the rendered page uses, and the question/answer pairs for structured data.

export type BodyHeading = { id: string; title: string };
export type BodyQuestion = { question: string; answer: string };

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

/** Markdown down to plain text: link text without targets, no emphasis marks, single spaces. */
export function plainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** The "### Question?" pairs under the "Questions people ask" section. */
export function bodyQuestions(raw: string): BodyQuestion[] {
  const section = raw.split(/^##\s+Questions people ask\s*$/m)[1];
  if (!section) return [];
  const own = section.split(/^##\s/m)[0];
  const parts = own.split(/^###\s+(.+?)\s*$/m);
  const out: BodyQuestion[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    const answer = plainText(parts[i + 1] ?? "");
    if (answer) out.push({ question: parts[i].trim(), answer });
  }
  return out;
}
