import type { PortableTextBlock } from "next-sanity";

/** Shape returned by GROQ article projections */
export type SanityArticle = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  tags?: string[];
  difficulty?: string;
  author: {
    name: string;
    image?: SanityImageRef;
    role?: string;
  };
  publishedAt: string;
  featuredImage?: SanityImageRef & { alt?: string };
  excerpt?: string;
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
  trending?: boolean;
  readingTime?: number;
};

/** Sanity image reference with resolved asset URL */
export type SanityImageRef = {
  _type?: "image";
  asset: {
    _ref?: string;
    url: string;
  };
};

export type SanitySiteSettings = {
  showBreakingTicker: boolean;
  breakingHeadlines: string[];
  subscriberCount: number;
};
