/** Centralized URL constants used by both CMS and web apps. */

export const CMS_PORT = 3002;
export const WEB_PORT = 3000;

export const CMS_URL =
  process.env.PUBLIC_SERVER_URL || `http://localhost:${CMS_PORT}`;

export const WEB_URL =
  process.env.NEXT_PUBLIC_WEB_URL || `http://localhost:${WEB_PORT}`;

/** CMS REST API base URL. */
export const CMS_API_URL = `${CMS_URL}/api`;

/** CMS GraphQL endpoint. */
export const CMS_GRAPHQL_URL = `${CMS_URL}/api/graphql`;

/** CMS Admin panel URL. */
export const CMS_ADMIN_URL = `${CMS_URL}/admin`;

/**
 * Build the full URL for a CMS media asset.
 * If the media has a url property (from S3), return it directly.
 * Otherwise, prefix with the CMS server URL.
 */
export function getMediaUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${CMS_URL}${path}`;
}
