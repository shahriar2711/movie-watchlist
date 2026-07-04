import { NextRequest, NextResponse } from "next/server";
import { searchMovies } from "@/lib/tmdb";

// GET /api/search?q=inception
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q || q.trim().length === 0) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await searchMovies(q);
    return NextResponse.json({ results });
  } catch (err) {
    return NextResponse.json(
      { error: String(err), results: [] },
      { status: 500 }
    );
  }
}
