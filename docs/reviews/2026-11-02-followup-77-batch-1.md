# Follow-up to freshness issue #77: batch 1 (2026-11-02)

> Latest status: the [access recheck and local-browser handoff](2026-11-02-local-browser-handoff.md) resolved Crowdin and Zoom. **588 of 596 follow-up comparisons are complete; 8 remain incomplete.** The report below preserves its historical checkpoint; use the [current ledger](2026-11-02-followup-77.json) for current status.

Covered all 100 assigned entries: 82 completed comparisons, 6 partial comparisons, and 12 retrieval-only attempts. Eighty completed entries were unchanged; two completed entries were corrected. Three additional entries received supported wording corrections but remain incompletely reviewed.

Only the 82 completed comparisons advance `lastVerified` to 2026-11-02. All 18 incomplete entries retain their previous verification dates. `lastUpdated` changes only for the five wording/metadata corrections. These are catalog corrections, not newly dated vendor events.

Material offer, numeric-limit, card, cap and billing statements were compared with readable official source context. Existing explicit unknowns/conflicts were retained where the provider did not establish a policy. Quotes below are short audit anchors; an HTTP 200 or a matching number alone did not count as a review. No account was created and signup/charge behavior was not exercised.

The cloud proxy failed across unrelated providers with HTTP 503 and an upstream connection/`Invalid argument` transport error. This prevented fifteen complete comparisons. Three further gaps concern product-specific source detail or a thin application shell. Failed fetches are not vendor outages or proof of discontinued offers. No new sources were fetched after central recovery attempts failed.

## Entry findings

### services/ahasend — confirmed; complete

The 1,000 shared monthly emails, three domains, no-card signup, retention and API/SMTP limits match; Free over-limit behavior remains explicitly unconfirmed.

Source: <https://ahasend.com/pricing>

> le effortlessly. Pay for what you send. Prices in Free 1000 emails per month Multi-region EU infrastructure 1 to 7-day retention Community + best effort support Full Management API Campaign Builder 3 domains Platform Partner features Start for free No credit card required Pro MOST POPU

### services/aiven — unresolved; partial

Core Free products, resources and no-card policy are supported. The marketing list omits MySQL while the service-pricing documentation includes it; exact Free cloud/region, integration and single-copy backup restrictions need a current product-specific source.

Source: <https://aiven.io/docs/platform/concepts/free-plan>

> or OpenSearch® Aiven for PostgreSQL® Aiven for Valkey™ You don't need a credit card to create a free service and you can use them indefinitely free of charge. Free services do not have any time limitations. However, Aiven reserves the right to: Power off free services with no initial usage wi

Remaining: Core Free products, resources and no-card policy are supported. The marketing list omits MySQL while the service-pricing documentation includes it; exact Free cloud/region, integration and single-copy backup restrictions need a current product-specific source.

### services/algolia — confirmed; complete

The Free card lists 10K searches, 50K records, 5K recommendation requests and 5K crawls, with no card; the entry correctly avoids assuming exhaustion behavior.

Source: <https://www.algolia.com/pricing/>

> dit card required. INCLUDES: 10K search requests/month 50K records included 5K recommendation requests/month 5K crawls/month Get a demo See full features grid Scalable pricing for smarter search Powering the world&rsquo;s best AI experiences – start for free, grow seamlessly and upgra

### services/antideo — confirmed; complete

Previously blocked sources now readable. Free is lifelong, 10 requests/hour with strict limits and no card; email validation does not establish mailbox existence.

Source: <https://www.antideo.com/pricing/>

> icing Antideo Subscription Plans $0.00 Monthly Payment 10 requests/hour Email support HTTP HTTPS Strict limits SIGN UP NOW $5.00 Monthly Payment 50 requests/hour Email support HTTP HTTPS Soft limits* SIGN UP NOW $10.00 Monthly Payment 100 requests/hour Email support HTTP HTTPS Sof

### services/apiverve — confirmed; complete

Free remains 200 credits/month at five requests/minute, non-commercial with attribution. The FAQ confirms HTTP 429 after credit depletion and no rollover.

Source: <https://apiverve.com/pricing>

> Free Development & testing $ 0 No credit card required 200 credits / mo Start for free ✓ Access to all 300+ APIs • Rate limited to 5 req/min • Attribution required • Non-commercial use • Community support Starter For growing projects $ 29.99 /mo Billed monthly 200,000 credits / mo

### services/appho-st — unresolved; attempted-only

The only cited page is a thin application shell; the five-app, 50-download, 100-MB plan and inactivity policy cannot be re-established from readable source text.

Remaining: The only cited page is a thin application shell; the five-app, 50-download, 100-MB plan and inactivity policy cannot be re-established from readable source text.

Unusable attempted sources:

- <https://appho.st> — HTTP 200; thin extraction classification.

### services/appveyor — confirmed; complete

Public-only Free, one concurrent job, five self-hosted jobs and 60-minute build limit match. Extra jobs queue; card and timeout enforcement uncertainties remain qualified.

Source: <https://www.appveyor.com/pricing/>

> Pricing AppVeyor Hosted CI/CD Service Open-source FREE Unlimited public projects 1 concurrent job 5 self-hosted jobs Community support Get your FREE account Basic $29 /month 1 private project 1 concurrent job 5 self-hosted jobs Priority technical support Start free 14-day trial Pro $59 /mo

### services/arize-ai — confirmed; complete

AX Free still lists 25K spans, 1 GB ingestion, 15-day retention, ten Signal issues and unlimited users/evals; no-card signup is explicit and exhaustion behavior is still qualified.

Source: <https://arize.com/pricing/>

> t card required Signal 10 issues per month Trace spans 25k spans per month Ingestion volume 1 GB per month Retention 15 days Deployment SaaS Users Unlimited Evals Unlimited AX Pro For AI-native teams $50 per month Sign up Signal 25 issues per month Trace spans 50k spans per month Ing

### services/asgardeo — confirmed; complete

The WSO2 Free plan and comparison confirm 15K MAU, five applications, one organization, token quotas and one-day sessions/seven-day logs. Trial resources above quotas are deactivated, not deleted.

Source: <https://wso2.com/identity-platform/pricing/>

> tarted with identity. No card, no time limit. $0 /mo ✓ Up to 15,000 MAUs ✓ 5,000 M2M tokens ✓ 2,500 AgentID tokens ✓ 1 B2B organization ✓ Up to 5 applications ✓ 1 social login Get Started Includes a 30-day free trial of Growth. No credit card required. Growth Ideal for teams runnin

### services/azure-advisor — confirmed; complete

Advisor remains free; an Azure subscription and appropriate viewing role are needed, with charges belonging to the resources being managed.

Source: <https://azure.microsoft.com/en-us/pricing/details/advisor/>

> cellence, performance, and cost. Azure Advisor Pricing Access recommendations at no additional cost. Azure pricing and purchasing options Connect with us directly Get a walkthrough of Azure pricing. Understand pricing for your cloud solution, learn about cost optimization and request a custom proposal. Talk t

### services/azure-ai-bot-service — confirmed; complete

Standard-channel messages remain unlimited and premium F0 messages total 10K/month; hosting and other resources have separate charges.

Source: <https://azure.microsoft.com/en-us/pricing/details/bot-services/>

> mited messages N/A Unlimited messages Premium channels 10,000 messages/month N/A $- per 1,000 messages Apart from the above pricing, you also pay for resources consumed as described below. For the Bot creation plans, your bot will be powered by Azure App Services and follows the App Se

### services/azure-ai-content-safety — confirmed; complete

The F0 table retains 5K text records and 5K images; the FAQ explicitly stops usage and disallows overages on Free.

Source: <https://azure.microsoft.com/en-us/pricing/details/cognitive-services/content-safety/>

