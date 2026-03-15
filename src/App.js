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
import DEFAULT_ASSETS from './data/assetPaths';
import database from './data/database';

const CMS_BASE_URL = process.env.REACT_APP_CMS_BASE_URL || '';
const IS_DEV_MODE = true;

function App() {
  const [config, setConfig] = useState({
    database: IS_DEV_MODE ? database : null,
    assets: IS_DEV_MODE ? DEFAULT_ASSETS : {},
    images: IS_DEV_MODE,
    animations: IS_DEV_MODE,
    audios: IS_DEV_MODE,
  });

  // database
  useEffect(() => {
    if (config.database || IS_DEV_MODE) return;
    const loadConfig = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/screen/all?station=operate&sector=BCM&role=touch_table`);
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
  useEffect(() => {
    if (config.images) return;
    const loadImages = async () => {
      try {
        const response = await fetch(
          `${CMS_BASE_URL}/api/images?filters[station][$eq]=Big_Screen&populate=*&filters[sector][$eq]=Connected_Commerce_Operate&pagination[pageSize]=100`,
        );
        if (!response.ok) return;
        const data = await response.json();
        setConfig((prev) => ({
          ...prev,
          images: true,
          assets: {
            ...prev.assets,
            ...data?.data?.[0]?.image?.reduce(
              (acc, item) => ({
                ...acc,
                [item.name]: `${CMS_BASE_URL}${item.url}`,
              }),
              {},
            ),
          },
        }));
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };
    loadImages();
    const interval = setInterval(loadImages, 5000);
    return () => clearInterval(interval);
  }, [config.images]);

  // animations
  useEffect(() => {
    if (config.animations) return;
    const loadAnimations = async () => {
      try {
        const response = await fetch(
          `${CMS_BASE_URL}/api/animations?filters[station][$eq]=Big_Screen&populate=*&filters[sector][$eq]=Connected_Commerce_Operate&pagination[pageSize]=100`,
        );
        if (!response.ok) return;
        const data = await response.json();
        setConfig((prev) => ({
          ...prev,
          animations: true,
          assets: {
            ...prev.assets,
            ...data?.data?.[0]?.animated_image?.reduce(
              (acc, item) => ({
                ...acc,
                [item.name]: `${CMS_BASE_URL}${item.url}`,
              }),
              {},
            ),
          },
        }));
      } catch (error) {
        console.error('Failed to fetch animations:', error);
      }
    };
    loadAnimations();
    const interval = setInterval(loadAnimations, 5000);
    return () => clearInterval(interval);
  }, [config.animations]);

  // audios
  useEffect(() => {
    if (config.audios) return;
    const loadAudios = async () => {
      try {
        const response = await fetch(
          `${CMS_BASE_URL}/api/audios?filters[station][$eq]=Big_Screen&populate=*&filters[sector][$eq]=Connected_Commerce_Operate&pagination[pageSize]=100`,
        );
        if (!response.ok) return;
        const data = await response.json();
        setConfig((prev) => ({
          ...prev,
          audios: true,
          assets: {
            ...prev.assets,
            ...data?.data?.[0]?.audio?.reduce(
              (acc, item) => ({
                ...acc,
                [item.name]: `${CMS_BASE_URL}${item.url}`,
              }),
              {},
            ),
          },
        }));
      } catch (error) {
        console.error('Failed to fetch audios:', error);
      }
    };
    loadAudios();
    const interval = setInterval(loadAudios, 5000);
    return () => clearInterval(interval);
  }, [config.audios]);

  if (!config.images || !config.animations || !config.audios || !config.database) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#000',
          color: '#fff',
          fontFamily: 'EYInterstate, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 500,
              marginBottom: '1rem',
            }}
          >
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
