import { Metadata } from "next";
import { Mail, Share2, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The Drone Post — press inquiries, advertising, partnerships, news tips, and general questions.",
};

const reasons = [
  {
    title: "Media & Advertising",
    description: "Sponsored content, brand features, newsletter placements, and media partnerships.",
    email: "hello@thedronepost.in",
    subject: "Media Partnership Inquiry",
  },
  {
    title: "News Tips & Press",
    description: "Have a story, product launch, or news tip? We'd love to hear from you.",
    email: "hello@thedronepost.in",
    subject: "News Tip",
  },
  {
    title: "Services & Consultancy",
    description: "CAD design, custom software, and strategic consultancy for drone companies.",
    email: "hello@thedronepost.in",
    subject: "Services Inquiry",
  },
  {
    title: "General Questions",
    description: "Feedback, corrections, collaboration ideas, or just want to say hello.",
    email: "hello@thedronepost.in",
    subject: "General Inquiry",
  },
];

export default function ContactPage() {
  return (
    <section className="bg-bg">
      {/* Hero */}
      <div className="py-16 px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-text-muted leading-relaxed">
            Whether you have a story tip, want to advertise, or need our
            services — we&apos;d love to hear from you.
          </p>
          <div className="h-1 w-24 bg-accent mt-6" />
        </div>
      </div>

      {/* Contact Cards */}
      <div className="px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason) => (
            <a
              key={reason.title}
              href={`mailto:${reason.email}?subject=${encodeURIComponent(reason.subject)}`}
              className="border border-border-subtle p-8 group hover:border-accent transition-colors"
            >
              <h2 className="text-xl font-bold font-heading mb-2 group-hover:text-accent transition-colors">
                {reason.title}
              </h2>
              <p className="text-sm text-text-muted mb-6 leading-relaxed">
                {reason.description}
              </p>
              <span className="inline-flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-wider group-hover:gap-4 transition-all">
                Send Email
                <ArrowRight size={14} />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Direct Info */}
      <div className="px-8 pb-16">
        <div className="border-t border-border-subtle pt-10">
          <h2 className="text-xl font-bold font-heading mb-6">
            Other Ways to Reach Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-start gap-3">
              <Mail size={18} className="text-accent mt-1 shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">
                  Email
                </p>
                <a
                  href="mailto:hello@thedronepost.in"
                  className="text-sm font-bold hover:text-accent transition-colors"
                >
                  hello@thedronepost.in
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Share2 size={18} className="text-accent mt-1 shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">
                  LinkedIn
                </p>
                <p className="text-sm font-bold">
                  The Drone Post
                </p>
                <p className="text-xs text-text-muted">3,000+ followers</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-accent mt-1 shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">
                  Location
                </p>
                <p className="text-sm font-bold">India</p>
                <p className="text-xs text-text-muted">Remote-first team</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services CTA */}
      <div className="bg-bg-dark px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-heading text-white mb-4">
            Looking for Our Services?
          </h2>
          <p className="text-text-on-dark-muted mb-8">
            Media partnerships, consultancy, CAD design, and custom software for
            drone companies.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border-2 border-accent text-accent px-10 py-4 font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all"
          >
            View Services
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
