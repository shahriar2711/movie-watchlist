import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getMovieDetails, posterUrl } from "@/lib/tmdb";
import { getWatchlist } from "@/lib/watchlist";
import WatchlistButton from "@/components/WatchlistButton";

type Props = { params: Promise<{ id: string }> };

// No generateStaticParams here on purpose: this page needs to check
// "is this movie already on the watchlist?" per request, so it's
// server-rendered on demand (SSR) rather than pre-built (SSG). That
// contrast — homepage is SSG/ISR, this page is SSR — is the thing worth
// noticing as you read the code.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  if (!movie) return {};
  return {
    title: movie.title,
    description: movie.overview,
  };
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  const [movie, watchlist] = await Promise.all([
    getMovieDetails(id),
    getWatchlist(),
  ]);

  if (!movie) notFound();

  const existing = watchlist.find((e) => e.movieId === movie.id);
  const poster = posterUrl(movie.poster_path, "w500");

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
      <a href="/" className="font-display text-xs text-muted hover:text-teal">
        ← back
      </a>

      <div className="flex gap-6 mt-4 flex-col sm:flex-row">
        <div className="w-full sm:w-48 shrink-0 aspect-[2/3] bg-hairline rounded-md overflow-hidden relative">
          {poster && (
            <Image
              src={poster}
              alt={movie.title}
              fill
              sizes="192px"
              className="object-cover"
            />
          )}
        </div>

        <div className="flex-1">
          <h1 className="font-display text-xl font-medium">{movie.title}</h1>
          <p className="text-sm text-muted mt-1">
            {movie.release_date?.slice(0, 4)} · ★ {movie.vote_average?.toFixed(1)}
          </p>
          <p className="text-sm leading-relaxed mt-4">{movie.overview}</p>

          <div className="mt-6">
            <WatchlistButton
              movieId={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              initialStatus={existing?.status ?? null}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
