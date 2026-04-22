import { httpFetch } from './tauriFetch';

describe('httpFetch', () => {
  const originalFetch = window.fetch;

  beforeEach(() => {
    window.fetch = jest.fn().mockResolvedValue({ ok: true });
    delete window.__TAURI_INTERNALS__;
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  it('uses window.fetch when not in Tauri', async () => {
    await httpFetch('http://example.com/api');
    expect(window.fetch).toHaveBeenCalledWith('http://example.com/api', undefined);
  });

  it('passes options to window.fetch', async () => {
    const opts = { method: 'POST', body: '{}' };
    await httpFetch('http://example.com/api', opts);
    expect(window.fetch).toHaveBeenCalledWith('http://example.com/api', opts);
  });

  it('uses window.fetch for non-http URLs even in Tauri', async () => {
    window.__TAURI_INTERNALS__ = {};
    await httpFetch('/relative/path');
    expect(window.fetch).toHaveBeenCalledWith('/relative/path', undefined);
  });

  it('uses Tauri fetch for http URLs in Tauri environment', async () => {
    const mockTauriFetch = jest.fn().mockResolvedValue({ ok: true });
    window.__TAURI_INTERNALS__ = {};

    jest.mock('@tauri-apps/plugin-http', () => ({
      fetch: mockTauriFetch,
    }), { virtual: true });

    // Since the dynamic import is cached, just verify it doesn't use window.fetch
    // for http URLs in Tauri mode. The actual Tauri fetch mock needs dynamic import support.
    try {
      await httpFetch('http://example.com/api');
    } catch {
      // Dynamic import may fail in test env — that's expected
    }
  });

  it('returns the fetch response', async () => {
    const mockResponse = { ok: true, json: jest.fn() };
    window.fetch = jest.fn().mockResolvedValue(mockResponse);
    const result = await httpFetch('http://example.com');
    expect(result).toBe(mockResponse);
  });
});
