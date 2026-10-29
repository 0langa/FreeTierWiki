import { describe, expect, it } from "vitest";

import { isCapUnknown, isCardUnknown, isHardCap, isNoCard } from "@/lib/catalog-facts";
import { categoryDescription, categoryFaqItems, categoryIntro, proseSentences } from "@/lib/category-copy";
import { filterDescription, filterFaqs, filterIntro } from "@/lib/category-filters";
import { listContentFiles, readEntryFile } from "@/lib/content-files";
import { DOMAINS, type AtlasEntry, type Domain } from "@/types/content";
import { FILTER_SLUGS, MIN_CATEGORY_ENTRIES } from "@/lib/filter-pages";
import { jsonLd, faqPage } from "@/lib/structured-data";

function mentionsTitle(text: string, title: string): boolean {
  const index = text.indexOf(title);
  if (index < 0) return false;
  const before = text[index - 1] ?? " ";
  const after = text[index + title.length] ?? " ";
  return !/[A-Za-z0-9]/.test(before) && !/[A-Za-z0-9]/.test(after);
}

describe("category intros and FAQs", () => {
  it("gives every populated category a specific intro and a data-backed FAQ", async () => {
    const entries: AtlasEntry[] = [];
    for (const file of await listContentFiles()) entries.push((await readEntryFile(file)).entry);
    const titlesByDomain = new Map<Domain, Set<string>>();
    for (const domain of DOMAINS) titlesByDomain.set(domain, new Set());
    for (const entry of entries) titlesByDomain.get(entry.domain)?.add(entry.title);

    const problems: string[] = [];
    const questions = new Map<string, string>();

    for (const domain of DOMAINS) {
      const group = entries.filter((entry) => entry.domain === domain);
      if (group.length === 0) continue;
      const intro = categoryIntro(domain);
      const sentences = proseSentences(intro);
      if (sentences.length < 2 || sentences.length > 4) problems.push(`${domain}: intro has ${sentences.length} sentences`);
      const description = categoryDescription(domain);
      if (description.length < 80 || description.length > 160) problems.push(`${domain}: meta description is ${description.length}`);
      if (intro.includes("undefined") || description.includes("undefined")) problems.push(`${domain}: undefined in intro`);

      const faqs = categoryFaqItems(domain, group);
      if (faqs.length < 4 || faqs.length > 6) problems.push(`${domain}: ${faqs.length} FAQs`);
      const noCard = group.filter(isNoCard).length;
      const cardQuestion = faqs.find((faq) => /card/i.test(faq.question));
      if (!cardQuestion) problems.push(`${domain}: no card question`);
      else if (!new RegExp(`\\b${noCard}\\b`).test(cardQuestion.answer)) problems.push(`${domain}: card answer misses no-card count ${noCard}`);

      const blob = [intro, ...faqs.flatMap((faq) => [faq.question, faq.answer])].join("\n");
      if (/including none|undefined|NaN|do not say|sit in that group|other changed entries|\.\./.test(blob)) problems.push(`${domain}: broken FAQ wording`);
      if (/\([A-Z][^)]{30,}\)/.test(blob)) problems.push(`${domain}: changelog note pasted into an answer`);
      // Names quoted from this category's own titles, providers, or change notes are in-bounds.
      const localHaystack = group.flatMap((entry) => [entry.title, entry.provider, ...entry.changes.map((change) => change.note)]).join("\n");
      for (const other of DOMAINS) {
        if (other === domain) continue;
        for (const title of titlesByDomain.get(other) ?? []) {
          if (title.length < 5) continue;
          if (mentionsTitle(blob, title) && !mentionsTitle(localHaystack, title)) problems.push(`${domain}: names ${title} from ${other}`);
        }
      }

      for (const faq of faqs) {
        const owner = questions.get(faq.question);
        if (owner) problems.push(`duplicate question "${faq.question}" on ${owner} and ${domain}`);
        questions.set(faq.question, domain);
        if (!faq.answer.trim() || !faq.question.endsWith("?")) problems.push(`${domain}: bad FAQ "${faq.question}"`);
      }

      const parsed = JSON.parse(jsonLd([faqPage(`/category/${domain}/`, faqs)])) as { "@graph": { "@type": string }[] };
      if (parsed["@graph"].filter((node) => node["@type"] === "FAQPage").length !== 1) problems.push(`${domain}: FAQPage count`);

      for (const filter of FILTER_SLUGS) {
        const onPage = group.filter(filter === "no-card" ? isNoCard : isHardCap);
        if (onPage.length < MIN_CATEGORY_ENTRIES) continue;
        const filterIntroText = filterIntro(domain, filter, onPage);
        const filterSentences = proseSentences(filterIntroText);
        if (filterSentences.length < 2 || filterSentences.length > 3) problems.push(`${domain}/${filter}: intro has ${filterSentences.length} sentences`);
        if (filterIntroText === intro) problems.push(`${domain}/${filter}: intro copies the base category`);
        const meta = filterDescription(domain, filter, onPage);
        if (meta.length < 50 || meta.length > 160) problems.push(`${domain}/${filter}: meta is ${meta.length}`);
        const filterFaq = filterFaqs(domain, filter, onPage);
        if (filterFaq.length !== 3) problems.push(`${domain}/${filter}: ${filterFaq.length} FAQs`);
        for (const faq of filterFaq) {
          if (questions.has(faq.question)) problems.push(`${domain}/${filter}: repeats "${faq.question}"`);
          questions.set(faq.question, `${domain}/${filter}`);
          if (faq.answer.includes("undefined") || faq.answer.includes("including none")) problems.push(`${domain}/${filter}: broken answer`);
        }
        const unknownOnPage = onPage.filter(filter === "no-card" ? isCardUnknown : isCapUnknown);
        if (unknownOnPage.length > 0) problems.push(`${domain}/${filter}: includes unconfirmed policy`);
        const filterParsed = JSON.parse(jsonLd([faqPage(`/category/${domain}/${filter}/`, filterFaq)])) as { "@graph": { "@type": string }[] };
        if (filterParsed["@graph"].filter((node) => node["@type"] === "FAQPage").length !== 1) problems.push(`${domain}/${filter}: FAQPage count`);
      }
    }

    expect(problems).toEqual([]);
  }, 60_000);
});
