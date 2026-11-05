# Catalog follow-up — 5 November 2026

The nine remaining comparisons from the November 2 review were revisited. **Eight are complete; TestTLS remains unresolved.** Six entries received corrections; Neo4j and Backblaze's offers were confirmed unchanged, with their verification dates refreshed and Backblaze's source link updated to its current destination.

The original 50-entry batch is now complete. The separate follow-up is **595 of 596 complete**, leaving **645 of the original 646 queued comparisons complete**. These are review-queue counts, not the size of the full catalog.

## Disposition

| Entry | Outcome | Published change |
| --- | --- | --- |
| [HERE](../../content/services/here.mdx) | Complete, corrected | Separate Limited from Base; restore two product-specific 30,000/month Base examples; include Tour Planning's optimization exception. |
| [IBM watsonx Orchestrate](../../content/services/ibm-watsonx-orchestrate.mdx) | Complete, corrected | Essentials starting price is $578/month; educational trial, invitation and expiry details rechecked. |
| [Neo4j AuraDB](../../content/services/neo4j-auradb.mdx) | Complete, unchanged | Verification date updated; current quota, lifecycle, backup and pricing documentation compared. |
| [Reddit Data API](../../content/services/reddit-data-api.mdx) | Complete, corrected | October 31 cutoff now expressed in past tense; other API/RSS deadlines retained. |
| [ROBOHASH](../../content/services/robohash.mdx) | Complete, corrected | Hard-cap flag is unknown; best-effort retry guidance does not establish a universal cap. |
| [Figma](../../content/tools/figma.mdx) | Complete, corrected | Direct answer now scopes three shared files to Design/Sites; replaced an inaccessible source with the inspection guide. |
| [IBM API Connect](../../content/tools/ibm-api-connect.mdx) | Complete, corrected | One instance/100,000-call trial, quota stop, expiry, retention and Standard-only scope; current onboarding. |
| [TestTLS](../../content/tools/testtls-com.mdx) | Incomplete, outage note updated | Homepage still returns 502; historical offer and lastVerified remain unchanged. |
| [Backblaze B2](../../content/services/backblaze-b2.mdx) | Complete, unchanged | Current signup page closes the original batch's no-card gap. |

## Evidence and qualifications

The [dated evidence records](2026-11-05-catalog-followup.json) contain source URLs, reading methods, short quotations, observations and remaining claims for all nine entries. Official sources were read through the normal local Firefox connection and web retrieval during 21:20–21:36 UTC. No accounts, trials or subscriptions were created.

- **HERE:** the local pricing accordions and detail dialogs expose the free vector-tile and geocoding tiers. These are examples for distinct Base products, not a universal allowance or an extension of Limited. The [Base restrictions](https://www.here.com/get-started/pricing/base-plan-restrictions) expressly allow Tour Planning for optimization. The legal page still returned an error; the revised billing wording relies on readable pricing information.
- **IBM API Connect:** the [current subscription guide](https://www.ibm.com/docs/en/api-connect/cloud/12.1.1_saas?topic=overview-purchase-subscription-upgrade-information) documents the quota stop and retention window. It excludes Premium features despite trial links under Premium on the marketing table. Card requirements remain unknown; the first registration screen is not proof of the complete signup process.
- **Figma:** the pricing page still promotes AI add-ons broadly while the purchase guide names paid-plan admins. The existing qualification remains. Starter's card policy is still not explicitly established.
- **Neo4j:** an older marketing FAQ contains smaller graph sizes and no backups. The current quotas and backup guides govern the catalog figures; the current pricing comparison supplies no-card and feature evidence.
- **TestTLS:** a local browser and web retrieval both returned nginx 502. Only the outage observation was refreshed. Recovery is needed to recompare the historical offer; no shutdown date or ended status was inferred.

Corrections here describe changes to the catalog. They do not claim that a provider introduced a price or policy change on November 5. lastVerified advances only for completed comparisons; unchanged entries preserve lastUpdated.

The [current follow-up ledger](2026-11-02-followup-77.json) and the earlier handoff's latest-status pointer are updated. Prior pass counts and observations remain as historical records. The eight completed reviews have explicit source-revision acknowledgements on `freshness-data`; their exact fingerprints are recorded in the evidence JSON. HERE's static fingerprint contains only a page shell, so the browser comparison remains necessary evidence for its pricing. TestTLS and the remaining review issue stay open.

## Routing cleanup

Commit [06e3f0a2](https://github.com/0langa/FreeTierWiki/commit/06e3f0a2f83d90c9095ab41aa590c06ee9c70849) excludes static .txt navigation payloads, explicit .md files, /api/* and /.well-known/* from the Pages Function. Directory page URLs retain HTML/Markdown negotiation.

The change was published as Cloudflare deployment 652c7525-15aa-4620-a472-85312b030bae. Local runtime evidence distinguished Function invocation from static serving using a temporary response marker. Production requests covered negotiated Markdown, explicit Markdown, a navigation payload, the catalog API and discovery metadata.

HTML page requests still invoke the Function. These exclusions reduce avoidable usage but do not guarantee that a heavy crawl cannot exhaust the daily allowance.
