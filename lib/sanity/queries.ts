import { client, isSanityConfigured } from "./client";
import type { SanityArticle, SanitySiteSettings } from "./types";
import type { Article, SiteSettings } from "../types";
import {
  mockSettings,
  getFeaturedArticle as mockGetFeatured,
  getSecondaryArticles as mockGetSecondary,
  getLatestArticles as mockGetLatest,
  getTrendingArticles as mockGetTrending,
  getTechnicalArticles as mockGetTechnical,
  getCompanyArticles as mockGetCompany,
  getGuideArticles as mockGetGuides,
  mockArticles,
} from "../mock-data";

// ---------------------------------------------------------------------------
// GROQ Projections
// ---------------------------------------------------------------------------

/** Shared projection for article cards (no body) */
const ARTICLE_CARD_PROJECTION = `{
  _id,
  title,
  slug,
  category,
  tags,
  difficulty,
  "author": author->{name, "image": image.asset->url, role},
  publishedAt,
  "featuredImage": {
    "asset": {"url": featuredImage.asset->url},
    "alt": featuredImage.alt
  },
  excerpt,
  seoTitle,
  seoDescription,
  featured,
  trending,
  readingTime
}`;

/** Full article projection including body */
const ARTICLE_FULL_PROJECTION = `{
  _id,
  title,
  slug,
  category,
  tags,
  difficulty,
  "author": author->{name, "image": image.asset->url, role},
  publishedAt,
  "featuredImage": {
    "asset": {"url": featuredImage.asset->url},
    "alt": featuredImage.alt
  },
  excerpt,
  body,
  seoTitle,
  seoDescription,
  featured,
  trending,
  readingTime
}`;

// ---------------------------------------------------------------------------
// GROQ Queries
// ---------------------------------------------------------------------------

const FEATURED_ARTICLE_QUERY = `
  *[_type == "article" && featured == true] | order(publishedAt desc)[0]
  ${ARTICLE_CARD_PROJECTION}
`;

const SECONDARY_ARTICLES_QUERY = `
  *[_type == "article" && featured != true] | order(publishedAt desc)[0...$count]
  ${ARTICLE_CARD_PROJECTION}
`;

const LATEST_ARTICLES_QUERY = `
  *[_type == "article"] | order(publishedAt desc)[0...$count]
  ${ARTICLE_CARD_PROJECTION}
`;

const TRENDING_ARTICLES_QUERY = `
  *[_type == "article" && trending == true] | order(publishedAt desc)[0...$count]
  ${ARTICLE_CARD_PROJECTION}
`;

const TECHNICAL_ARTICLES_QUERY = `
  *[_type == "article" && category == "technical"] | order(publishedAt desc)[0...$count]
  ${ARTICLE_CARD_PROJECTION}
`;

const COMPANY_ARTICLES_QUERY = `
  *[_type == "article" && category == "company-story"] | order(publishedAt desc)[0...$count]
  ${ARTICLE_CARD_PROJECTION}
`;

const GUIDE_ARTICLES_QUERY = `{
  "beginner": *[_type == "article" && (category == "guide" || category == "technical") && difficulty == "Beginner"] | order(publishedAt desc)[0...3]
    ${ARTICLE_CARD_PROJECTION},
  "advanced": *[_type == "article" && (category == "guide" || category == "technical") && (difficulty == "Advanced" || difficulty == "Intermediate")] | order(publishedAt desc)[0...3]
    ${ARTICLE_CARD_PROJECTION}
}`;

const ARTICLE_BY_SLUG_QUERY = `
  *[_type == "article" && slug.current == $slug][0]
  ${ARTICLE_FULL_PROJECTION}
`;

const ARTICLES_BY_CATEGORY_QUERY = `
  *[_type == "article" && category == $category] | order(publishedAt desc)
  ${ARTICLE_CARD_PROJECTION}
`;

const ALL_ARTICLES_QUERY = `
  *[_type == "article"] | order(publishedAt desc)
  ${ARTICLE_CARD_PROJECTION}
`;

const ALL_ARTICLE_SLUGS_QUERY = `
  *[_type == "article" && defined(slug.current)].slug.current
`;