> ds Protected material detection Groundedness detection 5,000 text records per month 1 Image Multimodal 5,000 images per month Standard – Web Text Prompt Shields Protected material detection Groundedness detection $- per 1,000 text records 1 Image Multimodal $- per 1,000 images 1 A text record

### services/azure-ai-custom-vision — confirmed; complete

F0 project, image, tag, training and prediction allowances match; the existing retirement warning is retained.

Source: <https://azure.microsoft.com/en-us/pricing/details/cognitive-services/custom-vision-service/>

> tions Up to 2 projects Up to 1 hour training per month 5,000 training images free per project 10,000 predictions per month N/A in selected region Standard 10 TPS Prediction transactions Up to 100 projects $- per 1,000 transactions Training $- per compute hour Image Storage Up to 6 MB each $- per 1,000

### services/azure-ai-document-intelligence — confirmed; complete

The 500-page F0 allowance and smaller request/file limits remain; premium features and Query Meter are excluded and paid S0 is separate.

Source: <https://azure.microsoft.com/en-us/pricing/details/ai-document-intelligence/>

> nstance Document type Price Free - Web/Container 1 All 0 - 500 pages free per month S0 - Web/Container Read 0-1M pages - $- per 1,000 pages 1M+ pages - $- per 1,000 pages All Prebuilt Models: Document, Layout, Receipt, Invoice, ID, W-2, 1098 Tax forms, Health insurance card, Contract. $- per

### services/azure-ai-health-bot — confirmed; complete

Healthcare agent F0 remains evaluation/development only at 15 RPS; production C1 is metered and monthly Free action volume is not published.

Source: <https://learn.microsoft.com/en-us/azure/health-bot/pricing-details>

> healthcare agent service. The Free tier is limited to 15 requests per second (RPS) . Agent (C1) Tier Within the first weeks of November, 2025 healthcare agent service adopts simplified, flexible pricing. Where every Action will be billed at $0.01, meaning customers only pay for what th

### services/azure-ai-immersive-reader — confirmed; complete

All tiers retain three million free characters monthly followed by metered billing; Entra authentication is required.

Source: <https://azure.microsoft.com/en-us/pricing/details/cognitive-services/immersive-reader/>

> 3M characters free per month. Instance Price Standard 3 million characters free per month. $- per 1M characters Education/Nonprofit 3 million characters free per month. $- per 1M characters Azure pricing and purchasing options Connect with us directly Get a walkthrough of Azure pricing. Understand

### services/azure-ai-language — confirmed; complete

The listed language features share 5K records monthly. The FAQ confirms throttling at the F0 limit without accrued overages.

Source: <https://azure.microsoft.com/en-us/pricing/details/cognitive-services/language-service/>

> recognition, and conversational language understanding all share 5,000 free text records per month. Please contact sales for pricing of over 10 million text records. Some features such as question answering require dependent resources. When you choose question answering, an Azure AI Search resources will al

### services/azure-ai-search — confirmed; complete

Dedicated Free still has 50 MB, three indexes/indexers and limited enrichment; inactivity deletion and no Free semantic ranker are retained.

Source: <https://learn.microsoft.com/en-us/azure/search/search-limits-quotas-capacity>

> 180 seconds. For AI indexing that calls Foundry Tools, free services are limited to 20 free transactions per indexer per day, where a transaction is defined as a document that successfully passes through the enrichment pipeline. (Tip: You can reset an indexer to reset its count.) 2 Basic services created before D

### services/azure-ai-speech — confirmed; complete

The shared standard/custom speech-to-text allowance, 0.5M neural characters and translation hours match; unused custom endpoints and F0 concurrency limits remain qualified.

Source: <https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/>

> (per second billing) Standard Real-time Transcription: 5 audio hours free per month 2 Custom Real-time Transcription: 5 audio hours free per month 2 Endpoint hosting: 1 model free per month 1 Text to Speech (per character billing) Neural 0.5 million characters free per month Speech Translatio

### services/azure-ai-translator — confirmed; complete

F0 includes two million characters shared across standard translation and custom training. Request and hourly limits remain separate from monthly exhaustion behavior.

Source: <https://azure.microsoft.com/en-us/pricing/details/cognitive-services/translator/>

> issued. F0 - Free Features Price Standard Translation 2 million characters of any combination of standard translation and custom translation training free per month Text Translation Language Detection Bilingual Dictionary Transliteration Custom Translation Training S1 – Pay as you go Features Price Sta

### services/azure-ai-video-indexer — confirmed; complete

The documentation still says 2,400 website minutes while pricing says ten website hours and forty API hours; the entry already preserves this conflict and trial-only scope.

Source: <https://learn.microsoft.com/en-us/azure/azure-video-indexer/video-indexer-overview>

> don't need an Azure subscription. The account provides up to 2,400 minutes of free indexing by using the Azure AI Video Indexer website. If you don't use your trial account for 12 months, it can be deleted. To keep your account, sign in at least once every 12 months. Trial accounts aren't available i

### services/azure-ai-vision — confirmed; complete

Image Analysis F0 remains 5K transactions monthly at 20/minute; the existing retirement warning and separate Face-service scope are retained.

Source: <https://azure.microsoft.com/en-us/pricing/details/cognitive-services/computer-vision/>

> Instance Features Price Free (F0) - Web/Container All 5,000 free transactions per month N/A in selected region 20 transactions per minute Standard (S1) - Web/Container Background Removal (preview) Free Group 1 Tag Face GetThumbnail Color Image Type GetAreaOfInterest People Detection (preview) Sma

### services/azure-app-configuration — confirmed; complete

Free keeps three stores/region, 10 MB/store and 1K requests/day; further requests return HTTP 429 through the daily reset.

Source: <https://azure.microsoft.com/en-us/pricing/details/app-configuration/>

> te requests. Request quota per resource 1,000 per day (Once the quota is exhausted, HTTP status code 429 will be returned for all requests until the end of the day) 6,000 per hour (Once the quota is exhausted, requests may return HTTP status code 429 indicating Too Many Requests - until the end of the hour) 30,00

### services/azure-app-service — confirmed; complete

F1 retains shared infrastructure, 60 CPU minutes/day and 1 GB; quota docs explain stopped apps/HTTP403 and no production SLA.

Source: <https://azure.microsoft.com/en-us/pricing/details/app-service/windows/>

> e Plan Cores RAM Storage Pay as you go F1 Free Shared (60 CPU minutes / day) 1 GB 1.00 GB $- D1 Shared Shared (240 CPU minutes / day) 1 GB 1.00 GB $- per site Dev/Test Pricing Available Available for Visual Studio subscribers looking to run development and testing workloads, individua

### services/azure-arc — confirmed; complete

Core inventory/management remains free and optional management/security services add charges; license-dependent exceptions do not make all add-ons free.

Source: <https://azure.microsoft.com/en-us/pricing/details/azure-arc/core-control-plane/>

> Manage. Administrate your servers anywhere using SSH Arc, Run Command, and Custom Script Extension. FREE N/A VM Self-service. Perform lifecycle management such as (create, resize, update and delete) a

Source: <https://azure.microsoft.com/en-us/pricing/details/azure-arc/core-control-plane/>

> Add-on Azure management services, such as Azure Update Manager, Azure Policy guest configuration, Azure Monitor, Microsoft Defender for Cloud, and Microsoft Sentinel, are charged for Azure Arc-enabled servers when enabled. The total monthly price of Azure Arc-enabled servers depends on the number of Azure management and

### services/azure-bandwidth — confirmed; complete

The first 100 GB of internet egress remains free; additional egress and inter-region traffic are billed, while same-region service transfer is explicitly free.

