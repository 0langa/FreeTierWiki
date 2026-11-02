# Resumed review of issue #77: batch 5

> Latest status: the [sequential review](2026-11-02-sequential-77.md) attempted all 325 pending entries and completed 315. **586 of 596 follow-up comparisons are complete; 10 remain incomplete.** The report below preserves its historical checkpoint; the [current ledger](2026-11-02-followup-77.json) records current entry status.

All 72 assigned entries remain unresolved: four have a partial comparison from the earlier pass, and 68 have no readable source evidence. No new comparison was completed in this resume; no content or verification dates changed. The original review remains historical in [the first batch report](2026-11-02-followup-77-batch-5.md).

The central retry stopped before reaching this batch after three consecutive cloud proxy failures. Subsequent control probes to three hosts also returned HTTP 503. This is an environment transport failure, not evidence that any provider blocked access or changed its offer. Further equivalent requests were stopped. `reviewStage` below describes cumulative progress; all rows have `resumeAttempted: false` in the machine-readable manifest.

## Partial comparisons retained

### services/statuspile

Repository confirms the MIT-licensed provider dashboard, more than 30 providers, and Auth0 configuration saving. The hosted page returns only its title, so current hosted no-card/free availability could not be independently established. Resume: the central collection stopped before this entry after the environment proxy failed again; no new source comparison was completed.

