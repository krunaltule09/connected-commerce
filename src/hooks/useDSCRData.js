import { useState, useEffect } from 'react';

/**
 * Custom hook for DSCR (Debt Service Coverage Ratio) data
 * Fetches and manages quarterly DSCR data
 */
export const useDSCRData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/case/1/quarterly-dscr`);
        const result = await response.json();
        const dataPoints = result.data?.dataPoints || [];
        
        // Map API response to expected format
        const mappedData = dataPoints.map(item => ({
          quarter: item.quarter,
          dscr: item.dscr,
          period: item.period,
          threshold: item.threshold
        }));
        
        setData(mappedData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch DSCR data:', error);
        // Fallback to default data
        const fallbackData = [
          { quarter: 'Q1', dscr: 1.8, period: 'FY 24-25 (Jan - Mar)', threshold: 1.1 },
          { quarter: 'Q2', dscr: 2.4, period: 'FY 24-25 (Apr - Jun)', threshold: 1.1 },
          { quarter: 'Q3', dscr: 2.0, period: 'FY 24-25 (Jul - Sep)', threshold: 1.1 },
          { quarter: 'Q4', dscr: 1.9, period: 'FY 24-25 (Oct - Dec)', threshold: 1.1 },
        ];
        setData(fallbackData);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};