Source: <https://azure.microsoft.com/en-us/pricing/details/bandwidth/>

> via Microsoft Premium Global Network) Source Continent First 100 GB/Month Next 10 TB/Month Next 40 TB/Month Next 100 TB/Month Next 350 TB/Month From North America, Europe to any destination Free $0.087 per GB $0.083 per GB $0.07 per GB $0.05 per GB From Asia (China excluded), Austra

### services/azure-bastion — confirmed; complete

Developer remains a regional, non-production single-VM option. Dedicated SKUs incur hourly charges, and the default portal deployment is not the free SKU.

Source: <https://learn.microsoft.com/en-us/azure/bastion/quickstart-developer-sku>

> ngs to specify the SKU and scaling options, or use the free Developer SKU for basic connectivity. After you deploy Bastion, you can use SSH or RDP to connect to virtual machines (VMs) in the virtual network via Bastion by using the private IP addresses of the VMs. The VMs that you c

### services/azure-blob-storage — confirmed; complete

The new-account grant is 5 GB hot LRS, 20K reads and 10K writes for twelve months; other tiers and post-allowance usage are billable.

Source: <https://azure.microsoft.com/en-in/pricing/free-services/>

> able object storage for any type of unstructured data. 5 GB locally redundant storage (LRS) hot block with 20,000 read and 10,000 write operations 12 months Managed Disks Get high performance, durable block storage for Azure Virtual Machines with simplified management. 2 64 GB (P6) solid state

### services/azure-container-apps — confirmed; complete

Consumption still includes 180K vCPU-seconds, 360K GiB-seconds and two million requests monthly; idle replicas and management features can add charges.

Source: <https://azure.microsoft.com/en-us/pricing/details/container-apps/>

> ed on per-second resource allocation and requests. The first 180,000 vCPU-seconds, 360,000 GiB-seconds, and 2 million requests per subscription per month are free. Beyond that, you pay for what you use on a per second basis based on the number of vCPU-s and GiB-s your applications are alloc

### services/azure-cosmos-db — confirmed; complete

The free-tier 1K RU/s and 25 GB allowance remains; selecting it at account creation and excluding serverless are material qualifications preserved in the entry.

Source: <https://azure.microsoft.com/pricing/details/cosmos-db/>

> able performance. New accounts are eligible to receive 1,000 request units per second (RU/s) throughput and 25 GBs storage per month with Azure Cosmos DB free tier . There are two capacity management options for provisioned throughput: autoscale provisioned throughput and standard provisioned t

### services/azure-cost-management — confirmed; complete

Cost Management for Azure remains free; underlying resource charges and unsupported billing/account scopes remain distinct.

Source: <https://azure.microsoft.com/en-us/pricing/details/cost-management/>

> lable to Azure customers and managed service providers at no additional cost. Cost Management for Azure The following Cost Management features are provided in the Azure portal for managing Azure spend at no additional cost. Reporting Report on cost and usage Data enrichment Categorize

### services/azure-data-factory — confirmed; complete

The entry correctly treats Data Factory V2 as using shared new-account credit rather than inventing recurring V2 pipeline units; continuation requires pay-as-you-go.

Source: <https://azure.microsoft.com/en-us/pricing/details/data-factory/data-pipeline/>

> Request a pricing quote Get free cloud services and a $200 credit to explore Azure for 30 days. Try Azure for free Added to estimate. Press 'v' to view on calculator View on calculator Chat with Sales ; Can we help you? Chat Now No thanks What is Azure? Get started with Azur

### services/azure-database-for-mysql — confirmed; complete

B1MS 750 hours, 32 GB storage and 32 GB backup remain a twelve-month new-account offer; extra usage is metered.

Source: <https://azure.microsoft.com/en-in/pricing/free-services/>

> ost a fully managed, scalable MySQL database in Azure. 750 hours of Flexible Server—Burstable B1MS Instance, 32 GB storage, and 32 GB backup storage 12 months Azure Database for PostgreSQL Build intelligent, scalable apps with a fully managed PostgreSQL database on Azure. 750 hours of Flexibl

### services/azure-devops — confirmed; complete

The five-user/repository offer, hosted and self-hosted pipeline allowances and 2-GiB artifacts grant match; subscription-linkage versus no-card FAQ is already qualified.

Source: <https://azure.microsoft.com/en-us/pricing/details/devops/azure-devops-services/>

> D 1 Free Self-Hosted CI/CD 1 Microsoft-hosted job with 1,800 minutes per month for CI/CD and 1 self-hosted job with unlimited minutes per month $40 per extra Microsoft-hosted CI/CD parallel job and $15 per extra self-hosted CI/CD parallel job with unlimited minutes GitHub-hosted agents:

### services/azure-disk-storage — confirmed; complete

The free-services table retains two P6 64-GB disks, 1-GB snapshot and two million I/O operations for twelve months; shared signup credit is separate.

Source: <https://azure.microsoft.com/en-in/pricing/free-services/>

> for Azure Virtual Machines with simplified management. 2 64 GB (P6) solid state drives SSD storage, plus 1 GB snapshot and 2 million I/O operations 12 months Web Azure SignalR Service Add real-time communications into your web applications. 20 concurrent connections per unit a

### services/azure-file-storage — confirmed; complete

The table still lists 100 GB while the promotional summary gives 5 GB; the entry correctly preserves the conflicting official scopes rather than selecting a convenient amount.

Source: <https://azure.microsoft.com/en-in/pricing/free-services/>

> ed, cross-platform file storage without changing code. 100 GB of LRS transaction optimized, hot, and cool files. 2 million read, list, and other file operations 12 months Blob Storage Use massively scalable object storage for any type of unstructured data. 5 GB locally redundant storage (LRS) hot bl

### services/azure-functions — confirmed; complete

Legacy Consumption and newer Flex grants remain distinct; paid consumption eligibility, default storage charges and Always Ready idle charges are preserved.

Source: <https://azure.microsoft.com/pricing/details/functions/>

> sumption plan pricing includes a monthly free grant of 250,000 executions and 100,000 GB-s of resource consumption per month per subscription in pay-as-you-go on-demand pricing across all function apps in that subscription. Meter Free Grant (Per Month) Pay as you go 1 year savings plan 3 year saving

### services/azure-iot-hub — confirmed; complete

F1 daily message, device and endpoint limits remain; free hubs cannot be upgraded in place and per-second throttling differs from the daily quota.

Source: <https://azure.microsoft.com/en-us/pricing/details/iot-hub/>

> ages/day per IoT Hub unit Message meter size Free Free 8,000 0.5 KB S1 $- 400,000 4 KB S2 $- 6,000,000 4 KB S3 $- 300,000,000 4 KB For more information about the capabilities supported in the basic and standard tiers, please see how to choose the right IoT hub tier . Fo

### services/azure-lighthouse — confirmed; complete

Lighthouse itself remains free and delegated underlying Azure services keep their own prices.

Source: <https://azure.microsoft.com/en-us/pricing/details/azure-lighthouse/>

