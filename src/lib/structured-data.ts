import { absoluteUrl } from "@/lib/links";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/metadata";

/** The site node's id, so each page node can point at the site without repeating it. */
export const WEBSITE_ID = absoluteUrl("/#website");

/** The site itself. Google reads `name` and `alternateName` on the home page when it picks the site name for results. */
export const WEBSITE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: absoluteUrl("/"),
  name: SITE_NAME,
  alternateName: ["FreeTierWiki", "Free Tier Wiki"],
  description: SITE_DESCRIPTION,
  inLanguage: "en",
};

export type BreadcrumbItem = { name: string; url?: string };

/** A trail as a BreadcrumbList. The last item may leave out its URL; search engines then use the page's own. */
export function breadcrumbList(items: BreadcrumbItem[]): object {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: absoluteUrl(item.url) } : {}),
    })),
  };
}

/** One JSON-LD graph. Escapes "<" so text from content can never close the script element. */
export function jsonLd(graph: object[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}
