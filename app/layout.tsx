import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "The Drone Post | India's Drone Media & Resource Platform",
    template: "%s | The Drone Post",
  },
  description:
    "India's leading drone media platform. News, technical guides, tools, and resources for drone enthusiasts and the drone industry.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://thedronepost.in"
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "The Drone Post",
  },
  twitter: {
    card: "summary_large_image",
  },
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth antialiased`}
    >
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-2JPLLBHEKY"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2JPLLBHEKY');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#fcf8f8] text-[#1c1b1b] font-body">
        <Navbar />
        <main className="flex-1 max-w-[1440px] mx-auto w-full">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
