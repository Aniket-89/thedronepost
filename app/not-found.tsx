import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-8 text-center bg-bg py-16">
      <div className="max-w-md border border-border-subtle p-8 md:p-12 bg-white relative">
        {/* Decorative corner markers */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-text-muted" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-text-muted" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-text-muted" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-text-muted" />
        
        <div className="relative w-16 h-16 mx-auto mb-6 text-text-muted opacity-80">
          <Compass className="w-16 h-16 animate-[spin_5s_linear_infinite]" strokeWidth={1} />
        </div>
        
        <h2 className="text-4xl font-heading font-bold text-text mb-2">
          404 Target Lost
        </h2>
        <div className="h-1 w-12 bg-accent mx-auto mb-6" />
        
        <p className="text-text-muted leading-relaxed mb-8">
          The coordinates you entered don&apos;t match any known sectors. The payload might have been moved or the flight path was deleted.
        </p>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 bg-accent text-white font-bold uppercase tracking-widest text-sm py-4 px-6 hover:bg-accent-dark transition-colors w-full shadow-sm"
        >
          <ArrowLeft size={16} />
          Return to Base
        </Link>
      </div>
    </div>
  );
}
