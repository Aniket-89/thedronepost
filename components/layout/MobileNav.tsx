"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";

const ARTICLE_CATEGORIES = [
  { label: "All Articles", href: "/articles" },
  { label: "News", href: "/articles?category=news" },
  { label: "Guides", href: "/articles?category=guide" },
  { label: "Technical", href: "/articles?category=technical" },
  { label: "Company Stories", href: "/articles?category=company-story" },
  { label: "Defense", href: "/articles?category=defense" },
];

const MOBILE_LINKS = [
  { label: "Tools", href: "/tools" },
  { label: "Directory", href: "/directory" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [articlesOpen, setArticlesOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setArticlesOpen(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-bg-dark flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
        <span className="font-heading text-xl font-bold text-text-on-dark">
          The <span className="text-accent">Drone</span> Post
        </span>
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="text-text-on-dark p-2"
        >
          <X size={24} />
        </button>
      </div>

      {/* Links */}
      <div className="flex-1 flex flex-col justify-center px-8 gap-6">
        {/* Articles accordion */}
        <div>
          <button
            onClick={() => setArticlesOpen(!articlesOpen)}
            className="flex items-center gap-2 font-heading text-3xl font-bold text-text-on-dark hover:text-accent transition-colors w-full"
          >
            Articles
            <ChevronDown
              size={24}
              className={`transition-transform ${articlesOpen ? "rotate-180" : ""}`}
            />
          </button>
          {articlesOpen && (
            <div className="ml-4 mt-3 space-y-3 border-l border-white/10 pl-4">
              {ARTICLE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  onClick={onClose}
                  className="block font-heading text-lg text-white/70 hover:text-accent transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Direct links */}
        {MOBILE_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="font-heading text-3xl font-bold text-text-on-dark hover:text-accent transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="px-8 pb-10">
        <Link
          href="/newsletter"
          onClick={onClose}
          className="block w-full text-center bg-accent text-white font-heading font-semibold py-3 text-lg hover:bg-accent-hover transition-colors"
        >
          Subscribe
        </Link>
      </div>
    </div>
  );
}
