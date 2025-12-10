import React, { createContext, useContext, useState } from 'react';
import { FINANCIAL_METRICS, formatMetricValue } from '../constants/financialData';

// Create the context
const FinancialDataContext = createContext();

// Provider component
export function FinancialDataProvider({ children }) {
  const [selectedMetric, setSelectedMetric] = useState('Revenue');

  // Get the data for the selected metric
  const getSelectedData = () => {
    return FINANCIAL_METRICS[selectedMetric] || [];
  };

  // Format value based on metric type
  const formatValue = (value) => {
    return formatMetricValue(selectedMetric, value);
  };

  // Context value
  const value = {
    selectedMetric,
    setSelectedMetric,
    getSelectedData,
    formatValue,
    metrics: Object.keys(FINANCIAL_METRICS)
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
