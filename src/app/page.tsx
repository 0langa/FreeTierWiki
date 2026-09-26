import type { Metadata } from "next";
import Link from "next/link";

import { FactsLabel } from "@/components/entry/facts-label";
import { ChangePill, FreshnessLabel, RiskPill, StatusPill } from "@/components/entry/labels";
import { OfferText } from "@/components/entry/offer-text";
import { HeroSearchButton } from "@/components/site/hero-search-button";
import { BUILD_NOW } from "@/lib/build-info";
import { DOMAIN_LABELS } from "@/lib/content";
import { getAllEntries, getRemovals } from "@/lib/content.server";
import { compareSafety, toListItem } from "@/lib/entry-view";
import { formatMonth } from "@/lib/format";
import { freshnessDate, getFreshness } from "@/lib/freshness";
import { latestChanges, topCategories } from "@/lib/home-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const QUICK_LINKS = [
  { href: "/explorer/?nocard=1", label: "No card needed" },
  { href: "/explorer/?cap=1", label: "Hard cap only" },
  { href: "/category/database/", label: "Databases" },
  { href: "/category/hosting/", label: "Hosting" },
  { href: "/category/ai/", label: "AI" },
  { href: "/category/auth/", label: "Auth" },
  { href: "/category/storage/", label: "Storage" },
];