Source: [https://github.com/dogsbodytech/statuspile](https://github.com/dogsbodytech/statuspile). Supporting excerpt from the earlier pass:

> With over 30 providers currently available, we’ll be adding more over the coming months.

Still required: Render the hosted app or read current official hosted-service terms; do not equate the repository license with hosted availability.

### services/survicate

Help pages confirm 25 monthly responses, three users, stopped collection at quota, no Free export and conflicting storage figures. The fetched pricing page exposes FAQ questions but not the answers previously cited for one active survey and 30-day retention; those claims cannot be reconfirmed. Resume: the central collection stopped before this entry after the environment proxy failed again; no new source comparison was completed.

Source: [https://help.survicate.com/en/articles/8299893-survicate-free-account](https://help.survicate.com/en/articles/8299893-survicate-free-account). Supporting excerpt from the earlier pass:

> The free account allows you to collect 25 survey responses every month.

Still required: Render the pricing FAQ or obtain another official source for 30-day retention and the one-active-survey claim; reconcile the differing storage limits.

### services/tldraw-com

Official SDK pricing confirms a 100-day trial, production licensing and free hobby-license option. The hosted whiteboard page is thin and was not rendered before the transport failure; app-specific no-account/sharing/no-paid-tier claims remain unconfirmed. Resume: the central collection stopped before this entry after the environment proxy failed again; no new source comparison was completed.

Source: [https://tldraw.dev/pricing](https://tldraw.dev/pricing). Supporting excerpt from the earlier pass:

> Start with a 100-day free trial.

Still required: Render the separate tldraw.com application to check account-free access and sign-in-to-share behavior; do not conflate SDK terms with the hosted whiteboard.

### services/tolgee

Pricing supports the free 30,000-word/three-seat plan with no card, but billing, self-hosting and organization-limit pages failed when the environment transport broke. The 10k MT allowance, exact Free stops and ten-seat self-hosting rule cannot be fully compared. Resume: the central collection stopped before this entry after the environment proxy failed again; no new source comparison was completed.

Source: [https://tolgee.io/pricing](https://tolgee.io/pricing). Supporting excerpt from the earlier pass:

> 30 000 words
> 3 seats
> €0
> Get started for free
> No credit card required

Still required: Fetch current organization billing and self-hosting docs after environment recovery to verify MT credits, limit enforcement and self-hosted seat count.

## Entries without readable evidence

Each entry below still requires comparison of its complete material claims, including current allowance, eligibility, card requirements, exhaustion behavior and relevant caveats. The listed official URL is the first stored source to revisit; it is not supporting evidence. No supporting quotation is available. These entries were attempted during the original pass and were not reached by the resumed collector.

| Entry | Official source to revisit | Stage |
| --- | --- | --- |
| services/tomtom-maps | [https://docs.tomtom.com/pricing](https://docs.tomtom.com/pricing) | attempted-only |
| services/transfernow | [https://www.transfernow.net/](https://www.transfernow.net/) | attempted-only |
| services/trashmail-com | [https://mail.aionda.com/](https://mail.aionda.com/) | attempted-only |
| services/trigger-dev | [https://trigger.dev/pricing](https://trigger.dev/pricing) | attempted-only |
| services/trtc-tencent-rtc | [https://trtc.io/pricing](https://trtc.io/pricing) | attempted-only |
| services/tugboat | [https://www.tugboatqa.com/pricing](https://www.tugboatqa.com/pricing) | attempted-only |
| services/turso | [https://turso.tech/pricing](https://turso.tech/pricing) | attempted-only |
| services/twilio | [https://www.twilio.com/en-us/pricing](https://www.twilio.com/en-us/pricing) | attempted-only |
| services/twist-com | [https://twist.com/pricing](https://twist.com/pricing) | attempted-only |
| services/tyk | [https://tyk.io/pricing/](https://tyk.io/pricing/) | attempted-only |
| services/typeform | [https://www.typeform.com/pricing/](https://www.typeform.com/pricing/) | attempted-only |
| services/typesense-cloud | [https://cloud.typesense.org/pricing](https://cloud.typesense.org/pricing) | attempted-only |
| services/umami-cloud | [https://umami.is/pricing](https://umami.is/pricing) | attempted-only |
| services/unkey | [https://www.unkey.com/pricing](https://www.unkey.com/pricing) | attempted-only |
| services/unpkg | [https://unpkg.com/](https://unpkg.com/) | attempted-only |
| services/uptimerobot | [https://uptimerobot.com/pricing/](https://uptimerobot.com/pricing/) | attempted-only |
| services/uptimetoolbox-com | [https://www.uptimetoolbox.com/#pricing](https://www.uptimetoolbox.com/#pricing) | attempted-only |
| services/userforge-com | [https://userforge.com/](https://userforge.com/) | attempted-only |
| services/v0-dev | [https://v0.app/pricing](https://v0.app/pricing) | attempted-only |
| services/vaadin | [https://vaadin.com/pricing](https://vaadin.com/pricing) | attempted-only |
| services/val-town | [https://www.val.town/pricing](https://www.val.town/pricing) | attempted-only |
| services/vercel | [https://vercel.com/pricing](https://vercel.com/pricing) | attempted-only |
| services/vercel-blob | [https://vercel.com/docs/vercel-blob/usage-and-pricing](https://vercel.com/docs/vercel-blob/usage-and-pricing) | attempted-only |
| services/vercel-edge-functions | [https://vercel.com/pricing](https://vercel.com/pricing) | attempted-only |
| services/vercel-serverless-functions | [https://vercel.com/pricing](https://vercel.com/pricing) | attempted-only |
| services/verimail-io | [https://verimail.io/pricing](https://verimail.io/pricing) | attempted-only |
| services/virtual-machines | [https://azure.microsoft.com/en-us/free/](https://azure.microsoft.com/en-us/free/) | attempted-only |
| services/visual-crossing-weather | [https://www.visualcrossing.com/weather-data-editions](https://www.visualcrossing.com/weather-data-editions) | attempted-only |
| services/vonage-video-api | [https://www.vonage.com/communications-apis/video/pricing/](https://www.vonage.com/communications-apis/video/pricing/) | attempted-only |
| services/watchgoose | [https://watchgoose.com/pricing](https://watchgoose.com/pricing) | attempted-only |
| services/weatherapi-com | [https://www.weatherapi.com/pricing](https://www.weatherapi.com/pricing) | attempted-only |
| services/weaviate-cloud | [https://weaviate.io/pricing](https://weaviate.io/pricing) | attempted-only |
| services/web3forms | [https://web3forms.com/pricing](https://web3forms.com/pricing) | attempted-only |
| services/webflow | [https://webflow.com/pricing](https://webflow.com/pricing) | attempted-only |
| services/webhook-relay | [https://webhookrelay.com/pricing](https://webhookrelay.com/pricing) | attempted-only |
| services/webhook-site | [https://webhook.site](https://webhook.site) | attempted-only |
| services/webscraping-ai | [https://webscraping.ai/pricing](https://webscraping.ai/pricing) | attempted-only |
| services/webvizio | [https://webvizio.com/pricing](https://webvizio.com/pricing) | attempted-only |
| services/weights-biases | [https://wandb.ai/site/pricing](https://wandb.ai/site/pricing) | attempted-only |
| services/what-the-diff | [https://whatthediff.ai/pricing](https://whatthediff.ai/pricing) | attempted-only |
| services/windmill-dev | [https://windmill.dev/pricing](https://windmill.dev/pricing) | attempted-only |
| services/wistia-com | [https://wistia.com/pricing](https://wistia.com/pricing) | attempted-only |
| services/wolfram-language | [https://support.wolfram.com/53990](https://support.wolfram.com/53990) | attempted-only |
| services/workos | [https://workos.com/pricing](https://workos.com/pricing) | attempted-only |
| services/wundergraph | [https://wundergraph.com/pricing](https://wundergraph.com/pricing) | attempted-only |
| services/xurrent-imr | [https://www.xurrent.com/pricing/incident-management-response](https://www.xurrent.com/pricing/incident-management-response) | attempted-only |
| services/zenable | [https://zenable.io/pricing](https://zenable.io/pricing) | attempted-only |
| services/zenscrape | [https://zenscrape.com](https://zenscrape.com) | attempted-only |
| services/zerotier | [https://www.zerotier.com/pricing/](https://www.zerotier.com/pricing/) | attempted-only |
| services/zilliz-cloud | [https://zilliz.com/pricing](https://zilliz.com/pricing) | attempted-only |
| services/zoho-meeting | [https://www.zoho.com/meeting/pricing.html](https://www.zoho.com/meeting/pricing.html) | attempted-only |
| services/zoom-video-sdk | [https://zoom.us/pricing/developer](https://zoom.us/pricing/developer) | attempted-only |
| services/zulip | [https://zulip.com/plans/](https://zulip.com/plans/) | attempted-only |
| services/zuplo | [https://zuplo.com/pricing](https://zuplo.com/pricing) | attempted-only |
| tools/1password | [https://1password.com/pricing/business](https://1password.com/pricing/business) | attempted-only |
| tools/abstract-api | [https://www.abstractapi.com/pricing](https://www.abstractapi.com/pricing) | attempted-only |
| tools/apify | [https://apify.com/pricing](https://apify.com/pricing) | attempted-only |
| tools/appcircle | [https://appcircle.io/pricing](https://appcircle.io/pricing) | attempted-only |
| tools/appetize | [https://appetize.io/pricing](https://appetize.io/pricing) | attempted-only |
| tools/appsmith | [https://www.appsmith.com/pricing](https://www.appsmith.com/pricing) | attempted-only |
| tools/asana | [https://asana.com/pricing](https://asana.com/pricing) | attempted-only |
| tools/avo | [https://www.avo.app/pricing](https://www.avo.app/pricing) | attempted-only |
| tools/azure-api-management | [https://azure.microsoft.com/en-us/pricing/details/api-management/](https://azure.microsoft.com/en-us/pricing/details/api-management/) | attempted-only |
| tools/azure-automation | [https://azure.microsoft.com/en-us/pricing/details/automation/](https://azure.microsoft.com/en-us/pricing/details/automation/) | attempted-only |
| tools/azure-security-center | [https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/](https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/) | attempted-only |
| tools/browserstack | [https://www.browserstack.com/pricing](https://www.browserstack.com/pricing) | attempted-only |
| tools/bytebase | [https://www.bytebase.com/pricing/](https://www.bytebase.com/pricing/) | attempted-only |
| tools/cal-com | [https://cal.com/pricing](https://cal.com/pricing) | attempted-only |

## Validation

The result manifest covers all 72 assigned IDs once, preserves their original batch and signal, and records zero completed comparisons. No content changed, so content tests were not rerun for this blocked pass.
