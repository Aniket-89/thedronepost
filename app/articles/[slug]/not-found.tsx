import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ArticleNotFound() {
  return (
    <section className="py-24 px-8 bg-bg text-center">
      <p className="text-6xl font-bold font-heading text-accent mb-4">404</p>
      <h2 className="text-2xl font-bold font-heading mb-4">
        Article Not Found
      </h2>
      <p className="text-text-muted mb-8 max-w-md mx-auto">
        The article you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/articles"
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-bold font-heading uppercase tracking-wider text-sm hover:bg-accent-dark transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Articles
      </Link>
    </section>
  );
}
