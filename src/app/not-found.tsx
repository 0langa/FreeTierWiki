import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-ink-2">This page does not exist, or the entry was removed because it was not a free tier.</p>
      <div className="mt-6 flex justify-center gap-2">
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
