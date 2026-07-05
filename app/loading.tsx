export default function Loading() {
  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 animate-pulse">
      <div className="h-8 w-40 bg-hairline rounded-sm mb-4" />
      <div className="h-10 w-full bg-hairline rounded-md mb-8" />

      <div className="h-4 w-32 bg-hairline rounded-sm mb-3" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[2/3] bg-hairline rounded-md" />
            <div className="h-3 w-3/4 bg-hairline rounded-sm mt-2" />
            <div className="h-3 w-1/3 bg-hairline rounded-sm mt-1" />
          </div>
        ))}
      </div>
    </main>
  );
}
