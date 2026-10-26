import Link from "next/link";

import { MainNav } from "@/components/site/main-nav";
import { ComparePanel, ExplorePanel } from "@/components/site/nav-panels";
import { SearchDialog } from "@/components/site/search-dialog";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { getNavData } from "@/lib/nav-data";

export async function SiteHeader() {
  // The menus are rendered here, on the server, so their icons stay out of the client bundle.
  const nav = await getNavData();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur">
      <div className="container-x flex h-14 items-center gap-1.5 sm:gap-5">
        <Link href="/" className="whitespace-nowrap font-mono text-[14px] font-semibold tracking-tight sm:text-[17px]">
          freetier<span className="text-brand">.</span>wiki
        </Link>
        <MainNav explore={<ExplorePanel nav={nav} />} compare={<ComparePanel nav={nav} />} />
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <SearchDialog />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
