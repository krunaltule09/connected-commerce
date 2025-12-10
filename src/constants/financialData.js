/**
 * Financial metrics data for the dashboard charts
 */

export const FINANCIAL_METRICS = {
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

/**
 * Metric units for formatting values
 */
export const METRIC_UNITS = {
  'Revenue': 'B',
  'EBITDA': 'B',
  'Debt': 'B',
  'Equity': 'B',
  'Interest': 'M',
  'Expense': 'M'
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
