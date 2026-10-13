import Link from "next/link";

import { BUILD_DAY } from "@/lib/build-info";
import { FEED_PATH } from "@/lib/feed";
import { formatDay } from "@/lib/format";
import { REPO_URL } from "@/lib/links";

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow mb-3">{title}</h2>
      <ul className="grid gap-2 text-[14.5px] text-ink-2">{children}</ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="container-x grid gap-10 py-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <p className="font-mono text-[17px] font-semibold tracking-tight">
            freetier<span className="text-brand">.</span>wiki
          </p>
          <p className="mt-2 max-w-[34ch] text-[14.5px] leading-relaxed text-ink-2">
            Free plans for developers, with the limits, card rules, and billing risk spelled out. Always confirm on the provider&apos;s
            pricing page before you build on a plan.
          </p>
        </div>
        <Group title="Browse">
          <li>
            <Link href="/explorer/" className="hover:text-ink">
              All free tiers
            </Link>
          </li>
          <li>
            <Link href="/compare/" className="hover:text-ink">
              Comparisons
            </Link>
          </li>
          <li>
            <Link href="/changelog/" className="hover:text-ink">
              Changelog
            </Link>
          </li>
        </Group>
        <Group title="About">
          <li>
            <Link href="/about/" className="hover:text-ink">
              How we rate
            </Link>
          </li>
          <li>
            <a href={FEED_PATH} className="hover:text-ink">
              RSS feed
            </a>
          </li>
        </Group>
        <Group title="Contribute">
          <li>
            <a href={`${REPO_URL}/issues/new?template=outdated-info.yml`} {...EXTERNAL} className="hover:text-ink">
              Report outdated info
            </a>
          </li>
          <li>
            <a href={REPO_URL} {...EXTERNAL} className="hover:text-ink">
              GitHub
            </a>
          </li>
        </Group>
      </div>
      <div className="border-t border-line">
        <p className="container-x py-4 font-mono text-[12.5px] text-ink-3">
          Data built {formatDay(BUILD_DAY)} · MIT
        </p>
      </div>
    </footer>
  );
}
