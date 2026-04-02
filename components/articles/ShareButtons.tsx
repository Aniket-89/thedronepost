"use client";

import { Link2 } from "lucide-react";
import { useState } from "react";

export function ShareButtons({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const links = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
        Share
      </span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 border border-border-subtle flex items-center justify-center text-text-muted hover:border-accent hover:text-accent transition-all text-xs font-bold"
          aria-label={`Share on ${link.label}`}
        >
          {link.label.charAt(0)}
        </a>
      ))}
      <button
        onClick={copyLink}
        className="w-9 h-9 border border-border-subtle flex items-center justify-center text-text-muted hover:border-accent hover:text-accent transition-all"
        aria-label="Copy link"
      >
        {copied ? "✓" : <Link2 size={14} />}
      </button>
    </div>
  );
}
