import { Metadata } from "next";
import Link from "next/link";
import { Calculator, Map, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "UAV Tools",
  description:
    "Free professional drone tools — flight time calculator, GSD calculator, no-fly zone overlay, and more.",
};

const tools = [
  {
    title: "Flight Time Calculator",
    description:
      "Estimate battery life based on payload, motor efficiency, and wind resistance factors.",
    href: "/tools/flight-time-calculator",
    icon: Calculator,
    available: true,
  },
  {
    title: "No-Fly Zone Overlay",
    description:
      "Check real-time airspace restrictions and temporary flight bans across the subcontinent.",
    href: "/tools/no-fly-zone",
    icon: Map,
    available: false,
  },
  {
    title: "GSD Calculator",
    description:
      "Calculate Ground Sample Distance and overlap for high-precision photogrammetry missions.",
    href: "/tools/gsd-calculator",
    icon: BarChart3,
    available: true,
  },
];

export default function ToolsPage() {
  return (
    <section className="py-16 px-8 bg-bg">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-2">
            Professional UAV Tools
          </h1>
          <p className="text-text-muted">
            Free calculators and utilities for drone pilots and engineers.
          </p>
        </div>
        <div className="h-1 w-24 bg-accent hidden md:block" />
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((tool) => {
          const Icon = tool.icon;

          if (!tool.available) {
            return (
              <div
                key={tool.title}
                className="p-10 border border-border-subtle opacity-60"
              >
                <Icon size={48} className="text-text-muted mb-6" strokeWidth={1.5} />
                <h2 className="text-2xl font-bold font-heading mb-4">
                  {tool.title}
                </h2>
                <p className="text-text-muted mb-8">{tool.description}</p>
                <span className="block w-full py-4 border-2 border-border-subtle text-text-muted font-bold text-center">
                  Coming Soon
                </span>
              </div>
            );
          }

          return (
            <Link
              key={tool.title}
              href={tool.href}
              className="p-10 border border-border-subtle hover:border-accent transition-all group"
            >
              <Icon size={48} className="text-accent mb-6" strokeWidth={1.5} />
              <h2 className="text-2xl font-bold font-heading mb-4">
                {tool.title}
              </h2>
              <p className="text-text-muted mb-8">{tool.description}</p>
              <span className="block w-full py-4 border-2 border-accent text-accent font-bold text-center group-hover:bg-accent group-hover:text-white transition-all">
                Launch Tool
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
