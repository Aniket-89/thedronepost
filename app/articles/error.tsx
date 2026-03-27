"use client";

export default function ArticlesError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-24 px-8 bg-bg text-center">
      <h2 className="text-2xl font-bold font-heading mb-4">
        Something went wrong
      </h2>
      <p className="text-text-muted mb-8">
        We couldn&apos;t load the articles. Please try again.
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
