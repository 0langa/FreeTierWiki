import { describe, expect, it } from "vitest";

import { describeOffers, offerKind } from "@/lib/catalog-facts";
import { categoryFaqs, dnsZones, idleDatabases, idleHosts, bandwidthBilling, usesYourContent, vendorBranding, monthlyTraffic, seatCaps } from "@/lib/category-faqs";
import { categoryFaqItems, categoryIntro } from "@/lib/category-copy";
import { listContentFiles, readEntryFile } from "@/lib/content-files";
import { DOMAINS, type AtlasEntry, type Domain, type FreeTierDetails } from "@/types/content";

/** A minimal entry; only the facts under test are set. */
function entry(
  title: string,
  domain: Domain,
  facts: { summary?: string; limits?: string[]; caveats?: string[]; billing?: string[] } & Partial<FreeTierDetails> = {},
): AtlasEntry {
  const { summary = "", limits = [], caveats = [], billing = [], ...rest } = facts;
  return {
    id: `${domain}-${title}`,
    kind: "services",
    slug: title.toLowerCase().replace(/\W+/g, "-"),
    url: "https://example.com",
    title,
    description: "",
    answer: "",
    provider: title,
    category: domain,
    domain,
    subtypes: [],
    audiences: [],
    tags: [],
    pricingModel: "free",
    freeTierDetails: {
      summary,
      limits,
      caveats,
      requiresCard: false,
      freeTierType: "always-free",
      hasHardCap: true,
      overageRisk: "none",
      billingRiskNotes: billing,
      ...rest,
    },
    useCases: [],
    whenToUse: "",
    whenNotToUse: "",
    quickstartSteps: [],
    bestFor: [],
    avoidIf: [],
    difficulty: "beginner",
    productionReadiness: "side-project",
    lastUpdated: "2026-10-01",
    popularityScore: 0,
    usefulnessScore: 0,
    sourceUrls: [],
    featured: false,
    status: "active",
    changes: [],
  };
}

async function loadCatalog(): Promise<AtlasEntry[]> {
  const entries: AtlasEntry[] = [];
  for (const file of await listContentFiles()) entries.push((await readEntryFile(file)).entry);
  return entries;
}

const titles = (hits: Array<{ entry: AtlasEntry }>) => hits.map((hit) => hit.entry.title);

describe("text selectors reject their look-alikes", () => {
  it("training your own model is not the vendor using your content", () => {
    const ai = [
      entry("Azure AI Language", "ai", { limits: ["5 free training hours per month for custom models", "Training data up to 10 MB"] }),
      entry("Custom Vision", "ai", { summary: "Free training hours and 10,000 training images", caveats: ["Model training stops at the free hours"] }),
      entry("Gemini API", "ai", { caveats: ["Content sent on the free tier is used to improve Google's products"] }),
    ];
    expect(titles(usesYourContent(ai))).toEqual(["Gemini API"]);
  });

  it("an operation quota is not an idle shutdown", () => {
    const database = [
      entry("Firebase Firestore", "database", { limits: ["20,000 deletes/day", "50,000 reads/day"] }),
      entry("Cloudflare Workers KV", "database", { limits: ["1,000 deletes per day"] }),
      entry("MongoDB Atlas", "database", { summary: "512 MB of storage and 32 MB of sort memory", caveats: ["Atlas pauses a Free cluster after 30 days with zero connections"] }),
      entry("Azure SQL Database", "database", { caveats: ["By default the database auto-pauses until the next calendar month when the free limits are reached"] }),
      entry("Supabase", "database", { caveats: ["Free projects pause after 1 week of inactivity"] }),
    ];
    expect(titles(idleDatabases(database))).toEqual(["MongoDB Atlas", "Supabase"]);
  });

  it("a word that only contains a keyword does not match it", () => {
    const hosting = [
      entry("Report Tool", "hosting", { summary: "Includes a usage report and a profile page for prevented abuse on white label hosted dashboards", limits: ["Hosted dashboards", "10 hits"] }),
      entry("Plain Host", "hosting", { limits: ["Sleeping is not a thing here; sleepy designers can relax"] }),
    ];
    expect(idleHosts(hosting)).toEqual([]);
    expect(bandwidthBilling(hosting)).toEqual([]);
    expect(vendorBranding(hosting)).toEqual([]);
    expect(monthlyTraffic(hosting)).toEqual([]);
  });

  it("a domain-lookup quota is not a DNS zone limit", () => {
    const networking = [
      entry("IP2Location.io", "networking", { limits: ["500 Domain WHOIS API queries/month", "30,000 IP geolocation queries a month"] }),
      entry("ClouDNS", "networking", { summary: "The Free DNS plan is free forever with 1 DNS zone and 50 DNS records" }),
    ];
    expect(titles(dnsZones(networking).map((row) => ({ entry: row.entry })))).toEqual(["ClouDNS"]);
  });

  it("a price for a bigger plan is not a seat or traffic limit of the free plan", () => {
    const collaboration = [
      entry("Flat.social", "collaboration", {
        summary: "Free forever for up to 5 people at once",
        limits: ["Monthly plans run from 6 to 100 seats at $6 per seat per month"],
      }),
    ];
    expect(seatCaps(collaboration)).toEqual([]);
    const analytics = [entry("Google Analytics", "analytics", { summary: "Export up to 1 M events a day to BigQuery" }), entry("Fathom", "analytics", { summary: "Plans start at $15 a month for 100,000 pageviews" })];
    expect(monthlyTraffic(analytics)).toEqual([]);
  });
});

