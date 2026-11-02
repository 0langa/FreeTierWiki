# Follow-up to review #77: batch 3

> Latest status: the [sequential review](2026-11-02-sequential-77.md) attempted all 325 pending entries and completed 315. **586 of 596 follow-up comparisons are complete; 10 remain incomplete.** The report below preserves its historical checkpoint; the [current ledger](2026-11-02-followup-77.json) records current entry status.

Reviewed on 2026-11-02 against current official source text captured in the local evidence cache. This report covers all 100 assigned IDs.

**42 comparisons completed: 31 confirmed and 11 corrected. Five comparisons are partial; 53 entries have source attempts only.** Verification dates advanced only for the 42 completed comparisons. No entry was removed.

The remaining 53 entries returned environment proxy HTTP503 throughout their source set. Cross-vendor control failures established a transport problem; these are not vendor outage findings. A centrally controlled retry did not restore sustained access. The InfluxDB quota pages also remain blocked after a decompression retry. HTTP200 responses, change-detector flags and numeric matching were not counted as completed comparisons.

Sources below quote contiguous passages from whitespace-normalized official page text. Existing explicit unknowns remain qualified; an unknown vendor policy is not invented. Five partial comparisons retain their earlier verification dates.

## services/hook0

**confirmed** — comparison completed. The Developer allowance remains 100 events/day, one developer/application, ten event types/subscriptions and seven-day retention. Extra events are blocked; no card is required. Paid prices and organization limits remain supported.

- https://www.hook0.com/pricing — “cation 10 event types 10 subscriptions Up to 100 events/day Extra events are blocked 7 days data retention Community support No credit card required Startup Enhance your webhook experience with our new features and grow”
- https://www.hook0.com/pricing — “ free plan? Your account can belong to up to 2 free organizations. Organizations on a paid plan don't count toward that limit, so putting one on a paid plan frees a slot. If you need more free organizations, con”

## services/hookdeck

**confirmed** — comparison completed. Developer remains 10,000 events, three-day retention and one user. The dashboard locks at the allowance while event processing continues subject to excessive-use controls. Trial, retry, discard and throughput distinctions remain supported.

- https://hookdeck.com/pricing — “ts Developer Always $0 /month Features Up to 10,000 events 3-day retention 1 user SoC2 compliance Get started Team Starts at $39 /month Everything in Developer, plus Pay-as-you-go 7-day retention Unlimited users Integr”
- https://hookdeck.com/pricing — “ng your events but the dashboard will become locked until you upgrade your plan or enter a new billing period. In the case of excessive overages, we reserve the right to stop processing all requests and events. ”

## services/hoppscotch

**confirmed** — comparison completed. Free remains $0 forever with core API-testing collections, environments, scripting and runner features; paid collaboration plans and MIT Community licensing remain supported. Unknown signup-card and quota behavior remain explicitly qualified.

- https://hoppscotch.com/pricing — “Cloud Self-Host Plan Period Annually Monthly Free $0 forever Everything you need to get started with API testing. Perfect for individuals and small teams. REST, GraphQL, and realtime API testing Personal workspace Collec”
- https://hoppscotch.com/pricing — “ new posts and features. © 2026 Hoppscotch Limited. All rights reserved. All systems operational.”

## services/hotjar

**corrected** — comparison completed. Corrected the recording allowance: the 200,000 monthly analytics sessions do not mean 200,000 replays. Free captures 5% of sessions, capped at 10,000 replays/month. Existing survey, project, retention, trial and quota distinctions match the pricing page.

- https://www.hotjar.com/pricing/ — “ths, up to 24 Monthly session replay capture 5% sessions captured (max. 10k) 15% sessions captured (min. 20k) Up to 100% sessions captured Up to 100% sessions captured Session Replay Summaries Not included Single Session Multiple Sessio”
- https://www.hotjar.com/pricing/ — “t seeing what your users actually do and why 200k monthly sessions $0 / forever Get started Get started Free plan includes: 1 month data access 1 project Replays, Heatmaps & Funnels Error & performance monitor”

## services/hs-ping

**confirmed** — comparison completed. The 100 free lookups are a one-time trial, not a monthly allowance. No-card signup, plan prices and hard quota behavior remain supported; the source discrepancy between 32 and 35 countries stays qualified.

- https://hsping.com/pricing/ — “cing Get started in minutes Signup to access 100 free trial lookup • Self service – No sales call required • Cancel anytime • Scale up / down confidently with predictable pricing Professional $49 For production workflow”

## services/hugging-face-hub

**confirmed** — comparison completed. Free private storage remains 100GB across supported repositories; public storage is best effort. PRO price, included/private storage, add-on rates and grants match. Unpublished card/cap handling remains qualified.

- https://huggingface.co/docs/hub/storage-limits — “pe of account Public storage Private storage Free user or org Best-effort* 100GB PRO Up to 10TB included* + add-on ✅ grants available for impactful work† 1TB + pay-as-you-go Team Organizations 12TB base + 1TB per seat + add-on ✅ 1TB ”
- https://huggingface.co/pricing — “AWS S3 $23 Backblaze Overdrive $15 HF Hub $8–12 Need more than 500TB? Contact sales for custom pricing. Base $12 /TB/mo Public repositories $18 /TB/mo Private repositories 50TB+ -20% $10 /TB/mo Public reposi”

## services/hugging-face-spaces

**confirmed** — comparison completed. CPU Basic remains two vCPU/16GB with nonpersistent disk and inactivity sleep; free Static and eligible Gradio ZeroGPU hosting are distinguished from paid deployments. Daily GPU quota, account eligibility, 24-hour reset and two-Space hosting limit match the docs.

- https://huggingface.co/docs/hub/spaces-overview — “ Hardware CPU Memory GPU Memory Hourly Price CPU Basic 2 vCPU 16 GB FREE CPU Upgrade 8 vCPU 32 GB $0.03 Nvidia T4 - small 4 vCPU 15 GB 16 GB $0.40 Nvidia T4 - medium 8 vCPU 30 GB 16 GB $0.60 1x Nvidia L4 8 vCPU 30 GB 24 GB $0.80 4x ”
- https://huggingface.co/docs/hub/spaces-zerogpu — “Queue priority Unauthenticated 2 minutes Low Free account 5 minutes Medium PRO account 40 minutes (extensible) Highest Team organization member 40 minutes (extensible) Highest Enterprise organization member 60 minutes (extensib”
- https://huggingface.co/docs/hub/spaces-gpus — “nactive for more than a set time (currently, 48 hours). Anyone visiting your Space will restart it automatically. If you want your Space never to deactivate or if you want to set a custom sleep time, you need to u”

## services/hygraph

**confirmed** — comparison completed. Hobby remains 1,000 entries, 500,000 API calls, three seats, two roles/locales, 100GB traffic, unlimited asset storage with 50MB assets and the documented component/environment/token/webhook limits. No-card signup and API/traffic quota blocking remain supported.

