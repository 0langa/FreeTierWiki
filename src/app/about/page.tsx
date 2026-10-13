import type { Metadata } from "next";

import { FreshnessLabel, RiskPill } from "@/components/entry/labels";
import { PageHeader } from "@/components/site/page-header";
import { REPO_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "How we rate free tiers",
  description: "What billing risk, plan type, and last checked mean on freetier.wiki.",
  alternates: { canonical: "/about/" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="section-title">{title}</h2>
      <div className="reading mt-4 grid gap-4">{children}</div>
    </section>
  );
}

function Term({ name, children }: { name: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[150px_1fr] sm:gap-4">
      <dt className="font-semibold">{name}</dt>
      <dd className="text-ink-2">{children}</dd>
    </div>
  );
}

export default function AboutPage() {
  return (
    <article className="max-w-[70ch]">
      <PageHeader
        title="How we rate free tiers"
        lede="freetier.wiki lists free plans for developers. For each one it shows the limits, the card rules, the billing risk, and how fresh that information is."
      />
      <div className="mt-10 grid gap-10">
        <Section title="Billing risk">
          <dl className="grid gap-4">
            <Term name={<RiskPill risk="none" />}>
              The plan is unlimited, or going over the limit stops or throttles the service. Either way, you should not get a bill by accident.
            </Term>
            <Term name={<RiskPill risk="low" />}>Going over is unlikely to cost money, but read the watch-out notes.</Term>
            <Term name={<RiskPill risk="medium" />}>A card is on file and usage above the free amount is billed. Set a spending limit.</Term>
            <Term name={<RiskPill risk="high" />}>No real free plan, or usage is billed from the start.</Term>
          </dl>
        </Section>

        <Section title="Plan types">
          <dl className="grid gap-4">
            <Term name="Always free">The free amount renews and does not expire.</Term>
            <Term name="Credit">A money amount you spend down.</Term>
            <Term name="Trial">Free for a limited time.</Term>
            <Term name="Time-limited">Free for a set period after sign-up, then it changes.</Term>
          </dl>
        </Section>

        <Section title="Freshness labels">
          <dl className="grid gap-4">
            <Term name={<FreshnessLabel freshness={{ state: "checked", date: "2026-09-25" }} />}>
              A date with a check mark is the day someone compared the entry with the official pricing page. If a check is more than 6 months
              older than the site build, it shows as stale.
            </Term>
            <Term name={<FreshnessLabel freshness={{ state: "imported", date: "2024-06-09" }} />}>
              A gray date is when the entry&apos;s data is from (about June 2024). Nobody has re-checked it since. It may be out of date.
            </Term>
          </dl>
        </Section>

        <Section title="Where the data comes from">
          <p>
            The first version of every entry was written with AI help, from the provider&apos;s name and website. Its facts reflect about
            mid-2024. That is why each entry shows when a person last checked it against the official pricing page. Entries without a check
            mark are leads, not facts.
          </p>
        </Section>

        <Section title="Report an error">
          <p>
            Every entry has a “Report outdated info” link. It opens a short form on{" "}
            <a href={`${REPO_URL}/issues/new?template=outdated-info.yml`} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            . A link to the official pricing page helps most.
          </p>
        </Section>
      </div>
    </article>
  );
}
