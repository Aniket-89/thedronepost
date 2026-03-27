import Link from "next/link";
import { Calculator, Map, BarChart3 } from "lucide-react";

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

export function UAVTools() {
  return (
    <section className="py-24 px-8 bg-bg">
      <h2 className="text-3xl font-bold font-heading mb-12">
        Professional UAV Tools
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const Wrapper = tool.available ? Link : "div";
          return (
            <Wrapper
              key={tool.title}
              href={tool.available ? tool.href : ""}
              className="p-10 border border-border-subtle hover:border-accent transition-all group"
            >
              <Icon
                size={48}
                className="text-accent mb-6"
                strokeWidth={1.5}
              />
              <h3 className="text-2xl font-bold font-heading mb-4">
                {tool.title}
              </h3>
              <p className="text-text-muted mb-8">{tool.description}</p>
              <span className="block w-full py-4 border-2 border-accent text-accent font-bold text-center group-hover:bg-accent group-hover:text-white transition-all">
                {tool.available ? "Launch Tool" : "Coming Soon"}
              </span>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}
