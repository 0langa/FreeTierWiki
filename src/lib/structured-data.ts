import { absoluteUrl, REPO_URL } from "@/lib/links";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/metadata";

/** The site node's id, so each page node can point at the site without repeating it. */
export const WEBSITE_ID = absoluteUrl("/#website");
export const PUBLISHER_ID = absoluteUrl("/#publisher");

// The open-source publishing project, not a claim of incorporation or a vendor.
export const PUBLISHER = {
  "@type": "Organization",
  "@id": PUBLISHER_ID,
  name: "FreeTierWiki",
  url: absoluteUrl("/"),
  description: "An open-source catalog of free developer tools and services.",
  sameAs: [REPO_URL],
};

/** The site itself. Google reads `name` and `alternateName` on the home page when it picks the site name for results. */
export const WEBSITE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: absoluteUrl("/"),
  name: SITE_NAME,
  alternateName: ["FreeTierWiki", "Free Tier Wiki"],
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": PUBLISHER_ID },
};

export function itemList(name: string, items: { title: string; url: string }[]) {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.title, url: absoluteUrl(item.url),
    })),
  };
}

export function faqPage(path: string, items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": absoluteUrl(`${path}#faq`),
    url: absoluteUrl(path),
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function collectionPage(path: string, name: string, items: { title: string; url: string }[]) {
  return {
    "@type": "CollectionPage", "@id": absoluteUrl(path), url: absoluteUrl(path), name,
    isPartOf: { "@id": WEBSITE_ID }, mainEntity: itemList(name, items),
  };
}

export function article(path: string, headline: string, description: string, dateModified?: string) {
  return {
    "@type": "Article", "@id": absoluteUrl(`${path}#article`), headline, description,
    mainEntityOfPage: { "@id": absoluteUrl(path) },
    publisher: PUBLISHER, inLanguage: "en",
    ...(dateModified ? { dateModified } : {}),
  };
}

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
