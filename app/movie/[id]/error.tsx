"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
      <Link href="/" className="font-display text-xs text-muted hover:text-teal">
        ← back
      </Link>
      <div className="border border-hairline rounded-md p-6 bg-white text-center mt-4">
        <p className="font-display text-sm text-danger mb-2">
          couldn&apos;t load this movie
        </p>
        <p className="text-sm text-muted mb-4">
          The movie ID might be invalid, or TMDB is temporarily unreachable.
        </p>
        <button
          onClick={() => reset()}
          className="font-display text-sm border border-hairline rounded-sm px-4 py-2"
        >
          try again
        </button>
      </div>
    </main>
  );
}
