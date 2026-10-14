import Link from "next/link";

import { NavLinks } from "@/components/site/nav-links";
import { SearchDialog } from "@/components/site/search-dialog";
import { ThemeToggle } from "@/components/site/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur">
      <div className="container-x flex h-14 items-center gap-1.5 sm:gap-5">
        <Link href="/" className="whitespace-nowrap font-mono text-[14px] font-semibold tracking-tight sm:text-[17px]">
          freetier<span className="text-brand">.</span>wiki
        </Link>
        <NavLinks />
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <SearchDialog />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
