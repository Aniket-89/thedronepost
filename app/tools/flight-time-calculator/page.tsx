import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FlightTimeCalculator } from "@/components/tools/FlightTimeCalculator";
import { NewsletterInline } from "@/components/shared/NewsletterInline";

export const metadata: Metadata = {
  title: "Flight Time Calculator",
  description:
    "Estimate your drone's flight time based on battery specs, all-up weight, and average power draw. Free tool by The Drone Post.",
};

export default function FlightTimeCalculatorPage() {
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
          Flight Time Calculator
        </h1>
        <p className="text-text-muted mb-10">
          Estimate how long your drone can fly based on battery capacity, weight, and power draw. Adjust values to compare different setups.
        </p>
      </div>

      <FlightTimeCalculator />

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
            <strong className="text-text">Battery Energy (Wh)</strong> = Capacity (mAh) × Voltage (V) ÷ 1000. This is the total energy your battery stores.
          </p>
          <p>
            <strong className="text-text">Flight Time (min)</strong> = Battery Energy (Wh) ÷ Average Power Draw (W) × 60. We apply an 80% efficiency factor to account for real-world losses like voltage sag, wind resistance, and ESC heat.
          </p>
          <p>
            <strong className="text-text">Average Power Draw</strong> depends on your motors, propellers, all-up weight, and flight style. Hovering draws less than aggressive flying. Check your motor spec sheets for typical current draw at 50–75% throttle.
          </p>
        </div>
      </div>
    </section>
  );
}
