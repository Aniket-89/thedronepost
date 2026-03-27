import Link from "next/link";
import { Article } from "@/lib/types";

export function CompanySpotlight({ articles }: { articles: Article[] }) {
  return (
    <section className="py-24 px-8 bg-surface">
      <h2 className="text-3xl font-bold font-heading mb-12">
        Company Spotlight
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article, i) => (
          <Link
            key={article._id}
            href={`/articles/${article.slug.current}`}
            className="bg-white border border-border-subtle p-10 flex flex-col md:flex-row gap-8 items-center group"
          >
            {/* Logo placeholder */}
            <div className="w-32 h-32 bg-surface-dim flex items-center justify-center p-4 shrink-0">
              <span className="text-4xl font-bold font-heading text-accent grayscale group-hover:grayscale-0 transition-all">
                {article.title.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <span className="text-accent font-bold text-xs uppercase tracking-widest">
                {i === 0 ? "Industry Leader" : "Startup Watch"}
              </span>
              <h3 className="text-2xl font-bold font-heading mt-1 mb-4 leading-tight">
                {article.title}
              </h3>
              {article.excerpt && (
                <p className="text-text-muted text-sm mb-6 line-clamp-2">
                  {article.excerpt}
                </p>
              )}
              <span className="inline-block bg-accent text-white px-6 py-2 font-bold text-sm uppercase">
                Read Story
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
