import type { Metadata } from "next";

import { FreshnessLabel, RiskPill } from "@/components/entry/labels";
import { PageHeader } from "@/components/site/page-header";
import { REPO_URL } from "@/lib/links";
import { pageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "How we rate free tiers",
  description: "Learn how FreeTierWiki records free plan limits, card rules, billing risks, and source checks, and how to report outdated information.",
  ...pageUrl("/about/"),
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
              The listed free offer has no automatic usage charges. Its usage limits and enforcement are described separately in the entry.
            </Term>
            <Term name={<RiskPill risk="low" />}>Going over is unlikely to cost money, but read the watch-out notes.</Term>
            <Term name={<RiskPill risk="medium" />}>A card is on file and usage above the free amount is billed. Set a spending limit.</Term>
            <Term name={<RiskPill risk="high" />}>No real free plan, or usage is billed from the start.</Term>
          </dl>
        </Section>

        <Section title="Card and cap policies">
          <p>
            “Not confirmed” means the provider does not clearly publish the policy, or its official sources conflict. The entry&apos;s
            watch-out notes explain the specific gap. These entries do not appear in filters for confirmed no-card plans or hard caps.
          </p>
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
              A date with a check mark is the day the entry was last compared with official sources. The weekly source scanner does not advance this date automatically. If a check is more than 6 months
              older than the site build, it shows as stale.
            </Term>
            <Term name={<FreshnessLabel freshness={{ state: "imported", date: "2024-06-09" }} />}>
              A gray date is when the entry&apos;s data is from (about June 2024). Nobody has re-checked it since. It may be out of date.
            </Term>
          </dl>
          <p>A recent checked date records a source comparison. It does not make an unpublished card or cap policy certain; read the entry&apos;s caveats.</p>
        </Section>

        <Section title="Where the data comes from">
          <p>
            The catalog began with AI-assisted imports dating back to mid-2024. Maintenance compares entries with official pricing pages,
            billing guides, documentation and terms, then records corrections and source dates. Entries without a check mark are starting
            points for research and may be out of date.
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
