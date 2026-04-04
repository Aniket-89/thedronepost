import { NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";
import { groq } from "next-sanity";

// Revalidate the search index cache every 60 seconds (ISR)
export const revalidate = 60;

export async function GET() {
  try {
    const query = groq`
      *[_type == "article" && defined(slug.current)] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        category,
        publishedAt
      } | order(publishedAt desc)
    `;
    
    // Only fetch if client is configured (avoids crashing during empty placeholder setups)
    if (!client) {
      return NextResponse.json([]);
    }

    const articles = await client.fetch(query);
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Failed to fetch search catalog" }, { status: 500 });
  }
}
