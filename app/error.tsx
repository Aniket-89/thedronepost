"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-8 text-center bg-bg py-16">
      <div className="max-w-md border border-border-subtle p-8 md:p-12 bg-white relative">
        {/* Decorative corner markers */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent" />
        
        <AlertTriangle className="w-12 h-12 text-accent mx-auto mb-6" strokeWidth={1.5} />
        
        <h2 className="text-3xl font-heading font-bold text-text mb-4">
          System Failure
        </h2>
        
        <p className="text-text-muted leading-relaxed mb-8">
          A critical error occurred while processing your request. Our telemetry data suggests the flight path ran into unexpected turbulence.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 bg-accent text-white font-bold uppercase tracking-widest text-sm py-4 px-6 hover:bg-accent-dark transition-colors w-full"
          >
            <RefreshCcw size={16} />
            Re-Initialize
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 border border-border-subtle text-text font-bold uppercase tracking-widest text-sm py-3 px-6 hover:border-accent hover:text-accent transition-all w-full"
          >
            <ArrowLeft size={16} />
            Return to Base
          </Link>
        </div>
      </div>
    </div>
  );
}
