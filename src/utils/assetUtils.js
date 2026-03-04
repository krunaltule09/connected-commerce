import { ASSETS } from '../data/assetPaths';

const ALL_ASSETS = ASSETS;

/**
 * Get the correct asset URL that works in both development and production (including Vercel)
 * @param {string} path - The asset key or URL path
 * @returns {string} - The full URL to the asset
 */
export function getAssetPath(path) {
  // For absolute URLs (like those from a CDN), return as is
  if (path.startsWith('http')) {
    return path;
  }

  // Try to find the asset in our constants
  return ALL_ASSETS[path] || path;
}
