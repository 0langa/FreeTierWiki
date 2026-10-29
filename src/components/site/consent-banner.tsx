"use client";

import * as React from "react";

import {
  GOOGLE_TAG_ID,
  OPEN_CONSENT_EVENT,
  openConsentSettings,
  parseConsent,
  readConsentRaw,
  saveConsent,
  subscribeConsent,
} from "@/lib/consent";

const COOKIE_SUFFIX = GOOGLE_TAG_ID.replace(/^G-/, "");

/** Null during the static render and hydration, where storage is unknown; nothing is shown until it is read. */
const serverSnapshot = () => null;

/**
 * Asks first-time visitors whether Google Analytics may run. "Reject all" and "Accept all" sit side by
 * side with the same weight, and the page stays usable underneath (no cookie wall). The footer's
 * "Privacy settings" reopens it so a choice can be changed or withdrawn at any time.
 */
export function ConsentBanner() {
  const raw = React.useSyncExternalStore(subscribeConsent, readConsentRaw, serverSnapshot);
  const choice = raw === null ? null : parseConsent(raw);
  const [reopened, setReopened] = React.useState(false);
  const regionRef = React.useRef<HTMLElement>(null);
  const returnFocusRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const onOpen = () => {
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setReopened(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
  }, []);

  // Someone who opened the settings on purpose expects focus to move there; a first visit is left alone.
  React.useEffect(() => {
    if (reopened) regionRef.current?.focus();
  }, [reopened]);

  if (raw === null) return null;
  if (choice && !reopened) return null;

  const close = () => {
    setReopened(false);
    returnFocusRef.current?.focus();
    returnFocusRef.current = null;
  };

  const decide = (analytics: boolean) => {
    saveConsent(analytics);
    close();
  };

  return (
    <section
      ref={regionRef}
      tabIndex={-1}
      aria-labelledby="consent-title"
      onKeyDown={(event) => {
        if (event.key === "Escape" && choice) close();
      }}
      className="fixed inset-x-3 bottom-3 z-40 max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl border border-line bg-surface p-5 text-ink shadow-soft focus:outline-none sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[440px]"
    >
      <h2 id="consent-title" className="text-[16px] font-semibold tracking-tight">
        Your privacy choice
      </h2>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">
        May we use Google Analytics? It uses cookies to count visits and show us which pages help people. It stays off unless you
        allow it, and the site works the same either way.
      </p>

      <details className="group mt-3 text-[14px] text-ink-2">
        <summary className="cursor-pointer select-none font-medium text-ink underline underline-offset-2 hover:text-brand">What Google Analytics collects</summary>
        <ul className="mt-2 grid list-disc gap-1.5 pl-5 leading-relaxed">
          <li>The pages you view, how you got here, your browser and device, and your rough location (country or city).</li>
          <li>
            It sets two cookies, <code className="font-mono text-[13px]">_ga</code> and{" "}
            <code className="font-mono text-[13px]">_ga_{COOKIE_SUFFIX}</code>, which last up to 2 years.
          </li>
          <li>Google Ireland Limited processes the data for us. Google may also process it in the US under the EU–US Data Privacy Framework.</li>
          <li>You can change your choice at any time under &ldquo;Privacy settings&rdquo; at the bottom of every page.</li>
        </ul>
      </details>

      {choice ? (
        <p className="mt-3 text-[13.5px] text-ink-3" aria-live="polite">
          Current choice: Google Analytics is {choice.analytics ? "allowed" : "off"}.
        </p>
      ) : null}

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className="btn justify-center" onClick={() => decide(false)}>
          Reject all
        </button>
        <button type="button" className="btn justify-center" onClick={() => decide(true)}>
          Accept all
        </button>
      </div>
      {choice ? (
        <button type="button" className="btn btn-ghost mt-2 w-full justify-center text-[13.5px]" onClick={close}>
          Close without changes
        </button>
      ) : null}
    </section>
  );
}

/** Footer link that reopens the banner. */
export function PrivacySettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Privacy settings
    </button>
  );
}
