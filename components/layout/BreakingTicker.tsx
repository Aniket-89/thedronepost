export function BreakingTicker({ headlines }: { headlines: string[] }) {
  if (!headlines.length) return null;

  // Duplicate for seamless loop
  const doubled = [...headlines, ...headlines];

  return (
    <div className="bg-surface-dim border-b border-white/10 overflow-hidden mt-16">
      <div className="flex items-center">
        <span className="shrink-0 bg-accent text-white text-xs font-heading font-semibold px-3 py-1.5 uppercase tracking-wide">
          Breaking
        </span>
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker flex whitespace-nowrap">
            {doubled.map((headline, i) => (
              <span
                key={i}
                className="text-accent text-sm px-8 inline-block"
              >
                {headline}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
