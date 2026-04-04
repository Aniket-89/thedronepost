"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, ChevronDown } from "lucide-react";
import { MobileNav } from "./MobileNav";
import { SearchModal } from "./SearchModal";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setShowNav(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);


  return (
    <>
      <nav 
        className={`sticky top-0 z-50 w-full bg-[#0A0A0A] border-b border-accent transition-transform duration-300 ease-in-out ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center max-w-[1920px] mx-auto px-8 py-4">
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

          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop Fake Search Input */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="hidden md:flex items-center gap-2 bg-bg border border-transparent hover:border-accent text-text-muted hover:text-text px-3 py-2 transition-colors w-48 lg:w-60 text-sm text-left shadow-sm"
            >
              <Search size={14} />
              <span className="flex-1">Search...</span>
              <kbd className="hidden lg:inline-block text-[10px] font-sans font-bold border border-border-subtle bg-surface px-1.5 py-0.5 text-text-muted rounded-sm">⌘K</kbd>
            </button>
            
            {/* Mobile Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="md:hidden text-white cursor-pointer hover:text-accent transition-colors"
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
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
