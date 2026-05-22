import React, { createContext, useContext, useState } from 'react';
import { useVisualizationDataSet } from './ConfigContext';

// Create the context
const FinancialDataContext = createContext();

// Provider component
export function FinancialDataProvider({ children }) {
  const [selectedMetric, setSelectedMetric] = useState('Revenue');
  
  // Get financial metrics from database
  const metricsVisualization = useVisualizationDataSet('financial_dashboard', 'Financial Metrics');
  const databaseMetrics = metricsVisualization?.metrics || {};

  // Get the data for the selected metric from database
  const getSelectedData = () => {
    const metricData = databaseMetrics[selectedMetric];
    return metricData?.dataPoints || [];
  };

  // Get info lines for the selected metric from database
  const getInfoLines = () => {
    const metricData = databaseMetrics[selectedMetric];
    return metricData?.infoLines || [];
  };

  // Format value based on metric type from database
  const formatValue = (value) => {
    const metricData = databaseMetrics[selectedMetric];
    const unit = metricData?.unit || '';
    return `$${value}${unit}`;
  };

  // Get available metrics from database
  const getMetrics = () => {
    return Object.keys(databaseMetrics);
  };

  // Context value
  const value = {
    selectedMetric,
    setSelectedMetric,
    getSelectedData,
    getInfoLines,
    formatValue,
    metrics: getMetrics(),
    isLoading: false
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
