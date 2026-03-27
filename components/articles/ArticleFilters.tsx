"use client";

import { useRouter, useSearchParams } from "next/navigation";

const FILTERS = [
  { label: "All", value: "" },
  { label: "News", value: "news" },
  { label: "Guides", value: "guide" },
  { label: "Technical", value: "technical" },
  { label: "Company Stories", value: "company-story" },
  { label: "Defense", value: "defense" },
];

export function ArticleFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || "";

  function handleFilter(value: string) {
    if (value) {
      router.push(`/articles?category=${value}`);
    } else {
      router.push("/articles");
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-12">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleFilter(filter.value)}
          className={`px-5 py-2 text-sm font-bold font-heading uppercase tracking-wider transition-all ${
            active === filter.value
              ? "bg-accent text-white"
              : "border border-border-subtle text-text hover:border-accent hover:text-accent"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
