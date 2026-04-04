import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function HeroSection({
  featured,
  secondary,
}: {
  featured: Article;
  secondary: Article[];
}) {
  return (
    <section className="bg-[#0A0A0A] flex flex-col md:flex-row min-h-[600px]">
      {/* Main Featured — full image background */}
      <Link
        href={`/articles/${featured.slug.current}`}
        className="w-full md:w-[60%] relative group cursor-pointer overflow-hidden border-r border-[#1C1B1B]"
      >
        {featured.featuredImage && (
          <Image
            src={featured.featuredImage.asset.url}
            alt={featured.featuredImage.alt || featured.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-12 max-w-2xl">
          <span className="inline-block bg-accent text-white px-3 py-1 text-xs font-bold mb-4">
            {CATEGORY_LABELS[featured.category]?.toUpperCase() || "BREAKING NEWS"}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6 font-heading">
            {featured.title}
          </h1>
          {featured.excerpt && (
            <p className="text-[#9CA3AF] text-lg leading-relaxed mb-8">
              {featured.excerpt}
            </p>
          )}
          <span className="border-b-2 border-accent text-white font-bold py-2 inline-flex items-center gap-2 group-hover:gap-4 transition-all">
            Read the Full Deep Dive <ArrowRight size={18} />
          </span>
        </div>
      </Link>

      {/* Side Stack — text only, no images */}
      <div className="w-full md:w-[40%] flex flex-col">
        {secondary.map((article, i) => (
          <Link
            key={article._id}
            href={`/articles/${article.slug.current}`}
            className={`flex-1 p-8 hover:bg-[#111111] transition-colors group ${
              i < secondary.length - 1 ? "border-b border-[#1C1B1B]" : ""
            }`}
          >
            <span
              className="text-xs font-bold tracking-widest"
              style={{
                color:
                  article.category === "defense"
                    ? "#DC2626"
                    : article.category === "technology" || article.category === "technical"
                    ? "#2563EB"
                    : "#EA580C",
              }}
            >
              {CATEGORY_LABELS[article.category]?.toUpperCase() || article.category.toUpperCase()}
            </span>
            <h3 className="text-white text-xl font-bold mt-2 group-hover:text-accent transition-colors font-heading">
              {article.title}
            </h3>
            {article.excerpt && (
              <p className="text-[#9CA3AF] mt-2 text-sm line-clamp-2">
                {article.excerpt}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
