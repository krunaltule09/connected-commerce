import React from 'react';
import LandingPage from './pages/landing-page/LandingPage';
import DocumentCentrePage from './pages/DocumentCentrePage';
import TestFlipBookPage from './pages/TestFlipBookPage';

const routes = [
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/document-centre',
    element: <DocumentCentrePage />
  },
  {
    path: '/test-flipbook',
    element: <TestFlipBookPage />
  }
];

export default routes;
