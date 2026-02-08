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
    // Simulate data fetching
    const fetchData = () => {
      const hardcodedData = [
        { quarter: 'Q1', cashFlow: 2000, interest: 3000, debt: 10000 },
        { quarter: 'Q2', cashFlow: 3500, interest: 4500, debt: 12000 },
        { quarter: 'Q3', cashFlow: 5000, interest: 6000, debt: 14000 },
        { quarter: 'Q4', cashFlow: 6500, interest: 7000, debt: 13000 },
      ];
      
      // Use a shorter timeout to minimize visible transition
      setTimeout(() => {
        setData(hardcodedData);
        setLoading(false);
      }, 50);
    };

    fetchData();
  }, []);

  return { data, loading };
};
