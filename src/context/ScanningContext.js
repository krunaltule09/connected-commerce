import { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { httpFetch } from '../utils/tauriFetch';

const ScanningContext = createContext();

const PUBLISH_URL = process.env.REACT_APP_NATS_PUBLISH_URL || '';
const NATS_USER   = process.env.REACT_APP_NATS_USER || '';
const NATS_PASS   = process.env.REACT_APP_NATS_PASS || '';
const INSTANCE_ID = process.env.REACT_APP_NATS_INSTANCE_ID || '';

const authHeader = 'Basic ' + btoa(`${NATS_USER}:${NATS_PASS}`);
const natsSubject = INSTANCE_ID
  ? `bcm.navigation.station-${INSTANCE_ID}`
  : 'bcm.navigation';

export function ScanningProvider({ children }) {
  const [scanProgress, setScanProgress] = useState(0);
  const [isFinancialDataReady, setIsFinancialDataReady] = useState(false);
  const [isCovenantDataReady, setIsCovenantDataReady] = useState(false);
  const [scannedDocumentPreview, setScannedDocumentPreview] = useState(null);
  const lastPublishedProgress = useRef(-1);
  // eslint-disable-next-line no-unused-vars
  const hasBeenInitialized = useRef(false);

  // Publish progress to NATS broker
  const publishProgress = useCallback(async (progress, pageId = 'financial-statement') => {
    // Only publish if progress changed significantly (avoid flooding)
    if (Math.floor(progress) === lastPublishedProgress.current) return;
    lastPublishedProgress.current = Math.floor(progress);

    try {
      await httpFetch(PUBLISH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify({
          message: {
            title: 'BCM Navigation',
            body: {
              targetAppId: 'operate-experience',
              action: 'PROGRESS_UPDATE',
              type: 'progress',
              pageId,
              progress: Math.floor(progress),
              status: progress >= 100 ? 'complete' : 'scanning',
              sourceAppId: 'connected-commerce',
              timestamp: new Date().toISOString(),
              metadata: {
                isFinancialDataReady: progress >= 60,
                isCovenantDataReady: progress >= 85
              }
            },
          },
          target_device: ['large_screen'],
          subject: natsSubject,
        })
      });
    } catch (error) {
      // Silently fail - NATS broker may not be reachable
      console.debug('NATS publish failed:', error.message);
    }
  }, []);

  // Update scan progress
  useEffect(() => {
    const timer = setInterval(() => {
      setScanProgress((oldProgress) => {
        const increment = Math.max(1, 10 * (1 - oldProgress / 100));
        return Math.min(oldProgress + increment, 100);
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  // Listen for reset events
  useEffect(() => {
    const handleReset = () => {
      setScanProgress(0);
      setIsFinancialDataReady(false);
      setIsCovenantDataReady(false);
      lastPublishedProgress.current = -1;
    };

    window.addEventListener('reset-scanning-progress', handleReset);
    return () => window.removeEventListener('reset-scanning-progress', handleReset);
  }, []);

  // Publish progress to NATS whenever it changes
  useEffect(() => {
    publishProgress(scanProgress);
  }, [scanProgress, publishProgress]);

  // Set financial data ready when progress reaches 60%
  useEffect(() => {
    if (scanProgress >= 60 && !isFinancialDataReady) {
      setIsFinancialDataReady(true);
    }
  }, [scanProgress, isFinancialDataReady]);

  // Set covenant data ready when progress reaches 85%
  useEffect(() => {
    if (scanProgress >= 85 && !isCovenantDataReady) {
      setIsCovenantDataReady(true);
    }
  }, [scanProgress, isCovenantDataReady]);

  const value = {
    scanProgress,
    isFinancialDataReady,
    isCovenantDataReady,
    isComplete: scanProgress === 100,
    scannedDocumentPreview,
    setScannedDocumentPreview
  };

  return (
    <ScanningContext.Provider value={value}>
      {children}
    </ScanningContext.Provider>
  );
}

export function useScanning() {
  const context = useContext(ScanningContext);
  if (context === undefined) {
    throw new Error('useScanning must be used within a ScanningProvider');
  }
  return context;
}
