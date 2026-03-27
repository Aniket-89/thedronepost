import { NewsletterForm } from "./NewsletterForm";

export function NewsletterInline({
  heading = "Stay Ahead of the Drone Industry",
  description = "Weekly intelligence on defense contracts, technical breakthroughs, and regulatory shifts — delivered every Thursday.",
  variant = "light",
}: {
  heading?: string;
  description?: string;
  variant?: "light" | "dark" | "accent";
}) {
  const styles = {
    light: {
      wrapper: "bg-surface border border-border-subtle",
      heading: "text-text",
      description: "text-text-muted",
      formDark: false,
      formBand: false,
    },
    dark: {
      wrapper: "bg-bg-dark",
      heading: "text-white",
      description: "text-text-on-dark-muted",
      formDark: true,
      formBand: false,
    },
    accent: {
      wrapper: "bg-accent",
      heading: "text-white",
      description: "text-white/80",
      formDark: false,
      formBand: true,
    },
  }[variant];

  return (
    <div className={`${styles.wrapper} px-8 py-10`}>
      <div className="max-w-2xl mx-auto text-center">
        <h3 className={`text-xl font-bold font-heading mb-2 ${styles.heading}`}>
          {heading}
        </h3>
        <p className={`text-sm mb-6 ${styles.description}`}>{description}</p>
        <div className="max-w-md mx-auto">
          <NewsletterForm dark={styles.formDark} onBand={styles.formBand} />
        </div>
      </div>
    </div>
  );
}
