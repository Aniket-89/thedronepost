import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getArticleBySlug, getRelatedArticles, getAllArticleSlugs } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import { CATEGORY_LABELS, CATEGORY_TEXT_COLORS } from "@/lib/constants";
import { ShareButtons } from "@/components/articles/ShareButtons";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { NewsletterInline } from "@/components/shared/NewsletterInline";
import { PortableTextBody } from "@/components/articles/PortableTextBody";

/** Revalidate article pages every 60 seconds (ISR) */
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);

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
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = await getRelatedArticles(article.category, article._id);
  const categoryColor = CATEGORY_TEXT_COLORS[article.category] || "text-accent";
  const articleUrl = `https://thedronepost.in/articles/${slug}`;

  // Structured data for SEO
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
                unoptimized
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

          {/* Article Body — Portable Text from Sanity, or mock fallback */}
          <PortableTextBody body={article.body} />

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
