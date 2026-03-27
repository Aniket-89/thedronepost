import { Suspense } from "react";
import { Metadata } from "next";
import { ArticleFilters } from "@/components/articles/ArticleFilters";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { mockArticles } from "@/lib/mock-data";
import { CATEGORY_LABELS } from "@/lib/constants";
import { NewsletterInline } from "@/components/shared/NewsletterInline";

export async function generateMetadata(props: {
  searchParams: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const category = searchParams.category;
  const label = category ? CATEGORY_LABELS[category] : null;

  return {
    title: label ? `${label} Articles` : "All Articles",
    description: label
      ? `Read the latest ${label.toLowerCase()} articles on The Drone Post.`
      : "Browse all drone news, guides, technical deep dives, and company stories on The Drone Post.",
  };
}

export default async function ArticlesPage(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const category = searchParams.category;

  const filtered = category
    ? mockArticles.filter((a) => a.category === category)
    : mockArticles;

  return (
    <section className="py-16 px-8 bg-bg">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-2">
            {category ? CATEGORY_LABELS[category] || "Articles" : "All Stories"}
          </h1>
          <p className="text-text-muted">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="h-1 w-24 bg-accent hidden md:block" />
      </div>

      {/* Filters */}
      <Suspense fallback={null}>
        <ArticleFilters />
      </Suspense>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-text-muted text-lg">
            No articles found in this category yet.
          </p>
        </div>
      )}

      {/* Newsletter */}
      <div className="mt-16 -mx-8">
        <NewsletterInline
          heading="Never Miss a Story"
          description="Subscribe for weekly drone news, technical guides, and industry analysis from India."
          variant="accent"
        />
      </div>
    </section>
  );
}
