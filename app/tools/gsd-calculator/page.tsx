import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GSDCalculator } from "@/components/tools/GSDCalculator";
import { NewsletterInline } from "@/components/shared/NewsletterInline";

export const metadata: Metadata = {
  title: "GSD Calculator",
  description:
    "Calculate Ground Sample Distance for drone photogrammetry missions. Input sensor specs, focal length, and altitude to get GSD and coverage area.",
};

export default function GSDCalculatorPage() {
  return (
    <section className="py-16 px-8 bg-bg">
      {/* Back */}
      <Link
        href="/tools"
        className="inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-accent transition-colors uppercase tracking-wider mb-8"
      >
        <ArrowLeft size={14} />
        All Tools
      </Link>

      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight mb-2">
          GSD Calculator
        </h1>
        <p className="text-text-muted mb-10">
          Calculate Ground Sample Distance and coverage area for drone mapping and photogrammetry missions.
        </p>
      </div>

      <GSDCalculator />

      {/* Newsletter */}
      <div className="mt-12">
        <NewsletterInline
          heading="Get More Drone Tools & Guides"
          description="We're building new calculators and utilities every month. Subscribe to get notified."
          variant="light"
        />
      </div>

      {/* How it works */}
      <div className="max-w-3xl mt-16 border-t border-border-subtle pt-10">
        <h2 className="text-xl font-bold font-heading mb-4">How It Works</h2>
        <div className="space-y-4 text-sm text-text-muted leading-relaxed">
          <p>
            <strong className="text-text">Ground Sample Distance (GSD)</strong> is
            the distance between two consecutive pixel centers measured on the
            ground. Lower GSD means higher resolution imagery.
          </p>
          <p>
            <strong className="text-text">Formula</strong>: GSD = (Sensor Width ×
            Flight Altitude × 100) ÷ (Focal Length × Image Width). The result is
            in cm/pixel.
          </p>
          <p>
            <strong className="text-text">Coverage Area</strong> is calculated from
            the GSD and image dimensions: Width Coverage = GSD × Image Width,
            Height Coverage = GSD × Image Height.
          </p>
          <p>
            <strong className="text-text">Overlap</strong> reduces unique coverage
            per image. Standard mapping uses 75% frontal and 65% side overlap.
            Higher overlap improves 3D reconstruction quality.
          </p>
        </div>
      </div>
    </section>
  );
}