- https://hygraph.com/pricing — “alk to an expert Project Capabilities Basics # of Entries 1,000 10,000 1,000,000+ # of API Calls 500,000 1,000,000 50,000,000+ Asset Traffic 100 GB 500 GB 25,000 GB + Seats 3 10 200 Asset storage Unlimited Unlimited Unlimit”
- https://hygraph.com/pricing — “tries 1,000 10,000 1,000,000+ # of API Calls 500,000 1,000,000 50,000,000+ Asset Traffic 100 GB 500 GB 25,000 GB + Seats 3 10 200 Asset storage Unlimited Unlimited Unlimited Asset upload size 50 MB per asset 200 ”

## services/hyperping

**confirmed** — comparison completed. Free remains twenty monitors at five-minute intervals, one agent/status page/seat and no card. Annual Essentials price, extra seats, browser and logs allowances match; logs alpha and unpublished free-cap enforcement remain qualified.

- https://hyperping.com/pricing — “ Docs Sign in Start for free ↗ Contact sales 20 monitors free. No credit card required. Peace of mind. At every stage. Monitoring, status pages and incident management. Start free and scale as you grow. No credit card req”
- https://hyperping.com/pricing — “es − Monitors 20 50 250 1,000 Check interval 5 min 30 sec 30 sec 20 sec Maintenance windows Included Included Included Included SSL monitoring Included Included Included Included DNS monitoring — Not included I”

## services/ibm-cloud

**confirmed** — comparison completed. Current account setup still requires card verification; the free catalog has 40+ products and $200/30-day credit. Lite quotas, inactivity cleanup and paid-account billing distinctions match.

- https://www.ibm.com/cloud/free/ — “r Create your account at no charge. Try over 40 always-free products with no time limit. Create your free account Explore IBM Cloud What you get IBM Cloud account is a Pay-as-you-go account, which includes access to 40+”
- https://cloud.ibm.com/docs/account?topic=account-account-getting-started — “ your information. You are prompted for your credit card information to verify your identity and secure your account. You can try out IBM Cloud for free and pay only for the billable services that you choose to use, with no long-term contracts or commi”

## services/ibm-cloud-object-storage

**corrected** — comparison completed. Repaired the broken IBM account citation using the current signup guide. Smart Tier free allowances, twelve-month eligibility, chargeable overages and seven-day deleted-bucket retention remain supported; signup card verification remains explicit.

