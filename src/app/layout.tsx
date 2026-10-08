import type { Metadata } from "next";
import localFont from "next/font/local";

import { AppProviders } from "@/components/providers/app-providers";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SITE_URL } from "@/lib/links";

import "./globals.css";

// Self-hosted (OFL-1.1, see src/fonts/LICENSE-ibm-plex.txt) so a build never depends on Google Fonts.
const fontSans = localFont({
  src: [
    { path: "../fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/ibm-plex-sans-latin-600-normal.woff2", weight: "600" },
    { path: "../fonts/ibm-plex-sans-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = localFont({
  src: [
    { path: "../fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/ibm-plex-mono-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-mono",
  display: "swap",
  // Mono is only used for small labels; do not preload its 45 KB ahead of the page text.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "freetier.wiki: free tiers, with the fine print",
    template: "%s · freetier.wiki",
  },
  description: "Free plans for developers with their limits, card rules, billing risk, and how fresh each entry is.",
  openGraph: {
    type: "website",
    siteName: "freetier.wiki",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "freetier.wiki: free tiers, with the fine print" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <AppProviders>
          <SiteHeader />
          <main id="main" className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
            {children}
          </main>
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
