# Movie Watchlist

A personal movie watchlist built to learn Next.js concepts, using TMDB
(The Movie Database) for movie data — free API, no credit card.

## Setup

1. Get a free TMDB API key: https://www.themoviedb.org/settings/api
   (sign up, choose "Developer" as the use case, no cost)
2. `npm install`
3. `cp .env.example .env.local` and paste your key in as `TMDB_API_KEY`
4. `npm run dev`, open http://localhost:3000

## What each part teaches

| File | Concept |
|---|---|
| `app/page.tsx` | Static/ISR rendering — trending list rebuilds at most once an hour |
| `app/movie/[id]/page.tsx` | SSR — rendered fresh per request because it needs your personal watchlist status |
| `lib/tmdb.ts` | Server-side API calls — the TMDB key never reaches the browser |
| `app/api/search/route.ts` | A REST API route your own frontend calls |
| `app/api/watchlist/route.ts` | GET/POST/DELETE on the same route — full CRUD in one file |
| `lib/watchlist.ts` | Simplest possible persistence (one JSON file) |
| `components/SearchBar.tsx` | Debouncing user input — a real React pattern |
| `next.config.ts` | Why external images need to be explicitly allowed |

## Known limitation (on purpose)

`lib/watchlist.ts` writes to a JSON file on disk. That's fine for
`npm run dev` on your machine. It will silently fail if you deploy to
Vercel, because serverless functions there have a read-only filesystem.
When you hit that, swap `lib/watchlist.ts` for a real database (SQLite +
Prisma, or Supabase's free tier) — every page and API route that imports
from it stays unchanged. That swap, done once you notice the problem
yourself, teaches more than if I'd built it with a database from the start.
