import type { Metadata } from "next";

import { FreshnessLabel, RiskPill } from "@/components/entry/labels";
import { REPO_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "How we rate free tiers",
  description: "What billing risk, plan type, and last checked mean on freetier.wiki.",
  alternates: { canonical: "/about/" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="mb-2.5 text-lg font-semibold">{title}</h2>
      <div className="grid gap-3 text-ink-2">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <article className="max-w-[70ch] pt-8">
      <h1 className="text-[28px] font-bold tracking-tight">How we rate free tiers</h1>
      <p className="mt-2 text-ink-2">freetier.wiki lists free plans for developers. For each one it shows the limits, the card rules, the billing risk, and how fresh that information is.</p>

      <Section title="Billing risk">
        <p className="flex flex-wrap items-center gap-2">
          <RiskPill risk="none" /> <RiskPill risk="low" /> <RiskPill risk="medium" /> <RiskPill risk="high" />
        </p>
        <p>
          <strong className="text-ink">None:</strong> going over the limit stops or throttles the service. You cannot get a bill by accident.
        </p>
        <p>
          <strong className="text-ink">Low:</strong> going over is unlikely to cost money, but read the watch-out notes.
        </p>
        <p>
          <strong className="text-ink">Medium:</strong> a card is on file and usage above the free amount is billed. Set a spending limit.
        </p>
        <p>
          <strong className="text-ink">High:</strong> no real free plan, or usage is billed from the start.
        </p>
      </Section>

      <Section title="Plan types">
        <p>
          <strong className="text-ink">Always free:</strong> the free amount renews and does not expire. <strong className="text-ink">Credit:</strong> a
          money amount you spend down. <strong className="text-ink">Trial:</strong> free for a limited time. <strong className="text-ink">Time-limited:</strong>{" "}
          free for a set period after sign-up, then it changes.
        </p>
      </Section>

      <Section title="Freshness labels">
        <p className="flex flex-wrap items-center gap-3">
          <FreshnessLabel freshness={{ state: "checked", date: "2026-09-25" }} />
          <FreshnessLabel freshness={{ state: "imported", date: "2024-06-09" }} />
        </p>
        <p>
          <strong className="text-ink">A date with a check mark</strong> is the day someone compared the entry with the official pricing page. After 6
          months the date turns amber: it is stale.
        </p>
        <p>
          <strong className="text-ink">A gray date</strong>{" "}
          is when the entry&apos;s data is from (about June 2024). Nobody has re-checked it since. It may
          be out of date.
        </p>
      </Section>

      <Section title="Where the data comes from">
        <p>
          The first version of every entry was written with AI help, from the provider&apos;s name and website. Its facts reflect about mid-2024.
          That is why each entry shows when a person last checked it against the official pricing page. Entries without a check mark are leads,
          not facts.
        </p>
      </Section>

      <Section title="Report an error">
        <p>
          Every entry has a “Report outdated info” link. It opens a short form on{" "}
          <a href={`${REPO_URL}/issues/new?template=outdated-info.yml`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
            GitHub
          </a>
          . A link to the official pricing page helps most.
        </p>
      </Section>
    </article>
  );
}
