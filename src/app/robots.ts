import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/links";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Search/filter combinations are not landing pages. Keep crawlers on the
      // static category, provider, comparison and entry pages instead.
      // Cover the slashless form too, before the host redirects it.
      disallow: ["/explorer?", "/explorer/?"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
