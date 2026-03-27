import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestStories } from "@/components/home/LatestStories";
import { TrendingSection } from "@/components/home/TrendingSection";
import { TechnicalDives } from "@/components/home/TechnicalDives";
import { CompanySpotlight } from "@/components/home/CompanySpotlight";
import { DirectoryTeaser } from "@/components/home/DirectoryTeaser";
import { UAVTools } from "@/components/home/UAVTools";
import { NewsletterBand } from "@/components/home/NewsletterBand";
import { ServicesStrip } from "@/components/home/ServicesStrip";
import {
  mockSettings,
  getFeaturedArticle,
  getSecondaryArticles,
  getLatestArticles,
  getTrendingArticles,
  getTechnicalArticles,
  getCompanyArticles,
} from "@/lib/mock-data";

export default function Home() {
  const featured = getFeaturedArticle();
  const secondary = getSecondaryArticles(3);
  const latest = getLatestArticles(6);
  const trending = getTrendingArticles(4);
  const technical = getTechnicalArticles(4);
  const companies = getCompanyArticles(2);

  return (
    <>
      {/* Breaking News Ticker */}
      {mockSettings.showBreakingTicker && (
        <BreakingTicker headlines={mockSettings.breakingHeadlines} />
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

      {/* India Drone Directory Teaser */}
      <DirectoryTeaser />

      {/* UAV Tools */}
      <UAVTools />

      {/* Newsletter Band */}
      <NewsletterBand />

      {/* Services Strip */}
      <ServicesStrip />
    </>
  );
}
