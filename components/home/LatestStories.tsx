import { ArticleCard } from "@/components/shared/ArticleCard";
import { Article } from "@/lib/types";

export function LatestStories({ articles }: { articles: Article[] }) {
  return (
    <section className="py-24 px-8 bg-bg">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-4xl font-bold font-heading tracking-tight">
          Latest Stories
        </h2>
        <div className="h-1 w-24 bg-accent" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
      <div className="mt-16 text-center">
        <button className="bg-accent text-white px-12 py-4 font-bold hover:bg-accent-dark transition-colors uppercase tracking-widest text-sm">
          Load More Stories
        </button>
      </div>
    </section>
  );
}
