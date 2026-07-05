"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
      <div className="border border-hairline rounded-md p-6 bg-white text-center">
        <p className="font-display text-sm text-danger mb-2">
          couldn&apos;t load trending movies
        </p>
        <p className="text-sm text-muted mb-4">
          This is usually TMDB being unreachable, rate limiting, or a missing
          API key. Check your <code>.env.local</code> if this keeps happening.
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
