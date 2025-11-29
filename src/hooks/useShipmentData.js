import { useState, useEffect } from 'react';

export const useShipmentData = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [revealStage, setRevealStage] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  
  // Simulate live OCR scanning progress with linear progression
  useEffect(() => {
    // Start at 0%
    setScanProgress(0);
    
    // Calculate total scan duration and increment size for linear progression
    const totalScanDuration = 8000; // 8 seconds total scan time
    const updateInterval = 200; // Update every 200ms (faster)
    const totalIncrements = totalScanDuration / updateInterval;
    const incrementSize = 100 / totalIncrements;
    
    let currentProgress = 0;
    
    // Create an interval to update the progress linearly
    const interval = setInterval(() => {
      currentProgress += incrementSize;
      const roundedProgress = Math.min(Math.round(currentProgress), 100);
      
      setScanProgress(roundedProgress);
      
      // Update reveal stage based on progress
      if (roundedProgress >= 30 && revealStage < 1) {
        setRevealStage(1); // Reveal shipment details at 30%
      } else if (roundedProgress >= 60 && revealStage < 2) {
        setRevealStage(2); // Reveal KPI panel at 60%
      } else if (roundedProgress >= 90 && revealStage < 3) {
        setRevealStage(3); // Reveal chart at 90%
      }
      
      // When we reach 100%, mark as complete and clear interval
      if (roundedProgress >= 100) {
        setScanComplete(true);
        setRevealStage(4); // Final reveal stage
        clearInterval(interval);
      }
    }, updateInterval);
    
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [revealStage]);
  const [shipments] = useState([
    {
      name: 'Shipment 1',
      promisedDate: '12, Aug 2025',
      actualDate: '10, Aug 2025',
      status: 'on-time'
    },
    {
      name: 'Shipment 2',
      promisedDate: '2, Jun 2025',
      actualDate: '1, Jun 2025',
      status: 'on-time'
    },
    {
      name: 'Shipment 3',
      promisedDate: '1, May 2025',
      actualDate: '10, May 2025',
      status: 'delayed'
    },
    {
      name: 'Shipment 4',
      promisedDate: '12, Apr 2025',
      actualDate: '12, Apr 2025',
      status: 'on-time'
    },
    {
      name: 'Shipment 5',
      promisedDate: '18, Feb 2025',
      actualDate: '22, Feb 2025',
      status: 'delayed'
    }
  ]);

  // This would be replaced with actual API calls in a real implementation
  // For now, we're just returning the mock data and the live progress
  return {
    shipments,
    scanProgress,
    isScanning: scanProgress < 100, // Indicates if scanning is still in progress
    revealStage,
    scanComplete
  };
};
