import { Metadata } from "next";
import { Megaphone, Lightbulb, PenTool, Code, ArrowRight, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Work with The Drone Post — media partnerships, consultancy, CAD design, and custom software for drone companies and startups.",
};

const services = [
  {
    title: "Media Partnerships",
    description:
      "Brand stories, sponsored content, and media coverage that reaches India's drone community. From launch coverage to thought leadership pieces, we help drone companies tell their story to the right audience.",
    details: [
      "Sponsored articles and brand features",
      "Product launch coverage",
      "LinkedIn cross-promotion to 3,000+ followers",
      "Newsletter placements",
    ],
    icon: Megaphone,
  },
  {
    title: "Consultancy",
    description:
      "Strategic guidance for drone startups and enterprises navigating India's regulatory landscape, go-to-market strategy, and technical decisions.",
    details: [
      "DGCA compliance and certification guidance",
      "Go-to-market strategy for drone startups",
      "Technical architecture reviews",
      "Investor pitch support",
    ],
    icon: Lightbulb,
  },
  {
    title: "CAD Design",
    description:
      "Professional drone frame and component design for custom builds, prototypes, and production-ready airframes. From concept to manufacturable CAD files.",
    details: [
      "Custom drone frame design",
      "Component mounting solutions",
      "3D printable prototypes",
      "Production-ready manufacturing files",
    ],
    icon: PenTool,
  },
  {
    title: "Custom Software",
    description:
      "Ground control stations, flight planning tools, fleet management dashboards, and drone data processing pipelines built to your specifications.",
    details: [
      "Ground Control Station (GCS) development",
      "Mission planning & flight automation",
      "Fleet management dashboards",
      "Drone data processing pipelines",
    ],
    icon: Code,
  },
];

export default function ServicesPage() {
  return (
    <section className="bg-bg">
      {/* Hero */}
      <div className="py-16 px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-4">
            Work With Us
          </h1>
          <p className="text-lg text-text-muted leading-relaxed">
            The Drone Post partners with drone companies, startups, and
            enterprises across India. Whether you need media coverage, technical
            consultancy, or custom engineering — we bring deep domain expertise
            to every engagement.
          </p>
          <div className="h-1 w-24 bg-accent mt-6" />
        </div>
      </div>

      {/* Services */}
      <div className="px-8 pb-16 space-y-8">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="border border-border-subtle p-8 md:p-12 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Icon size={32} className="text-accent" strokeWidth={1.5} />
                  <h2 className="text-2xl font-bold font-heading">
                    {service.title}
                  </h2>
                </div>
                <p className="text-text-muted leading-relaxed mb-6">
                  {service.description}
                </p>
                <a
                  href={`mailto:hello@thedronepost.in?subject=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-wider hover:gap-4 transition-all"
                >
                  Enquire About {service.title}
                  <ArrowRight size={14} />
                </a>
              </div>
              <div className="border-l border-border-subtle pl-8 hidden md:block">
                <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
                  What&apos;s Included
                </p>
                <ul className="space-y-3">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="text-sm text-text flex items-start gap-2"
                    >
                      <span className="w-1 h-1 bg-accent mt-2 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Band */}
      <div className="bg-bg-dark px-8 py-16 my-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-heading text-white mb-4">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-text-on-dark-muted mb-8">
            Tell us about your project and we&apos;ll get back to you within 24 hours
            with a tailored proposal.
          </p>
          <a
            href="mailto:hello@thedronepost.in"
            className="inline-flex items-center gap-3 border-2 border-accent text-accent px-10 py-4 font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all"
          >
            <Mail size={18} />
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
