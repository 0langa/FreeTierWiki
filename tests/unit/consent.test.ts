import { describe, expect, it } from "vitest";

import { CONSENT_STORAGE_KEY, CONSENT_VERSION, GOOGLE_TAG_ID, consentHeadScript, parseConsent } from "@/lib/consent";

describe("parseConsent", () => {
  it("accepts a current choice", () => {
    const raw = JSON.stringify({ v: CONSENT_VERSION, analytics: true, at: "2026-10-29T10:00:00.000Z" });
    expect(parseConsent(raw)).toEqual({ v: CONSENT_VERSION, analytics: true, at: "2026-10-29T10:00:00.000Z" });
  });

  it("asks again when nothing, junk, or an older version is stored", () => {
    expect(parseConsent(null)).toBeNull();
    expect(parseConsent("")).toBeNull();
    expect(parseConsent("not json")).toBeNull();
    expect(parseConsent(JSON.stringify({ v: CONSENT_VERSION - 1, analytics: true, at: "2026-01-01" }))).toBeNull();
    expect(parseConsent(JSON.stringify({ v: CONSENT_VERSION, analytics: "yes", at: "2026-01-01" }))).toBeNull();
  });
});

describe("consentHeadScript", () => {
  const script = consentHeadScript();

  it("denies every consent signal by default", () => {
    expect(script).toContain(
      "gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'})",
    );
  });

  it("only adds the Google tag inside the opt-in loader", () => {
    const loader = script.indexOf("window.__ftwLoadAnalytics=function");
    expect(loader).toBeGreaterThan(-1);
    expect(script.indexOf("googletagmanager.com")).toBeGreaterThan(loader);
    expect(script).toContain(JSON.stringify(GOOGLE_TAG_ID));
    expect(script).toContain(`localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)})`);
    expect(script).toContain(`c.v===${CONSENT_VERSION}&&c.analytics===true`);
  });

  it("is valid JavaScript", () => {
    expect(() => new Function(script)).not.toThrow();
  });
});
