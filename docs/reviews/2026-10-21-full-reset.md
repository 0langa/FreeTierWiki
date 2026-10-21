# Full catalog review — 21 October 2026

Compared all **945 catalog entries** with current official sources across today's review sessions. The published catalog contains **942 entries** after removing 3 specific listings whose current offers or advertised tools could not be established. The [complete per-entry record](2026-10-21-full-reset.json) lists sources, corrections, qualifications, and verification dates.

This review supersedes the unresolved-claims list in the [earlier 129-entry review](2026-10-21-pricing-remaining-129.md) and covers the previously shortened weekly queue from [issue #50](https://github.com/0langa/FreeTierWiki/issues/50). The goal was to compare every entry, including pages with unchanged hashes, rather than treating unchanged text as a new manual review.

## What was compared

For each entry, compared the frontmatter and body with provider pricing, feature tables, documentation, FAQs or terms: quantities, units, currency and billing period, feature inclusion, eligibility, reset periods, card requirements, quota enforcement, upgrade paths, and material onboarding claims. Used rendered browser tables and expanded FAQs where ordinary fetches omitted the relevant cells. No paid usage, new accounts, projects, trials or checkout were activated for this review.

Removed unsupported claims or qualified the exact uncertainty when current official sources did not establish an answer or contradicted each other. A Free price is not proof that signup needs no card; a no-card paid trial does not establish the policy for an ongoing Free plan. Blank or crossed table cells do not establish feature inclusion.

The catalog now represents unpublished or conflicting card and hard-cap policies as **Not confirmed**. At publication, 301 entries have an unconfirmed card policy and 432 have an unconfirmed quota-enforcement policy. Those are explicit provider-information gaps, not unchecked entries or assumed safe defaults. Dates record when the published claims were compared, not a promise that the provider publishes every policy. Verification-only reviews preserve the publication date.

## Source availability

All retained entries could be compared through current official sources.

The removed listings are:

- **tools/fabform**: Current free offer could not be verified: the official domain identifies its page as recovered from an archive, while linked pricing, demo and account pages are unavailable.
- **services/lost-pixel-com**: Delisted the hosted offer after Lost Pixel's official sunset announcement; its hosted app address now returns the marketing site and free onboarding could not be reached. The separate open-source project is not being declared closed.
- **services/extendsclass**: Delisted this REST-client offer because its advertised tool endpoint returns an internal server error in both direct retrieval and Chrome. The parent toolbox remains online; this is not a claim that the provider closed.

These are findings about the listed offer or tool, not declarations that the corresponding businesses or open-source projects closed. Former entry URLs redirect to the relevant category, and comparison references were removed.

## Freshness workflow changes

Ran the regular fetch-and-hash checker today over the catalog; the final run completed at **2026-10-21T18:48:40.152Z** with 930 ok, 8 thin, 4 blocked source results. Unreadable machine fetches were followed up through official alternatives or the browser during the per-entry comparison. A readable HTTP response alone is not a completed claim review.

The checker now fingerprints all readable source text beyond its former keyword selection and 6,000-character cutoff, records structural and feature-indicator markup changes, recognizes common maintenance/login/bot-check pages, and retains a complete machine-readable queue for changed, noisy, unreadable and still-unreviewed sources. Source URL changes require review even when extracted text matches. New or expanded baselines require comparison. Exact source revisions need deliberate review acknowledgement; a date-only edit cannot silently acknowledge a later change on the same day. The scanner no longer advances entry dates: static sources can omit browser-rendered plan tables, so an unchanged snapshot cannot justify a new entry review date.

Evidence checking now supports source-specific numeric conventions such as Open-Meteo's dot-grouped thousands, preserves semantic source-URL identity, fetches every cited evidence page, and invalidates older evidence when a current refetch is unavailable. Unchanged publication dates are valid when the verification date reflects the source comparison.

The full text and browser evidence stay in the private maintenance workspace. The public record includes source URLs and review findings, without republishing providers' pages or account information.
