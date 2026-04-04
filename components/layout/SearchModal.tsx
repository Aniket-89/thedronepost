"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search, X, Loader2, ArrowRight } from "lucide-react";

type SearchResult = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
};

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch articles on first open
  useEffect(() => {
    if (open && !hasLoaded) {
      const loadData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch("/api/search");
          setArticles((await res.json()) || []);
          setHasLoaded(true);
        } catch (err) {
          console.error("Failed to load search index", err);
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    }

    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleEscape);
      
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleEscape);
      };
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
  }, [open, hasLoaded, onClose]);

  // Perform fuzzy search using derived state (avoids syncing state inside effects)
  const fuse = useMemo(() => {
    if (!articles || articles.length === 0) return null;
    return new Fuse(articles, {
      keys: ["title", "excerpt", "category"],
      threshold: 0.3,
      distance: 100,
    });
  }, [articles]);

  const results = useMemo(() => {
    if (!query.trim() || !fuse) return [];
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex justify-center pt-20 px-4 pb-4 overflow-y-auto">
      {/* Click outside to close overflow layer */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-surface border border-border-subtle shadow-xl h-fit max-h-[80vh] flex flex-col">
        {/* Header / Input */}
        <div className="flex items-center border-b border-border-subtle bg-white px-6 py-4">
          <Search size={20} className="text-text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search articles, guides, and news..."
            className="flex-1 bg-transparent border-none outline-none px-4 text-text font-heading text-lg placeholder:text-border"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={onClose}
            className="shrink-0 p-2 text-text-muted hover:text-accent transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results Window */}
        <div className="flex-1 overflow-y-auto p-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-text-muted">
              <Loader2 size={24} className="animate-spin" />
            </div>
          ) : query && results.length === 0 ? (
            <div className="text-center py-16 px-6">
              <p className="text-text-muted font-heading text-lg">No intel found for &quot;{query}&quot;</p>
              <p className="text-sm mt-2 text-text-muted">Adjust your telemetry and try again.</p>
            </div>
          ) : results.length > 0 ? (
            <div className="flex flex-col">
              {results.map((article) => (
                <Link
                  key={article._id}
                  href={`/articles/${article.slug}`}
                  onClick={onClose}
                  className="group flex flex-col sm:flex-row gap-4 p-4 hover:bg-white border-b border-transparent hover:border-border-subtle transition-all"
                >
                  <div className="flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1 block">
                      {article.category}
                    </span>
                    <h3 className="font-heading font-bold text-text group-hover:text-accent transition-colors text-lg mb-1 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-sm text-text-muted line-clamp-1">{article.excerpt}</p>
                  </div>
                  <div className="shrink-0 flex items-center justify-start sm:justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                     <ArrowRight size={16} className="text-accent" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 px-6 text-center">
              <div className="w-12 h-12 border border-border-subtle bg-white/50 mx-auto flex items-center justify-center mb-4 text-text-muted">
                <Search size={20} />
              </div>
              <p className="text-sm text-text-muted uppercase tracking-widest font-bold">Awaiting Input</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
