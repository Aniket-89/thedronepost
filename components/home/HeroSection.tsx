"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/types";
import { CATEGORY_LABELS, FALLBACK_IMAGE_URL } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function HeroSection({
  featured,
  secondary,
}: {
  featured: Article[];
  secondary: Article[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Zoop zoop auto-slider logic
  useEffect(() => {
    if (featured.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featured.length]);

  return (
    <section className="bg-[#0A0A0A] flex flex-col md:flex-row min-h-[600px]">
      {/* Main Featured Slider — full image background */}
      <div className="w-full md:w-[60%] relative overflow-hidden border-r border-[#1C1B1B]">
        {featured.map((article, idx) => (
          <div
            key={article._id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Link
              href={`/articles/${article.slug.current}`}
              className="block w-full h-full relative group cursor-pointer"
            >
              <Image
                src={article.featuredImage?.asset.url || FALLBACK_IMAGE_URL}
                alt={article.featuredImage?.alt || article.title}
                fill
                priority={idx === 0}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-12 max-w-2xl">
                <span className="inline-block bg-accent text-white px-3 py-1 text-xs font-bold mb-4 tracking-widest uppercase">
                  {CATEGORY_LABELS[article.category]?.toUpperCase() || "BREAKING NEWS"}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6 font-heading">
                  {article.title}
                </h1>
                {article.excerpt && (
                  <p className="text-[#9CA3AF] text-lg leading-relaxed mb-8">
                    {article.excerpt}
                  </p>
                )}
                <span className="border-b-2 border-accent text-white font-bold py-2 inline-flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest text-sm">
                  Read the Full Deep Dive <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </div>
        ))}

        {/* Minimalist Slide Indicators */}
        {featured.length > 1 && (
          <div className="absolute bottom-6 right-12 z-20 flex gap-2">
            {featured.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex ? "w-8 bg-accent" : "w-4 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

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
              className="text-xs font-bold tracking-widest uppercase"
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
            <h3 className="text-white text-xl font-bold mt-2 group-hover:text-accent transition-colors font-heading leading-tight">
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
