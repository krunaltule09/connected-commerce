jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: new Proxy({}, {
      get: (_, tag) => React.forwardRef((props, ref) => {
        const { initial, animate, exit, variants, whileHover, whileTap, transition, layout, ...rest } = props;
        return React.createElement(tag, { ...rest, ref });
      }),
    }),
    AnimatePresence: ({ children }) => children,
  };
});

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
    Stack: ({ children, ...props }) => React.createElement('div', props, children),
    Grid: React.forwardRef(({ children, ...props }, ref) =>
      React.createElement('div', { ...props, ref }, children)
    ),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    CircularProgress: () => React.createElement('div', { 'data-testid': 'spinner' }),
    Fade: ({ children }) => children,
    Slide: ({ children }) => children,
    Tooltip: ({ children }) => children,
  };
});

jest.mock('./common/GradientBorderBox', () => {
  const React = require('react');
  return ({ children }) => React.createElement('div', null, children);
});

jest.mock('./common/GradientButton', () => {
  const React = require('react');
  return ({ children, onClick, active }) =>
    React.createElement('button', { onClick, 'data-active': active }, children);
});

jest.mock('./FinancialChart', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'chart' });
});

jest.mock('./ChartBreakdown', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'breakdown' });
});

jest.mock('../context/ScanningContext', () => ({
  useScanning: () => ({ isFinancialDataReady: true, scanProgress: 100 }),
}));

jest.mock('../context/FinancialDataContext', () => ({
  useFinancialData: () => ({
    metrics: ['Revenue', 'EBITDA', 'Debt'],
    selectedMetric: 'Revenue',
    setSelectedMetric: jest.fn(),
  }),
}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const FinancialMetricsSection = require('./FinancialMetricsSection').default;

describe('FinancialMetricsSection', () => {
  it('renders "Extracted Key Metrics" title', () => {
    render(React.createElement(FinancialMetricsSection));
    expect(screen.getByText('Extracted Key Metrics')).toBeInTheDocument();
  });

  it('renders metric buttons', () => {
    render(React.createElement(FinancialMetricsSection));
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('EBITDA')).toBeInTheDocument();
    expect(screen.getByText('Debt')).toBeInTheDocument();
  });

  it('renders the chart', () => {
    render(React.createElement(FinancialMetricsSection));
    expect(screen.getByTestId('chart')).toBeInTheDocument();
  });

  it('renders the breakdown', () => {
    render(React.createElement(FinancialMetricsSection));
    expect(screen.getByTestId('breakdown')).toBeInTheDocument();
  });

  it('shows spinner when data not ready', () => {
    jest.spyOn(require('../context/ScanningContext'), 'useScanning').mockReturnValue({
      isFinancialDataReady: false,
      scanProgress: 45,
    });
    render(React.createElement(FinancialMetricsSection));
    expect(screen.getByText(/45%/)).toBeInTheDocument();
  });
});
