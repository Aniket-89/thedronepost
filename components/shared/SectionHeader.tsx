export function SectionHeader({
  title,
  href,
  dark = false,
}: {
  title: string;
  href?: string;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2
        className={`font-heading text-2xl md:text-3xl font-bold ${
          dark ? "text-text-on-dark" : "text-text"
        }`}
      >
        {title}
      </h2>
      {href && (
        <a
          href={href}
          className="text-accent hover:text-accent-hover text-sm font-semibold transition-colors"
        >
          View All →
        </a>
      )}
    </div>
  );
}