describe("offers keep renewing credits apart from one-time credits and trials", () => {
  const braintrust = entry("Braintrust", "ai", { freeTierType: "credit", resetPeriod: "monthly", monthlyCreditAmount: "$10/month" });
  const exa = entry("Exa", "ai", { freeTierType: "credit", resetPeriod: "monthly", monthlyCreditAmount: "$10" });
  const railway = entry("Railway", "hosting", { freeTierType: "credit", resetPeriod: "monthly", monthlyCreditAmount: "$1" });
  const cloudinary = entry("Cloudinary", "storage", { freeTierType: "credit", resetPeriod: "rolling 30 days for transformations and bandwidth; current storage", monthlyCreditAmount: "25 credits/month" });
  const v0 = entry("v0.dev", "ai", { freeTierType: "credit", resetPeriod: "daily message limit; credits one-time for new users", monthlyCreditAmount: "$5 one-time for new users; $5/month for existing Free users" });
  const e2b = entry("E2B", "ai", { freeTierType: "credit", resetPeriod: "none" });
  const flyio = entry("Fly.io", "hosting", { freeTierType: "trial", trialDays: 7 });
  const azure = entry("Virtual Machines", "compute", { freeTierType: "time-limited", trialDays: 365 });

  it("classifies by reset period, credit amount and trial days", () => {
    expect([braintrust, exa, railway, cloudinary, v0].map(offerKind)).toEqual(Array(5).fill("renewing-credit"));
    expect(offerKind(e2b)).toBe("one-time-credit");
    expect(offerKind(flyio)).toBe("trial");
    expect(offerKind(azure)).toBe("time-limited");
  });

  it("names each group on its own", () => {
    const text = describeOffers([braintrust, exa, railway, e2b, flyio, azure, entry("Plain", "ai")], "AI entries");
    expect(text).toMatch(/^6 of 7 AI entries are not marked always free\./);
    expect(text).toContain("Credits that renew: Braintrust ($10/month), Exa ($10 monthly), and Railway ($1 monthly).");
    expect(text).toContain("One-time credits that do not renew: E2B.");
    expect(text).toContain("Trials: Fly.io (7 days).");
    expect(text).toContain("Offers that end after a set time: Virtual Machines (12 months).");
  });

  it("says nothing when every entry is always free", () => {
    expect(describeOffers([entry("Plain", "ai")])).toBe("");
  });
});

