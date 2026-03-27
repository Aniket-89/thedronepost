import Link from "next/link";
import { Article } from "@/lib/types";
import { Cpu, Wifi, Settings, Satellite, PlayCircle } from "lucide-react";

const TOPIC_ICONS = [Cpu, Wifi, Settings, Satellite];
const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "text-[#059669]",
  Intermediate: "text-accent",
  Advanced: "text-[#DC2626]",
};

export function TechnicalDives({ articles }: { articles: Article[] }) {
  return (
    <section className="py-24 px-8 bg-bg">
      <h2 className="text-4xl font-bold font-heading mb-12">
        Technical Deep Dives
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {articles.map((article, i) => {
          const Icon = TOPIC_ICONS[i % TOPIC_ICONS.length];
          const diffColor =
            DIFFICULTY_COLORS[article.difficulty || "Intermediate"] ||
            "text-accent";
          return (
            <Link
              key={article._id}
              href={`/articles/${article.slug.current}`}
              className="bg-white p-8 border border-border-subtle group hover:shadow-xl transition-all"
            >
              <Icon
                size={36}
                className="text-accent mb-6"
                strokeWidth={1.5}
              />
              <span
                className={`block text-[10px] font-bold mb-2 uppercase ${diffColor}`}
              >
                {article.difficulty || "Intermediate"}
              </span>
              <h4 className="text-xl font-bold font-heading mb-3 leading-tight">
                {article.title}
              </h4>
              {article.excerpt && (
                <p className="text-text-muted text-sm mb-6 line-clamp-2">
                  {article.excerpt}
                </p>
              )}
              <span className="text-accent font-bold text-xs uppercase inline-flex items-center gap-2">
                Start Lesson <PlayCircle size={14} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
