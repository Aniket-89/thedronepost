"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already acknowledged cookies
    const storedConsent = localStorage.getItem("td_cookie_consent");
    if (!storedConsent) {
      // Small delay so it drops in gracefully after the page loads
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("td_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("td_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none flex justify-center sm:justify-start sm:bottom-4 sm:left-4">
      <div className="bg-[#0A0A0A] border border-border-subtle p-6 max-w-sm w-full shadow-2xl pointer-events-auto flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold font-heading">
            <Cookie size={18} className="text-accent" />
            Cookie Settings
          </div>
          <button
            onClick={declineCookies}
            className="text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        
        <p className="text-sm text-[#9CA3AF] leading-relaxed block">
          We use necessary cookies for site function, and analytics cookies to optimize your experience.
          <Link href="/privacy" className="text-white hover:text-accent ml-1 underline decoration-white/20 underline-offset-2">
            Read our policy.
          </Link>
        </p>
        
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={acceptCookies}
            className="flex-1 bg-accent text-white px-4 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-accent-dark transition-colors cursor-pointer"
          >
            Accept All
          </button>
          <button
            onClick={declineCookies}
            className="flex-1 bg-white/5 border border-white/10 text-white px-4 py-2.5 text-xs font-bold tracking-widest uppercase hover:border-white/30 transition-colors cursor-pointer"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
