import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, Target, Zap } from "lucide-react";
import { NewsletterForm } from "@/components/shared/NewsletterForm";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Drone Post is India's dedicated drone media and resource platform — covering news, technical deep dives, tools, and company stories for the Indian drone ecosystem.",
};

const stats = [
  { value: "3,000+", label: "LinkedIn Followers" },
  { value: "15K+", label: "Monthly Impressions" },
  { value: "30+", label: "Published Stories" },
  { value: "6", label: "Categories Covered" },
];

const pillars = [
  {
    icon: Target,
    title: "Industry News & Analysis",
    description:
      "Breaking news, policy updates, and market analysis covering India's drone regulations, defense contracts, and commercial deployments.",
  },
  {
    icon: Zap,
    title: "Technical Deep Dives",
    description:
      "From flight controller firmware to LiPo chemistry — rigorous technical content for builders, engineers, and operators.",
  },
  {
    icon: Users,
    title: "Company Stories",
    description:
      "Profiles of India's drone startups and enterprises — how they started, what they're building, and where the industry is headed.",
  },
];

export default function AboutPage() {
  return (
    <section className="bg-bg">
      {/* Hero */}
      <div className="py-16 px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
            About Us
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-6 leading-tight">
            India&apos;s Drone Media &<br />
            Resource Platform
          </h1>
          <p className="text-lg text-text-muted leading-relaxed mb-4">
            The Drone Post was founded with a simple mission: give India&apos;s
            rapidly growing drone ecosystem the dedicated media platform it
            deserves. We cover the full spectrum — from hobbyist builds to
            defense contracts, from DGCA regulations to photogrammetry
            workflows.
          </p>
          <p className="text-lg text-text-muted leading-relaxed">
            We serve two audiences: <strong className="text-text">drone enthusiasts</strong> who
            want technical depth and honest reviews, and{" "}
            <strong className="text-text">drone companies</strong> who need credible media
            coverage and industry visibility.
          </p>
          <div className="h-1 w-24 bg-accent mt-8" />
        </div>
      </div>

      {/* Stats */}
      <div className="px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-border-subtle py-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold font-heading text-accent">
                {stat.value}
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-text-muted mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* What We Cover */}
      <div className="px-8 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8">
          What We Cover
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="border border-border-subtle p-8"
              >
                <Icon size={32} className="text-accent mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-bold font-heading mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why We Exist */}
      <div className="px-8 pb-16">
        <div className="border-l-2 border-accent pl-8 max-w-3xl">
          <h2 className="text-2xl font-bold font-heading mb-4">
            Why We Exist
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            India&apos;s drone market is projected to reach $1.8 billion by 2026.
            Hundreds of startups are building drones for agriculture, defense,
            logistics, and infrastructure. Yet there&apos;s no dedicated media
            platform covering this ecosystem with the depth and credibility it
            needs.
          </p>
          <p className="text-text-muted leading-relaxed">
            General tech publications cover drones as an afterthought. We cover
            drones as our only thought. That focus lets us go deeper — into the
            regulations, the engineering, and the business models that matter to
            people who actually build and operate these systems.
          </p>
        </div>
      </div>

      {/* Newsletter + CTA — combined dark bottom section */}
      <div className="">
        {/* Newsletter band */}
        <div className="bg-accent px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold font-heading text-white mb-2">
              Follow the Indian Drone Story
            </h3>
            <p className="text-sm text-white/80 mb-6">
              Subscribe for weekly coverage of India&apos;s drone ecosystem — policy, technology, and the companies shaping it.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm onBand />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-heading text-text mb-4">
              Want to Work With Us?
            </h2>
            <p className="text-text-muted mb-8">
              We partner with drone companies for media coverage, sponsored
              content, and consultancy engagements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 border-2 border-accent text-accent px-8 py-4 font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all"
              >
                Our Services
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-border-subtle text-text px-8 py-4 font-bold uppercase tracking-widest hover:border-text transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
