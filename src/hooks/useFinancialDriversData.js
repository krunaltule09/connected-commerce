import { useState, useEffect } from 'react';

/**
 * Custom hook for financial drivers data
 * Fetches and manages quarter-by-quarter financial data
 */
export const useFinancialDriversData = () => {
  // Initialize with empty structure that matches final data shape
  const [data, setData] = useState([
    { quarter: 'Q1', cashFlow: 0, interest: 0, debt: 0 },
    { quarter: 'Q2', cashFlow: 0, interest: 0, debt: 0 },
    { quarter: 'Q3', cashFlow: 0, interest: 0, debt: 0 },
    { quarter: 'Q4', cashFlow: 0, interest: 0, debt: 0 },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/case/1/quarter-by-quarter-financial-drivers`);
        const result = await response.json();
        const dataPoints = result.data?.dataPoints || [];
        
        // Map API response to expected format
        const mappedData = dataPoints.map(item => ({
          quarter: item.quarter,
          cashFlow: item.cashFlow,
          interest: item.interest,
          debt: item.debt
        }));
        
        setData(mappedData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch financial drivers data:', error);
        // Fallback to default data
        const fallbackData = [
          { quarter: 'Q1', cashFlow: 15000, interest: 15000, debt: 15000 },
          { quarter: 'Q2', cashFlow: 18000, interest: 17500, debt: 16800 },
          { quarter: 'Q3', cashFlow: 25500, interest: 23000, debt: 21000 },
          { quarter: 'Q4', cashFlow: 36000, interest: 31000, debt: 27000 },
        ];
        setData(fallbackData);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};
