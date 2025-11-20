/**
 * Get the correct asset URL that works in both development and production (including Vercel)
 * @param {string} path - The path to the asset relative to the assets directory
 * @returns {string} - The full URL to the asset
 */
export function getAssetPath(path) {
  // For absolute URLs (like those from a CDN), return as is
  if (path.startsWith('http')) {
    return path;
  }
  
  // For relative paths, ensure they work in all environments
  // This handles both local development and Vercel deployments
  return `${process.env.PUBLIC_URL || ''}/assets/${path}`;
}
