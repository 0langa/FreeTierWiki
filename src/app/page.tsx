import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { ChangePill, FreshnessLabel, RiskPill } from "@/components/entry/labels";
import { OfferText } from "@/components/entry/offer-text";
import { HeroSearchButton } from "@/components/site/hero-search-button";
import { DomainIcon, JobIcon } from "@/components/site/icons";
import { BUILD_NOW } from "@/lib/build-info";
import { DOMAIN_LABELS } from "@/lib/content";
import { liveComparisons } from "@/lib/comparison-view";
import { getAllEntries, getComparisons, getPopular } from "@/lib/content.server";
import { compareSafety, toListItem } from "@/lib/entry-view";
import { FEED_ALTERNATE } from "@/lib/feed";
import { formatDay, formatMonth } from "@/lib/format";
import { latestChanges, topCategories } from "@/lib/home-data";
import { mostVisited } from "@/lib/popular-view";

export const metadata: Metadata = {
  alternates: { canonical: "/", types: FEED_ALTERNATE },
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

// Fallback while the weekly most-visited job has not run yet. Hand-picked, not scored: common first
// needs, each with a well-known free plan. `limit` picks which limit line to show;
// `short` replaces a limit line that is too long for one row.
const POPULAR_PICKS: { need: string; slug: string; limit: number; short?: string }[] = [
  { need: "Postgres database", slug: "neon", limit: 2 },
  { need: "Static site hosting", slug: "cloudflare-pages", limit: 0 },
  { need: "Serverless functions", slug: "cloudflare-workers", limit: 0 },
  { need: "LLM API", slug: "gemini-api", limit: 0, short: "Free tokens on supported models" },
  { need: "User login", slug: "clerk", limit: 0 },
  { need: "Email API", slug: "resend", limit: 0 },
  { need: "File storage", slug: "cloudflare-r2", limit: 0 },
  { need: "Error tracking", slug: "sentry", limit: 0 },
];

// The hero card lists this many rows on desktop; phones see five, so "Pick by job" stays within one scroll.
const HERO_ROWS = 6;

function SectionHeading({ id, title, note, link }: { id: string; title: string; note?: string; link?: { href: string; label: string } }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <div>
        <h2 id={id} className="text-[22px] font-semibold tracking-tight sm:text-[24px]">
          {title}
        </h2>
        {note ? <p className="mt-1 text-[14px] text-ink-3">{note}</p> : null}
      </div>
      {link ? (
        <Link href={link.href} className="text-[14px] text-ink-2 underline decoration-line underline-offset-[3px] hover:text-ink hover:decoration-ink">
          {link.label}
        </Link>
      ) : null}
    </div>
  );
}

