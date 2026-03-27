import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Article } from "@/lib/types";
import { CATEGORY_LABELS, CATEGORY_TEXT_COLORS } from "@/lib/constants";
import { Bookmark } from "lucide-react";

// Map categories to border colors
const CATEGORY_BORDER: Record<string, string> = {
  defense: "border-cat-defense",
  technology: "border-cat-technology",
  news: "border-cat-news",
  industry: "border-cat-news",
  guide: "border-cat-guide",
  "company-story": "border-cat-company",
  technical: "border-cat-technical",
};

export function ArticleCard({ article }: { article: Article }) {
  const borderColor = CATEGORY_BORDER[article.category] || "border-accent";

  return (
    <Link
      href={`/articles/${article.slug.current}`}
      className="group block bg-surface border border-border-subtle hover:border-accent transition-colors"
    >
      {/* Image — grayscale, color on hover */}
      {article.featuredImage && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={article.featuredImage.asset.url}
            alt={article.featuredImage.alt || article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="flex gap-2 mb-3">
          <span
            className={`text-[10px] font-bold uppercase tracking-widest border-l-2 ${borderColor} pl-2`}
          >
            {CATEGORY_LABELS[article.category] || article.category}
          </span>
          <span className="text-[10px] text-text-muted font-medium">
            {article.readingTime} MIN READ
          </span>
        </div>

        <h3 className="text-xl font-bold font-heading mb-3 leading-tight group-hover:text-accent transition-colors">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="text-text-muted text-sm mb-4 line-clamp-2">
            {article.excerpt}
          </p>
        )}

        <div className="pt-4 border-t border-border-subtle flex justify-between items-center">
          <span className="text-xs font-bold italic">
            By {article.author.name}
          </span>
          <Bookmark size={14} className="text-text-muted" />
        </div>
      </div>
    </Link>
  );
}
