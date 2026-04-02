import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2024-03-01";

/** Whether Sanity is configured (project ID is set) */
export const isSanityConfigured = Boolean(projectId);

/**
 * Public client — uses Sanity CDN for fast published-content reads.
 * Returns null when Sanity is not configured so builds never crash.
 */
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

/**
 * Server-only client — bypasses CDN for fresh reads.
 * Use when you need draft content or real-time accuracy.
 */
export const serverClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    })
  : null;