> the Azure delegated resource management technology is available at no additional charge. Partners who use these capabilities on Azure services such as Log Analytics, Microsoft Defender for Cloud, etc. will continue to pay for the underlying services. If an underlying service is free (Azure Policy

### services/azure-logic-apps — confirmed; complete

Consumption still includes 4K built-in operations; managed connectors and additional actions remain chargeable.

Source: <https://azure.microsoft.com/en-us/pricing/details/logic-apps/>

> or executions are metered. Price Per Execution Actions First 4,000 actions free - Included $- Data retention: $- GB/month Connectors Connector billing is based on the number of calls. The number of calls may differ from the number of action executions. See the Logic Apps pricing guide for

### services/azure-maps — confirmed; complete

Gen2 meter-specific free quantities and tile/matrix counting match; the entry already warns that Gen1 retired in September 2026.

Source: <https://azure.microsoft.com/en-us/pricing/details/azure-maps/>

> sactions . Meters Free <500K 500K+ Maps Base Map Tiles 5,000 $- Contact Us Imagery Tiles​ 1,000 $- Contact Us Traffic Tiles​​ 5,000 $- Contact Us Weather Tiles​​ 1,000 $- Contact Us Static Map Images​​ 1,000 $- Contact Us Location Insights Data 5,000 $- Contact Us Geolo

### services/azure-monitor — corrected; complete

Scoped summary, limits and answer to Analytics Logs and the billing account; the source does not grant every log tier 5 GB or identical retention. Existing body already had the correct qualification.

Source: <https://azure.microsoft.com/en-us/pricing/details/monitor/>

> The first 5 GB/month per billing account in this tier are free.

Source: <https://azure.microsoft.com/en-us/pricing/details/monitor/>

> Analytics Logs 31/90 days of retention included; can be extended up to 12 years Up to 2 years interactive query; query older data using search jobs Query cost included Fast query performance with full KQL support Out-of-the-box insights Alerting Summary rules Log processing in the Azure Monitor cloud pipeline is included. Pay-As-You-Go 3

Source: <https://azure.microsoft.com/en-us/pricing/details/monitor/>

> 31 days – data ingested into Analytics Logs 90 days – data ingested into Analytics Logs if Microsoft Sentinel is enabled on the workspace 90 days – data ingested into either classic or workspace-based Application Insights Data retained beyond these no-charge periods will b

### services/azure-network-watcher — confirmed; complete

Flow-log, diagnostic and connection-test allowances match; Traffic/Network Analytics and storage charges are separate, with NSG-flow-log retirement preserved.

Source: <https://azure.microsoft.com/en-us/pricing/details/network-watcher/>

> ed Price Network flow logs collected (NSG flow logs) 1 5 GB per month $- per GB Virtual network flow logs collected 5 GB per month $- per GB Network Diagnostic Tools 2 1,000 checks per month $- per check Connection Monitor 4 10 tests per month 0 tests per month 0-10 tests - Incl

### services/azure-notification-hubs — confirmed; complete

Free still has 1M pushes, 500 devices/namespace and no purchasable push overage; the pricing FAQ explains interrupted registrations and undelivered excess pushes.

Source: <https://azure.microsoft.com/en-us/pricing/details/notification-hubs/>

> r 100 100 Unlimited 1 Hubs per namespace 100 100 100 2 Active devices per namespace 500 200,000 10,000,000 X-plat push to individual devices Available Available Available Push variables Available Available Available Telemetry Limited Limited Rich 3 Queryable audience (registration queries) Av

### services/azure-open-datasets — unresolved; partial

Free hosting and possible egress charges are supported. The entry's categorical no-card metadata is not established by the fetched access guides, which describe Azure-account/subscription paths.

Source: <https://azure.microsoft.com/en-us/products/open-datasets/>

> Open Datasets. While storage will always remain free, egress costs associated with reading large datasets can be charged to the Azure subscription accessing the data. Most datasets will be free to access. Egress charges, if applicable, will be mentioned on the Open Datasets overview page. Resources Open Datasets r

Remaining: Free hosting and possible egress charges are supported. The entry's categorical no-card metadata is not established by the fetched access guides, which describe Azure-account/subscription paths.

### services/azure-policy — confirmed; complete

Azure Policy remains free on Azure resources, with separate Arc machine-configuration charges and a 24-hour compliance cycle.

Source: <https://azure.microsoft.com/en-us/pricing/details/azure-policy/>

> the inclusion of IOF taxes. An eNF will not be issued. There are no charges for using Azure Policy on Azure resources. Azure Resource Arc Resource Azure Automanage machine configuration Free $6 /server/month Azure pricing and purchasing options Connect with us directly Get a walkthrough of Azure pricing. Understand pricing for

### services/azure-postgresql-flexible-server — confirmed; complete

The twelve-month B1MS/750-hour, 32-GB storage and 32-GB backup grant is still present; excess usage and high-availability resources are separate.

Source: <https://azure.microsoft.com/en-in/pricing/free-services/>

> Azure Database for PostgreSQL Build intelligent, scalable apps with a fully managed PostgreSQL database on Azure. 750 hours of Flexible Server—Burstable B1MS Instance, 32 GB storage, and 32 GB backup storage 12 months Azure SQL Managed Instance Modernize existing apps with a fully managed SQL instance on A

### services/azure-signalr-service — confirmed; complete

Free remains dev/test with twenty connections, twenty thousand messages/day, one unit and no SLA; exact exhaustion behavior remains unpublished.

Source: <https://azure.microsoft.com/en-us/pricing/details/signalr-service/>

> Connections per Unit 20 1,000 1,000 Messages/Unit/Day 20,000 unlimited (free for the first 1,000,000 messages) unlimited (free for the first 1,000,000 messages) Price/Unit/Day Free $- $- (instance scale <= 1,000 units) SLA N/A 99.9% 99.95% Availability Zone Support - -

### services/azure-static-web-apps — confirmed; complete

The Free bandwidth, storage, domain, app and build limits match; the pricing FAQ confirms that over-quota Free sites cannot be served.

Source: <https://azure.microsoft.com/en-us/pricing/details/app-service/static/>

> app) Price Free * $- /app/month ** Included Bandwidth 100 GB per subscription 100 GB per subscription Bandwidth Overage N/A $- per GB per subscription Custom Domains 2 per app 5 per app SSL Certificates Free Free Service Defined Authentication Available Available Custom

### services/azure-virtual-networks — confirmed; complete

Creating VNets remains free, with a 1K-subscription limit; peering and network appliances have their own charges.

Source: <https://azure.microsoft.com/en-us/pricing/details/virtual-network/>

