"use client";

import { useState } from "react";

type Status = "to-watch" | "watched" | null;

export default function WatchlistButton({
  movieId,
  title,
  posterPath,
  initialStatus,
}: {
  movieId: number;
  title: string;
  posterPath: string | null;
  initialStatus: Status;
}) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [pending, setPending] = useState(false);

  async function setTo(next: Status) {
    const previous = status;
    setStatus(next); // optimistic: update immediately, before the server responds
    setPending(true);

    try {
      const res =
        next === null
          ? await fetch(`/api/watchlist?movieId=${movieId}`, {
              method: "DELETE",
            })
          : await fetch("/api/watchlist", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ movieId, title, posterPath, status: next }),
            });

      if (!res.ok) {
        setStatus(previous); // roll back — the server rejected the change
      }
    } catch {
      setStatus(previous); // roll back — request never reached the server
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex gap-2">
      <button
        disabled={pending}
        onClick={() => setTo(status === "to-watch" ? null : "to-watch")}
        className={`text-sm px-3 py-1.5 rounded-sm border ${
          status === "to-watch"
            ? "bg-ink text-paper border-ink"
            : "border-hairline text-ink"
        }`}
      >
        {status === "to-watch" ? "✓ To watch" : "+ Add to watch"}
      </button>
      <button
        disabled={pending}
        onClick={() => setTo(status === "watched" ? null : "watched")}
        className={`text-sm px-3 py-1.5 rounded-sm border ${
          status === "watched"
            ? "bg-teal text-paper border-teal"
            : "border-hairline text-ink"
        }`}
      >
        {status === "watched" ? "✓ Watched" : "Mark watched"}
      </button>
    </div>
  );
}
