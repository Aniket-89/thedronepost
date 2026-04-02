import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = client ? createImageUrlBuilder(client) : null;

/**
 * Build optimised image URLs from Sanity image references.
 *
 * Usage:
 *   urlFor(article.featuredImage)?.width(800).url()
 *
 * Returns null if Sanity is not configured.
 */
export function urlFor(source: SanityImageSource) {
  if (!builder) return null;
  return builder.image(source);
}
