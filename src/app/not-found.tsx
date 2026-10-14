import type { Metadata } from "next";
import Link from "next/link";

// Without this the 404 page carries the home page title. Next adds the noindex tag itself.
export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-[32px] font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-[16px] leading-relaxed text-ink-2">This page does not exist, or the entry was removed because it was not a free tier.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        <Link href="/explorer/" className="btn btn-primary">
          Explore free tiers
        </Link>
        <Link href="/" className="btn">
          Home
        </Link>
      </div>
    </div>
  );
}
