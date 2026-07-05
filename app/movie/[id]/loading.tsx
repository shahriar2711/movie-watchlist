export default function Loading() {
  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 animate-pulse">
      <div className="h-3 w-12 bg-hairline rounded-sm" />
      <div className="flex gap-6 mt-4 flex-col sm:flex-row">
        <div className="w-full sm:w-48 shrink-0 aspect-[2/3] bg-hairline rounded-md" />
        <div className="flex-1">
          <div className="h-6 w-2/3 bg-hairline rounded-sm" />
          <div className="h-3 w-1/3 bg-hairline rounded-sm mt-3" />
          <div className="h-3 w-full bg-hairline rounded-sm mt-6" />
          <div className="h-3 w-full bg-hairline rounded-sm mt-2" />
          <div className="h-3 w-2/3 bg-hairline rounded-sm mt-2" />
          <div className="h-9 w-48 bg-hairline rounded-sm mt-6" />
        </div>
      </div>
    </main>
  );
}
