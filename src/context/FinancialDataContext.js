import React, { createContext, useContext, useState, useEffect } from 'react';
import { FINANCIAL_METRICS, formatMetricValue, METRIC_UNITS } from '../constants/financialData';

// Create the context
const FinancialDataContext = createContext();

// Provider component
export function FinancialDataProvider({ children }) {
  const [selectedMetric, setSelectedMetric] = useState('Revenue');
  const [apiMetrics, setApiMetrics] = useState(null);
  const [infoLinesByMetric, setInfoLinesByMetric] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch financial metrics from API
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/case/1/extracted-key-metrics`);
        const result = await response.json();
        const metricsData = result.data?.metrics || [];
        
        // Transform API data to match expected format
        const metricsObj = {};
        const infoLinesObj = {};
        
        metricsData.forEach((metric) => {
          const dataPoints = metric.dataPoints || {};
          // Convert dataPoints object to array format: [["Jan", 10.2], ["Feb", 10.8], ...]
          metricsObj[metric.name] = Object.entries(dataPoints).map(([key, value]) => [key, value]);
          // Store infoLines for each metric
          infoLinesObj[metric.name] = metric.infoLines || [];
        });
        
        setApiMetrics(metricsObj);
        setInfoLinesByMetric(infoLinesObj);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch financial metrics from API:', error);
        setIsLoading(false);
      }
    };
    
    fetchMetrics();
  }, []);

  // Get the data for the selected metric (use API data if available, fallback to hardcoded)
  const getSelectedData = () => {
    if (apiMetrics && apiMetrics[selectedMetric]) {
      return apiMetrics[selectedMetric];
    }
    return FINANCIAL_METRICS[selectedMetric] || [];
  };

  // Get info lines for the selected metric
  const getInfoLines = () => {
    return infoLinesByMetric[selectedMetric] || [];
  };

  // Format value based on metric type
  const formatValue = (value) => {
    return formatMetricValue(selectedMetric, value);
  };

  // Get available metrics (use API data if available, fallback to hardcoded)
  const getMetrics = () => {
    if (apiMetrics) {
      return Object.keys(apiMetrics);
    }
    return Object.keys(FINANCIAL_METRICS);
  };

  // Context value
  const value = {
    selectedMetric,
    setSelectedMetric,
    getSelectedData,
    getInfoLines,
    formatValue,
    metrics: getMetrics(),
    isLoading,
    infoLinesByMetric
  };

  return (
    <FinancialDataContext.Provider value={value}>
      {children}
    </FinancialDataContext.Provider>
  );
}

// Custom hook to use the context
export function useFinancialData() {
  const context = useContext(FinancialDataContext);
  if (context === undefined) {
    throw new Error('useFinancialData must be used within a FinancialDataProvider');
  }
  return context;
}
