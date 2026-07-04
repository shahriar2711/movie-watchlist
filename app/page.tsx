import { getTrending } from "@/lib/tmdb";
import { getWatchlist } from "@/lib/watchlist";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";

// This page revalidates at most once an hour (see lib/tmdb.ts) — trending
// data doesn't need to be fetched fresh on every visitor.
export default async function Home() {
  const [trending, watchlist] = await Promise.all([
    getTrending(),
    getWatchlist(),
  ]);

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-medium mb-4">Watchlist</h1>
        <SearchBar />
      </header>

      {watchlist.length > 0 && (
        <section className="mb-12">
          <h2 className="font-display text-sm text-muted mb-3">
            your list ({watchlist.length})
          </h2>
          <ul className="flex flex-wrap gap-3">
            {watchlist.map((entry) => (
              <li key={entry.movieId}>
                <a
                  href={`/movie/${entry.movieId}`}
                  className="text-sm border border-hairline rounded-full px-3 py-1 bg-white hover:border-teal"
                >
                  {entry.title}{" "}
                  <span className="text-muted">
                    · {entry.status === "watched" ? "watched" : "to watch"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="font-display text-sm text-muted mb-3">
          trending this week
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {trending.slice(0, 15).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
}
