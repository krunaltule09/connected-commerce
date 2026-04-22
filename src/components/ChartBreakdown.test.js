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
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
  };
});

jest.mock('../context/ScanningContext', () => ({
  useScanning: () => ({ isFinancialDataReady: true }),
}));

jest.mock('../context/FinancialDataContext', () => ({
  useFinancialData: () => ({
    selectedMetric: 'Revenue',
    getInfoLines: () => ['Revenue grew 15% YoY', 'Above covenant threshold'],
  }),
}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const ChartBreakdown = require('./ChartBreakdown').default;

describe('ChartBreakdown', () => {
  it('renders covenant insights title', () => {
    render(React.createElement(ChartBreakdown));
    expect(screen.getByText(/Revenue – Covenant Insights/)).toBeInTheDocument();
  });

  it('renders info lines', () => {
    render(React.createElement(ChartBreakdown));
    expect(screen.getByText('Revenue grew 15% YoY')).toBeInTheDocument();
    expect(screen.getByText('Above covenant threshold')).toBeInTheDocument();
  });
});
