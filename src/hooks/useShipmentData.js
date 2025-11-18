import { useState, useEffect } from 'react';

export const useShipmentData = () => {
  const [scanProgress, setScanProgress] = useState(0);
  
  // Simulate live OCR scanning progress
  useEffect(() => {
    // Start with a random progress between 5-15%
    setScanProgress(Math.floor(Math.random() * 10) + 5);
    
    // Create an interval to update the progress
    const interval = setInterval(() => {
      setScanProgress(prevProgress => {
        // Randomly increase by 1-3% each time
        const increment = Math.floor(Math.random() * 3) + 1;
        const newProgress = prevProgress + increment;
        
        // Cap at 99% to give the impression it's still processing
        return newProgress >= 99 ? 99 : newProgress;
      });
    }, 800); // Update every 800ms for a realistic scanning effect
    
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);
  const [shipments, setShipments] = useState([
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
    isScanning: scanProgress < 99 // Indicates if scanning is still in progress
  };
};
