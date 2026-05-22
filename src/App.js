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


const AZURE_TOKEN_ENDPOINT = process.env.REACT_APP_AZURE_TOKEN_ENDPOINT;
const AZURE_CLIENT_ID = process.env.REACT_APP_AZURE_CLIENT_ID;
const AZURE_CLIENT_SECRET = process.env.REACT_APP_AZURE_CLIENT_SECRET;
const AZURE_SCOPE = process.env.REACT_APP_AZURE_SCOPE;
const TEMP_AZURE_TOKEN = process.env.REACT_APP_TEMP_AZURE_TOKEN;

function InactivityGuard() {
  useInactivityRedirect('/');
  return null;
}

function App() {
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
            return { key: source.key, assets: parseAssets(data, source) || {} };
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
  }, [config.assets.AZURE_AUTH_TOKEN]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!config.images || !config.animations || !config.audios || !config.database || !config.videos || !config.assets.AZURE_AUTH_TOKEN) {
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
            Fetching configuration...
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
              { label: 'Azure Token', status: !!config.assets.AZURE_AUTH_TOKEN },
              { label: 'Database', status: !!config.database },
              { label: 'Images', status: !!config.images },
              { label: 'Animations', status: !!config.animations },
              { label: 'Audios', status: !!config.audios },
              { label: 'Videos', status: !!config.videos },
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
