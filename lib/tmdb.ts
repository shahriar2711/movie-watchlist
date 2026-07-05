const TMDB_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

function apiKey(): string {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    throw new Error(
      "TMDB_API_KEY is not set. Get a free key at https://www.themoviedb.org/settings/api and add it to .env.local"
    );
  }
  return key;
}

export function posterUrl(path: string | null, size: "w200" | "w500" = "w500") {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
}

// Trending movies — this powers the homepage, and is cached/revalidated
// rather than fetched fresh on every request (see the `revalidate` export
// in app/page.tsx). This is the SSG/ISR half of the rendering story.
export async function getTrending(
  page: number = 1
): Promise<{ results: Movie[]; totalPages: number }> {
  const res = await fetch(
    `${TMDB_BASE}/trending/movie/week?api_key=${apiKey()}&page=${page}`,
    { next: { revalidate: 3600 } } // rebuild this data at most once an hour
  );
  if (!res.ok) throw new Error(`TMDB trending failed: ${res.status}`);
  const data = await res.json();
  return { results: data.results as Movie[], totalPages: data.total_pages };
}

// Search — called from the API route on every keystroke (debounced client
// side), so this one is NOT cached.
export async function searchMovies(query: string): Promise<Movie[]> {
  const res = await fetch(
    `${TMDB_BASE}/search/movie?api_key=${apiKey()}&query=${encodeURIComponent(
      query
    )}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`TMDB search failed: ${res.status}`);
  const data = await res.json();
  return data.results as Movie[];
}

export async function getMovieDetails(id: string): Promise<Movie | null> {
  const res = await fetch(`${TMDB_BASE}/movie/${id}?api_key=${apiKey()}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}
