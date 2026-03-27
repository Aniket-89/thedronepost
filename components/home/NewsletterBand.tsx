import { NewsletterForm } from "@/components/shared/NewsletterForm";

export function NewsletterBand() {
  return (
    <section className="bg-accent py-20 px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold font-heading text-white mb-4">
            Stay Ahead of the Drone Industry
          </h2>
          <p className="text-white/80">
            Weekly intelligence on defense contracts, technical breakthroughs,
            and regulatory shifts in India.
          </p>
        </div>
        <div className="md:w-1/2 w-full">
          <NewsletterForm onBand />
        </div>
      </div>
    </section>
  );
}
