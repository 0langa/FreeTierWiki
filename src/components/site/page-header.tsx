import Link from "next/link";

export type Crumb = { href: string; label: string };

export function Breadcrumb({ crumbs, current }: { crumbs: Crumb[]; current: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[13.5px] text-ink-3">
        {crumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            <Link href={crumb.href} className="hover:text-ink">
              {crumb.label}
            </Link>
            <span aria-hidden>/</span>
          </li>
        ))}
        <li aria-current="page" className="min-w-0 truncate text-ink-2">
          {current}
        </li>
      </ol>
    </nav>
  );
}

type PageHeaderProps = {
  crumbs?: Crumb[];
  current?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
};

/** Title block for a list page: optional breadcrumb, the heading, a short lede, then chip rows. */
export function PageHeader({ crumbs, current, title, lede, children }: PageHeaderProps) {
  return (
    <div className="grid gap-4 pt-8 lg:pt-10">
      {crumbs && current ? <Breadcrumb crumbs={crumbs} current={current} /> : null}
      <div className="grid gap-2.5">
        <h1 className="text-[30px] font-bold leading-[1.1] tracking-tight sm:text-[36px]">{title}</h1>
        {lede ? <p className="max-w-[64ch] text-[15.5px] leading-relaxed text-ink-2 sm:text-base">{lede}</p> : null}
      </div>
      {children ? <div className="grid gap-2.5">{children}</div> : null}
    </div>
  );
}

/** A labelled row of chips. `name` is the accessible name when the visible label is phrased differently. */
export function ChipRow({ label, name, children }: { label: string; name?: string; children: React.ReactNode }) {
  return (
    <nav aria-label={name ?? label} className="flex flex-wrap items-center gap-2 text-[13.5px] text-ink-2">
      <span className="mr-0.5">{label}</span>
      {children}
    </nav>
  );
}
