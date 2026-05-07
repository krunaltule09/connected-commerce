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
import database from './data/database';

const IS_DEV_MODE = true;

function InactivityGuard() {
  useInactivityRedirect('/');
  return null;
}

function App() {
  const [config, setConfig] = useState({
    database: IS_DEV_MODE ? database : null,
    assets: {},
    images: IS_DEV_MODE,
    animations: IS_DEV_MODE,
    audios: IS_DEV_MODE,
    videos: IS_DEV_MODE,
    documents: IS_DEV_MODE
  });

  
   // Disable context menu (long-press / right-click) for touchscreen kiosk mode
  useEffect(() => {
    const handler = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handler);
    return () => document.removeEventListener('contextmenu', handler);
  }, []);

  // Consolidated asset loading service — single interval retries all pending fetches
  useEffect(() => {
    if (IS_DEV_MODE) return;

    const CMS = `${process.env.REACT_APP_CMS_BASE_URL}:${process.env.REACT_APP_CMS_PORT}`;
    const STATION = process.env.REACT_APP_STATION;
    const SECTOR = process.env.REACT_APP_SECTOR;
    const cmsFilter = `filters[station][$eq]=${STATION}&filters[sector][$eq]=${SECTOR}&populate=*`;

    // Each source: { key, url, mediaField, prefixUrl }
    const ASSET_SOURCES = [
      { key: 'images', url: `${CMS}/api/images?${cmsFilter}`, mediaField: 'image', prefixUrl: true },
      { key: 'animations', url: `${CMS}/api/animations?${cmsFilter}`, mediaField: 'animated_image', prefixUrl: true },
      { key: 'audios', url: `${CMS}/api/audios?${cmsFilter}`, mediaField: 'audio', prefixUrl: true },
      { key: 'documents', url: `${CMS}/api/documents?${cmsFilter}`, mediaField: 'document', prefixUrl: true },
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

    const fetchDatabase = async () => {
      try {
        const response = await httpFetch(
          `${process.env.REACT_APP_BACKEND_URL}/config?station=${STATION}&sector=${SECTOR}`
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
        const needsDb = !prev.database;

        if (pending.length === 0 && !needsDb) return prev;

        // Fire all pending fetches concurrently
        const promises = pending.map(async (source) => {
          try {
            const response = await httpFetch(source.url);
            if (!response.ok) return null;
            const data = await response.json();
            return { key: source.key, assets: parseAssets(data, source) || {} };
          } catch (error) {
            console.error(`Failed to fetch ${source.key}:`, error);
            return null;
          }
        });

        const dbPromise = needsDb ? fetchDatabase() : Promise.resolve(undefined);

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!config.images || !config.animations || !config.audios || !config.database || !config.videos || !config.documents) {
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
            fontSize: '1.5rem',
            fontWeight: 500,
            marginBottom: '1rem',
          }}>
            Connecting to Server...
          </h2>
          <p style={{ opacity: 0.7 }}>Fetching configuration...</p>
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
