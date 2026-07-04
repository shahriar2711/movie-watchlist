import { NextRequest, NextResponse } from "next/server";
import { getWatchlist, addToWatchlist, removeFromWatchlist } from "@/lib/watchlist";

export async function GET() {
  const entries = await getWatchlist();
  return NextResponse.json({ entries });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { movieId, title, posterPath, status } = body;

  if (!movieId || !title || !status) {
    return NextResponse.json(
      { error: "movieId, title, and status are required" },
      { status: 400 }
    );
  }

  const entries = await addToWatchlist({ movieId, title, posterPath, status });
  return NextResponse.json({ entries });
}

export async function DELETE(request: NextRequest) {
  const movieId = request.nextUrl.searchParams.get("movieId");
  if (!movieId) {
    return NextResponse.json({ error: "movieId is required" }, { status: 400 });
  }
  const entries = await removeFromWatchlist(Number(movieId));
  return NextResponse.json({ entries });
}
