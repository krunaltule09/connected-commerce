import { createContext, useState, useContext, useEffect } from 'react';

const ScanningContext = createContext();

export function ScanningProvider({ children }) {
  const [scanProgress, setScanProgress] = useState(0);
  const [isFinancialDataReady, setIsFinancialDataReady] = useState(false);
  const [isCovenantDataReady, setIsCovenantDataReady] = useState(false);
  
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
