import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { mockArticles } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { CATEGORY_LABELS, CATEGORY_TEXT_COLORS } from "@/lib/constants";
import { ShareButtons } from "@/components/articles/ShareButtons";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { NewsletterInline } from "@/components/shared/NewsletterInline";

function getArticleBySlug(slug: string) {
  return mockArticles.find((a) => a.slug.current === slug);
}

function getRelatedArticles(article: { _id: string; category: string }, count = 3) {
  return mockArticles
    .filter((a) => a.category === article.category && a._id !== article._id)
    .slice(0, count);
}

// Mock body paragraphs — replaced by Sanity Portable Text once CMS is connected
const MOCK_BODY = [
  "The Indian drone industry is experiencing unprecedented growth, driven by supportive government policies, increasing enterprise adoption, and a thriving startup ecosystem. This development marks a significant milestone in the country's journey toward becoming a global leader in unmanned aerial systems.",
  "Industry experts predict that India's drone market will reach $1.8 billion by 2026, with applications spanning agriculture, defense, logistics, and urban infrastructure. The government's Production Linked Incentive (PLI) scheme has been instrumental in attracting both domestic and international investment.",
  "Key stakeholders across the value chain — from component manufacturers to software developers and service providers — are positioning themselves to capitalize on this growing opportunity. The convergence of regulatory clarity, technological advancement, and market demand is creating a fertile environment for innovation.",
  "The implications extend beyond commercial applications. Drone technology is being leveraged for disaster response, environmental monitoring, and infrastructure inspection, demonstrating the versatility and social impact of unmanned systems in the Indian context.",
  "As the ecosystem matures, collaboration between industry, academia, and government agencies will be crucial. Training programs, research initiatives, and standardization efforts are laying the groundwork for sustainable growth in this transformative sector.",
];

export async function generateStaticParams() {
  return mockArticles.map((article) => ({
    slug: article.slug.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: article.featuredImage
        ? [{ url: article.featuredImage.asset.url, alt: article.featuredImage.alt || article.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article);
  const categoryColor = CATEGORY_TEXT_COLORS[article.category] || "text-accent";
  const articleUrl = `https://thedronepost.in/articles/${slug}`;

  // Structured data for SEO — built from our own mock data, safe to serialize
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage?.asset.url,
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "The Drone Post",
    },
  });

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{jsonLd}</script>

      <article className="bg-bg">
        {/* Back Navigation */}
        <div className="px-8 pt-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-accent transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            All Articles
          </Link>
        </div>

        {/* Featured Image — full width */}
        {article.featuredImage && (
          <div className="mt-6 px-8">
            <div className="aspect-[21/9] relative overflow-hidden">
              <Image
                src={article.featuredImage.asset.url}
                alt={article.featuredImage.alt || article.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Article Content — centered narrow column */}
        <div className="max-w-[720px] mx-auto px-8 py-12">
          {/* Category + Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className={`text-xs font-bold uppercase tracking-widest ${categoryColor}`}>
              {CATEGORY_LABELS[article.category] || article.category}
            </span>
            <span className="w-px h-4 bg-border-subtle" />
            <span className="text-xs text-text-muted flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(article.publishedAt)}
            </span>
            <span className="text-xs text-text-muted flex items-center gap-1">
              <Clock size={12} />
              {article.readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-lg text-text-muted leading-relaxed mb-8 border-l-2 border-accent pl-4">
              {article.excerpt}
            </p>
          )}

          {/* Author + Share row */}
          <div className="flex flex-wrap justify-between items-center border-y border-border-subtle py-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-surface-dim flex items-center justify-center text-sm font-bold font-heading">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold italic">{article.author.name}</p>
                {article.author.role && (
                  <p className="text-xs text-text-muted">{article.author.role}</p>
                )}
              </div>
            </div>
            <ShareButtons title={article.title} url={articleUrl} />
          </div>

          {/* Article Body — mock paragraphs until Sanity Portable Text */}
          <div className="space-y-6">
            {MOCK_BODY.map((paragraph, i) => (
              <p key={i} className="text-base leading-[1.8] text-text">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border-subtle">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-bold uppercase tracking-wider border border-border-subtle text-text-muted hover:border-accent hover:text-accent transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Bottom Share */}
          <div className="mt-10 pt-6 border-t border-border-subtle">
            <ShareButtons title={article.title} url={articleUrl} />
          </div>
        </div>

        {/* Newsletter — after article content, before related */}
        <div className="px-8">
          <NewsletterInline
            heading="Enjoyed this read?"
            description="Get articles like this delivered weekly — technical deep dives, industry news, and drone insights from India."
            variant="light"
          />
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="border-t border-border-subtle py-16 px-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-heading tracking-tight">
                  More in {CATEGORY_LABELS[article.category] || article.category}
                </h2>
                <div className="h-1 w-16 bg-accent mt-2" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((relatedArticle) => (
                <ArticleCard key={relatedArticle._id} article={relatedArticle} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
