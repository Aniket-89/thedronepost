import Link from "next/link";
import { Article } from "@/lib/types";

const READER_COUNTS = ["12,403", "8,912", "7,540", "5,231"];

export function TrendingSection({ articles }: { articles: Article[] }) {
  return (
    <section className="py-20 px-8 bg-surface border-y border-border-subtle">
      <h2 className="text-2xl font-bold font-heading mb-12">
        Trending This Week
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {articles.map((article, i) => (
          <Link
            key={article._id}
            href={`/articles/${article.slug.current}`}
            className="flex items-start gap-4 group"
          >
            <span className="text-5xl font-bold text-accent font-heading leading-none">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h4 className="font-bold leading-tight group-hover:underline cursor-pointer font-heading">
                {article.title}
              </h4>
              <p className="text-xs text-text-muted mt-2">
                {READER_COUNTS[i] || "5,000"} Readers
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
