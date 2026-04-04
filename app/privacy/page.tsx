export const metadata = {
  title: "Privacy Policy | The Drone Post",
  description: "Privacy policy and data collection guidelines for The Drone Post.",
};

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto px-6 pt-32 pb-24">
      <h1 className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tighter text-text mb-4 text-center">
        Privacy Policy
      </h1>
      <p className="text-text-muted mb-12 text-center text-sm tracking-widest uppercase font-bold">
        Last Updated: April 2025
      </p>

      <div className="prose prose-lg prose-neutral max-w-none text-text">
        <p>
          At <strong>The Drone Post</strong>, we respect your privacy and are committed to protecting it
          through our compliance with this policy. This policy describes the types of information we may
          collect from you or that you may provide when you visit the website, and our practices for
          collecting, using, maintaining, protecting, and disclosing that information.
        </p>

        <h2 className="font-heading font-bold text-2xl uppercase tracking-tight mt-10 mb-4 text-text">
          1. Information We Collect
        </h2>
        <p>
          We automatically collect certain information when you visit, use, or navigate our platform. This
          information does not reveal your specific identity (like your name or contact information) but may
          include device and usage information, such as your IP address, browser and device characteristics,
          operating system, language preferences, referring URLs, device name, country, location, and
          information about how and when you use our services.
        </p>

        <h2 className="font-heading font-bold text-2xl uppercase tracking-tight mt-10 mb-4 text-text">
          2. Cookies & Telemetry
        </h2>
        <p>
          We use cookies and similar tracking technologies to access or store information. We maintain a strict
          opt-in telemetry policy via our Governance Banner. If you explicitely decline our privacy cookies, we
          will honor your browser session and exclusively use essential cookies required for the system to
          render.
        </p>

        <h2 className="font-heading font-bold text-2xl uppercase tracking-tight mt-10 mb-4 text-text">
          3. Embedded Third-Party Services
        </h2>
        <p>
          Some articles contain embedded content (e.g., YouTube videos, external images, Sanity CMS payloads).
          Embedded content from other websites behaves in the exact same way as if the visitor has visited the
          other website. These websites may collect data about you, use cookies, embed additional third-party
          tracking, and monitor your interaction with that embedded content.
        </p>

        <h2 className="font-heading font-bold text-2xl uppercase tracking-tight mt-10 mb-4 text-text">
          4. Contact Us
        </h2>
        <p>
          If you have questions or comments about this notice, you may email us at{" "}
          <a
            href="mailto:privacy@thedronepost.com"
            className="text-accent underline decoration-accent/30 underline-offset-4 font-bold"
          >
            privacy@thedronepost.com
          </a>{" "}
          or by post to our corporate mailing facilities.
        </p>
      </div>
    </div>
  );
}
