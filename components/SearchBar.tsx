"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { posterUrl, type Movie } from "@/lib/tmdb";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounce: wait 400ms after the user stops typing before calling the
  // API. Without this, every keystroke would fire a request — a classic
  // React/Next.js pattern you haven't needed until now.
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results ?? []);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie…"
        className="w-full border border-hairline rounded-md px-4 py-2 text-sm bg-white"
      />
      {loading && (
        <p className="text-xs text-muted mt-1">searching…</p>
      )}
      {results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-hairline rounded-md mt-1 max-h-96 overflow-y-auto shadow-sm">
          {results.slice(0, 8).map((movie) => (
            <li key={movie.id} className="border-b border-hairline last:border-0">
              <Link
                href={`/movie/${movie.id}`}
                onClick={() => setQuery("")}
                className="flex items-center gap-3 p-2 hover:bg-paper"
              >
                {posterUrl(movie.poster_path, "w200") ? (
                  <Image
                    src={posterUrl(movie.poster_path, "w200")!}
                    alt={movie.title}
                    width={40}
                    height={60}
                    className="rounded-sm object-cover"
                  />
                ) : (
                  <div className="w-10 h-[60px] bg-hairline rounded-sm" />
                )}
                <div>
                  <p className="text-sm">{movie.title}</p>
                  <p className="text-xs text-muted">
                    {movie.release_date?.slice(0, 4) ?? "—"}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