export default async function HomePage() {
  const entries = await getAllEntries();
  const items = entries.map((entry) => toListItem(entry, BUILD_NOW));
  const activeCount = entries.filter((entry) => entry.status !== "ended").length;
  const categories = topCategories(items, 12);
  const safePicks = items
    .filter((item) => item.freshness.state === "checked" && item.status === "active" && !item.card && item.cap && item.risk === "none")
    .sort(compareSafety)
    .slice(0, 3);
  // A visitor only needs to know which plans changed or ended. New entries and removed listings are
  // housekeeping and stay on the changelog page.
  const changes = latestChanges(entries)
    .filter((change) => change.kind === "changed" || change.kind === "ended")
    .slice(0, 5);
  const jobs = liveComparisons(await getComparisons(), new Set(entries.filter((entry) => entry.status !== "ended").map((entry) => entry.id)));
  // The hero card shows real visits once content/popular.json exists with enough live entries.
  const popular = await getPopular();
  const visited = popular ? mostVisited(popular.paths, items, HERO_ROWS) : [];
  const picks = POPULAR_PICKS.flatMap((pick) => {
    const entry = entries.find((candidate) => candidate.slug === pick.slug && candidate.status !== "ended");
    return entry ? [{ ...pick, entry, text: pick.short ?? entry.freeTierDetails.limits[pick.limit] ?? entry.freeTierDetails.limits[0] }] : [];
  }).slice(0, HERO_ROWS);

  return (
    <>
      <section className="relative grid grid-cols-[minmax(0,1fr)] items-start gap-12 pb-12 pt-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16 lg:pb-16 lg:pt-14 2xl:grid-cols-[minmax(0,1fr)_460px] 2xl:gap-24">
        {/* A soft glow behind the hero. Decorative, and kept inside the page column so it never widens the page. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-14 -z-10 h-[480px] bg-[radial-gradient(60%_60%_at_30%_0%,var(--brand-glow),transparent_70%)]"
        />
        <div>
          <p className="eyebrow">{activeCount} free plans for developers</p>
          <h1 className="mt-4 max-w-[14ch] text-[40px] font-bold leading-[1.02] tracking-tight sm:text-[56px] lg:text-[60px]">
            Free tiers, with the <em className="not-italic text-brand">fine print.</em>
          </h1>
          <p className="mb-7 mt-5 max-w-[56ch] text-[17px] leading-relaxed text-ink-2 sm:text-lg">
            Find a free plan you can build on. Each entry shows the limits, whether it needs a card, what happens when you go over, and how
            fresh the data is.
          </p>
          <HeroSearchButton />
          <div className="mt-4 flex flex-wrap gap-2">
            {QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="chip">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 text-[14px] leading-relaxed text-ink-2">
            <CheckCircle2 className="mt-[3px] h-4 w-4 shrink-0 text-brand" aria-hidden />
            <span>
              Every entry is checked against its official pricing page. The check date is on each entry.{" "}
              <Link href="/about/" className="underline decoration-line underline-offset-[3px] hover:text-ink hover:decoration-ink">
                How we rate
              </Link>
            </span>
          </p>
        </div>
        {popular && visited.length >= 5 ? (
          <section aria-labelledby="visited-title" className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
            <h2 id="visited-title" className="text-[16px] font-semibold">
              Most visited
            </h2>
            <p className="mb-2 mt-0.5 text-[13px] text-ink-3">
              What people opened in the last {popular.days} days · updated {formatDay(popular.updated)}
            </p>
            <ol className="divide-y divide-line">
              {visited.map((item, index) => (
                <li key={item.id} className={index >= 5 ? "hidden lg:block" : undefined}>
                  <Link href={item.url} className="group grid min-w-0 grid-cols-[minmax(0,1fr)] gap-1 py-3">
                    <span className="flex min-w-0 items-baseline justify-between gap-3">
                      <span className="truncate text-[15px] font-semibold group-hover:underline">{item.title}</span>
                      <span className="shrink-0 text-xs text-ink-3">{DOMAIN_LABELS[item.domain]}</span>
                    </span>
                    {item.offer.length > 0 ? (
                      <span className="line-clamp-2 text-[13.5px] leading-5 text-ink-2">
                        {item.offer.slice(0, 2).map((part, index) => (
                          <span key={index}>
                            {index > 0 ? <span className="text-ink-3"> · </span> : ""}
                            <OfferText text={part} />
                          </span>
                        ))}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ) : picks.length > 0 ? (
          <section aria-labelledby="picks-title" className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
            <h2 id="picks-title" className="text-[16px] font-semibold">
              Common first picks
            </h2>
            <p className="mb-2 mt-0.5 text-[13px] text-ink-3">One well-known free plan per need, picked by hand</p>
            <ul className="divide-y divide-line">
              {picks.map((pick, index) => (
                <li key={pick.slug} className={index >= 5 ? "hidden lg:block" : undefined}>
                  <Link href={pick.entry.url} className="group grid min-w-0 grid-cols-[minmax(0,1fr)] gap-1 py-3">
                    <span className="flex min-w-0 items-baseline justify-between gap-3">
                      <span className="truncate text-[15px] font-semibold group-hover:underline">{pick.entry.title}</span>
                      <span className="shrink-0 text-xs text-ink-3">{pick.need}</span>
                    </span>
                    <span className="line-clamp-2 text-[13.5px] leading-5 text-ink-2">
                      <OfferText text={pick.text} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </section>

      {jobs.length > 0 ? (
        <section className="mt-6" aria-labelledby="jobs-title">
          <SectionHeading id="jobs-title" title="Pick by job" note="One table per need, safest free plan first" link={{ href: "/compare/", label: "All comparisons" }} />
          <ul className="tile-grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {jobs.map((job) => (
              <li key={job.slug} className="bg-surface">
                <Link href={job.href} className="flex h-full items-center gap-3 px-3.5 py-3 text-[14px] font-medium transition-colors hover:bg-surface-2 sm:px-5 sm:text-[14.5px]">
                  <span className="hidden h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink-2 sm:grid">
                    <JobIcon slug={job.slug} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 leading-snug">{job.label}</span>
                  <span className="font-mono text-[13px] font-medium text-ink-3">{job.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-16" aria-labelledby="categories-title">
        <SectionHeading id="categories-title" title="Browse by category" link={{ href: "/explorer/", label: "All entries" }} />
        <div className="tile-grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
          {categories.map((category) => (
            <Link key={category.domain} href={`/category/${category.domain}/`} className="flex items-start gap-3 bg-surface px-3.5 py-4 transition-colors hover:bg-surface-2 sm:px-5">
              <span className="mt-0.5 hidden h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink-2 sm:grid">
                <DomainIcon domain={category.domain} className="h-4 w-4" />
              </span>
              <span className="grid min-w-0 flex-1 gap-0.5">
                <span className="flex items-baseline justify-between gap-2 text-[15px] font-semibold">
                  {DOMAIN_LABELS[category.domain]}
                  <span className="font-mono text-[13px] font-medium text-ink-3">{category.count}</span>
                </span>
                <span className="truncate text-[13px] text-ink-3">{category.examples.join(", ")}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {safePicks.length >= 3 ? (
        <section className="mt-16" aria-labelledby="safe-title">
          <SectionHeading id="safe-title" title="Safe places to start" note="Checked recently · no card · hard cap" />
          <div className="grid gap-3 md:grid-cols-3">
            {safePicks.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="grid grid-cols-[1fr_auto] content-start gap-x-4 gap-y-2 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-ink-3"
              >
                <span>
                  <span className="block text-[16px] font-semibold">{item.title}</span>
                  <span className="text-[13px] text-ink-3">{DOMAIN_LABELS[item.domain]}</span>
                </span>
                <RiskPill risk={item.risk} />
                <span className="col-span-2 text-[14px] leading-relaxed text-ink-2">
                  {item.offer.map((part, index) => (
                    <span key={index}>
                      {index > 0 ? <span className="text-ink-3"> · </span> : ""}
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

      {/* A footnote, not a feature: the few plans that changed or ended lately. The changelog page has the rest. */}
      <section aria-labelledby="changelog-title" role="region" className="mt-16 border-t border-line pt-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 id="changelog-title" className="text-[16px] font-semibold">
            Free tier changelog
          </h2>
          <Link href="/changelog/" className="text-[14px] text-ink-2 underline decoration-line underline-offset-[3px] hover:text-ink hover:decoration-ink">
            All changes
          </Link>
        </div>
        {changes.length > 0 ? (
          <ol className="mt-4 grid gap-x-8 gap-y-2.5 text-[14px] md:grid-cols-2">
            {changes.map((change) => (
              <li key={`${change.url}-${change.date}`} className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="shrink-0 font-mono text-xs text-ink-3">{formatMonth(change.date)}</span>
                <Link href={change.url} className="font-semibold hover:underline">
                  {change.title}
                </Link>
                <ChangePill kind={change.kind} />
                <span className="w-full truncate text-ink-3 md:w-auto md:flex-1">{change.note}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-3 text-sm text-ink-3">No changes recorded yet.</p>
        )}
      </section>
    </>
  );
}