describe("categories without text-specific questions cannot break the build", () => {
  const one = (domain: Domain) => [entry("Only Entry", domain, { summary: "A free plan.", requiresCard: "unknown", hasHardCap: "unknown", overageRisk: "low" })];

  it("learning and other return a full FAQ with and without entries", () => {
    for (const domain of ["learning", "other"] as const) {
      for (const entries of [[], one(domain)]) {
        const faqs = categoryFaqs(domain, entries);
        expect(faqs.length).toBeGreaterThanOrEqual(4);
        for (const faq of faqs) {
          expect(faq.question.endsWith("?")).toBe(true);
          expect(faq.answer.trim().length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("every category copes with no entries and with one bare entry", () => {
    for (const domain of DOMAINS) {
      for (const entries of [[], one(domain)]) {
        const faqs = categoryFaqs(domain, entries);
        expect(faqs.length).toBeGreaterThanOrEqual(4);
        for (const faq of faqs) expect(`${faq.question} ${faq.answer}`).not.toMatch(/undefined|NaN|Infinity|\[object/);
      }
    }
  });
});

describe("the real catalog's category FAQs", () => {
  it("answers the AI training question with the entries that say so, and not the ones with training hours", async () => {
    const ai = (await loadCatalog()).filter((item) => item.domain === "ai");
    const faq = categoryFaqs("ai", ai).find((item) => /use what I send/.test(item.question));
    expect(faq).toBeDefined();
    expect(faq?.answer).toContain("Gemini API");
    for (const wrong of ["Azure AI Language", "Custom Vision", "Document Intelligence", "Translator"]) expect(faq?.answer).not.toContain(wrong);
  });

  it("lists idle shutdowns only, not operation quotas or sort memory", async () => {
    const database = (await loadCatalog()).filter((item) => item.domain === "database");
    const answer = categoryFaqs("database", database).find((item) => /sits idle/.test(item.question))?.answer ?? "";
    expect(answer).toContain("Supabase");
    expect(answer).toContain("Neon (after 5 minutes)");
    for (const wrong of ["Firebase Firestore", "Cloudflare Workers KV", "Redis Cloud", "Back4app"]) expect(answer).not.toContain(wrong);
    expect(categoryFaqs("database", database).some((item) => /megabytes/i.test(item.question))).toBe(false);
  });

  it("keeps IP2Location out of the DNS zone answer", async () => {
    const networking = (await loadCatalog()).filter((item) => item.domain === "networking");
    const answer = categoryFaqs("networking", networking).find((item) => /DNS zones/.test(item.question))?.answer ?? "";
    expect(answer).toContain("Hetzner DNS");
    expect(answer).not.toContain("IP2Location");
  });

  it("does not claim watermarks that no document entry records", async () => {
    const documents = (await loadCatalog()).filter((item) => item.domain === "documents");
    // Zoho Sign mentions a watermark only for documents signed during its trial, and CraftMyPDF only as a paid
    // operation, both in the page body. Neither is recorded as a stamp on free output. If an entry starts to
    // record one, this fails so the intro and a watermark question get written together.
    const facts = documents.flatMap((item) => [item.freeTierDetails.summary, ...item.freeTierDetails.limits, ...item.freeTierDetails.caveats, ...item.freeTierDetails.billingRiskNotes]).join("\n");
    expect(facts).not.toMatch(/watermark/i);
    const blob = [categoryIntro("documents"), ...categoryFaqItems("documents", documents).flatMap((faq) => [faq.question, faq.answer])].join("\n");
    expect(blob).not.toMatch(/watermark/i);
  });

  it("separates renewing credits from one-time credits and trials in the AI answer", async () => {
    const ai = (await loadCatalog()).filter((item) => item.domain === "ai");
    const answer = categoryFaqs("ai", ai).find((item) => /credit or a trial/.test(item.question))?.answer ?? "";
    const renew = answer.indexOf("Credits that renew:");
    const oneTime = answer.indexOf("One-time credits that do not renew:");
    expect(renew).toBeGreaterThan(-1);
    expect(oneTime).toBeGreaterThan(renew);
    expect(answer.slice(renew, oneTime)).toContain("Braintrust");
    expect(answer.slice(renew, oneTime)).toContain("Exa");
    expect(answer.slice(oneTime)).toContain("E2B");
    expect(answer.slice(oneTime)).not.toContain("Braintrust");
  });

  it("does not promise that a hard cap means no bill", async () => {
    const catalog = await loadCatalog();
    for (const domain of DOMAINS) {
      const group = catalog.filter((item) => item.domain === domain);
      const capped = group.filter((item) => item.status !== "ended" && item.freeTierDetails.hasHardCap === true);
      const stillBill = capped.filter((item) => item.freeTierDetails.overageRisk !== "none");
      if (stillBill.length === 0) continue;
      const faq = categoryFaqs(domain, group).find((item) => /hard cap/.test(item.question));
      if (!faq) continue;
      expect(faq.answer, domain).toMatch(/still carr(?:y|ies) some billing risk/);
    }
  });

  it("answers each question with the thing it asks for, in the site voice", async () => {
    const catalog = await loadCatalog();
    for (const domain of DOMAINS) {
      const group = catalog.filter((item) => item.domain === domain);
      if (group.length === 0) continue;
      for (const faq of categoryFaqs(domain, group)) {
        const text = `${faq.question} ${faq.answer}`;
        expect(text, `${domain}: ${faq.question}`).not.toMatch(/[–—‘’“”]/);
        expect(text, `${domain}: ${faq.question}`).not.toMatch(/list below|the list above|\bnot just\b.*\bbut\b/i);
        // The old keyword tallies read "21 record SMS, social login, SAML, or SSO".
        expect(faq.answer, `${domain}: ${faq.question}`).not.toMatch(/^\d+ record /);
        expect(faq.answer, `${domain}: ${faq.question}`).not.toMatch(/^No active entry records/);
        expect(faq.answer, `${domain}: ${faq.question}`).not.toMatch(/\bnone\b.*\bnone\b/i);
      }
    }
  });
});
