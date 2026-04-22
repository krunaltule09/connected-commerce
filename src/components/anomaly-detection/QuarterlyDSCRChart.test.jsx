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
    BarChart: ({ children }) => React.createElement('div', { 'data-testid': 'bar-chart' }, children),
    Bar: () => null,
    XAxis: () => null,
    YAxis: () => null,
    Tooltip: () => null,
    ResponsiveContainer: ({ children }) => React.createElement('div', null, children),
  };
});

jest.mock('../../context/ConfigContext', () => ({
  useVisualizationDataSet: () => ({
    title: 'Quarterly DSCR Trend',
    data_points: [
      { quarter: 'Q1', dscr: 1.5, period: 'Jan-Mar' },
      { quarter: 'Q2', dscr: 1.1, period: 'Apr-Jun' },
    ],
    threshold: 1.25,
  }),
}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const QuarterlyDSCRChart = require('./QuarterlyDSCRChart').default;

describe('QuarterlyDSCRChart', () => {
  it('renders chart title', () => {
    render(React.createElement(QuarterlyDSCRChart));
    expect(screen.getByText(/Quarterly DSCR/i)).toBeInTheDocument();
  });

  it('renders bar chart', () => {
    render(React.createElement(QuarterlyDSCRChart));
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });
});
