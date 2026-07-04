import fs from "fs/promises";
import path from "path";

// Deliberately the simplest possible persistence: one JSON file on disk.
// This is fine for `npm run dev` on your own machine. It will NOT work if
// you deploy to Vercel (serverless filesystems are read-only/ephemeral) —
// that's the natural next lesson: swap this file for a real database
// (SQLite via Prisma, or Supabase's free tier) without changing any page
// or component code, since they only import the functions below.

const STORE_PATH = path.join(process.cwd(), "data", "watchlist-store.json");

export type WatchlistEntry = {
  movieId: number;
  title: string;
  posterPath: string | null;
  status: "to-watch" | "watched";
  addedAt: string;
};

async function readStore(): Promise<WatchlistEntry[]> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeStore(entries: WatchlistEntry[]): Promise<void> {
  await fs.writeFile(STORE_PATH, JSON.stringify(entries, null, 2), "utf-8");
}

export async function getWatchlist(): Promise<WatchlistEntry[]> {
  return readStore();
}

export async function addToWatchlist(
  entry: Omit<WatchlistEntry, "addedAt">
): Promise<WatchlistEntry[]> {
  const entries = await readStore();
  const filtered = entries.filter((e) => e.movieId !== entry.movieId);
  filtered.push({ ...entry, addedAt: new Date().toISOString() });
  await writeStore(filtered);
  return filtered;
}

export async function removeFromWatchlist(
  movieId: number
): Promise<WatchlistEntry[]> {
  const entries = await readStore();
  const filtered = entries.filter((e) => e.movieId !== movieId);
  await writeStore(filtered);
  return filtered;
}
