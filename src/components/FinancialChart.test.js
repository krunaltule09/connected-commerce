jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    AnimatePresence: ({ children }) => React.createElement('div', null, children),
    motion: new Proxy({}, {
      get: (_, tag) => React.forwardRef((props, ref) => {
        const { initial, animate, exit, variants, whileHover, whileTap, transition, layout, ...rest } = props;
        return React.createElement(tag, { ...rest, ref });
      }),
    }),
  };
});

jest.mock('react-chartjs-2', () => {
  const React = require('react');
  return { Bar: React.forwardRef((props, ref) => React.createElement('canvas', { 'data-testid': 'bar-chart', ref })) };
});

jest.mock('chart.js', () => ({
  Chart: { register: jest.fn() },
  CategoryScale: {},
  LinearScale: {},
  BarElement: {},
  Title: {},
  Tooltip: {},
  Legend: {},
}));

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
    CircularProgress: () => React.createElement('div', { 'data-testid': 'spinner' }),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
  };
});

jest.mock('../context/ScanningContext', () => ({
  useScanning: () => ({ isFinancialDataReady: true, scanProgress: 100 }),
}));

jest.mock('../context/FinancialDataContext', () => ({
  useFinancialData: () => ({
    selectedMetric: 'Revenue',
    getSelectedData: () => [100, 200, 300],
    formatValue: (v) => `$${v}`,
  }),
}));

jest.mock('../hooks/useChartData', () => ({
  useChartData: () => ({ visibleData: [100, 200, 300], labels: ['Jan', 'Feb', 'Mar'] }),
}));

jest.mock('../utils/chartConfig', () => ({
  createChartDataset: (data) => ({ data, label: 'Revenue' }),
  createChartOptions: () => ({}),
}));

jest.mock('./common/ChartAnimations', () => {
  const React = require('react');
  return {
    ChartLoadingAnimation: ({ progress }) => React.createElement('div', { 'data-testid': 'loading' }, `${progress}%`),
    AnimatedChartContainer: ({ children }) => React.createElement('div', null, children),
    ChartBackground: ({ children }) => React.createElement('div', null, children),
  };
});

const React = require('react');
const { render, screen } = require('@testing-library/react');
const FinancialChart = require('./FinancialChart').default;

describe('FinancialChart', () => {
  it('renders bar chart when data ready', () => {
    render(React.createElement(FinancialChart));
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  it('renders loading when data not ready', () => {
    jest.spyOn(require('../context/ScanningContext'), 'useScanning').mockReturnValue({
      isFinancialDataReady: false,
      scanProgress: 45,
    });
    render(React.createElement(FinancialChart));
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
