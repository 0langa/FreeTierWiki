// Consent for optional tracking. Google Analytics is the only optional service on the site; it loads
// only after a visitor opts in, and stays off for anyone who rejects or has not decided yet.

export const GOOGLE_TAG_ID = "G-MZEXRH4HNJ";

/** localStorage key holding the visitor's choice. */
export const CONSENT_STORAGE_KEY = "ftw-consent";

/** Bump when the optional services change, so everyone is asked again. */
export const CONSENT_VERSION = 1;

/** Dispatched on window when the visitor's choice changes in this tab. */
export const CONSENT_CHANGE_EVENT = "ftw:consent-change";

/** Dispatched on window to reopen the banner, e.g. from the footer's "Privacy settings". */
export const OPEN_CONSENT_EVENT = "ftw:open-consent";

export type ConsentChoice = {
  v: number;
  analytics: boolean;
  /** ISO timestamp of the decision. */
  at: string;
};

type ConsentWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  __ftwLoadAnalytics?: () => void;
  [key: `ga-disable-${string}`]: boolean | undefined;
};

/** Returns a current, valid choice, or null when the visitor still has to decide. */
export function parseConsent(raw: string | null | undefined): ConsentChoice | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<ConsentChoice>;
    if (value.v !== CONSENT_VERSION || typeof value.analytics !== "boolean" || typeof value.at !== "string") return null;
    return { v: value.v, analytics: value.analytics, at: value.at };
  } catch {
    return null;
  }
}

/** Raw stored value; "" when storage is empty or blocked. Strings compare by value, so this is a stable snapshot. */
export function readConsentRaw(): string {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function subscribeConsent(onChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) onChange();
  };
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** Stores the choice and switches Google Analytics on or off to match it. */
export function saveConsent(analytics: boolean): void {
  const choice: ConsentChoice = { v: CONSENT_VERSION, analytics, at: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(choice));
  } catch {
    // Storage blocked: the choice still applies to this page view.
  }

  const w = window as unknown as ConsentWindow;
  if (analytics) {
    w[`ga-disable-${GOOGLE_TAG_ID}`] = false;
    w.__ftwLoadAnalytics?.();
  } else {
    w[`ga-disable-${GOOGLE_TAG_ID}`] = true;
    w.gtag?.("consent", "update", { analytics_storage: "denied" });
    clearAnalyticsCookies();
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function openConsentSettings(): void {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}

/** Removes the `_ga` and `_ga_<id>` cookies Google Analytics set, on every domain level they may sit on. */
export function clearAnalyticsCookies(): void {
  const names = document.cookie
    .split(";")
    .map((part) => part.split("=")[0]?.trim() ?? "")
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
  if (names.length === 0) return;

  const parts = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join(".")}`);

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

/**
 * Inline <head> script. It defines gtag with every consent signal denied, and a loader that adds the
 * Google tag only after opt-in. A returning visitor who already opted in gets the tag on page load.
 * Nothing is requested from Google before that.
 */
export function consentHeadScript(): string {
  const id = JSON.stringify(GOOGLE_TAG_ID);
  const key = JSON.stringify(CONSENT_STORAGE_KEY);
  return `(function(){
window.dataLayer=window.dataLayer||[];
window.gtag=function(){window.dataLayer.push(arguments);};
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
window.__ftwLoadAnalytics=function(){
gtag('consent','update',{analytics_storage:'granted'});
if(window.__ftwAnalyticsLoaded)return;
window.__ftwAnalyticsLoaded=true;
gtag('js',new Date());
gtag('config',${id});
var s=document.createElement('script');
s.async=true;
s.src='https://www.googletagmanager.com/gtag/js?id='+${id};
document.head.appendChild(s);
};
try{var c=JSON.parse(localStorage.getItem(${key})||'null');if(c&&c.v===${CONSENT_VERSION}&&c.analytics===true)window.__ftwLoadAnalytics();}catch(e){}
})();`;
}
