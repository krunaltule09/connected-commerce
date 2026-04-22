jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: new Proxy({}, {
      get: (_, tag) => React.forwardRef((props, ref) => {
        const { initial, animate, exit, variants, whileHover, whileTap, transition, layout, style, ...rest } = props;
        return React.createElement(tag, { ...rest, style, ref });
      }),
    }),
  };
});

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
    CircularProgress: () => React.createElement('div', { 'data-testid': 'spinner' }),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
  };
});

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_Chart_Background.svg': '/chart-bg.svg' },
  }),
}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const { ChartLoadingAnimation, AnimatedChartContainer, ChartBackground } = require('./ChartAnimations');

describe('ChartAnimations', () => {
  it('ChartLoadingAnimation renders progress text', () => {
    render(React.createElement(ChartLoadingAnimation, { progress: 45 }));
    expect(screen.getByText(/Analyzing financial data/)).toBeInTheDocument();
    expect(screen.getByText(/68% complete/)).toBeInTheDocument(); // 45 * 1.5 = 67.5 → 68
  });

  it('AnimatedChartContainer renders children', () => {
    render(React.createElement(AnimatedChartContainer, { metricKey: 'Revenue' },
      React.createElement('div', null, 'Chart Content')
    ));
    expect(screen.getByText('Chart Content')).toBeInTheDocument();
  });

  it('ChartBackground renders children', () => {
    render(React.createElement(ChartBackground, null,
      React.createElement('div', null, 'Inner Chart')
    ));
    expect(screen.getByText('Inner Chart')).toBeInTheDocument();
  });
});
