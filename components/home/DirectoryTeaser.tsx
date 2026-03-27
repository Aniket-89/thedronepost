import { Search } from "lucide-react";

const categories = [
  "Manufacturers",
  "Training Schools (RPTO)",
  "Service Providers",
  "Component Suppliers",
];

export function DirectoryTeaser() {
  return (
    <section className="py-24 px-8 bg-[#0A0A0A] text-center">
      <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
        Discover India&apos;s Drone Ecosystem
      </h2>
      <p className="text-[#9CA3AF] max-w-2xl mx-auto mb-12">
        Browse over 450+ verified manufacturers, service providers, and pilot
        training organizations across India.
      </p>

      {/* Search */}
      <div className="max-w-3xl mx-auto relative mb-12">
        <input
          type="text"
          placeholder="Search manufacturers, cities, or tools..."
          className="w-full bg-white/5 border-none text-white p-6 pl-14 text-lg focus:ring-2 focus:ring-accent outline-none"
          disabled
        />
        <Search
          size={20}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
        />
      </div>

      {/* Category buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((cat) => (
          <span
            key={cat}
            className="border border-[#9CA3AF] text-white px-6 py-2 hover:border-accent hover:text-accent transition-colors cursor-pointer"
          >
            {cat}
          </span>
        ))}
      </div>

      <button className="bg-accent text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-accent-dark transition-colors">
        List Your Company
      </button>
    </section>
  );
}