const RELATED_ARTICLES_QUERY = `
  *[_type == "article" && category == $category && _id != $excludeId] | order(publishedAt desc)[0...$count]
  ${ARTICLE_CARD_PROJECTION}
`;

const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0]{
    showBreakingTicker,
    breakingHeadlines,
    subscriberCount
  }
`;

// ---------------------------------------------------------------------------
// Safe fetch helper
// ---------------------------------------------------------------------------

async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!isSanityConfigured || !client) return null;
  try {
    const result = await client.fetch<T>(query, params);
    return result;
  } catch (error) {
    console.error("[Sanity] Query failed, falling back to mock data:", error);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Public data-fetching functions (used by pages)
// ---------------------------------------------------------------------------

export async function getFeaturedArticle(): Promise<Article | undefined> {
  const result = await sanityFetch<SanityArticle>(FEATURED_ARTICLE_QUERY);
  if (result) return result as Article;
  return mockGetFeatured();
}

export async function getSecondaryArticles(count = 3): Promise<Article[]> {
  const result = await sanityFetch<SanityArticle[]>(SECONDARY_ARTICLES_QUERY, { count });
  if (result?.length) return result as Article[];
  return mockGetSecondary(count);
}

export async function getLatestArticles(count = 6): Promise<Article[]> {
  const result = await sanityFetch<SanityArticle[]>(LATEST_ARTICLES_QUERY, { count });
  if (result?.length) return result as Article[];
  return mockGetLatest(count);
}

export async function getTrendingArticles(count = 4): Promise<Article[]> {
  const result = await sanityFetch<SanityArticle[]>(TRENDING_ARTICLES_QUERY, { count });
  if (result?.length) return result as Article[];
  return mockGetTrending(count);
}

export async function getTechnicalArticles(count = 4): Promise<Article[]> {
  const result = await sanityFetch<SanityArticle[]>(TECHNICAL_ARTICLES_QUERY, { count });
  if (result?.length) return result as Article[];
  return mockGetTechnical(count);
}

export async function getCompanyArticles(count = 2): Promise<Article[]> {
  const result = await sanityFetch<SanityArticle[]>(COMPANY_ARTICLES_QUERY, { count });
  if (result?.length) return result as Article[];
  return mockGetCompany(count);
}

export async function getGuideArticles(): Promise<{ beginner: Article[]; advanced: Article[] }> {
  const result = await sanityFetch<{ beginner: SanityArticle[]; advanced: SanityArticle[] }>(
    GUIDE_ARTICLES_QUERY,
  );
  if (result?.beginner?.length || result?.advanced?.length) {
    return result as { beginner: Article[]; advanced: Article[] };
  }
  return mockGetGuides();
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const result = await sanityFetch<SanityArticle>(ARTICLE_BY_SLUG_QUERY, { slug });
  if (result) return result as Article;
  // Fallback: search mock data
  const mock = mockArticles.find((a) => a.slug.current === slug);
  return mock ?? null;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const result = await sanityFetch<SanityArticle[]>(ARTICLES_BY_CATEGORY_QUERY, { category });
  if (result?.length) return result as Article[];
  return mockArticles.filter((a) => a.category === category);
}

export async function getAllArticles(): Promise<Article[]> {
  const result = await sanityFetch<SanityArticle[]>(ALL_ARTICLES_QUERY);
  if (result?.length) return result as Article[];
  return mockArticles;
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const result = await sanityFetch<string[]>(ALL_ARTICLE_SLUGS_QUERY);
  if (result?.length) return result;
  return mockArticles.map((a) => a.slug.current);
}

export async function getRelatedArticles(
  category: string,
  excludeId: string,
  count = 3,
): Promise<Article[]> {
  const result = await sanityFetch<SanityArticle[]>(RELATED_ARTICLES_QUERY, {
    category,
    excludeId,
    count,
  });
  if (result?.length) return result as Article[];
  return mockArticles
    .filter((a) => a.category === category && a._id !== excludeId)
    .slice(0, count);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const result = await sanityFetch<SanitySiteSettings>(SITE_SETTINGS_QUERY);
  if (result) return result;
  return mockSettings;
}
