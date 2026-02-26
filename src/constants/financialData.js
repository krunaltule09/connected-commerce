/**
 * Financial metrics data for the dashboard charts
 */

export const FINANCIAL_METRICS = {
  'Revenue': [
    ["Jan", 10.2],
    ["Feb", 10.8],
    ["Mar", 11.5],
    ["Apr", 12],
    ["May", 12.5]
  ],
  'EBITDA': [
    ["Jan", 0.9],
    ["Feb", 1],
    ["Mar", 1.05],
    ["Apr", 1.1],
    ["May", 1.2]
  ],
  'Debt': [
    ["Jan", 3.2],
    ["Feb", 3.4],
    ["Mar", 3.5],
    ["Apr", 3.7],
    ["May", 3.8]
  ],
  'Equity': [
    ["Jan", 1],
    ["Feb", 1.05],
    ["Mar", 1.1],
    ["Apr", 1.15],
    ["May", 1.2]
  ],
  'Interest Expense': [
    ["Jan", 180],
    ["Feb", 190],
    ["Mar", 195],
    ["Apr", 205],
    ["May", 210]
  ]
};

/**
 * Metric units for formatting values
 */
export const METRIC_UNITS = {
  'Revenue': 'B',
  'EBITDA': 'B',
  'Debt': 'B',
  'Equity': 'B',
  'Interest Expense': 'M',
};

/**
 * Format a value based on its metric type
 * @param {string} metric - The metric type
 * @param {number} value - The value to format
 * @returns {string} - Formatted value with appropriate unit
 */
export const formatMetricValue = (metric, value) => {
  const unit = METRIC_UNITS[metric] || '';
  return `$${value}${unit}`;
};
