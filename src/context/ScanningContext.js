import { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';

const ScanningContext = createContext();

const SSE_API_URL = `${process.env.REACT_APP_SSE_SERVICE_URL}/api/sse`;

export function ScanningProvider({ children }) {
  const [scanProgress, setScanProgress] = useState(0);
  const [isFinancialDataReady, setIsFinancialDataReady] = useState(false);
  const [isCovenantDataReady, setIsCovenantDataReady] = useState(false);
  const lastPublishedProgress = useRef(-1);

  // Publish progress to SSE service
  const publishProgress = useCallback(async (progress, pageId = 'financial-statement') => {
    // Only publish if progress changed significantly (avoid flooding)
    if (Math.floor(progress) === lastPublishedProgress.current) return;
    lastPublishedProgress.current = Math.floor(progress);

    try {
      await fetch(`${SSE_API_URL}/api/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId,
          progress: Math.floor(progress),
          status: progress >= 100 ? 'complete' : 'scanning',
          metadata: {
            isFinancialDataReady: progress >= 60,
            isCovenantDataReady: progress >= 85
          }
        })
      });
    } catch (error) {
      // Silently fail - SSE service may not be running
      console.debug('SSE publish failed:', error.message);
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

  // Publish progress to SSE whenever it changes
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
    isComplete: scanProgress === 100
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
