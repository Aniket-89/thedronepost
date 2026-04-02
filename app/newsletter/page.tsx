import { Metadata } from "next";
import { Mail, Shield, Zap, TrendingUp } from "lucide-react";
import { NewsletterForm } from "@/components/shared/NewsletterForm";

export const metadata: Metadata = {
  title: "Subscribe to The Drone Post",
  description: "Join thousands of drone professionals receiving weekly intelligence on regulations, technical advancements, and Indian defense updates.",
};

const BENEFITS = [
  {
    icon: Shield,
    title: "Defense & Policy",
    description: "Navigate DGCA regulations and defense acquisitions.",
  },
  {
    icon: Zap,
    title: "Technical Deep Dives",
    description: "UAV engineering, avionics, and payload integrations.",
  },
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    description: "Startup funding rounds and industry shifts.",
  },
];

export default function NewsletterPage() {
  return (
    <section className="bg-bg min-h-[80vh] flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto w-full">
        {/* Left: Pitch Pitch */}
        <div className="px-8 py-16 lg:py-24 lg:pr-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border-subtle">
          <div className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mb-6">
            <Mail size={16} />
            The Dispatch
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 text-text leading-tight tracking-tight">
            Signal.<br />Not Noise.
          </h1>
          <p className="text-lg text-text-muted leading-relaxed mb-10 max-w-md">
            Join operators, founders, and drone enthusiasts receiving our weekly brief. We filter out the hype and directly deliver the engineering, business, and policy updates that matter in India.
          </p>

          <div className="space-y-6 max-w-md">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex gap-4">
                  <div className="w-10 h-10 bg-surface border border-border-subtle shrink-0 flex items-center justify-center text-text">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-text mb-1 font-heading tracking-wide uppercase text-sm">{benefit.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-surface px-8 py-16 lg:py-24 flex items-center justify-center relative overflow-hidden">
          {/* Decorative Corner Accents */}
          <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-accent" />
          <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-accent" />

          <div className="w-full max-w-lg relative z-10">
            <div className="bg-white border border-border-subtle p-8 md:p-12 shadow-sm">
              <h2 className="text-3xl font-bold font-heading mb-2 text-text">
                Subscribe for Free
              </h2>
              <p className="text-sm text-text-muted mb-8 pb-8 border-b border-border-subtle">
                By entering your email, you agree to receive weekly updates. Unsubscribe at any time. We will never share your telemetry data.
              </p>
              
              <NewsletterForm dark={false} onBand={false} />
            </div>
          </div>
          
          {/* Faint crosshair bg logic */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
               style={{ backgroundImage: 'radial-gradient(circle at center, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          </div>
        </div>
      </div>
    </section>
  );
}
