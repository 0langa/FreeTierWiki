import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

import { MdxContent, type MdxComponents } from "@/components/entry/mdx-content";
import { bodySections, SECTION_TITLES, splitFaq, type BodySection } from "@/lib/entry-body";

// Each gotcha is a card with a warning mark, like the "Watch out" rows in the facts label.
const GOTCHAS: MdxComponents = {
  li: ({ children }: { children?: ReactNode }) => (
    <li className="flex gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-[15px] leading-relaxed">
      <span
        aria-hidden
        className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-risk-med-bg font-mono text-[12px] font-bold text-risk-med"
      >
        !
      </span>
      <span>{children}</span>
    </li>
  ),
};

// Each alternative is a card whose link leads to the other entry.
const ALTERNATIVES: MdxComponents = {
  li: ({ children }: { children?: ReactNode }) => (
    <li className="rounded-xl border border-line bg-surface px-4 py-3 text-[15px] leading-relaxed">{children}</li>
  ),
  a: ({ href, children }: { href?: string; children?: ReactNode }) => (
    <Link href={href ?? "#"} className="font-semibold">
      {children}
    </Link>
  ),
};

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line pt-8">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

function Faq({ section }: { section: BodySection }) {
  const { lead, items } = splitFaq(section.markdown);
  return (
    <Section id={section.id} title={section.title}>
      {lead ? <MdxContent source={lead} className="reading mt-4" /> : null}
      <div className="mt-4 divide-y divide-line rounded-2xl border border-line bg-surface px-4 sm:px-5">
        {items.map((item) => (
          <details key={item.id} id={item.id} className="group scroll-mt-24">
            <summary className="flex items-start justify-between gap-4 py-3.5 text-[15.5px] font-semibold leading-snug text-ink">
              <h3>{item.question}</h3>
              <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-ink-3 transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <MdxContent source={item.markdown} className="reading pb-4 text-[15.5px]" />
          </details>
        ))}
      </div>
    </Section>
  );
}

/** The deep body of an entry, one block per "##" section, each with the rendering that fits it. */
export function EntryBody({ raw }: { raw: string }) {
  const { intro, sections } = bodySections(raw);
  return (
    <section aria-label="About the free plan" className="grid gap-9 lg:gap-10">
      {intro ? <MdxContent source={intro} className="reading reading-lede" /> : null}
      {sections.map((section) => {
        if (section.title === SECTION_TITLES.questions) return <Faq key={section.id} section={section} />;
        const components =
          section.title === SECTION_TITLES.gotchas ? GOTCHAS : section.title === SECTION_TITLES.alternatives ? ALTERNATIVES : undefined;
        return (
          <Section key={section.id} id={section.id} title={section.title}>
            <MdxContent source={section.markdown} components={components} className={`reading mt-4 ${components ? "reading-cards" : ""}`} />
          </Section>
        );
      })}
    </section>
  );
}
