import { ChevronDown } from "lucide-react";

export type FaqItem = { question: string; answer: string };

/** Visible questions, matching the FAQPage node on the same page. */
export function FaqList({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="faq-title" className="mt-10 scroll-mt-24 border-t border-line pt-8">
      <h2 id="faq-title" className="section-title">
        Questions people ask
      </h2>
      <div className="mt-4 divide-y divide-line rounded-2xl border border-line bg-surface px-4 sm:px-5">
        {items.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-3.5 text-[15.5px] font-semibold leading-snug text-ink [&::-webkit-details-marker]:hidden">
              <h3>{item.question}</h3>
              <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-ink-3 transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <p className="max-w-[68ch] pb-4 text-[15.5px] leading-relaxed text-ink-2">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
