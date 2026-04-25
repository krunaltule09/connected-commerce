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
import database from './data/database';

const IS_DEV_MODE = true;

function App() {
  const [config, setConfig] = useState({
    database: IS_DEV_MODE ? database : null,
    assets: {},
    images: false,
    animations: false,
    audios: false,
    videos: false
  });

  
   // Disable context menu (long-press / right-click) for touchscreen kiosk mode
  useEffect(() => {
    const handler = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handler);
    return () => document.removeEventListener('contextmenu', handler);
  }, []);

   // database
  useEffect(() => {
    if (config.database || IS_DEV_MODE) return;
    const loadConfig = async () => {
      try {
        const response = await httpFetch(
          `${process.env.REACT_APP_BACKEND_URL}/config?station=${process.env.REACT_APP_STATION}&sector=${process.env.REACT_APP_SECTOR}`
        );
        if (!response.ok) return;
        const data = await response.json();
        setConfig((config) => ({ ...config, database: data }));
      } catch (error) {
        console.error('Failed to fetch database:', error);
      }
    };
    loadConfig();
    const interval = setInterval(loadConfig, 5000);
    return () => clearInterval(interval);
  }, [config.database]);
  // images
  console.log('config', config)
    //annimations
  useEffect(() => {
    if (config.animations) return;
    const loadConfig = async () => {
      try {
        const response = await httpFetch(
          `${process.env.REACT_APP_CMS_BASE_URL}:${process.env.REACT_APP_CMS_PORT}/api/animations?filters[station][$eq]=${process.env.REACT_APP_STATION}&filters[sector][$eq]=${process.env.REACT_APP_SECTOR}&populate=*`,
        );
        if (!response.ok) return;
        const data = await response.json();
        setConfig((config) => ({
          ...config,
          animations: true,
          assets: {
            ...config.assets,
            ...data?.data?.[0]?.animated_image?.reduce(
              (acc, item) => ({
                ...acc,
                [item.name]: `${process.env.REACT_APP_CMS_BASE_URL}:${process.env.REACT_APP_CMS_PORT}${item.url}`,
              }),
              {},
            ),
          },
        }));
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };
    loadConfig();
    const interval = setInterval(loadConfig, 5000);
    return () => clearInterval(interval);
  }, [config.animations]);
  useEffect(() => {
    if (config.images) return;
    const loadConfig = async () => {
      try {
        const response = await httpFetch(
          `${process.env.REACT_APP_CMS_BASE_URL}:${process.env.REACT_APP_CMS_PORT}/api/images?filters[station][$eq]=${process.env.REACT_APP_STATION}&filters[sector][$eq]=${process.env.REACT_APP_SECTOR}&populate=*`,
        );
        if (!response.ok) return;
        const data = await response.json();
        setConfig((config) => ({
          ...config,
          images: true,
          assets: {
            ...config.assets,
            ...data?.data?.[0]?.image?.reduce(
              (acc, item) => ({
                ...acc,
                [item.name]: `${process.env.REACT_APP_CMS_BASE_URL}:${process.env.REACT_APP_CMS_PORT}${item.url}`,
              }),
              {},
            ),
          },
        }));
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };
    loadConfig();
    const interval = setInterval(loadConfig, 5000);
    return () => clearInterval(interval);
  }, [config.images]);
  // videos
  useEffect(() => {
    if (config.videos) return;
    const loadConfig = async () => {
      try {
        const response = await httpFetch(
          `${process.env.REACT_APP_CMS_BASE_URL}/streaming-service/streaming-url?sector=${process.env.REACT_APP_SECTOR}&station=${process.env.REACT_APP_STATION}`,
        );
        if (!response.ok) return;
        const data = await response.json();
        console.log('data', data)
        setConfig((config) => ({
          ...config,
          videos: true,
          assets: {
            ...config.assets,
            ...data?.data?.reduce(
              (acc, item) => ({
                ...acc,
                [item.title]:item.lq_streaming_url,
              }),
              {},
            ),
          },
        }));
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };
    loadConfig();
    const interval = setInterval(loadConfig, 5000);
    return () => clearInterval(interval);
  }, [config.videos]);
  // audios
    useEffect(() => {
    if (config.audios) return;
    const loadConfig = async () => {
      try {
        const response = await httpFetch(
          `${process.env.REACT_APP_CMS_BASE_URL}:${process.env.REACT_APP_CMS_PORT}/api/audios?filters[station][$eq]=${process.env.REACT_APP_STATION}&filters[sector][$eq]=${process.env.REACT_APP_SECTOR}&populate=*`,
        );
        if (!response.ok) return;
        const data = await response.json();

        setConfig((config) => ({
          ...config,
          audios: true,
          assets: {
            ...config.assets,
            ...data?.data?.[0]?.audio?.reduce(
              (acc, item) => ({
                ...acc,
                [item.name]: `${process.env.REACT_APP_CMS_BASE_URL}:${process.env.REACT_APP_CMS_PORT}${item.url}`,
              }),
              {},
            ),
          },
        }));
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };
    loadConfig();
    const interval = setInterval(loadConfig, 5000);
    return () => clearInterval(interval);
  }, [config.audios]);

  if (!config.images || !config.animations || !config.audios || !config.database || !config.videos) {
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
