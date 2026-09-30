// @ts-check
import { htmlToText } from "./pages.mjs";

export const USER_AGENT = "freetier.wiki-verify/1.0 (+https://freetier.wiki/about/)";

/**
 * Fetches a page and returns its readable text. Never throws: a failure comes back as status 0 plus an error code.
 * @param {string} url
 * @returns {Promise<{ url: string, status: number, finalUrl?: string, error?: string, text: string }>}
 */
export async function fetchText(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": USER_AGENT, accept: "text/html" },
      signal: AbortSignal.timeout(15_000),
    });
    const text = response.ok ? htmlToText(await response.text()) : "";
    return { url, status: response.status, finalUrl: response.url, text };
  } catch (error) {
    const cause = /** @type {{ cause?: { code?: string }, name?: string }} */ (error);
    return { url, status: 0, error: String(cause?.cause?.code ?? cause?.name ?? error), text: "" };
  }
}