> Azure is free of charge. Every subscription can create up to 1,000 Virtual Networks across all regions. VNET Peering links two virtual networks – either in the same region, or in different regions - and enables you to route traffic between them using private IP addresses (carry a nominal char

### services/azure-web-pubsub — confirmed; complete

Free retains twenty connections, twenty thousand daily messages and one unit; outgoing message size accounting and paid-tier overages remain separate.

Source: <https://azure.microsoft.com/en-us/pricing/details/web-pubsub/>

> Connections per Unit 20 1,000 1,000 Messages/Unit/Day 20,000 unlimited (free for the first 1,000,000 messages) 1 unlimited (free for the first 1,000,000 messages) 1 Price/Unit/Day Free $- $- Max Units 1 100 1000 (1-100 units for Premium_P1, 100-1000 units for Premium_P2

### services/bitrise — corrected; complete

Hobby quantities and card-required initial trial are supported. Changed hasHardCap to unknown because the pricing FAQ states the build timeout but does not establish what happens after the 300 monthly credits.

Source: <https://www.bitrise.io/pricing>

> Our Hobby tier is free. No strings attached, no credit card needed. We give you 1 private app, 5 concurrencies with 90 mins/build timeout and 300 credits per month. Try Bitrise, it’s on us. What's included in the 30-day fre

Source: <https://docs.bitrise.io/en/bitrise-ci/getting-started/getting-started>

> To start the 30-day trial, you need to provide credit card details: Your card will be charged $0.01 during the verification process and the transaction will be voided immediately after the process completes, meaning the 30 day Pro trial is completely free to you. We’re NOT going to automatically sign you up to a paid plan when your trial expires. Your billing data is retained so you can use the same credit card info & billing address to subscr

### services/bitwarden-secrets-manager — confirmed; complete

Free still allows unlimited secrets with two users, three machine accounts and three projects; account access and unknown Free limit enforcement remain qualified.

Source: <https://bitwarden.com/products/secrets-manager/>

> ree Teams Start Free Trial Enterprise Start Free Trial Unlimited Secret Storage Unlimited Secret Storage Store unlimited developer secrets at no additional cost. Free  Teams Start Free Trial  Enterprise Start Free Trial  Securely share secrets with users Securely share secrets with use

### services/brainboard — confirmed; complete

The Free/Pro distinction and 21-day trial downgrade match; Free deployment remains Validate & Plan, with paid Apply capabilities and membership uncertainty preserved.

Source: <https://docs.brainboard.co/help-and-faq/faq>

> . {% hint style="info" %} When you sign up, you have a 21-day free trial that provides you with access to all features of Brainboard. After that, if you don't upgrade, your account is automatically switched to the free plan. {% endhint %} *** ### 14. How do I generate the Terraform

### services/braintrust — confirmed; complete

Starter included credits/data/scores and 14-day retention match; overages require on-demand billing and disabling it blocks above-limit usage.

Source: <https://www.braintrust.dev/pricing>

> tarter For everyone $0 / month $10 credits + tok rates 1 GB processed data + $4/GB 10k scores + $2.50/1k 14-day retention Unlimited users, projects, datasets, playgrounds, and experiments Sign up No credit card required Pro For AI native teams $249 / month $100 credits + tok rates 5

### services/browse-ai — confirmed; complete

Free remains fifty monthly credits, two domains and three users; no rollover, premium-task costs and unpublished exhaustion remain qualified.

Source: <https://help.browse.ai/en/articles/10524140-how-to-manage-your-browse-ai-subscription>

> d Paid Plans? Free Plan Limits The free plan permits a maximum of 2 unique website domains. You can set up robots for any number of pages on each domain, but to add a third domain, you would need to remove one of the existing domains from your account or upgrade to a paid plan. Paid Plan Limits High

### services/buddy — confirmed; complete

Free still has one seat, two concurrent runs and $1 credit, with stopped workloads after exhaustion and login-based inactivity deletion.

Source: <https://buddy.works/docs/basics/billing-and-usage/features>

> It is limited to 1 seat and 2 concurrents and includes $1 of usage credit every month. Info Free workspaces are a subjet to inactivity termination. After a period of 60 days with no activity, the workspace will be frozen and subsequently terminated permanently if no action is taken within the f

### services/bugsink — confirmed; complete

Hosted Free retains 15K monthly/5K retained events and one user; documented rate-limit backoff is not conflated with monthly-quota enforcement.

Source: <https://www.bugsink.com/register/15K/>

> I have read and accept the DPA . Create Free Instance No credit card required. We will send you an email with instructions on how to access your new Bugsink instance. Alternatively, start a 28‑day trial to add your teammates or handle more than 15K events per month. About Terms Privacy C

### services/buttondown — confirmed; complete

The first hundred subscribers remain free with the named editor/domain/archive features; paid add-ons and one-email-per-day pricing assumptions match.

Source: <https://buttondown.com/pricing>

> 2 3 4 5 6 7 8 9 subscribers Buttondown will cost you: Absolutely nothing for your first 100 subscribers. That price includes: Rich text or markdown editor Send from a custom domain Hosted newsletter archives Privacy-first Add-ons: Tagging & segmentation +$9/month Paid subscriptions +$9/month Comments and surveys

### services/cdnjs — confirmed; complete

The public curated CDN remains free; package onboarding and API access are not arbitrary private-file hosting.

Source: <https://cdnjs.com/about>

> t on-demand pull-through access to libraries. Instead, cdnjs is a curated CDN that only serves libraries that have been added to the service by the community. Adding a library to cdnjs is straightforward: open a pull request in the cdnjs/packages repository with a small JSON file descri

### services/certkit — confirmed; complete

Homelab resources remain limited to personal non-commercial use; business trials end after ninety days and renewals stop without a plan.

Source: <https://www.certkit.io/pricing>

> our InCommon certificate affected? [✕] CertKit Pricing All plans include a free 90-day trial . Long enough to see your certificates renew automatically . No credit card required. Homelab Free Personal, non-commercial use. 2 certificates 1 agent 1 seat Sign up Professional $99/mo Billed yearly at $1,18

### services/checkly — confirmed; complete

Hobby monitor/API/browser allowances and stop-at-credit-exhaustion policy match; paid overage billing is kept separate.

Source: <https://www.checklyhq.com/pricing/>

> nd Synthetic monitoring. Monthly Annual Save up to 20% Hobby Perfect for personal projects and learning $0 per month Get Started Uptime Monitors 10 Maximum Frequency 2 Min. Locations 6 Retries Synthetic Monitoring Browser/Playwright Checks 1,000 API Checks 10,000 Round

### services/clerk — confirmed; complete

Hobby still includes 50K retained users, three seats and 100 retained organizations; exceeding limits requires an upgrade with a one-month grace period.

Source: <https://clerk.com/pricing>

> Hobby: Up to 3 dashboard seats Unlimited applications 50,000 MRU limit per app Up to 5 user impersonations APIs and prebuilt UIs for sign-up, sign-in, and user profile + most authentication features Custom domain Fixed, 7 day session lifetime Application Logs 1 day retention Machine Auth

### services/clicky — confirmed; complete

Free remains one site, 3K daily views and thirty-day history; unknown spike handling and paid visitor-history retention remain qualified.

Source: <https://clicky.com/help/pricing>

> ing it. Click here to see an example More data history Free plans are limited to 30 days of history. Paid plans have indefinite history, with the exception of individual visitors and actions. These take up an enormous amount of space, so are only guaranteed for 6 months. Data export Export your data to CSV or

### services/cloud-functions — confirmed; complete

The entry distinguishes first-generation functions from Cloud Run request-based grants and correctly ties free amounts to billing accounts with metered excess.

Source: <https://cloud.google.com/free/docs/free-cloud-features>

> gurations, see Cloud Run pricing . Cloud Run functions 2 million invocations per month (includes both background and HTTP invocations). 400,000 GB-seconds, 200,000 GHz-seconds of compute time. 5 GB of outbound data transfer per month. Learn about Cloud Run functions (1st gen) pricing .

### services/cloud-run — confirmed; complete

The request-based CPU, memory, request and regional egress grants remain; minimum instances and other build/storage products can incur separate charges.

Source: <https://cloud.google.com/free/docs/free-cloud-features>

> pricing . Cloud Run Limits for request-based billing: 2 million requests per month. 360,000 GB-seconds of memory, 180,000 vCPU-seconds of compute time. 1 GB of outbound data transfer from North America per month. To learn about the Free Tier usage limits for other billing configura

### services/cloud-shell — confirmed; complete

The fifty-hour weekly quota, 5-GB home, twelve-hour session and inactivity/home deletion rules match; Cloud Shell itself is free but resources it operates may not be.

Source: <https://cloud.google.com/shell/docs/quotas-limits?hl=en>

> up Cloud Workstations to get started. Usage quotas The default weekly Cloud Shell quota is 50 hours. Viewing your weekly Cloud Shell quota If you reach your quota, you'll need to wait until the date and time specified before you can use Cloud Shell again or upgrade to Cloud Workstations. To view your weekly q

### services/cloudamqp — confirmed; complete

Both RabbitMQ/LavinMQ shared free plans retain their separate limits; idle queue/instance cleanup is distinct from unpublished monthly quota enforcement.

Source: <https://www.cloudamqp.com/docs/index.html>

> ase Orders, contact billing@cloudamqp.com . Free plan: No billing information required. Message brokers Both LavinMQ and RabbitMQ support the same core use cases and run on the AMQP protocol. LavinMQ is built to be highly resource-efficient, offering exceptional throughput with a smaller hardware

### services/cloudflare-durable-objects — confirmed; complete

SQLite-backed Free allowances and fail-with-error policy match; WebSocket duration and persistent storage do not reset like daily requests.

Source: <https://developers.cloudflare.com/durable-objects/platform/pricing/>

> h the key-value storage backend. On Workers Free plan: If you exceed any one of the free tier limits, further operations of that type will fail with an error. Daily free limits reset at 00:00 UTC. Compute billing Durable Objects are billed for compute duration (wall-clock time) while the Durable Object is act

### services/cloudflare-email-routing — confirmed; complete

Inbound routing remains unlimited/free with rule/destination and 25-MiB limits; arbitrary-recipient sending requires Workers Paid.

Source: <https://developers.cloudflare.com/email-service/platform/pricing/>

> 3,000 included per month, then $0.35 per 1,000 emails Inbound emails (Email Routing) Unlimited Unlimited The 3,000 included emails apply per account, per month, aligned with your Cloudflare subscription billing cycle. Emails that hard-bounce or are otherwise accepted by Email Service count tow

### services/cloudflare-hyperdrive — confirmed; complete

The 100K daily query grant, pooling limits and explicit fail/reset behavior remain; origin database hosting still bills separately.

Source: <https://developers.cloudflare.com/hyperdrive/platform/pricing/>

> rkers plans . Free plan 1 Paid plan Database queries 2 100,000 / day Unlimited Footnotes 1: The Workers Free plan includes limited Hyperdrive usage. All limits reset daily at 00:00 UTC. If you exceed any one of these limits, further operations of that type will fail with an err

### services/cloudflare-images — confirmed; complete

Free remains 5K unique transformations of externally stored originals; cached variants continue while new variants fail without a bill.

Source: <https://developers.cloudflare.com/images/pricing/>

> tions in cache will continue to be served as expected. New transformations will return a 9422 error. If your source image is from the same domain where the transformation is served, then you can use the onerror parameter to redirect to the original image. You will not be charged for exceeding the limits in th

### services/cloudflare-pages — confirmed; complete

Free build/file/project/domain quotas match; Functions consume Workers quotas and new projects are directed toward Workers.

Source: <https://developers.cloudflare.com/pages/platform/limits/>

> ild at a time 5 concurrent builds 20 concurrent builds Builds per month 500 5,000 20,000 Builds will timeout after 20 minutes. Concurrent builds are counted per account. Custom domains Based on your Cloudflare plan type, a Pages project is limited to a specific number of custom do

### services/cloudflare-queues — confirmed; complete

Free operations, one-day retention and message limits match; retry/batch operation accounting does not establish a daily-quota hard stop.

Source: <https://developers.cloudflare.com/queues/platform/pricing/>

> charges. Workers Free Workers Paid Standard operations 10,000 operations/day included 1,000,000 operations/month included + $0.40/million operations Queues per account 10,000 Unlimited, with a default limit of 10,000. First 10,000 included + $0.10 per additional queue per month. Message retenti

### services/cloudflare-r2 — confirmed; complete

Standard-only free storage and operation grants remain; excess rounds to billing units, egress is free, and checkout-card requirements remain unconfirmed.

Source: <https://developers.cloudflare.com/r2/pricing/>

> e. Free Storage 10 GB-month / month Class A Operations 1 million requests / month Class B Operations 10 million requests / month Egress (data transfer to Internet) Free 1 Caution The free tier only applies to Standard storage, and does not apply to Infrequent Access storage. Storage usage S

### services/cloudflare-realtime — confirmed; complete

SFU and TURN still share one thousand GB/month and $0.05/GB excess; separate RealtimeKit rates and account-card uncertainty remain qualified.

Source: <https://developers.cloudflare.com/realtime/sfu/platform/pricing/>

> SFU and TURN services cost $0.05 per GB of egress. The first 1,000 GB each month is free. SFU and TURN share this allowance; they do not have independent free tiers. Realtime usage appears as a single line item on your Cloudflare bill. SFU Traffic from Cloudflare to clients incurs egress charges.

### services/cloudflare-turnstile — confirmed; complete

Free widgets/hosts, unlimited challenges, seven-day analytics and mandatory single-use token validation match; excess-widget enforcement remains unconfirmed.

Source: <https://developers.cloudflare.com/turnstile/plans/>

> or verification requests) Yes Yes Hostname management 10 hostnames per widget Maximum of 200 hostnames per widget Any hostname widget (no preconfigured hostnames) No Yes Analytics lookback 7 days maximum 30 days maximum Pre-clearance support Yes Yes Ephemeral IDs No Yes Offlabel (remove

### services/cloudflare-vectorize — confirmed; complete

The Free queried/stored-dimension grants remain; the documented formula combines stored and query vectors rather than multiplying an entire index for each request.

Source: <https://developers.cloudflare.com/vectorize/platform/pricing/>

> kers Free Workers Paid Total queried vector dimensions 30 million queried vector dimensions / month First 50 million queried vector dimensions / month included + $0.01 per million Total stored vector dimensions 5 million stored vector dimensions First 10 million stored vector dimensions + $0.05 per 1

### services/cloudflare-workers — confirmed; complete

Free daily requests, CPU and worker counts match. Daily-limit fail-open/closed behavior and CPU termination are separate; request-body limits follow the Cloudflare account plan.

Source: <https://developers.cloudflare.com/workers/platform/pricing/>

> nt Manager. Requests 1, 2, 3, 4 Duration CPU time Free 100,000 per day No charge for duration 10 milliseconds of CPU time per invocation Standard 10 million included per month +$0.30 per additional million No charge or limit for duration 30 million CPU milliseconds included per m

### services/cloudflare-workers-ai — confirmed; complete

The neuron allowance, reset and fail-with-error rule remain; paid/frontier models are qualified separately.

Source: <https://developers.cloudflare.com/workers-ai/platform/pricing/>

> . Our free allocation allows anyone to use a total of 10,000 Neurons per day at no charge . To use more than 10,000 Neurons per day, you need to sign up for the Workers Paid plan . On Workers Paid, you will be charged at $0.011 / 1,000 Neurons for any usage above the free allocation of

### services/cloudflare-workers-kv — confirmed; complete

Daily operation limits and storage remain, including charges/counts for dashboard actions and misses; same-key write rate and eventual consistency are retained.

Source: <https://developers.cloudflare.com/kv/platform/pricing/>

> y at 00:00 UTC. If you exceed any one of these limits, further operations of that type will fail with an error. Note Workers KV pricing for read, write and delete operations is on a per-key basis. Bulk read operations are billed by the amount of keys read in a bulk read operation. Pricing FAQ How much do additional name

### services/cloudflare-workflows — confirmed; complete

Daily steps, shared Worker requests, storage and retention remain; storage exhaustion throws rather than silently enabling paid overage.

Source: <https://developers.cloudflare.com/workflows/reference/pricing/>

> 1 GB-month 1 GB-month included + $0.20/ GB-month Steps 3,000 per day 500,000 included per month + $0.80/ additional 100,000 per month Cloudflare will not bill step and storage usage before the start date announced in the Workflows billing changelog . CPU limits You can increase

### services/cloudns — confirmed; complete

Free retains one zone, fifty records, 500K queries and one forward; Unicast and premium-only features are accurately distinguished.

Source: <https://www.cloudns.net/premium/>

> Free DNS Free Forever 4 Unicast DNS servers 1 DNS zone 50 DNS Records 500K DNS queries per month 1 Mail forward Sign Up for free Premium S $2.95/month +4 Anycast DNS servers 5 DNS zones 200 DNS Records 5M DNS queries per month 1 DNS Failover check 10 Mail forwards Extended Featu

### services/cloudwatch — confirmed; complete

Published free metrics/log/dashboard/API/alarm amounts and paid excess match; new AWS account time/credit limits are a separate condition.

Source: <https://aws.amazon.com/cloudwatch/pricing/>

> ou can learn more about AWS Free Tier here . Logs Logs 5 GB Data (ingestion, archive storage, and data scanned by Logs Insights queries) 1,800 minutes of Live Tail usage per month (approximately an hour per day) Contributor Insights for CloudWatch Logs 1 Contributor Insight

### services/cockroachdb-cloud — confirmed; complete

New-organization Standard remains a cardless 30-day/$400 trial; pricing itself confirms pause, thirty-day recovery window, deletion, idle and backup billing. Failed ancillary documentation did not hide those material terms.

Source: <https://www.cockroachlabs.com/pricing/>

> after 30 days, or once you have used the $400 credit. Your clusters are then paused, and you have a 30-day grace period to keep them by adding a payment method. Add one and they resume on usage-based pricing; if you do not, they are deleted. Do I pay for a cluster that is idle? Yes. Billing i

### services/codacy — unresolved; attempted-only

Source retrieval was attempted, but all official sources failed through the shared cloud proxy with HTTP 503. No current-source entry review was completed; this is not evidence of a vendor policy change.

Remaining: Re-fetch official sources after proxy recovery and compare the published offer, numeric limits, card requirements and billing behavior.

Unusable attempted sources:

- <https://www.codacy.com/pricing> — HTTP 503; thin extraction classification.
- <https://docs.codacy.com/getting-started/codacy-quickstart/> — HTTP 503; thin extraction classification.
- <https://docs.codacy.com/> — HTTP 503; thin extraction classification.
- <https://www.codacy.com/> — HTTP 503; thin extraction classification.

### services/codebuild — corrected; partial

Corrected closure wording to AWS account suspension with a 90-day recovery window. The current AWS Free Tier FAQ supports that correction, but missing service sources prevent completing the entry review.

Source: <https://aws.amazon.com/free/free-tier-faqs/>

> When your Free plan expires, AWS suspends your account and any associated projects, and you will lose access to your resources and data. AWS will retain your data for 90 days after your Free plan expires. During this period, you have the option to upgrade to Paid plan to reopen your account and restore access to your resources. If you don’t upgrade your account within 90 days, AWS will permanently erase your AWS account and all its conte

Remaining: Re-fetch service pricing and documentation after proxy recovery. Verify the 100 EC2 build-minute / 6,000 Lambda build-second allowances, excluded compute products and separate resource charges.

Unusable attempted sources:

- <https://aws.amazon.com/codebuild/pricing/> — HTTP 503; thin extraction classification.
- <https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html> — HTTP 503; thin extraction classification.
- <https://docs.aws.amazon.com/codebuild/latest/userguide/getting-started-overview.html> — HTTP 503; thin extraction classification.
- <https://aws.amazon.com/codebuild/> — HTTP 503; thin extraction classification.

### services/codecommit — corrected; partial

Corrected closure wording to AWS account suspension with a 90-day recovery window. The current AWS Free Tier FAQ supports that correction, but missing service sources prevent completing the entry review.

Source: <https://aws.amazon.com/free/free-tier-faqs/>

> When your Free plan expires, AWS suspends your account and any associated projects, and you will lose access to your resources and data. AWS will retain your data for 90 days after your Free plan expires. During this period, you have the option to upgrade to Paid plan to reopen your account and restore access to your resources. If you don’t upgrade your account within 90 days, AWS will permanently erase your AWS account and all its conte

Source: <https://aws.amazon.com/codecommit/pricing/>

> An active user is any unique AWS identity (AWS Identity and Access Management (IAM) user/role, federated user, or root account) that accesses CodeCommit repositories during the month, either through Git requests or by using the AWS Management Console, AWS Command Line Interface (AWS CLI), or AWS SDKs. AWS identities that are created through your use of other AWS Services, such as AWS CodeBuild and AWS CodePipeline, as well as servers accessing CodeCommit using a unique AWS identity, count as active users.

Remaining: Re-fetch service pricing and documentation after proxy recovery. Verify the reopening history, five-user/50-GB/10K-request allowances and repository quotas; the readable pricing page still has the old closed-to-new-customers banner and omits its dynamically rendered quota table.

Unusable attempted sources:

- <https://aws.amazon.com/blogs/devops/aws-codecommit-returns-to-general-availability/> — HTTP 503; thin extraction classification.
- <https://docs.aws.amazon.com/codecommit/latest/userguide/history.html> — HTTP 503; thin extraction classification.
- <https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html> — HTTP 503; thin extraction classification.
- <https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html> — HTTP 503; thin extraction classification.
- <https://aws.amazon.com/codecommit/> — HTTP 503; thin extraction classification.

### services/codehooks — unresolved; attempted-only

Source retrieval was attempted, but all official sources failed through the shared cloud proxy with HTTP 503. No current-source entry review was completed; this is not evidence of a vendor policy change.

Remaining: Re-fetch official sources after proxy recovery and compare the published offer, numeric limits, card requirements and billing behavior.

Unusable attempted sources:

- <https://codehooks.io/> — HTTP 503; thin extraction classification.
- <https://codehooks.io/docs> — HTTP 503; thin extraction classification.

### services/codepipeline — unresolved; partial

Partial comparison: the readable AWS Free Tier FAQ confirms card/credit/suspension rules, and the S3 tutorial confirms the described setup. Service pricing failed, so V1/V2 free amounts, billing rates and pipeline-type restrictions remain unreviewed.

Source: <https://aws.amazon.com/free/free-tier-faqs/>

> When your Free plan expires, AWS suspends your account and any associated projects, and you will lose access to your resources and data. AWS will retain your data for 90 days after your Free plan expires. During this period, you have the option to upgrade to Paid plan to reopen your account and restore access to your resources. If you don’t upgrade

Source: <https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-simple-s3.html>

> In this tutorial, you create a two-stage pipeline that uses a versioned S3 source bucket and CodeDeploy to release a sample application. Note When Amazon S3 is the source provider for your pipeline, you may zip your source file o

Remaining: Re-fetch CodePipeline pricing and current pipeline-type documentation; compare V1/V2 grants, $1/$0.002 rates, first-30-day policy and console type selection.

Unusable attempted sources:

- <https://aws.amazon.com/codepipeline/pricing/> — HTTP 503; thin extraction classification.
- <https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html> — HTTP 503; thin extraction classification.
- <https://docs.aws.amazon.com/codepipeline/latest/userguide/getting-started-codepipeline.html> — HTTP 503; thin extraction classification.
- <https://aws.amazon.com/codepipeline/> — HTTP 503; thin extraction classification.

### services/codspeed — unresolved; attempted-only

Source retrieval was attempted, but all official sources failed through the shared cloud proxy with HTTP 503. No current-source entry review was completed; this is not evidence of a vendor policy change.

Remaining: Re-fetch official sources after proxy recovery and compare the published offer, numeric limits, card requirements and billing behavior.

Unusable attempted sources:

- <https://codspeed.io/pricing> — HTTP 503; thin extraction classification.
- <https://codspeed.io/docs> — HTTP 503; thin extraction classification.
- <https://codspeed.io/docs/features/seats-and-billing> — HTTP 503; thin extraction classification.
- <https://docs.codspeed.io> — HTTP 503; thin extraction classification.
- <https://codspeed.io> — HTTP 503; thin extraction classification.

### services/cohere-api — unresolved; attempted-only

Source retrieval was attempted, but all official sources failed through the shared cloud proxy with HTTP 503. No current-source entry review was completed; this is not evidence of a vendor policy change.

Remaining: Re-fetch official sources after proxy recovery and compare the published offer, numeric limits, card requirements and billing behavior.

Unusable attempted sources:

- <https://cohere.com/pricing> — HTTP 503; thin extraction classification.
- <https://docs.cohere.com/docs/rate-limits> — HTTP 503; thin extraction classification.
- <https://docs.cohere.com/v2/docs/text-gen-quickstart> — HTTP 503; thin extraction classification.
- <https://docs.cohere.com> — HTTP 503; thin extraction classification.
- <https://cohere.com> — HTTP 503; thin extraction classification.

### services/comet-ml — unresolved; attempted-only

Source retrieval was attempted, but all official sources failed through the shared cloud proxy with HTTP 503. No current-source entry review was completed; this is not evidence of a vendor policy change.

Remaining: Re-fetch official sources after proxy recovery and compare the published offer, numeric limits, card requirements and billing behavior.

Unusable attempted sources:

- <https://www.comet.com/site/pricing/> — HTTP 503; thin extraction classification.
- <https://www.comet.com/site/> — HTTP 503; thin extraction classification.
- <https://www.comet.com/docs/v2/guides/quickstart/> — HTTP 503; thin extraction classification.
- <https://www.comet.com/docs/v2/> — HTTP 503; thin extraction classification.
- <https://info.comet.ml/comet-academics-page/> — HTTP 503; thin extraction classification.

### services/comet-opik — unresolved; attempted-only

Source retrieval was attempted, but all official sources failed through the shared cloud proxy with HTTP 503. No current-source entry review was completed; this is not evidence of a vendor policy change.

Remaining: Re-fetch official sources after proxy recovery and compare the published offer, numeric limits, card requirements and billing behavior.

Unusable attempted sources:

- <https://www.comet.com/site/pricing/> — HTTP 503; thin extraction classification.
- <https://www.comet.com/site/products/opik/> — HTTP 503; thin extraction classification.
- <https://www.comet.com/docs/opik/quickstart> — HTTP 503; thin extraction classification.
- <https://www.comet.com/docs/opik/self-host/overview> — HTTP 503; thin extraction classification.
- <https://docs.comet.com> — HTTP 503; thin extraction classification.

### services/commandbar — unresolved; attempted-only

Source retrieval was attempted, but all official sources failed through the shared cloud proxy with HTTP 503. No current-source entry review was completed; this is not evidence of a vendor policy change.

Remaining: Re-fetch official sources after proxy recovery and compare the published offer, numeric limits, card requirements and billing behavior.

Unusable attempted sources:

- <https://amplitude.com/pricing> — HTTP 503; thin extraction classification.
- <https://amplitude.com/guides-and-surveys> — HTTP 503; thin extraction classification.
- <https://amplitude.com/docs/guides-and-surveys/get-started> — HTTP 503; thin extraction classification.
- <https://amplitude.com/docs/sdks/guides-and-surveys/sdk> — HTTP 503; thin extraction classification.
- <https://amplitude.com/docs> — HTTP 503; thin extraction classification.

### services/commerce-layer — unresolved; attempted-only

Source retrieval was attempted, but all official sources failed through the shared cloud proxy with HTTP 503. No current-source entry review was completed; this is not evidence of a vendor policy change.

Remaining: Re-fetch official sources after proxy recovery and compare the published offer, numeric limits, card requirements and billing behavior.

Unusable attempted sources:

- <https://commercelayer.io/pricing> — HTTP 503; thin extraction classification.
- <https://docs.commercelayer.io> — HTTP 503; thin extraction classification.
- <https://docs.commercelayer.io/core/getting-started> — HTTP 503; thin extraction classification.
- <https://commercelayer.io> — HTTP 503; thin extraction classification.

### services/composio — unresolved; attempted-only

Source retrieval was attempted, but all official sources failed through the shared cloud proxy with HTTP 503. No current-source entry review was completed; this is not evidence of a vendor policy change.

Remaining: Re-fetch official sources after proxy recovery and compare the published offer, numeric limits, card requirements and billing behavior.

Unusable attempted sources:

- <https://composio.dev/pricing> — HTTP 503; thin extraction classification.
- <https://docs.composio.dev/> — HTTP 503; thin extraction classification.
- <https://docs.composio.dev/docs/quickstart> — HTTP 503; thin extraction classification.
- <https://composio.dev/> — HTTP 503; thin extraction classification.

### services/compute-engine-e2-micro — corrected; partial

The Free Tier guide confirms the region/disk/egress grants and pooled e2-micro hours. Corrected the implication that merely running a second VM simultaneously causes charges: the shared monthly time allowance determines excess. Separate IPv4 pricing and creation documentation were unavailable, so the full review remains incomplete.

Source: <https://cloud.google.com/free/docs/free-cloud-features>

> Your Free Tier e2-micro instance limit is by time, not by instance. Each month, eligible use of all of your e2-micro instances is free until you have used a number of hours equal to the total hours in the current month. Usage calculations are combined across the supported regions . GPUs and TPUs are not included in the Free Tier offer. You are always charged for GPUs and TPUs that you add to VM instances. Learn about Compute Engine pricing . Datastream Free Tier benefits for Datastream apply exclusively to streams originating from AlloyDB for PostgreSQL or Spanner and destined for BigQuery: 100 GiB of change data capture (CDC

Remaining: Re-fetch VPC network pricing to check separate external IPv4 billing and current VM creation documentation.

Unusable attempted sources:

- <https://cloud.google.com/vpc/network-pricing> — HTTP 503; thin extraction classification.
- <https://cloud.google.com/compute/docs?hl=en> — HTTP 503; thin extraction classification.
- <https://cloud.google.com/compute/docs/instances/create-start-instance?hl=en> — HTTP 503; thin extraction classification.
- <https://cloud.google.com/compute/docs> — HTTP 503; thin extraction classification.
- <https://cloud.google.com/compute> — HTTP 503; thin extraction classification.

### services/contentful — unresolved; attempted-only

Source retrieval was attempted, but all official sources failed through the shared cloud proxy with HTTP 503. No current-source entry review was completed; this is not evidence of a vendor policy change.

Remaining: Re-fetch official sources after proxy recovery and compare the published offer, numeric limits, card requirements and billing behavior.

Unusable attempted sources:

- <https://www.contentful.com/pricing/> — HTTP 503; thin extraction classification.
- <https://www.contentful.com/get-started/> — HTTP 503; thin extraction classification.
- <https://www.contentful.com/help/admin/usage/usage-limit/> — HTTP 503; thin extraction classification.
- <https://www.contentful.com/developers/docs/references/content-management-api/> — HTTP 503; thin extraction classification.
- <https://www.contentful.com/developers/docs/> — HTTP 503; thin extraction classification.
- <https://www.contentful.com/> — HTTP 503; thin extraction classification.

### services/conversion-tools — unresolved; attempted-only

Source retrieval was attempted, but all official sources failed through the shared cloud proxy with HTTP 503. No current-source entry review was completed; this is not evidence of a vendor policy change.

Remaining: Re-fetch official sources after proxy recovery and compare the published offer, numeric limits, card requirements and billing behavior.

Unusable attempted sources:

- <https://conversiontools.io/pricing> — HTTP 503; thin extraction classification.
- <https://conversiontools.io/api-pricing> — HTTP 503; thin extraction classification.
- <https://conversiontools.io/convert/json-to-excel> — HTTP 503; thin extraction classification.
- <https://conversiontools.io/> — HTTP 503; thin extraction classification.

## Validation

`check:depth --evidence` passed for all 82 completed comparisons. The 18 incomplete entries were excluded from this freshness check because their dates correctly remain unchanged. `git diff --check` passed for owned content. `check:answers` found only the out-of-batch `services:deed-page` one-sentence issue; the coordinator was informed for final validation.
