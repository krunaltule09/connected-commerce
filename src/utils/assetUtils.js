/**
 * Get the correct asset URL that works in both development and production (including Vercel)
 * @param {string} path - The path to the asset relative to the assets directory
 * @returns {string} - The full URL to the asset
 * 
 * Note: Assets are now imported from src/assets and bundled with the app.
 * For dynamic imports, use require() or import statements directly.
 */
export function getAssetPath(path) {
  // For absolute URLs (like those from a CDN), return as is
  if (path.startsWith('http')) {
    return path;
  }
  
  // For assets in src/assets, use require to get the bundled path
  try {
    return require(`../assets/${path}`);
  } catch (error) {
    console.warn(`Asset not found: ${path}`, error);
    return path;
  }
}