- https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-billing — “art Tier buckets in the Standard Plan: Up to 5 GB of Smart Tier storage capacity 2,000 Class A (PUT, COPY, POST, and LIST) requests 20,000 Class B (GET and all others) requests 10 GB of data retrieval 5GB of egress (public outbound bandwidt”
- https://cloud.ibm.com/docs/account?topic=account-account-getting-started — “ your information. You are prompted for your credit card information to verify your identity and secure your account. You can try out IBM Cloud for free and pay only for the billable services that you choose to use, with no long-term contracts or commi”

## services/ibm-cloudant

**corrected** — comparison completed. Repaired the broken IBM account citation. Lite 1GB storage, 20/10/5 read/write/query throughput, single-instance limit, HTTP402 storage enforcement, HTTP429 throughput handling and recovery below quota match the docs.

- https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-ibm-cloud-public — “t scalable Throughput scalable via UI or API Included storage 1 GB 20GB Extra storage Unavailable Charged per extra GB Instance limit 1 Lite instance per IBM Cloud account Unlimited Included features All IBM Cloudant features ”
- https://cloud.ibm.com/docs/account?topic=account-account-getting-started — “ your information. You are prompted for your credit card information to verify your identity and secure your account. You can try out IBM Cloud for free and pay only for the billable services that you choose to use, with no long-term contracts or commi”

## services/ibm-code-engine

**corrected** — comparison completed. Repaired the broken IBM account citation. Zero-cost monthly allocation remains 100,000 vCPU seconds, 200,000 GB seconds and 100,000 HTTP requests; usage prices and the separately qualified promotion remain supported.

- https://cloud.ibm.com/docs/enterprise-management?topic=enterprise-management-sample — “e zero-cost tier allocations, which include: 100,000 vCPU seconds per month 200,000 GB seconds of memory per month 100,000 HTTP requests per month vCPU 1 vCPU * 24 hours * 30 days * 3600 seconds = 2,592,000 vCPU seconds Free tier: 100,”
- https://cloud.ibm.com/docs/account?topic=account-account-getting-started — “ your information. You are prompted for your credit card information to verify your identity and secure your account. You can try out IBM Cloud for free and pay only for the billable services that you choose to use, with no long-term contracts or commi”

## services/ibm-db2

**corrected** — comparison completed. Repaired the broken IBM account citation. Lite storage, inactivity handling, regions and feature exclusions remain supported; conflicting five-connections pricing versus fifteen-per-user documentation stays explicitly qualified.

- https://www.ibm.com/products/db2/pricing — “ 0.000078 per IOP Starting Instance Capacity 200 MB storage 4 vCPUs and 50 GB storage Compute Capacity - Up to 128vCPU (virtual) Storage Capacity Up to 200MB Up to 40TB and 196K IOPS Independently scale storage and comp”
- https://cloud.ibm.com/docs/account?topic=account-account-getting-started — “ your information. You are prompted for your credit card information to verify your identity and secure your account. You can try out IBM Cloud for free and pay only for the billable services that you choose to use, with no long-term contracts or commi”

## services/ibm-watsonx-orchestrate

**unresolved** — partial comparison. Pricing confirms a 30-day trial and Essentials pricing, but the trial-detail sources were HTTP403. The educational trial duration, member limit and trial-expiry handling could not be fully compared.

- https://www.ibm.com/products/watsonx-orchestrate/pricing — “al Try and explore watsonx Orchestrate for a 30-day free period by using the watsonx Orchestrate trial access. Pricing: Free trial Features Agent building/orchestration Intuitive chat interface Tools/integrations catalog Co”
- https://www.ibm.com/products/watsonx-orchestrate/pricing — “ security and control. Pricing: Starting at $530.00 USD Per month Buy now Features Agent building/orchestration Workflow and doc processing Agents and tools catalog Custom tool creation Core AI and LLMs Secur”

Remaining: Educational 90-day trial, ten-member limit and trial-expiry handling require accessible current trial documentation.

## services/imgix

**confirmed** — comparison completed. Trial remains thirty days/100 credits with no card. Starter credit price, storage/delivery credit consumption and Enterprise-only Web Proxy match. Trial-expiry behavior remains explicitly unknown.

- https://www.imgix.com/pricing — “act Log in Start free Try Imgix for Free Get 30 days and 100 credits to transform, optimize, and deliver high-performance visuals. No credit card required. Start My Free Trial Pricing that scales with you Add your usage below an”
- https://www.imgix.com/pricing — “imize, and deliver high-performance visuals. No credit card required. Start My Free Trial Pricing that scales with you Add your usage below and we’ll recommend your best-fit plan. From hundreds to millions of images, pay for wha”

## services/incident-io

**confirmed** — comparison completed. Basic remains free forever with a single on-call team and limited status-page/workflow/custom-field/integration capabilities. Monthly versus annual Team pricing and the on-call add-on match; card and enforcement unknowns remain qualified.

- https://incident.io/pricing — “t.io is designed to save you time and money. Basic Free Forever Everything you need to get started with incident management Slack or Microsoft Teams native incident response Single team on-call Status page Essential inciden”
- https://incident.io/pricing — “ or Microsoft Teams native incident response Single team on-call Status page Essential incident automation Available on Slack Teams Get started with Basic Team Annual discount $19 $19 $15 Per user / month For Incident Respon”

## services/infisical

**confirmed** — comparison completed. Free remains five identities, unlimited projects, three environments and ten syncs with 100+ integrations. Paid rotation/versioning/SSO/audit distinctions and the fourteen-day Pro trial remain supported; card and over-cap handling remain unknown.

- https://infisical.com/pricing — “ Get started $ 0 0 forever Get started with: 5 identities, unlimited projects 100+ integrations Secret Sharing Secret References and Imports Secret Overrides 2FA Unlimited Projects (separate from 5 identities) Pro For growing teams looki”
- https://infisical.com/pricing — “arted with: 5 identities, unlimited projects 100+ integrations Secret Sharing Secret References and Imports Secret Overrides 2FA Unlimited Projects (separate from 5 identities) Pro For growing teams looking to boost their ”

## services/influxdb-cloud

**unresolved** — partial comparison. Pricing supports a free Serverless tier with thirty-day retention. Quota docs were initially unreadable compressed text, then centrally retried with decompression but returned environment HTTP503. Rate, bucket and table limits therefore remain unverified.

Blocker: `environment-transport`.

- https://www.influxdata.com/influxdb-pricing/ — “needed. InfluxDB Cloud Serverless also has a free tier with limited data ingestion rates and 30-day retention. Paid plans unlock higher rate limits, unlimited data retention, and enterprise features. What's the difference between InfluxDB 3 Core and InfluxDB 3 Enterpri”

Remaining: 5MB/five-minute write and 300MB/five-minute query limits, two buckets, and table/column limits require readable current quota documentation.

## services/inngest

**confirmed** — comparison completed. Free remains 50,000 executions, 500,000 events, five seats/concurrent steps, three workers and twenty-four-hour traces with no card. Execution quota pause and separate hosting costs remain supported.

- https://www.inngest.com/pricing — “it card required Start Free Platform 5 seats 50k executions 5 concurrent steps 3 workers Unlimited serverless workers Events 500k events ingested 100k queue depth 50 realtime connections 256 KiB event size Observability”
- https://www.inngest.com/pricing — “ workers Unlimited serverless workers Events 500k events ingested 100k queue depth 50 realtime connections 256 KiB event size Observability 500 MB span data ingested 10K scores 24 hour trace history 30 minute metrics granular”

## services/inspector-dev

**corrected** — comparison completed. Added the current three-day retention and one notification channel and corrected the former unlimited-members FAQ conflict: Free has up to three members and no REST API. Existing 30,000-transaction quota, no-card signup and drop-on-cap behavior match.

- https://inspector.dev/pricing/ — “’t need a credit card, and it isn’t a trial. What does the Free plan leave out? It has 3 days of data retention, up to 3 team members, 1 notification channel and no REST API access. What happens when I reach my quota? Inspector drops new d”
- https://inspector.dev/pricing/ — “ access. What happens when I reach my quota? Inspector drops new data until your next monthly cycle. To keep it flowing, upgrade your plan or turn on usage-based billing. How does usage-based billing work? Monitoring continues pa”

## services/installonair

**confirmed** — comparison completed. Free distribution remains 200MB/build with links lasting three days as a guest or seven with an account. Unlimited uploads, no-card use, expiry add-on prices and independent replacement links match.

- https://www.installonair.com/pricing — “ndroid Email builds straight to your testers Builds up to 200MB UDID finder for iOS devices Links active for 3 days, or 7 days with a free account Upload a build for free Optional add-on Extend Expiry Date from $1.89 one-ti”
- https://www.installonair.com/pricing — “ilds up to 200MB UDID finder for iOS devices Links active for 3 days, or 7 days with a free account Upload a build for free Optional add-on Extend Expiry Date from $1.89 one-time, per build Keep a build's install link working longer when t”

## services/instatus

**confirmed** — comparison completed. Starter remains fifteen monitors, two-minute checks, two hundred subscribers and five team members, free forever without a card. Paid domains and requested nonprofit/open-source concessions remain distinguished.

- https://instatus.com/pricing/ — “om domain 1+ 3+ Subscribers 200 5,000 25,000 Starter 15 Monitors 2 min checks Email alerts 5 team members 2 on-call members No SAML SSO Public status page No custom domain 200 subscribers Sign up free Pro 50 Monitors 30 sec ”
- https://instatus.com/pricing/ — “e type Public Public All Custom domain 1+ 3+ Subscribers 200 5,000 25,000 Starter 15 Monitors 2 min checks Email alerts 5 team members 2 on-call members No SAML SSO Public status page No custom domain 200 subscribers Sig”

## services/intodns-ai

**unresolved** — partial comparison. Pricing advertises all features free, but public API docs also refer to paid AI helper endpoints. Monitoring and HTTP429/Retry-After behavior are supported; the blanket free claim needs vendor clarification.

- https://intodns.ai/pricing — “t your scan Transparent Pricing Free forever All features are free. No credit card, no trial period, no paid tier where the useful checks disappear. Create an account to unlock domain monitoring and fix digests. No Account $0 /”
- https://intodns.ai/api-docs — “volume bursts, report-snapshot creation, and paid AI helper endpoints may return HTTP 429 with Retry-After so LLM agents and real users can keep using the public API reliably. Canonical API origin only. Use https://intodns.ai/api”

Remaining: Reconcile all-features-free pricing with paid-AI-helper wording in the public API documentation.

## services/invantive-cloud

**corrected** — comparison completed. Updated the catalog count from 105 to 110+ platforms. Free still has no user limit with explicitly listed free connectors and add-ins. Paid-plan prices, fair-use qualification, country eligibility and contradictory Exact Online Premium descriptions remain accurately separated.

- https://cloud.invantive.com/en — “r free Log on Tables Pricing invantive cloud Get insight across 110+ platforms! Invantive Cloud is an online and real-time solution to optimize your business processes. Not only within a company or application, but also across common bound”
- https://cloud.invantive.com/en — “vantive.eu Log In / Sign Up Try 180 days for free Log on Tables Pricing invantive cloud Get insight across 110+ platforms! Invantive Cloud is an online and real-time solution to optimize your business processe”

## services/ip-geolocation

**corrected** — comparison completed. Corrected the obsolete development-only wording: Free explicitly permits production and commercial use. The 1,000 daily credits remain a hard HTTP429 limit with no overage; module credit costs and paid language restrictions remain supported.

- https://ipgeolocation.io/pricing.html — “0 lookups a day No overages on the free plan Production and commercial use allowed Start Free Starter $19 /month Billed monthly 150K API Credits Per month Best for: MVPs and early products Overage: $5 per 25K credits Get Starter Most Popular ”
- https://ipgeolocation.io/pricing.html — “or: Apps that need up to 1,000 lookups a day No overages on the free plan Production and commercial use allowed Start Free Starter $19 /month Billed monthly 150K API Credits Per month Best for: MVPs and early products Overage: $5 per”

## services/ip2geo-dev

**confirmed** — comparison completed. The allowance remains 1,000 monthly conversions with no card; individual IPs count, including invalid ones. HTTP429 at quota, command-line behavior and the paid entry price match.

- https://ip2geo.dev — “e, and built for developers. Start free with 1,000 monthly conversions. Developer-focused Blazingly Fast Cloud Dashboard Try Now, Get 1,000 Free Conversions Features Our Features Take a closer look at our services and understand w”
- https://ip2geo.dev/docs/rate-limiting — “ches its quota, further requests return HTTP 429 with a Plan conversion limit exceeded message until your limit resets or the plan is upgraded, reading your conversions included. The CLI stops there, keeps wh”

## services/ip2location-io

**confirmed** — comparison completed. Keyed Free remains 50,000 monthly IP queries plus documented WHOIS/domain allowances; keyless daily access is separately limited. Attribution, free quota stopping, paid overages and no rollover remain supported.

- https://www.ip2location.io/pricing — “ querying. Query Limit 1,000 queries per day 50,000 queries per month Infrastructure Hosted in the US East Region Global Load Balancers spread across more than 10 strategic regions worldwide Performance Fast in the US East Region”
- https://www.ip2location.io/pricing — “ain a free API key for querying. Query Limit 1,000 queries per day 50,000 queries per month Infrastructure Hosted in the US East Region Global Load Balancers spread across more than 10 strategic regions worldwide Performance F”

## services/ipbase-com

**corrected** — comparison completed. Added the current commercial-use restriction throughout summary, answer, suitability and FAQ. Free is only for testing and personal noncommercial projects; 150/month and ten/minute hard limits, no card, no overages and unavailable VPN data remain supported.

- https://ipbase.com/pricing — “Included Included Frequently asked questions Can I use the free plan commercially? No. The free plan (150 requests a month) is for testing and personal, non-commercial projects. Commercial use needs a paid plan, from $9.99 a month. Does the f”
- https://ipbase.com/pricing — “rd required Get Free API Key What's included 150 Requests 1 API Key HTTPS Encryption Batch Lookups (1,000 IPs per POST) 10 Requests / Min. Location Data Connection Data Currency Data Timezone Data No Security Data (fr”

## services/ipinfo

**confirmed** — comparison completed. Lite remains free without a card, with unlimited country/ASN API requests and fifty web lookups. Paid city-level location and privacy intelligence remain clearly separated.

- https://ipinfo.io/pricing — “xy Detection Company IP Whois Web lookups 50 API req / mo Unlimited Country-level only Get Started IPinfo Core $26 /mo $310 billed annually Save 17% · $62/yr Geolocation City level ASN Places New Venue flag only Privacy Detection VPN, Tor, proxy ”
- https://ipinfo.io/pricing — “ Choose an annual plan and get 2 months free IPinfo Lite $0 /mo Free forever · no credit card Geolocation Country level ASN Name and domain only Places Privacy Detection Connection Context Geo Accuracy Radius Carrier”

## services/iplocate

**confirmed** — comparison completed. The free plan still provides the same API data at 1,000 requests/day without a card; free country/ASN downloads remain distinct from paid city data. Unspecified cap enforcement remains qualified.

- https://www.iplocate.io/pricing — “tart for free Browse the docs Start for free 1,000 requests per day, free forever. No credit card required. No other limits — the same data, same accuracy, same API. $0 up to 1,000 requests per day Get a free API key Pay for what you need Buy credits in bulk, or pay ”

## services/iubenda

**confirmed** — comparison completed. Basic terms still limit the banner to 5,000 monthly views, three third-party clauses, one language and iubenda branding, with deactivation at quota and no Terms and Conditions generator. Paid Essentials overages remain separately identified.

- https://www.iubenda.com/en/help/379-basic-license-limits — “not available in this plan, which means your banner will be deactivated for the month whenever the threshold has been reached. Customization is limited , you cannot add your own logo or modify colors, the text or the behavior of the banner notic”

## services/jam

**confirmed** — comparison completed. Free remains thirty Jams, five recording links, five-minute recordings, five creators and unlimited viewers/folders with the documented AI allowance. Paid pricing and conflicting recording-length documentation remain explicitly qualified.

- https://jam.dev/pricing — “art for free For small teams getting started 30 Jams 5 Recording Links Recordings up to 5 minutes Connect Jira, Linear and more Debug Jams via MCP Webhooks Team $14 per creator / month Billed yearly Start 14 day free trial For growing product teams Everythi”
- https://jam.dev/pricing — “r and more Debug Jams via MCP Webhooks Team $14 per creator / month Billed yearly Start 14 day free trial For growing product teams Everything in Free plus: Unlimited Jams 150 Recording Links Recordings up to 15 minutes”

## services/jotform

**unresolved** — partial comparison. Current static pricing confirms a free Starter plan but omits its rendered numeric table. Help pages support submission/storage quota behavior, but the current form, submission, storage, view, field and payment counts could not be fully rechecked.

- https://www.jotform.com/pricing/ — “fer? Jotform offers several plans, including Starter (free), Bronze, Silver, and Gold plans. Jotform also offers Enterprise plans with custom pricing for large organizations. Storage and submission limits increase with ”
- https://www.jotform.com/pricing/ — “with custom pricing for large organizations. Storage and submission limits increase with each level. Is there a free plan available for Jotform? Yes, the Starter plan is best for individuals or small teams just starting their data-collection j”

Remaining: Recheck the live Starter plan numeric table: forms, submissions, storage, views, total submissions, fields and payment submissions.

## services/jwt-io

**confirmed** — comparison completed. The public JWT debugger, token verification/generation, handbook and library directory remain available without an account. Separate Auth0 marketing is not treated as a debugger subscription; unpublished quotas remain qualified.

- https://jwt.io/ — “jwt.io Get up-to-speed with JSON Web Tokens. Get the JWT Handbook for free Debugger Debugger Introduction Libraries Ask Get up-to-speed with JSON Web Tokens. Get the JWT Handbook for free Debugger Debugger Introduction Libraries Ask J”
- https://jwt.io/ — “ON Web Tokens. Get the JWT Handbook for free Debugger Debugger Introduction Libraries Ask Get up-to-speed with JSON Web Tokens. Get the JWT Handbook for free Debugger Debugger Introduction Libraries Ask JSON Web T”

## services/keploy

**confirmed** — comparison completed. Playground remains thirty generated suites, one hundred runs, five thousand integration/sandbox runs and five AI credits monthly without a card. Pro usage rates and the separate open-source product remain supported.

- https://keploy.io/pricing — “ver Included usage credit — Test suites / mo 30 test suites generation/mo Test runs / mo 100 test runs / mo Integration + sandbox runs / mo 5,000 (test + sandbox) runs / mo AI credits / mo 5 AI credits (Bug detection + Self Healing) ”
- https://keploy.io/pricing — “st runs / mo Integration + sandbox runs / mo 5,000 (test + sandbox) runs / mo AI credits / mo 5 AI credits (Bug detection + Self Healing) Overage: test gen — Overage: test run — Overage: integration + sandbox — Payment methods — Custom T”

## services/ketch

**confirmed** — comparison completed. Free remains limited to 5,000 monthly unique visitors with two integrations and no card. Paid plan requirement above the threshold, Starter/Plus pricing and the absence of precise automatic enforcement terms remain accurately stated.

- https://www.ketch.com/pricing — “time trial, and it doesn't expire as long as monthly unique visitors stay under 5,000. It includes unlimited banner customization, privacy law templates for every major jurisdiction, website tracker scanning, two no-code integrations, and email ”
- https://www.ketch.com/pricing — “ajor jurisdiction, website tracker scanning, two no-code integrations, and email support, with no credit card required to start. Once visitor volume passes 5,000 unique users per month, moving to a paid plan is required. How much”

## services/keywords-ai

**corrected** — comparison completed. Corrected Free to ten prompts. Separated pricing's thirty-day default retention from the Logs documentation's seven-day viewing window. Monthly excess logs remain recorded but blurred and exports stop; gateway/credit restrictions remain distinct.

- https://respan.ai/pricing — “ 100k logs 1k scores 5 datasets 2 evaluators 10 prompts Sign up for free Team Popular $ 199 per month -17% For startups and growing teams Everything in Free Unlimited datasets Unlimited evaluators Unlimited prompts ”
- https://www.respan.ai/docs/documentation/features/observe/explore-spans — “older range, Logs shortens it to your limit. Plan Time range Free Last 7 days Team Last 30 days Custom No limit Filter by custom properties Click Custom property , find a property your app sends in its metadata ( Search properties… ), an”
- https://respan.ai/pricing — “ghput 412 logs / min 4,200 logs / min Custom Default retention period 30 days 30 days Custom Custom retention period Conditional retention PostHog integration Batch export (JSONL, CSV) Scheduled webhooks Collaboration Workspaces 1 worksp”

## services/kinde

**confirmed** — comparison completed. Free remains 10,500 monthly active users without a card; application, feature-flag, role/permission, machine-token, webhook and organization allowances match. Billing transaction fees and uncertain organization pricing units remain qualified.

- https://kinde.com/pricing/ — “es, monthly fees, or hidden fees. $0 forever 10,500 monthly active users (MAU) No credit card required Start for free What’s included in Free: Subscriptions & billing Email, SMS and social login Multi-Factor Authentication (MFA) B2B manag”
- https://kinde.com/pricing/ — “$0 forever 10,500 monthly active users (MAU) No credit card required Start for free What’s included in Free: Subscriptions & billing Email, SMS and social login Multi-Factor Authentication (MFA) B2B management with organizations”

## services/knock

**confirmed** — comparison completed. The free allowance remains 10,000 notifications, five hundred guide recipients and five hundred agent credits with unlimited workflows/channels. Soft-cap billing contact, no-card signup, extra agent-credit cost and downstream delivery fees remain supported.

- https://knock.app/pricing — “hat bounce or fail to send are not included. up to 10,000 Guide recipients A unique user who sees at least one in-app banner, popup, or announcement in the month. up to 500 Agent credits Credits consumed by Knock agen”
- https://knock.app/pricing — “banner, popup, or announcement in the month. up to 500 Agent credits Credits consumed by Knock agents. Additional credits are $0.01 each. up to 500 Features Unlimited stored profiles Unlimited workflows Unlimited broadcasts Unli”

## services/kreya

**unresolved** — partial comparison. Free-forever availability, latest-request history and ten-day paid trials are supported. The rendered paid price controls are absent from fetched HTML, so the entry's Pro/Enterprise monthly and annual prices cannot be fully rechecked.

- https://kreya.app/pricing/ — “its your needs. Start free, upgrade anytime. Free forever plan 10-day trial on paid plans Cancel anytime Monthly Yearly Questions? Check our FAQ or contact us Compare plans Find the plan that matches your needs Feature Free For individuals Pro For i”

Remaining: Recheck rendered Pro and Enterprise monthly/annual prices.

## services/lambda

**confirmed** — comparison completed. The monthly one-million-request/400,000-GB-second allowance remains supported, excluding provisioned concurrency. Current account-credit duration, optional paid upgrade and post-expiry data handling match; conflicting AWS six/twelve-month language remains qualified.

- https://aws.amazon.com/lambda/pricing/ — “ce is $0.20 per one million requests and the free tier provides 1 million requests per month. Total requests – Free tier requests = monthly billable requests 3 million requests – 1 million free tier requests = 2 million monthly billable requests Monthl”
- https://aws.amazon.com/lambda/pricing/ — “ free tier includes one million requests and 400,000 GB-seconds per month. Asynchronous Event (including events from S3, SNS, EventBridge, StepFunctions, Cloudwatch Logs): You are charged for 1 request per each a”

## services/langfuse

**confirmed** — comparison completed. Hobby remains fifty thousand units, thirty-day data access and two users without a card. Ingestion/general API rate limits and paid Core pricing match; unknown monthly-quota behavior stays qualified.

- https://langfuse.com/pricing/ — “sted by: All platform features (with limits) 50k units / month included 30 days data access 2 users Community support via GitHub Unlimited Users Core For production projects. Longer data access and unlimited users. $29 / month Sign up Discounts: Startups, EDU”
- https://langfuse.com/pricing/ — “cing Get started on the Hobby plan for free. No credit card required. Langfuse Cloud (we host) Self-hosted (you host) Hobby Get started, no credit card required. Great for hobby projects and POCs. Free Sign up Trusted by: All pl”

## services/langsmith

**confirmed** — comparison completed. Developer remains one seat and five thousand traces monthly with fourteen-day retention. The billing docs confirm adding a card removes the trace cap and creates excess-usage charges; paid seat pricing remains supported.

- https://docs.langchain.com/langsmith/billing — “set up billing on your personal organization Personal organizations are limited to 5,000 traces per month until a credit card is added. To add a card: Click Add card to remove trace limit . Add your credit card information. Once complete, you will no longer be rate limited to 5,000 traces, and ”
- https://www.langchain.com/pricing — “se traces have a shorter retention period of 14 days. Extended traces have a longer retention period of 180 days. You can "upgrade" base traces to extended traces for an additional fee. Why would I upgrade a base”

## services/langwatch

**confirmed** — comparison completed. Developer remains fifty thousand events, fourteen-day data access, two users and three scenarios/simulations/custom evals with no card. Paid seat, event and retention rates match; monthly cap handling remains qualified.

- https://langwatch.ai/pricing/ — “ agents. Get Started No credit card required 50k events / month 14-day data access 2 users 3 scenarios, 3 simulations, 3 custom evals Community support (GitHub & Discord) Most popular Growth €29 / core-seat / month For teams shipping agents to produc”
- https://langwatch.ai/pricing/ — “0k events / month 14-day data access 2 users 3 scenarios, 3 simulations, 3 custom evals Community support (GitHub & Discord) Most popular Growth €29 / core-seat / month For teams shipping agents to production. Try for Free Everything in Developer,”

## services/launchdarkly

**corrected** — comparison completed. Qualified the paid client-side rate: the comparison table says $10 per thousand MAU while yearly billing shows $8.33. Free seat/flag, connection/MAU, experiment/observability, AI-run and retention allowances remain supported.

- https://launchdarkly.com/pricing/ — “cesses bill fractionally by connection time. $8.33 per 1k client-side MAU / mo Each unique client-side user or device counts as one monthly active user. 5k AI Runs included / mo. An AI run is generated when you track an LLM request o”
- https://launchdarkly.com/pricing/ — “or device counts as one monthly active user. 5k AI Runs included / mo. An AI run is generated when you track an LLM request or run an online eval (LLM-as-a-judge). $5 per additional 1k runs. Special rates for K8s, Serverless”

## services/libraries-io

**confirmed** — comparison completed. Free account and open-package discovery/API access remain supported. Registered API access is limited to sixty requests/minute per key with HTTP429; larger Tidelift access stays separate.

- https://libraries.io/api — “age Rate limit All requests are subject to a 60 request/minute rate limit based on your API key, any further requests within that timeframe will result in a 429 response. Larger scale access to data is available from Tidelift . Pagination All requests tha”
- https://libraries.io/api — “uests within that timeframe will result in a 429 response. Larger scale access to data is available from Tidelift . Pagination All requests that return multiple results can be paginated using the `page` and `per_page`”

## services/lingohub-com

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://lingohub.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://lingohub.com/faq — HTTP 503; no usable vendor-source text.
- Attempted https://lingohub.com/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.lingohub.com — HTTP 503; no usable vendor-source text.
- Attempted https://developers.lingohub.com/llms.txt — HTTP 503; no usable vendor-source text.
- Attempted https://developers.lingohub.com/ — HTTP 503; no usable vendor-source text.

## services/livekit

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://livekit.io/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://livekit.com/pricing.md — HTTP 503; no usable vendor-source text.
- Attempted https://docs.livekit.io/deploy/admin/quotas-and-limits/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.livekit.io — HTTP 503; no usable vendor-source text.
- Attempted https://livekit.io — HTTP 503; no usable vendor-source text.

## services/localazy-com

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://localazy.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://localazy.com/faq — HTTP 503; no usable vendor-source text.
- Attempted https://localazy.com/docs/general — HTTP 503; no usable vendor-source text.
- Attempted https://localazy.com/docs — HTTP 503; no usable vendor-source text.
- Attempted https://localazy.com — HTTP 503; no usable vendor-source text.

## services/localhero-ai

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://localhero.ai/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://localhero.ai — HTTP 503; no usable vendor-source text.
- Attempted https://localhero.ai/docs — HTTP 503; no usable vendor-source text.
- Attempted https://localhero.ai/docs/setup — HTTP 503; no usable vendor-source text.

## services/localise-biz

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://localise.biz/plans — HTTP 503; no usable vendor-source text.
- Attempted https://localise.biz/about — HTTP 503; no usable vendor-source text.
- Attempted https://localise.biz/help/accounts/quotas — HTTP 503; no usable vendor-source text.
- Attempted https://localise.biz/api/docs — HTTP 503; no usable vendor-source text.
- Attempted https://localise.biz/docs — HTTP 503; no usable vendor-source text.
- Attempted https://localise.biz/ — HTTP 503; no usable vendor-source text.

## services/localizely-com

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://localizely.com/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://localizely.com/faq/ — HTTP 503; no usable vendor-source text.
- Attempted https://localizely.com/getting-started/ — HTTP 503; no usable vendor-source text.
- Attempted https://localizely.com/how-it-works/ — HTTP 503; no usable vendor-source text.
- Attempted https://localizely.com/ — HTTP 503; no usable vendor-source text.

## services/locationiq

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://locationiq.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://docs.locationiq.com/docs — HTTP 503; no usable vendor-source text.
- Attempted https://docs.locationiq.com — HTTP 503; no usable vendor-source text.
- Attempted https://locationiq.com — HTTP 503; no usable vendor-source text.

## services/logflare-app

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://logflare.app/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://logflare.app/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.logflare.app — HTTP 503; no usable vendor-source text.

## services/loginllama

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://loginllama.app/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://loginllama.app — HTTP 503; no usable vendor-source text.
- Attempted https://loginllama.app/docs — HTTP 503; no usable vendor-source text.

## services/logintc

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.logintc.com/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.logintc.com/get-started/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.logintc.com/docs/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.logintc.com/ — HTTP 503; no usable vendor-source text.

## services/logrocket

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://logrocket.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://docs.logrocket.com/docs/quickstart — HTTP 503; no usable vendor-source text.
- Attempted https://docs.logrocket.com/ — HTTP 503; no usable vendor-source text.
- Attempted https://logrocket.com/ — HTTP 503; no usable vendor-source text.

## services/logtail-com

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://betterstack.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://betterstack.com/docs/logs/ — HTTP 503; no usable vendor-source text.
- Attempted https://betterstack.com/docs/logs/logging-start/ — HTTP 503; no usable vendor-source text.
- Attempted https://betterstack.com/ — HTTP 503; no usable vendor-source text.

## services/logto

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://logto.io/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://docs.logto.io/introduction — HTTP 503; no usable vendor-source text.
- Attempted https://docs.logto.io/quick-starts/react — HTTP 503; no usable vendor-source text.
- Attempted https://docs.logto.io/ — HTTP 503; no usable vendor-source text.
- Attempted https://logto.io/ — HTTP 503; no usable vendor-source text.

## services/loops

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://loops.so/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://loops.so/docs/account/billing — HTTP 503; no usable vendor-source text.
- Attempted https://loops.so/docs/quickstart — HTTP 503; no usable vendor-source text.
- Attempted https://loops.so/docs/sending-domain — HTTP 503; no usable vendor-source text.
- Attempted https://loops.so/docs/api-reference/intro — HTTP 503; no usable vendor-source text.
- Attempted https://loops.so/docs — HTTP 503; no usable vendor-source text.
- Attempted https://loops.so — HTTP 503; no usable vendor-source text.

## services/lumenfall-ai

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://lumenfall.ai/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://lumenfall.ai/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.lumenfall.ai/quickstart — HTTP 503; no usable vendor-source text.
- Attempted https://docs.lumenfall.ai/billing — HTTP 503; no usable vendor-source text.
- Attempted https://docs.lumenfall.ai — HTTP 503; no usable vendor-source text.

## services/maileroo

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://maileroo.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://maileroo.com/ — HTTP 503; no usable vendor-source text.
- Attempted https://maileroo.com/docs — HTTP 503; no usable vendor-source text.

## services/mailersend-com

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.mailersend.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://developers.mailersend.com/general.html — HTTP 503; no usable vendor-source text.
- Attempted https://developers.mailersend.com/api/v1/email.html — HTTP 503; no usable vendor-source text.
- Attempted https://developers.mailersend.com/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.mailersend.com — HTTP 503; no usable vendor-source text.

## services/mailinator-com

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.mailinator.com/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.mailinator.com/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.mailinator.com/verified-pro/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.mailinator.com/docs/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mailinator.com — HTTP 503; no usable vendor-source text.

## services/mailjet

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.mailjet.com/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://dev.mailjet.com/email/guides/getting-started/ — HTTP 503; no usable vendor-source text.
- Attempted https://dev.mailjet.com/email/guides/send-api-v3/ — HTTP 503; no usable vendor-source text.
- Attempted https://dev.mailjet.com/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.mailjet.com/ — HTTP 503; no usable vendor-source text.

## services/mailsac-com

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://mailsac.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://mailsac.com — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mailsac.com/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mailsac.com/en/latest/api_examples/getting_started/getting_started.html — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mailsac.com/en/latest/services/message_storage/message_storage.html — HTTP 503; no usable vendor-source text.

## services/mailtrap-io

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://mailtrap.io/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://mailtrap.io/email-sandbox/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mailtrap.io/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mailtrap.io/email-sandbox/features-and-limits — HTTP 503; no usable vendor-source text.
- Attempted https://mailtrap.io/ — HTTP 503; no usable vendor-source text.

## services/make

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.make.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://help.make.com/credits — HTTP 503; no usable vendor-source text.
- Attempted https://help.make.com/create-your-first-scenario — HTTP 503; no usable vendor-source text.
- Attempted https://www.make.com/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.make.com/en/help — HTTP 503; no usable vendor-source text.
- Attempted https://www.make.com/en — HTTP 503; no usable vendor-source text.

## services/mapbox

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.mapbox.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mapbox.com/accounts/guides/invoices/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mapbox.com/accounts/guides/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mapbox.com/accounts/guides/demo-access/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mapbox.com — HTTP 503; no usable vendor-source text.
- Attempted https://www.mapbox.com — HTTP 503; no usable vendor-source text.

## services/maptiler

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.maptiler.com/cloud/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.maptiler.com — HTTP 503; no usable vendor-source text.
- Attempted https://www.maptiler.com — HTTP 503; no usable vendor-source text.

## services/mapy-com-api

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://developer.mapy.com/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://developer.mapy.com/frequently-asked-questions/ — HTTP 503; no usable vendor-source text.
- Attempted https://developer.mapy.com/my-account/financial-settings/how-to-turn-on-paid-consumption/ — HTTP 503; no usable vendor-source text.
- Attempted https://developer.mapy.com/rest-api-mapy-cz/how-to-start/ — HTTP 503; no usable vendor-source text.
- Attempted https://developer.mapy.com — HTTP 503; no usable vendor-source text.

## services/matomo-cloud

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://matomo.org/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://matomo.org/faq/cloud/whats-included-in-the-matomo-cloud-21-day-free-trial/ — HTTP 503; no usable vendor-source text.
- Attempted https://matomo.org/start-free-analytics-trial/ — HTTP 503; no usable vendor-source text.
- Attempted https://matomo.org/docs/ — HTTP 503; no usable vendor-source text.
- Attempted https://matomo.org/ — HTTP 503; no usable vendor-source text.

## services/mergify

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://mergify.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mergify.com/billing.md — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mergify.com/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mergify.com/getting-started/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mergify.com/merge-queue/setup — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mergify.com/billing/ — HTTP 503; no usable vendor-source text.
- Attempted https://mergify.com — HTTP 503; no usable vendor-source text.

## services/metalama

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.postsharp.net/metalama/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://doc.postsharp.net/metalama/conceptual/installing/register-license — HTTP 503; no usable vendor-source text.
- Attempted https://doc.postsharp.net/metalama/conceptual/architecture — HTTP 503; no usable vendor-source text.
- Attempted https://www.postsharp.net/metalama — HTTP 503; no usable vendor-source text.
- Attempted https://doc.postsharp.net/metalama — HTTP 503; no usable vendor-source text.
- Attempted https://doc.postsharp.net/metalama/conceptual/getting-started — HTTP 503; no usable vendor-source text.

## services/metered-turn

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.metered.ca/stun-turn — HTTP 503; no usable vendor-source text.
- Attempted https://www.metered.ca/tools/openrelay/ — HTTP 503; no usable vendor-source text.

## services/microlink-io

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://microlink.io/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://microlink.io/docs/api/getting-started/overview — HTTP 503; no usable vendor-source text.
- Attempted https://microlink.io/ — HTTP 503; no usable vendor-source text.

## services/microsoft-clarity

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://clarity.microsoft.com — HTTP 503; no usable vendor-source text.
- Attempted https://learn.microsoft.com/en-us/clarity/faq — HTTP 503; no usable vendor-source text.
- Attempted https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup — HTTP 503; no usable vendor-source text.
- Attempted https://learn.microsoft.com/en-us/clarity/ — HTTP 503; no usable vendor-source text.

## services/middleware-io

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://middleware.io/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://middleware.io/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.middleware.io/getting-started — HTTP 503; no usable vendor-source text.
- Attempted https://docs.middleware.io/agent-installation/linux — HTTP 503; no usable vendor-source text.
- Attempted https://docs.middleware.io — HTTP 503; no usable vendor-source text.

## services/mintlify

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.mintlify.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mintlify.com — HTTP 503; no usable vendor-source text.
- Attempted https://www.mintlify.com/docs/quickstart — HTTP 503; no usable vendor-source text.
- Attempted https://mintlify.com — HTTP 503; no usable vendor-source text.

## services/miro

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://miro.com/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://miro.com/mind-map/ — HTTP 503; no usable vendor-source text.
- Attempted https://help.miro.com/hc/en-us/articles/360017730373-Free-Plan — HTTP 503; no usable vendor-source text.
- Attempted https://miro.com/ — HTTP 503; no usable vendor-source text.

## services/mistral-api

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://mistral.ai/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://help.mistral.ai/en/articles/698531-why-am-i-hitting-api-rate-limits-and-how-do-i-increase-them — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mistral.ai/admin/billing-usage/subscriptions — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mistral.ai/admin/billing-usage/billing — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mistral.ai/getting-started/quickstarts/studio/activate-and-generate-api-key — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mistral.ai/admin/user-management-finops/tier — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mistral.ai/ — HTTP 503; no usable vendor-source text.
- Attempted https://mistral.ai/ — HTTP 503; no usable vendor-source text.

## services/mixpanel

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://mixpanel.com/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mixpanel.com — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mixpanel.com/docs/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://docs.mixpanel.com/docs/quickstart/install-mixpanel — HTTP 503; no usable vendor-source text.
- Attempted https://mixpanel.com — HTTP 503; no usable vendor-source text.

## services/modal

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://modal.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://modal.com/docs/guide — HTTP 503; no usable vendor-source text.
- Attempted https://modal.com/docs/guide/billing — HTTP 503; no usable vendor-source text.
- Attempted https://modal.com/docs/guide/budgets — HTTP 503; no usable vendor-source text.
- Attempted https://modal.com/docs/examples/hello_world — HTTP 503; no usable vendor-source text.
- Attempted https://modal.com — HTTP 503; no usable vendor-source text.

## services/mojoauth

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://mojoauth.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://mojoauth.com/docs/ — HTTP 503; no usable vendor-source text.
- Attempted https://mojoauth.com/ — HTTP 503; no usable vendor-source text.

## services/mongodb-atlas

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.mongodb.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://www.mongodb.com/docs/drivers/node-frameworks/tanstack/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.mongodb.com/docs/atlas/backup/cloud-backup/free-cluster-backup/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.mongodb.com/docs/atlas/reference/free-shared-limitations/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.mongodb.com/docs/atlas/getting-started/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.mongodb.com/docs/atlas/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.mongodb.com/ — HTTP 503; no usable vendor-source text.

## services/motherduck

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://motherduck.com/product/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://motherduck.com/fees-addendum/ — HTTP 503; no usable vendor-source text.
- Attempted https://motherduck.com/docs/about-motherduck/billing/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://motherduck.com/docs/getting-started/connect-query-from-duckdb-cli/ — HTTP 503; no usable vendor-source text.
- Attempted https://motherduck.com/docs/key-tasks/authenticating-and-connecting-to-motherduck/authenticating-to-motherduck/ — HTTP 503; no usable vendor-source text.
- Attempted https://motherduck.com/docs/about-motherduck/billing/managing-billing/ — HTTP 503; no usable vendor-source text.
- Attempted https://motherduck.com/docs/ — HTTP 503; no usable vendor-source text.
- Attempted https://motherduck.com — HTTP 503; no usable vendor-source text.

## services/mouseflow

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://mouseflow.com/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://help.mouseflow.com/ — HTTP 503; no usable vendor-source text.
- Attempted https://mouseflow.com/ — HTTP 503; no usable vendor-source text.

## services/mux

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.mux.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://www.mux.com/docs/pricing/overview — HTTP 503; no usable vendor-source text.
- Attempted https://www.mux.com/docs — HTTP 503; no usable vendor-source text.
- Attempted https://www.mux.com — HTTP 503; no usable vendor-source text.

## services/n8n-cloud

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://n8n.io/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.n8n.io/deploy/use-n8n-cloud/start-your-free-trial/ — HTTP 503; no usable vendor-source text.
- Attempted https://support.n8n.io/article/can-you-reset-my-executions — HTTP 503; no usable vendor-source text.
- Attempted https://docs.n8n.io/ — HTTP 503; no usable vendor-source text.
- Attempted https://n8n.io/ — HTTP 503; no usable vendor-source text.

## services/namecheap-supersonic

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.namecheap.com/supersonic-cdn/#free-plan — HTTP 503; no usable vendor-source text.
- Attempted https://www.namecheap.com/support/knowledgebase/article.aspx/10188/2251/supersonic-cdn-overview/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.namecheap.com/support/knowledgebase/article.aspx/10190/2251/how-to-upgradedowngrade-supersonic-cdn/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.namecheap.com/support/knowledgebase/article.aspx/10191/2251/how-to-setup-supersonic-cdn-with-easywp/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.namecheap.com/support/knowledgebase/article.aspx/10469/2251/how-to-purchase-a-supersonic-cdn-subscription/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.namecheap.com/support/knowledgebase/article.aspx/10470/2251/how-to-set-up-supersonic-cdn/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.namecheap.com/support/knowledgebase/subcategory/2251/supersonic-cdn/ — HTTP 503; no usable vendor-source text.

## services/neo4j-auradb

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://neo4j.com/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://neo4j.com/docs/aura/managing-instances/backup-restore-export/ — HTTP 503; no usable vendor-source text.
- Attempted https://neo4j.com/docs/aura/quotas-and-limits/ — HTTP 503; no usable vendor-source text.
- Attempted https://neo4j.com/docs/aura/managing-instances/instance-actions/ — HTTP 503; no usable vendor-source text.
- Attempted https://neo4j.com/docs/aura/getting-started/create-account/ — HTTP 503; no usable vendor-source text.
- Attempted https://neo4j.com/docs/aura/getting-started/create-instance/ — HTTP 503; no usable vendor-source text.
- Attempted https://neo4j.com/docs/aura/getting-started/connect-instance/ — HTTP 503; no usable vendor-source text.
- Attempted https://neo4j.com/docs/aura/ — HTTP 503; no usable vendor-source text.
- Attempted https://neo4j.com/product/auradb/ — HTTP 503; no usable vendor-source text.

## services/neon

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://neon.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://neon.com/docs/introduction/plans — HTTP 503; no usable vendor-source text.
- Attempted https://neon.tech/docs/introduction — HTTP 503; no usable vendor-source text.
- Attempted https://neon.com/docs/get-started/signing-up — HTTP 503; no usable vendor-source text.
- Attempted https://neon.tech/ — HTTP 503; no usable vendor-source text.

## services/netdata-cloud

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.netdata.cloud/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://www.netdata.cloud/homelab/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.netdata.cloud/fair-usage-policy/ — HTTP 503; no usable vendor-source text.
- Attempted https://learn.netdata.cloud/docs/overview — HTTP 503; no usable vendor-source text.
- Attempted https://learn.netdata.cloud/docs/netdata-agent/installation/linux/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.netdata.cloud/ — HTTP 503; no usable vendor-source text.

## services/netlify

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.netlify.com/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.netlify.com/start/quickstarts/deploy-from-repository — HTTP 503; no usable vendor-source text.
- Attempted https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans — HTTP 503; no usable vendor-source text.
- Attempted https://docs.netlify.com/ — HTTP 503; no usable vendor-source text.
- Attempted https://netlify.com/ — HTTP 503; no usable vendor-source text.

## services/netlify-functions

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.netlify.com/pricing/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.netlify.com/build/functions/configuration/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.netlify.com/build/functions/usage-and-billing/ — HTTP 503; no usable vendor-source text.
- Attempted https://www.netlify.com/products/functions/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.netlify.com/functions/overview/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.netlify.com/functions/usage-and-billing/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.netlify.com/functions/get-started/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/ — HTTP 503; no usable vendor-source text.

## services/new-relic

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://newrelic.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://docs.newrelic.com/ — HTTP 503; no usable vendor-source text.
- Attempted https://docs.newrelic.com/docs/new-relic-solutions/get-started/intro-new-relic — HTTP 503; no usable vendor-source text.
- Attempted https://www.newrelic.com — HTTP 503; no usable vendor-source text.

## services/nile

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.thenile.dev/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://www.thenile.dev/docs/getting-started/whatisnile — HTTP 503; no usable vendor-source text.
- Attempted https://www.thenile.dev/docs — HTTP 503; no usable vendor-source text.
- Attempted https://www.thenile.dev/ — HTTP 503; no usable vendor-source text.

## services/no-ip

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://www.noip.com/remote-access — HTTP 503; no usable vendor-source text.
- Attempted https://www.noip.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://www.noip.com/support/knowledgebase — HTTP 503; no usable vendor-source text.
- Attempted https://www.noip.com/ — HTTP 503; no usable vendor-source text.

## services/nocodb

**unresolved** — source attempts only. Attempted source collection only; all cited sources returned environment proxy HTTP503, so no current vendor terms were available for comparison. No content or verification date changed.

Blocker: `environment-transport`.

Remaining: Compare the full entry with current official pricing, quota, eligibility, card, expiry and overage documentation after environment transport recovers.

- Attempted https://nocodb.com/pricing — HTTP 503; no usable vendor-source text.
- Attempted https://nocodb.com/docs/product-docs — HTTP 503; no usable vendor-source text.
- Attempted https://nocodb.com/ — HTTP 503; no usable vendor-source text.

## Validation

`check:answers` passed. Targeted evidence/depth validation covers the 42 completed entries; final integration checks are run by the coordinating review. The report and JSON include exactly the 100 assigned IDs.
