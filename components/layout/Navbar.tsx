"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, ChevronDown } from "lucide-react";
import { MobileNav } from "./MobileNav";

const ARTICLE_CATEGORIES = [
  { label: "All Articles", href: "/articles" },
  { label: "News", href: "/articles?category=news" },
  { label: "Guides", href: "/articles?category=guide" },
  { label: "Technical", href: "/articles?category=technical" },
  { label: "Company Stories", href: "/articles?category=company-story" },
  { label: "Defense", href: "/articles?category=defense" },
];

const NAV_ITEMS = [
  { label: "Tools", href: "/tools" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[#0A0A0A] border-b border-accent">
        <div className="flex justify-between items-center px-8 py-4">
          {/* Left: Logo + Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="shrink-0">
              <span className="text-2xl font-bold font-heading text-white">
                The Drone Post
              </span>
            </Link>
            <div className="hidden md:flex gap-6 items-center">
              {/* Articles Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 text-white font-medium hover:text-accent transition-colors"
                >
                  Articles
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-3 bg-[#0A0A0A] border border-white/10 min-w-[200px] py-2">
                    {ARTICLE_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.label}
                        href={cat.href}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-5 py-2.5 text-sm text-white/80 hover:text-accent hover:bg-white/5 transition-colors"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct links */}
              {NAV_ITEMS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white font-medium hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <button
              aria-label="Search"
              className="text-white cursor-pointer hover:text-accent transition-colors"
            >
              <Search size={20} />
            </button>
            <Link
              href="/newsletter"
              className="hidden sm:inline-flex bg-accent text-white px-6 py-2 font-bold hover:bg-accent-dark transition-all duration-200 active:scale-95"
            >
              Subscribe
            </Link>
            <button
              aria-label="Open menu"
              className="md:hidden text-white p-2"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
