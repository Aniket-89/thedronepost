export default function ArticleLoading() {
  return (
    <article className="bg-bg">
      {/* Back nav skeleton */}
      <div className="px-8 pt-8">
        <div className="h-4 w-28 bg-surface-dim animate-pulse" />
      </div>

      {/* Featured image skeleton */}
      <div className="mt-6 px-8">
        <div className="aspect-[21/9] bg-surface-dim animate-pulse" />
      </div>

      {/* Content skeleton */}
      <div className="max-w-[720px] mx-auto px-8 py-12 space-y-6">
        <div className="flex gap-4">
          <div className="h-4 w-20 bg-surface-dim animate-pulse" />
          <div className="h-4 w-24 bg-surface-dim animate-pulse" />
          <div className="h-4 w-20 bg-surface-dim animate-pulse" />
        </div>
        <div className="h-12 w-full bg-surface-dim animate-pulse" />
        <div className="h-12 w-3/4 bg-surface-dim animate-pulse" />
        <div className="h-6 w-full bg-surface-dim animate-pulse mt-4" />
        <div className="border-y border-border-subtle py-4 flex justify-between">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 bg-surface-dim animate-pulse" />
            <div className="h-4 w-32 bg-surface-dim animate-pulse" />
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-full bg-surface-dim animate-pulse" />
            <div className="h-4 w-full bg-surface-dim animate-pulse" />
            <div className="h-4 w-2/3 bg-surface-dim animate-pulse" />
          </div>
        ))}
      </div>
    </article>
  );
}
