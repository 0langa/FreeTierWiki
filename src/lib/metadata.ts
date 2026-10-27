import type { Metadata } from "next";

export const SITE_NAME = "freetier.wiki";
export const SITE_DESCRIPTION = "Find and compare free developer tools and services, with usage limits, credit card rules, billing risks, and dated checks of official sources.";

/**
 * Site-wide Open Graph fields. Next.js replaces a parent's `openGraph` instead of merging it, so a page that sets its
 * own (for og:url) spreads these first.
 */
export const OPEN_GRAPH = {
  type: "website",
  siteName: SITE_NAME,
  images: [{ url: "/og.png", width: 1200, height: 630, alt: "freetier.wiki: free tiers, with the fine print" }],
} satisfies NonNullable<Metadata["openGraph"]>;

/** The page's canonical URL, repeated as og:url so shared links and search engines agree on the address. */
export function pageUrl(path: string, alternates: Metadata["alternates"] = {}): Pick<Metadata, "alternates" | "openGraph"> {
  return { alternates: { ...alternates, canonical: path }, openGraph: { ...OPEN_GRAPH, url: path } };
}
