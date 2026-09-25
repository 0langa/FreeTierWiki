export const SITE_URL = "https://freetier.wiki";
export const REPO_URL = "https://github.com/0langa/FreeTierWiki";

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}

/** A GitHub issue form link with the entry prefilled (see .github/ISSUE_TEMPLATE/outdated-info.yml). */
export function reportUrl(entry: { title: string; url: string }): string {
  const params = new URLSearchParams({
    template: "outdated-info.yml",
    title: `Outdated: ${entry.title}`,
    entry: absoluteUrl(entry.url),
  });
  return `${REPO_URL}/issues/new?${params.toString()}`;
}
