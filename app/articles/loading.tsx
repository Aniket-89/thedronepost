export default function ArticlesLoading() {
  return (
    <section className="py-16 px-8 bg-bg">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-10 w-64 bg-surface-dim animate-pulse" />
        <div className="h-5 w-24 bg-surface-dim animate-pulse mt-2" />
      </div>

      {/* Filter skeleton */}
      <div className="flex gap-2 mb-12">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-24 bg-surface-dim animate-pulse" />
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-border-subtle">
            <div className="aspect-video bg-surface-dim animate-pulse" />
            <div className="p-6 space-y-3">
              <div className="h-3 w-20 bg-surface-dim animate-pulse" />
              <div className="h-6 w-full bg-surface-dim animate-pulse" />
              <div className="h-4 w-3/4 bg-surface-dim animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
