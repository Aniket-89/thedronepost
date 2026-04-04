import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestStories } from "@/components/home/LatestStories";
import { TrendingSection } from "@/components/home/TrendingSection";
import { TechnicalDives } from "@/components/home/TechnicalDives";
import { CompanySpotlight } from "@/components/home/CompanySpotlight";
import { UAVTools } from "@/components/home/UAVTools";
import { NewsletterBand } from "@/components/home/NewsletterBand";
import { ServicesStrip } from "@/components/home/ServicesStrip";
import {
  getSiteSettings,
  getFeaturedArticle,
  getSecondaryArticles,
  getLatestArticles,
  getTrendingArticles,
  getTechnicalArticles,
  getCompanyArticles,
} from "@/lib/sanity";

/** Revalidate homepage every 60 seconds (ISR) */
export const revalidate = 60;

export default async function Home() {
  const [settings, featured, secondary, latest, trending, technical, companies] =
    await Promise.all([
      getSiteSettings(),
      getFeaturedArticle(),
      getSecondaryArticles(3),
      getLatestArticles(6),
      getTrendingArticles(4),
      getTechnicalArticles(4),
      getCompanyArticles(2),
    ]);

  return (
    <>
      {/* Breaking News Ticker */}
      {settings.showBreakingTicker && (
        <BreakingTicker headlines={settings.breakingHeadlines} />
      )}

      {/* Hero: Featured + Secondary Articles */}
      {featured && <HeroSection featured={featured} secondary={secondary} />}

      {/* Latest Stories Grid */}
      <LatestStories articles={latest} />

      {/* Trending This Week */}
      <TrendingSection articles={trending} />

      {/* Technical Deep Dives */}
      <TechnicalDives articles={technical} />

      {/* Company Spotlight */}
      <CompanySpotlight articles={companies} />

      {/* UAV Tools */}
      <UAVTools />

      {/* Newsletter Band */}
      <NewsletterBand />

      {/* Services Strip */}
      <ServicesStrip />
    </>
  );
}
