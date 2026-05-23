import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import routes from './routes';
import theme from './theme';
import { SyncRouteProvider } from './context/SyncRouteContext';
import { FinancialDataProvider } from './context/FinancialDataContext';
import { ScanningProvider } from './context/ScanningContext';
import { SoundProvider } from './context/SoundContext';
import { ConfigProvider } from './context/ConfigContext';
import { httpFetch } from './utils/tauriFetch';
import useInactivityRedirect from './hooks/useInactivityRedirect';
import { setNatsToken } from './services/NavigationService';


const AZURE_TOKEN_ENDPOINT = process.env.REACT_APP_AZURE_TOKEN_ENDPOINT;
const AZURE_CLIENT_ID = process.env.REACT_APP_AZURE_CLIENT_ID;
const AZURE_CLIENT_SECRET = process.env.REACT_APP_AZURE_CLIENT_SECRET;
const AZURE_SCOPE = process.env.REACT_APP_AZURE_SCOPE;
const TEMP_AZURE_TOKEN = process.env.REACT_APP_TEMP_AZURE_TOKEN;

// In-memory cache for Object URLs to prevent memory leaks
const objectUrlRegistry = {};

// IndexedDB Helper functions
const DB_NAME = 'darklight-bcm-operate-touchtable';
const STORE_NAME = 'assets-store';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
};

