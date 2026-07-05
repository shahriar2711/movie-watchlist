import { NextRequest, NextResponse } from "next/server";
import { getTrending } from "@/lib/tmdb";

// GET /api/trending?page=2
export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");

  try {
    const { results, totalPages } = await getTrending(page);
    return NextResponse.json({ results, totalPages });
  } catch (err) {
    return NextResponse.json(
      { error: String(err), results: [], totalPages: 0 },
      { status: 500 }
    );
  }
}
