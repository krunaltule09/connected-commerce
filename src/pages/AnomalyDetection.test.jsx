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
    Box: React.forwardRef(({ children, onClick, ...props }, ref) =>
      React.createElement('div', { onClick, ...props, ref }, children)
    ),
    Grid: React.forwardRef(({ children, ...props }, ref) =>
      React.createElement('div', { ...props, ref }, children)
    ),
    Fade: ({ children }) => children,
    Grow: ({ children }) => children,
  };
});

jest.mock('./AnomalyDetection.module.css', () => ({
  backgroundOverlay: 'bg',
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../services/NavigationService', () => ({
  __esModule: true,
  default: { getInstance: () => ({ publishNavigation: jest.fn() }) },
}));

jest.mock('../hooks', () => ({
  useButtonSound: () => jest.fn((fn) => fn),
}));

jest.mock('../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: {
      'Banking_Capital_Market_Operate_Table_EY_Logo.svg': '/logo.svg',
      'Banking_Capital_Market_Operate_Table_Back_Button.svg': '/back.svg',
      'Banking_Capital_Market_Operate_Table_Next_Button.svg': '/next.svg',
      'Banking_Capital_Market_Operate_Table_Background_Video': '/bg.mp4',
    },
  }),
  useVisualizationDataSet: (screen, viz) => {
    if (viz === 'AI Recommendations') return { recommendations: ['Alert 1', 'Alert 2'] };
    if (viz === 'Q3 Highlight') return { highlights: [{ title: 'Revenue Dip', description: 'Q3 drop' }] };
    return {};
  },
}));

jest.mock('../components/anomaly-detection/QuarterlyDSCRChart', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'dscr-chart' });
});

jest.mock('../components/anomaly-detection/FinancialDriversChart', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'drivers-chart' });
});

jest.mock('../components/common/GradientBorderBox', () => {
  const React = require('react');
  return ({ children }) => React.createElement('div', null, children);
});

jest.mock('../components/anomaly-detection/Q3Highlight', () => {
  const React = require('react');
  return ({ highlights }) => React.createElement('div', { 'data-testid': 'q3-highlight' }, `Highlights: ${highlights?.length || 0}`);
});

jest.mock('../components/anomaly-detection/AIRecommendationsWithGif', () => {
  const React = require('react');
  return ({ recommendations }) => React.createElement('div', { 'data-testid': 'ai-recs' }, `Recs: ${recommendations?.length || 0}`);
});

const React = require('react');
const { render, screen, act } = require('@testing-library/react');
const AnomalyDetection = require('./AnomalyDetection').default;

describe('AnomalyDetection', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('renders charts', () => {
    render(React.createElement(AnomalyDetection));
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByTestId('dscr-chart')).toBeInTheDocument();
    expect(screen.getByTestId('drivers-chart')).toBeInTheDocument();
  });

  it('renders Q3 Highlight section', () => {
    render(React.createElement(AnomalyDetection));
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByTestId('q3-highlight')).toBeInTheDocument();
  });

  it('renders AI Recommendations', () => {
    render(React.createElement(AnomalyDetection));
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByTestId('ai-recs')).toBeInTheDocument();
  });

  it('renders navigation text', () => {
    render(React.createElement(AnomalyDetection));
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
});