export default async function HomePage() {
  const entries = await getAllEntries();
  const items = entries.map((entry) => toListItem(entry, BUILD_NOW));
  const activeCount = entries.filter((entry) => entry.status !== "ended").length;
  // Counts entries that carry a lastVerified date at all (checked, stale, or ended-with-a-date),
  // not only the ones currently within the "checked" freshness window.
  const verified = items.filter(
    (item) =>
      item.freshness.state === "checked" ||
      item.freshness.state === "stale" ||
      (item.freshness.state === "ended" && freshnessDate(item.freshness) !== undefined),
  ).length;
  const categories = topCategories(items, 12);
  const safePicks = items
    .filter((item) => item.freshness.state === "checked" && item.status === "active" && !item.card && item.cap && item.risk === "none")
    .sort(compareSafety)
    .slice(0, 3);
  const changes = latestChanges(entries, 5, await getRemovals());
  const example = entries.find((entry) => entry.slug === "cloudflare-workers") ?? entries[0];
  const progress = entries.length > 0 ? Math.max((verified / entries.length) * 100, 1) : 0;

  return (
    <>
      <section className="grid items-center gap-14 pb-10 pt-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:pt-[72px]">
        <div>
          <p className="eyebrow">{activeCount} free plans for developers</p>
          <h1 className="mt-4 max-w-[14ch] text-[38px] font-bold leading-[1.02] tracking-tight sm:text-[56px]">
            Free tiers, with the <em className="not-italic text-brand">fine print.</em>
          </h1>
          <p className="mb-7 mt-5 max-w-[60ch] text-base text-ink-2 sm:text-lg">
            Find a free plan you can build on. Each entry shows the limits, whether it needs a card, what happens when you go over, and how
            fresh the data is.
          </p>
          <HeroSearchButton />
          <div className="mt-4 flex flex-wrap gap-2">
            {QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="inline-flex h-8 items-center rounded-full border border-line bg-surface px-3 text-[13.5px] text-ink-2 hover:border-ink-3 hover:text-ink">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        {example ? (
          <div className="hidden rotate-[1.2deg] shadow-soft lg:block">
            <FactsLabel entry={example} freshness={getFreshness(example, BUILD_NOW)} compact />
          </div>
        ) : null}
      </section>

      <section aria-label="Checking progress" className="grid gap-2 rounded-2xl border border-line bg-surface px-6 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-x-8">
        <p className="text-sm text-ink-2">
          <strong className="text-ink">
            {verified} of {entries.length}
          </strong>{" "}
          entries checked against the official pricing page. Every entry shows its own date.
        </p>
        <Link href="/about/" className="whitespace-nowrap text-sm font-medium text-brand">
          How we check →
        </Link>
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-2 sm:col-span-2" aria-hidden>
          <div className="h-full rounded-full bg-brand" style={{ width: `${progress}%` }} />
        </div>
      </section>

      <section className="mt-14" aria-labelledby="categories-title">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 id="categories-title" className="text-xl font-semibold tracking-tight">
            Browse by category
          </h2>
          <Link href="/explorer/" className="text-sm text-ink-2 hover:text-ink">
            All entries →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.domain} href={`/category/${category.domain}/`} className="grid gap-1 bg-surface px-5 py-[18px] hover:bg-surface-2">
              <span className="flex items-baseline justify-between gap-2 font-semibold">
                {DOMAIN_LABELS[category.domain]}
                <span className="font-mono text-[13px] font-medium text-ink-3">{category.count}</span>
              </span>
              <span className="truncate text-[13px] text-ink-3">{category.examples.join(", ")}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className={`mt-14 grid gap-8 ${safePicks.length >= 3 ? "lg:grid-cols-[1.25fr_1fr]" : ""}`}>
        {safePicks.length >= 3 ? (
          <section aria-labelledby="safe-title">
            <h2 id="safe-title" className="text-xl font-semibold tracking-tight">
              Safe places to start
            </h2>
            <p className="mb-4 mt-0.5 text-[13px] text-ink-3">Checked recently · no card · hard cap</p>
            <div className="grid gap-3">
              {safePicks.map((item) => (
                <Link key={item.id} href={item.url} className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 rounded-xl border border-line bg-surface px-[18px] py-4 hover:border-ink-3">
                  <span>
                    <span className="block font-semibold">{item.title}</span>
                    <span className="text-[13px] text-ink-3">{DOMAIN_LABELS[item.domain]}</span>
                  </span>
                  <RiskPill risk={item.risk} />
                  <span className="col-span-2 font-mono text-[13px] text-ink-2">
                    {item.offer.map((part, index) => (
                      <span key={index}>
                        {index > 0 ? " · " : ""}
                        <OfferText text={part} />
                      </span>
                    ))}
                  </span>
                  <span className="col-span-2">
                    <FreshnessLabel freshness={item.freshness} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section aria-labelledby="changelog-title" role="region">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="changelog-title" className="text-xl font-semibold tracking-tight">
              Free tier changelog
            </h2>
            <Link href="/changelog/" className="text-sm text-ink-2 hover:text-ink">
              All →
            </Link>
          </div>
          <p className="mb-4 mt-0.5 text-[13px] text-ink-3">What changed, newest first</p>
          {changes.length > 0 ? (
            <ol className="divide-y divide-line rounded-xl border border-line bg-surface">
              {changes.map((change) => (
                <li key={`${change.url}-${change.date}`} className="grid grid-cols-[76px_1fr] gap-x-3 gap-y-1 px-[18px] py-3.5">
                  <span className="font-mono text-xs font-medium leading-7 text-ink-3">{formatMonth(change.date)}</span>
                  <span className="flex flex-wrap items-center gap-2 text-[14.5px] font-semibold">
                    <Link href={change.url} className="hover:underline">
                      {change.title}
                    </Link>
                    <ChangePill kind={change.kind} />
                  </span>
                  <p className="col-start-2 text-[13.5px] text-ink-2">{change.note}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="rounded-xl border border-dashed border-line p-6 text-sm text-ink-3">No changes recorded yet.</p>
          )}
        </section>
      </div>

      <section aria-label="How we rate" className="mt-14 grid gap-6 rounded-2xl border border-line p-7 md:grid-cols-3">
        <div>
          <RiskPill risk="none" />
          <h3 className="mb-1.5 mt-2.5 text-[15px] font-semibold">Billing risk</h3>
          <p className="text-sm text-ink-2">How likely you are to get a bill by accident. “None” means the plan is unlimited, or going over stops the service instead of charging you.</p>
        </div>
        <div>
          <FreshnessLabel freshness={{ state: "checked", date: BUILD_NOW.toISOString().slice(0, 10) }} />
          <h3 className="mb-1.5 mt-2.5 text-[15px] font-semibold">Last checked</h3>
          <p className="text-sm text-ink-2">
            The day someone compared the entry with the official pricing page. If a check is more than 6 months older than the site build, it
            shows as stale.
          </p>
        </div>
        <div>
          <StatusPill status="ended" />
          <h3 className="mb-1.5 mt-2.5 text-[15px] font-semibold">Changed or ended</h3>
          <p className="text-sm text-ink-2">When a free plan changes or ends, the entry says so at the top and the changelog records the date.</p>
        </div>
      </section>
    </>
  );
}
