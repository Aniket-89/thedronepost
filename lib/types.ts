export type Article = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  tags?: string[];
  difficulty?: string;
  author: {
    name: string;
    image?: string;
    role?: string;
  };
  publishedAt: string;
  featuredImage?: {
    asset: { url: string };
    alt?: string;
  };
  excerpt?: string;
  body?: unknown[];
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
  trending?: boolean;
  readingTime?: number;
};

export type Author = {
  _id: string;
  name: string;
  slug: { current: string };
  image?: string;
  bio?: string;
  role?: string;
};

export type SiteSettings = {
  showBreakingTicker: boolean;
  breakingHeadlines: string[];
  subscriberCount: number;
};
