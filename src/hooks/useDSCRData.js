import { useState, useEffect } from 'react';

/**
 * Custom hook for DSCR (Debt Service Coverage Ratio) data
 * Fetches and manages quarterly DSCR data
 */
export const useDSCRData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = () => {
      const hardcodedData = [
        { quarter: 'Q1', dscr: 1.8, period: 'FY 24-25 (Jan - Mar)', threshold: 1.1 },
        { quarter: 'Q2', dscr: 2.4, period: 'FY 24-25 (Apr - Jun)', threshold: 1.1 },
        { quarter: 'Q3', dscr: 2.0, period: 'FY 24-25 (Jul - Sep)', threshold: 1.1 },
        { quarter: 'Q4', dscr: 1.9, period: 'FY 24-25 (Oct - Dec)', threshold: 1.1 },
      ];
      
      setTimeout(() => {
        setData(hardcodedData);
        setLoading(false);
      }, 100);
    };

    fetchData();
  }, []);

  return { data, loading };
};
