jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
  };
});

jest.mock('recharts', () => {
  const React = require('react');
  return {
    AreaChart: ({ children }) => React.createElement('div', { 'data-testid': 'area-chart' }, children),
    Area: () => null,
    XAxis: () => null,
    YAxis: () => null,
    CartesianGrid: () => null,
    Tooltip: () => null,
    Legend: () => null,
    ResponsiveContainer: ({ children }) => React.createElement('div', null, children),
  };
});

jest.mock('../../context/ConfigContext', () => ({
  useVisualizationDataSet: () => ({
    title: 'Financial Drivers',
    data_points: [
      { quarter: 'Q1', revenue: 100, expenses: 80 },
      { quarter: 'Q2', revenue: 110, expenses: 90 },
    ],
  }),
}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const FinancialDriversChart = require('./FinancialDriversChart').default;

describe('FinancialDriversChart', () => {
  it('renders chart title', () => {
    render(React.createElement(FinancialDriversChart));
    expect(screen.getByText(/Quarter-by-quarter financial drivers/i)).toBeInTheDocument();
  });

  it('renders area chart', () => {
    render(React.createElement(FinancialDriversChart));
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });
});
