import React, { createContext, useContext, useState } from 'react';

// Financial data for each metric
const financialData = {
  'Revenue': [
    ["2019", 10.2],
    ["2020", 10.8],
    ["2021", 11.5],
    ["2022", 12],
    ["2023", 12.5]
  ],
  'EBITDA': [
    ["2019", 0.9],
    ["2020", 1],
    ["2021", 1.05],
    ["2022", 1.1],
    ["2023", 1.2]
  ],
  'Debt': [
    ["2019", 3.2],
    ["2020", 3.4],
    ["2021", 3.5],
    ["2022", 3.7],
    ["2023", 3.8]
  ],
  'Equity': [
    ["2019", 1],
    ["2020", 1.05],
    ["2021", 1.1],
    ["2022", 1.15],
    ["2023", 1.2]
  ],
  'Interest': [
    ["2019", 180],
    ["2020", 190],
    ["2021", 195],
    ["2022", 205],
    ["2023", 210]
  ],
  'Expense': [
    ["2019", 120],
    ["2020", 125],
    ["2021", 130],
    ["2022", 135],
    ["2023", 140]
  ]
};

// Create the context
const FinancialDataContext = createContext();

// Provider component
export function FinancialDataProvider({ children }) {
  const [selectedMetric, setSelectedMetric] = useState('Revenue');

  // Get the data for the selected metric
  const getSelectedData = () => {
    return financialData[selectedMetric] || [];
  };

  // Format value based on metric type
  const formatValue = (value) => {
    if (selectedMetric === 'Interest' || selectedMetric === 'Expense') {
      return `$${value}M`;
    }
    return `$${value}B`;
  };

  // Context value
  const value = {
    selectedMetric,
    setSelectedMetric,
    getSelectedData,
    formatValue,
    metrics: Object.keys(financialData)
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
