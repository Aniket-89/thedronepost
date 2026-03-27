import Link from "next/link";
import { Megaphone, Lightbulb, PenTool, Code } from "lucide-react";

const services = [
  { title: "Media Partnerships", icon: Megaphone },
  { title: "Consultancy", icon: Lightbulb },
  { title: "CAD Design", icon: PenTool },
  { title: "Custom Software", icon: Code },
];

export function ServicesStrip() {
  return (
    <section className="py-24 px-8 bg-bg border-t border-border-subtle">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold font-heading mb-4">Work With Us</h2>
        <div className="h-1 w-16 bg-accent mx-auto" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.title} className="text-center">
              <Icon
                size={36}
                className="text-accent mx-auto mb-4"
                strokeWidth={1.5}
              />
              <h4 className="font-bold font-heading">{service.title}</h4>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <Link
          href="/services"
          className="inline-block border-2 border-accent text-accent px-10 py-4 font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all"
        >
          Get In Touch
        </Link>
      </div>
    </section>
  );
}
