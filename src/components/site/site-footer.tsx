import Link from "next/link";

import { BUILD_DAY } from "@/lib/build-info";
import { formatDay } from "@/lib/format";
import { REPO_URL } from "@/lib/links";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex w-full max-w-[1240px] flex-wrap gap-x-6 gap-y-2 px-4 py-6 text-[13px] text-ink-3 sm:px-6">
        <Link href="/about/" className="hover:text-ink">
          How we rate
        </Link>
        <Link href="/changelog/" className="hover:text-ink">
          Changelog
        </Link>
        <a href={`${REPO_URL}/issues/new?template=outdated-info.yml`} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
          Report outdated info
        </a>
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
          GitHub
        </a>
        <span className="font-mono sm:ml-auto">Data built {formatDay(BUILD_DAY)} · MIT</span>
      </div>
    </footer>
  );
}
