import React, { useEffect, useState, useRef } from 'react';
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

  if (url.includes('.m3u8')) {
    return url;
  }
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

  const [downloadProgress, setDownloadProgress] = useState({
    total: 0,
    loaded: 0,
  });

  const resolvedUrlsRef = useRef(new Set());
  const totalUrlsRef = useRef(new Set());
  const isFetchingRef = useRef(false);

  const configRef = useRef(config);
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  
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
      if (isFetchingRef.current) return;

      const currentConfig = configRef.current;
      // Determine what still needs loading
      const pending = ASSET_SOURCES.filter((s) => !currentConfig[s.key]);
      const token = currentConfig.assets.AZURE_AUTH_TOKEN;
      const needsDb = !currentConfig.database;

      if (pending.length === 0 && !needsDb) return;

      isFetchingRef.current = true;

      try {
        // 1. Fetch metadata (JSONs) in parallel
        const metadataResults = await Promise.all(
          pending.map(async (source) => {
            try {
              const response = await httpFetch(source.url);
              if (!response.ok) {
                console.warn(`CMS ${source.key} returned ${response.status}, skipping`);
                return { source, parsed: null };
              }
              const data = await response.json();
              const parsed = parseAssets(data, source) || {};
              return { source, parsed };
            } catch (error) {
              console.error(`Failed to fetch ${source.key} metadata:`, error);
              return { source, parsed: null };
            }
          })
        );

        // 2. Count total files to download/resolve
        metadataResults.forEach(({ source, parsed }) => {
          if (parsed) {
            Object.values(parsed).forEach(url => {
              if (url) totalUrlsRef.current.add(url);
            });
          }
        });

        const total = totalUrlsRef.current.size;
        setDownloadProgress((prev) => ({
          ...prev,
          total: total
        }));

        // 3. Start resolving assets (which triggers downloads if not cached) and update state immediately upon completion
        const assetPromises = metadataResults.map(async ({ source, parsed }) => {
          if (!parsed) return;
          try {
            const cachedEntries = await Promise.all(
              Object.entries(parsed).map(async ([name, remoteUrl]) => {
                try {
                  const localUrl = await getCachedUrl(remoteUrl);
                  return [name, localUrl];
                } finally {
                  if (remoteUrl) {
                    resolvedUrlsRef.current.add(remoteUrl);
                    setDownloadProgress((prev) => ({
                      ...prev,
                      loaded: resolvedUrlsRef.current.size
                    }));
                  }
                }
              })
            );
            
            setConfig((current) => ({
              ...current,
              [source.key]: true,
              assets: {
                ...current.assets,
                ...Object.fromEntries(cachedEntries),
              },
            }));
          } catch (error) {
            console.error(`Failed to resolve assets for ${source.key}:`, error);
          }
        });

        // 4. Fetch database if needed and update state immediately upon completion
        const shouldFetchDb = needsDb && token;
        const dbPromise = (async () => {
          if (shouldFetchDb) {
            const dbData = await fetchDatabase(token);
            if (dbData) {
              setConfig((current) => ({
                ...current,
                database: dbData,
              }));
            }
          }
        })();

        // 5. Wait for all database and asset fetches to complete so we know when the fetchAll tick is done
        await Promise.all([dbPromise, ...assetPromises]);

      } catch (err) {
        console.error('Error during fetchAll execution:', err);
      } finally {
        isFetchingRef.current = false;
      }
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
            {!isCacheReady
              ? 'Preparing local cache database...'
              : downloadProgress.total > 0
                ? `Downloading assets: ${downloadProgress.loaded} of ${downloadProgress.total} files cached...`
                : 'Fetching and caching configuration resources...'}
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
              {
                label: downloadProgress.total > 0
                  ? `Data Download (${downloadProgress.loaded}/${downloadProgress.total})`
                  : 'Data Download',
                status: !!config.images && !!config.animations && !!config.audios && !!config.videos
              },
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

          {downloadProgress.total > 0 && (
            <div style={{
              width: '100%',
              maxWidth: '450px',
              margin: '30px auto 0 auto',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '10px',
              padding: '4px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <div style={{
                width: `${Math.min(100, Math.round((downloadProgress.loaded / downloadProgress.total) * 100))}%`,
                backgroundColor: '#00ff00',
                height: '8px',
                borderRadius: '6px',
                boxShadow: '0 0 10px #00ff00',
                transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }} />
            </div>
          )}
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