const getFromDB = async (key) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveToDB = async (key, val) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(val, key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

const getCachedUrl = async (url) => {
  if (!url) return '';

  // Skip caching and return remote URL directly in dev mode to load instantly
  if (process.env.NODE_ENV === 'development') {
    return url;
  }

  // Return the existing Object URL if already loaded to avoid memory leaks
  if (objectUrlRegistry[url]) {
    return objectUrlRegistry[url];
  }

  try {
    // 1. Try to fetch the cached blob from IndexedDB
    const cachedBlob = await getFromDB(url);
    if (cachedBlob instanceof Blob) {
      const objectUrl = URL.createObjectURL(cachedBlob);
      objectUrlRegistry[url] = objectUrl;
      return objectUrl;
    }

    // 2. Fall back to fetching and caching the remote asset
    const response = await httpFetch(url);
    if (!response.ok) throw new Error(`Failed to fetch asset: ${response.statusText}`);
    const blob = await response.blob();

    // 3. Store in IndexedDB
    try {
      await saveToDB(url, blob);
    } catch (dbError) {
      console.warn('Failed to write asset to local database:', dbError);
    }

    const objectUrl = URL.createObjectURL(blob);
    objectUrlRegistry[url] = objectUrl;
    return objectUrl;
  } catch (error) {
    console.error(`Failed to cache asset ${url}, falling back to remote URL:`, error);
    return url;
  }
};

function InactivityGuard() {
  useInactivityRedirect('/');
  return null;
}

function App() {
  const [isCacheReady, setIsCacheReady] = useState(false);

  // Clear cache if build time is different (ensures automatic redownload on new build)
  useEffect(() => {
    const initCache = async () => {
      const currentBuildTime = process.env.REACT_APP_BUILD_TIME || 'development';
      const storedBuildTime = localStorage.getItem('gxide_build_time');
      
      if (process.env.NODE_ENV === 'production' && storedBuildTime !== currentBuildTime) {
        console.log('New build detected. Clearing IndexedDB cache...');
        await new Promise(async (resolve) => {
          try {
            if (typeof indexedDB.databases === 'function') {
              const dbs = await indexedDB.databases();
              await Promise.all(
                dbs.map((db) => {
                  return new Promise((resolveDb) => {
                    console.log(`Clearing database: ${db.name}`);
                    const req = indexedDB.deleteDatabase(db.name);
                    req.onsuccess = () => resolveDb();
                    req.onerror = () => resolveDb();
                    req.onblocked = () => {
                      console.warn(`Database deletion blocked for ${db.name}, proceeding anyway.`);
                      resolveDb();
                    };
                  });
                })
              );
            } else {
              // Fallback if indexedDB.databases() is not supported
              const req = indexedDB.deleteDatabase(DB_NAME);
              req.onsuccess = () => resolve();
              req.onerror = () => resolve();
              req.onblocked = () => resolve();
              return;
            }
          } catch (e) {
            console.error('Failed to enumerate and clear databases:', e);
          }
          resolve();
        });
        localStorage.setItem('gxide_build_time', currentBuildTime);
      } else if (process.env.NODE_ENV === 'development') {
        localStorage.setItem('gxide_build_time', 'development');
      }
      setIsCacheReady(true);
    };
    initCache();
  }, []);

  const [config, setConfig] = useState({
    database:  null,
    assets: {
      AZURE_AUTH_TOKEN: TEMP_AZURE_TOKEN || null,
    },
    images: false,
    animations: false,
    audios: false,
    videos: false,
  });

  
   // Disable context menu (long-press / right-click) for touchscreen kiosk mode
  useEffect(() => {
    const handler = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handler);
    return () => document.removeEventListener('contextmenu', handler);
  }, []);

  useEffect(() => {
    if (config.assets.AZURE_AUTH_TOKEN) {
      setNatsToken(config.assets.AZURE_AUTH_TOKEN);
    }
  }, [config.assets.AZURE_AUTH_TOKEN]);

  // Fetch Azure Token
  useEffect(() => {
    const fetchAzureToken = async () => {
      const url = AZURE_TOKEN_ENDPOINT;
      if (!url) return;
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: AZURE_CLIENT_ID,
          client_secret: AZURE_CLIENT_SECRET,
          scope: AZURE_SCOPE,
        }),
      };

      try {
        const response = await httpFetch(url, options);
        if (!response.ok) throw new Error('Failed to fetch Azure token');
        const data = await response.json();
        if (data.access_token) {
          setConfig((prev) => ({
            ...prev,
            assets: { ...prev.assets, AZURE_AUTH_TOKEN: data.access_token },
          }));
        }
      } catch (error) {
        console.error('Azure Token Fetch Error:', error);
      }
    };

    if (!config.assets.AZURE_AUTH_TOKEN) fetchAzureToken();

    const intervalTime = config.assets.AZURE_AUTH_TOKEN
      ? 30 * 60 * 1000 // 30 minutes
      : 5000; // 5 seconds
    const interval = setInterval(fetchAzureToken, intervalTime);
    return () => clearInterval(interval);
  }, [config.assets.AZURE_AUTH_TOKEN]);

  // Consolidated asset loading service — single interval retries all pending fetches
  // In dev mode, database is loaded locally but CMS assets (images, videos, etc.) are still fetched
  useEffect(() => {
    if (!isCacheReady) return;

    const CMS = `${process.env.REACT_APP_CMS_BASE_URL}:${process.env.REACT_APP_CMS_PORT}`;
    const STATION = process.env.REACT_APP_STATION;
    const SECTOR = process.env.REACT_APP_SECTOR;
    const ROLE = process.env.REACT_APP_PERSONA_ROLE;
    const cmsFilter = `filters[station][$eq]=${STATION}&filters[sector][$eq]=${SECTOR}&populate=*`;

    // Each source: { key, url, mediaField, prefixUrl }
    const ASSET_SOURCES = [
      { key: 'images', url: `${CMS}/api/images?${cmsFilter}`, mediaField: 'image', prefixUrl: true },
      { key: 'animations', url: `${CMS}/api/animations?${cmsFilter}`, mediaField: 'animated_image', prefixUrl: true },
      { key: 'audios', url: `${CMS}/api/audios?${cmsFilter}`, mediaField: 'audio', prefixUrl: true },
      { key: 'videos', url: `${process.env.REACT_APP_CMS_BASE_URL}/streaming-service/streaming-url?sector=${SECTOR}&station=${STATION}`, mediaField: null, prefixUrl: false },
    ];

    const parseAssets = (data, source) => {
      if (source.key === 'videos') {
        return data?.data?.reduce((acc, item) => ({ ...acc, [item.title]: item.lq_streaming_url }), {});
      }
      return data?.data?.[0]?.[source.mediaField]?.reduce(
        (acc, item) => ({ ...acc, [item.name]: source.prefixUrl ? `${CMS}${item.url}` : item.url }),
        {},
      );
    };

    const fetchDatabase = async (token) => {
      try {
        const headers = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await httpFetch(
          `${process.env.REACT_APP_BACKEND_URL}/screen/all?station=${STATION}&sector=${SECTOR}&role=${ROLE}`,
          { headers }
        );
        if (!response.ok) return null;
        return await response.json();
      } catch (error) {
        console.error('Failed to fetch database:', error);
        return null;
      }
    };

    const fetchAll = async () => {
      setConfig((prev) => {
        // Determine what still needs loading
        const pending = ASSET_SOURCES.filter((s) => !prev[s.key]);
        const token = prev.assets.AZURE_AUTH_TOKEN;
        const needsDb = !prev.database;

        if (pending.length === 0 && !needsDb) return prev;

        // Fire all pending fetches concurrently
        const promises = pending.map(async (source) => {
          try {
            const response = await httpFetch(source.url);
            if (!response.ok) {
              console.warn(`CMS ${source.key} returned ${response.status}, skipping`);
              return { key: source.key, assets: {} };
            }
            const data = await response.json();
            const parsed = parseAssets(data, source) || {};
            
            // Resolve local cached/Object URLs in parallel
            const cachedEntries = await Promise.all(
              Object.entries(parsed).map(async ([name, remoteUrl]) => {
                const localUrl = await getCachedUrl(remoteUrl);
                return [name, localUrl];
              })
            );
            
            return { key: source.key, assets: Object.fromEntries(cachedEntries) };
          } catch (error) {
            console.error(`Failed to fetch ${source.key}:`, error);
            return { key: source.key, assets: {} };
          }
        });

        // Only fetch database if we have the token.
        const shouldFetchDb = needsDb && token;
        const dbPromise = shouldFetchDb ? fetchDatabase(token) : Promise.resolve(undefined);

        Promise.all([dbPromise, ...promises]).then(([dbData, ...results]) => {
          setConfig((current) => {
            const update = { ...current };
            let mergedAssets = { ...current.assets };

            if (dbData) update.database = dbData;

            for (const result of results) {
              if (result) {
                update[result.key] = true;
                mergedAssets = { ...mergedAssets, ...result.assets };
              }
            }

            update.assets = mergedAssets;
            return update;
          });
        });

        return prev; // return unchanged; the Promise.all callback does the real update
      });
    };

    fetchAll();
    const interval = setInterval(fetchAll, 5000);
    return () => clearInterval(interval);
  }, [config.assets.AZURE_AUTH_TOKEN, isCacheReady]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isCacheReady || !config.images || !config.animations || !config.audios || !config.database || !config.videos || !config.assets.AZURE_AUTH_TOKEN) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: 'EYInterstate, sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '4rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}>
            Connecting to Server...
          </h2>
          <p style={{
            fontSize: '1.8rem',
            opacity: 0.7,
            marginBottom: '4rem',
          }}>
            {!isCacheReady ? 'Preparing local cache database...' : 'Fetching and caching configuration resources...'}
          </p>

          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'flex-start',
            padding: '60px 100px',
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.08)',
            minWidth: '450px',
          }}>
            {[
              { label: 'Local Cache', status: isCacheReady },
              { label: 'Azure Token', status: !!config.assets.AZURE_AUTH_TOKEN },
              { label: 'Database', status: !!config.database },
              { label: 'Data Download', status: !!config.images && !!config.animations && !!config.audios && !!config.videos },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: item.status ? '#00ff00' : '#222',
                  boxShadow: item.status ? '0 0 20px #00ff00' : 'none',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }} />
                <span style={{
                  fontSize: '2rem',
                  fontWeight: 500,
                  color: item.status ? '#fff' : '#444',
                  transition: 'all 0.5s ease',
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }



  return (
    <ConfigProvider config={config}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <InactivityGuard />
          <SoundProvider>
            <SyncRouteProvider>
              <ScanningProvider>
                <FinancialDataProvider>
                  <Routes>
                    {routes.map((route, index) => (
                      <Route key={index} path={route.path} element={route.element} />
                    ))}
                  </Routes>
                </FinancialDataProvider>
              </ScanningProvider>
            </SyncRouteProvider>
          </SoundProvider>
        </Router>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
