import Link from "next/link";
import { Share2, Play } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] w-full px-8 py-16 border-t border-[#6B7280]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <span className="text-xl font-bold font-heading text-white block mb-6">
            The Drone Post
          </span>
          <p className="text-[#9CA3AF] text-sm leading-relaxed mb-8">
            The authoritative source for drone technology, industry news, and
            UAV resources in India. Bridging the gap between engineering and
            application.
          </p>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-bold font-heading uppercase tracking-wider mb-6">
            Resources
          </h4>
          <ul className="space-y-4">
            <li>
              <Link href="/tools" className="text-[#9CA3AF] hover:text-white transition-colors">
                UAV Tools
              </Link>
            </li>
            <li>
              <Link href="/articles?category=technical" className="text-[#9CA3AF] hover:text-white transition-colors">
                Technical Guides
              </Link>
            </li>
            <li>
              <Link href="/articles?category=guide" className="text-[#9CA3AF] hover:text-white transition-colors">
                India Regulations
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-bold font-heading uppercase tracking-wider mb-6">
            Company
          </h4>
          <ul className="space-y-4">
            <li>
              <Link href="/about" className="text-[#9CA3AF] hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-[#9CA3AF] hover:text-white transition-colors">
                Work With Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-[#9CA3AF] hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-[#9CA3AF] hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow */}
        <div>
          <h4 className="text-white font-bold font-heading uppercase tracking-wider mb-6">
            Follow
          </h4>
          <div className="flex gap-4 mb-8">
            <a
              href="https://linkedin.com/company/thedronepost"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-[#6B7280] flex items-center justify-center text-white hover:border-accent hover:text-accent transition-all"
              aria-label="LinkedIn"
            >
              <Share2 size={16} />
            </a>
            <a
              href="https://youtube.com/@thedronepost"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-[#6B7280] flex items-center justify-center text-white hover:border-accent hover:text-accent transition-all"
              aria-label="YouTube"
            >
              <Play size={16} />
            </a>
          </div>
          <p className="text-[10px] text-[#9CA3AF] leading-tight">
            © 2025 The Drone Post. India&apos;s Drone Media &amp; Resource
            Platform
          </p>
        </div>
      </div>
    </footer>
  );
}
