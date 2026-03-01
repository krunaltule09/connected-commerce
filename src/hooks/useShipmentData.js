import { useState, useEffect } from 'react';

export const useShipmentData = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [revealStage, setRevealStage] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  
  // Simulate live OCR scanning progress with linear progression
  useEffect(() => {
    
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
      if (roundedProgress >= 10 && revealStage < 1) {
        setRevealStage(1); // Reveal shipment details at 15%
      } else if (roundedProgress >= 50 && revealStage < 2) {
        setRevealStage(2); // Reveal KPI panel at 60%
      } else if (roundedProgress >= 85 && revealStage < 3) {
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
  }, []); // Empty dependency array - only run once on mount
  const [shipments] = useState([
    {
      name: 'Shipment 1',
      promisedDate: '12 Aug 2025',
      actualDate: '10 Aug 2025',
      status: 'early'
    },
    {
      name: 'Shipment 2',
      promisedDate: '02 Jun 2025',
      actualDate: '01 Jun 2025',
      status: 'on-time'
    },
    {
      name: 'Shipment 3',
      promisedDate: '01 May 2025',
      actualDate: '10 May 2025',
      status: 'delayed'
    },
    {
      name: 'Shipment 4',
      promisedDate: '12 Apr 2025',
      actualDate: '12 Apr 2025',
      status: 'on-time'
    },
    {
      name: 'Shipment 5',
      promisedDate: '25 Mar 2025',
      actualDate: '25 Mar 2025',
      status: 'on-time'
    },
    {
      name: 'Shipment 6',
      promisedDate: '14 Feb 2025',
      actualDate: '18 Feb 2025',
      status: 'delayed'
    },
    {
      name: 'Shipment 7',
      promisedDate: '02 Feb 2025',
      actualDate: '02 Feb 2025',
      status: 'on-time'
    },
    {
      name: 'Shipment 8',
      promisedDate: '26 Jan 2025',
      actualDate: '26 Jan 2025',
      status: 'on-time'
    },    
    
  ]);

  // Function to reset the scan progress (useful for testing or restarting)
  const resetScan = () => {
    setScanProgress(0);
    setRevealStage(0);
    setScanComplete(false);
  };

  // This would be replaced with actual API calls in a real implementation
  // For now, we're just returning the mock data and the live progress
  return {
    shipments,
    scanProgress,
    isScanning: scanProgress < 100, // Indicates if scanning is still in progress
    revealStage,
    scanComplete,
    resetScan // Expose the reset function
  };
};
