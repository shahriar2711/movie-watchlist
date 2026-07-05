"use client";

import { useState } from "react";
import MovieCard from "@/components/MovieCard";
import type { Movie } from "@/lib/tmdb";

export default function TrendingGrid({
  initialResults,
  initialTotalPages,
}: {
  initialResults: Movie[];
  initialTotalPages: number;
}) {
  const [movies, setMovies] = useState<Movie[]>(initialResults);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasMore = page < initialTotalPages;

  async function loadMore() {
    setLoading(true);
    setError(null);
    try {
      const nextPage = page + 1;
      const res = await fetch(`/api/trending?page=${nextPage}`);
      const data = await res.json();
      if (!res.ok) {
        setError("Couldn't load more movies. Try again.");
        return;
      }
      setMovies((prev) => {
        const seen = new Set(prev.map((m) => m.id));
        const newOnes = (data.results as Movie[]).filter(
          (m) => !seen.has(m.id)
        );
        return [...prev, ...newOnes];
      });
      setPage(nextPage);
    } catch {
      setError("Couldn't reach the server. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {error && (
        <p className="text-sm text-danger mt-4 text-center">{error}</p>
      )}

      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="mt-8 mx-auto block font-display text-sm border border-hairline rounded-sm px-4 py-2 disabled:opacity-40"
        >
          {loading ? "loading…" : "load more"}
        </button>
      )}
    </div>
  );
}
