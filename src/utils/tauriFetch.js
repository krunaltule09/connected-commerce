const isInTauri = () => !!window.__TAURI_INTERNALS__;

let _tauriFetch = null;
const loadTauriFetch = async () => {
  if (_tauriFetch) return _tauriFetch;
  const { fetch } = await import('@tauri-apps/plugin-http');
  _tauriFetch = fetch;
  return _tauriFetch;
};

export const httpFetch = async (url, options) => {
  if (isInTauri() && typeof url === 'string' && url.startsWith('http')) {
    const tf = await loadTauriFetch();
    return tf(url, options);
  }
  return window.fetch(url, options);
};
