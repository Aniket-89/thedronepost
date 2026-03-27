"use client";

export default function ArticleError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-24 px-8 bg-bg text-center">
      <h2 className="text-2xl font-bold font-heading mb-4">
        Failed to load article
      </h2>
      <p className="text-text-muted mb-8">
        Something went wrong while loading this article.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-accent text-white font-bold font-heading uppercase tracking-wider text-sm hover:bg-accent-dark transition-colors"
      >
        Try Again
      </button>
    </section>
  );
}
