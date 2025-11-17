import { useState, useEffect } from 'react';

export const useShipmentData = () => {
  const [scanProgress, setScanProgress] = useState(75);
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
  // For now, we're just returning the mock data
  return {
    shipments,
    scanProgress
  };
};
