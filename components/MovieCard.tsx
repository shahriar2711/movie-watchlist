import Link from "next/link";
import Image from "next/image";
import { posterUrl, type Movie } from "@/lib/tmdb";

export default function MovieCard({ movie }: { movie: Movie }) {
  const poster = posterUrl(movie.poster_path, "w500");
  return (
    <Link href={`/movie/${movie.id}`} className="block group">
      <div className="aspect-[2/3] bg-hairline rounded-md overflow-hidden relative">
        {poster ? (
          <Image
            src={poster}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover group-hover:opacity-90 transition-opacity"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-xs p-2 text-center">
            {movie.title}
          </div>
        )}
      </div>
      <p className="text-sm mt-2 leading-snug">{movie.title}</p>
      <p className="text-xs text-muted">{movie.release_date?.slice(0, 4) ?? "—"}</p>
    </Link>
  );
}
