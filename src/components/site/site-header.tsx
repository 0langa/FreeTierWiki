import Link from "next/link";

import { SearchDialog } from "@/components/site/search-dialog";
import { ThemeToggle } from "@/components/site/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[1240px] items-center gap-3 px-4 sm:gap-5 sm:px-6">
        <Link href="/" className="whitespace-nowrap font-mono text-[15px] font-semibold tracking-tight sm:text-[17px]">
          freetier<span className="text-brand">.</span>wiki
        </Link>
        <nav aria-label="Main" className="flex gap-3 text-[13px] text-ink-2 sm:gap-5 sm:text-sm">
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
        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <SearchDialog />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
