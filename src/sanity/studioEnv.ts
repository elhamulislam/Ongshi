/**
 * Public Sanity settings for the embedded Studio bundle.
 * Session/cookie auth is handled by Sanity login — never import tokens here.
 */
export const apiVersion = "2026-02-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
