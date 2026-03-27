import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { DifficultyBadge } from "@/components/shared/DifficultyBadge";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Article } from "@/lib/types";

export function GuidesSection({
  beginner,
  advanced,
}: {
  beginner: Article[];
  advanced: Article[];
}) {
  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Learn Drones" href="/articles?category=guide" />

        {/* Beginner row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {beginner.map((article, i) => (
            <ScrollReveal key={article._id} delay={i * 100}>
              <GuideCard article={article} />
            </ScrollReveal>
          ))}
        </div>

        {/* Advanced row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advanced.map((article, i) => (
            <ScrollReveal key={article._id} delay={i * 100}>
              <GuideCard article={article} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GuideCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug.current}`}
      className="group block bg-surface border border-border overflow-hidden card-hover-line relative hover:-translate-y-0.5 transition-transform duration-150"
    >
      {article.featuredImage && (
        <div className="aspect-[16/9] overflow-hidden bg-border relative">
          <Image
            src={article.featuredImage.asset.url}
            alt={article.featuredImage.alt || article.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {article.difficulty && (
            <DifficultyBadge difficulty={article.difficulty} />
          )}
        </div>
        <h3 className="font-heading font-bold text-text text-sm leading-snug group-hover:text-accent transition-colors line-clamp-2">
          {article.title}
        </h3>
        <span className="text-xs text-text-muted mt-2 block">
          {article.readingTime} min read
        </span>
      </div>
    </Link>
  );
}
