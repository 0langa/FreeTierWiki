// @ts-check
import { sourceSnapshot } from "./source-snapshot.mjs";

export const USER_AGENT = "freetier.wiki-verify/1.0 (+https://freetier.wiki/about/)";

/**
 * Fetches a page and returns its readable text. Never throws: a failure comes back as status 0 plus an error code.
 * @param {string} url
 * @returns {Promise<{ url: string, status: number, finalUrl?: string, error?: string, text: string, hash?: string, legacyHash?: string, hashVersion?: number, markupHash?: string, accessIssue?: string }>}
 */
export async function fetchText(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": USER_AGENT, accept: "text/html" },
      signal: AbortSignal.timeout(15_000),
    });
    const type = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
    if (response.ok && type && !/^(?:text\/|application\/(?:xhtml\+xml|json|xml)$)/i.test(type)) {
      return {url,status:response.status,finalUrl:response.url,text:'',accessIssue:'non-text'};
    }
    const snapshot = response.ok ? sourceSnapshot(await response.text()) : { text: "" };
    return { url, status: response.status, finalUrl: response.url, ...snapshot };
  } catch (error) {
    const cause = /** @type {{ cause?: { code?: string }, name?: string }} */ (error);
    return { url, status: 0, error: String(cause?.cause?.code ?? cause?.name ?? error), text: "" };
  }
}
