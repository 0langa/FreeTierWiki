import Link from "next/link";

import { SearchDialog } from "@/components/site/search-dialog";
import { ThemeToggle } from "@/components/site/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[1240px] items-center gap-5 px-4 sm:px-6">
        <Link href="/" className="whitespace-nowrap font-mono text-[17px] font-semibold tracking-tight">
          freetier<span className="text-brand">.</span>wiki
        </Link>
        <nav aria-label="Main" className="flex gap-5 text-sm text-ink-2">
          <Link href="/explorer/" className="hover:text-ink">
            Explore
          </Link>
          <Link href="/compare/" className="hover:text-ink">
            Compare
          </Link>
          <Link href="/changelog/" className="hidden hover:text-ink md:inline">
            Changelog
          </Link>
          <Link href="/about/" className="hidden hover:text-ink md:inline">
            How we rate
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SearchDialog />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
