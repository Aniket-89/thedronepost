"use client";

import { useState } from "react";

export function NewsletterForm({
  dark = false,
  onBand = false,
}: {
  dark?: boolean;
  onBand?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className={`font-heading font-semibold ${onBand ? "text-white" : dark ? "text-white" : "text-text"}`}>
        You&apos;re in! Check your inbox to confirm.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-0 w-full">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={onBand ? "Enter your business email" : "Enter your email"}
        required
        className={`flex-1 p-4 outline-none focus:ring-0 ${
          onBand
            ? "bg-transparent border-2 border-white text-white placeholder:text-white/60 focus:border-white"
            : dark
            ? "bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50 focus:border-accent"
            : "bg-white border-2 border-border text-text placeholder:text-text-muted focus:border-accent"
        }`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={`px-8 py-4 font-bold uppercase tracking-widest transition-colors disabled:opacity-50 ${
          onBand
            ? "bg-[#0A0A0A] text-white hover:bg-[#1C1B1B]"
            : "bg-accent text-white hover:bg-accent-dark"
        }`}
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
