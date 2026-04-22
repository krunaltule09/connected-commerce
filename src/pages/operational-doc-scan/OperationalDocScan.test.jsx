jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: React.forwardRef(({ children, onClick, ...props }, ref) =>
      React.createElement('div', { onClick, ...props, ref }, children)
    ),
    Grow: ({ children }) => children,
    Zoom: ({ children }) => children,
  };
});

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../../components/common/GradientBorderBox', () => {
  const React = require('react');
  return ({ children }) => React.createElement('div', null, children);
});

jest.mock('../../components/anomaly-detection/AIRecommendationsWithGif', () => {
  const React = require('react');
  return ({ recommendations }) =>
    React.createElement('div', { 'data-testid': 'ai-recs' });
});

jest.mock('../../components/operational-doc-scan/NavigationButtons', () => {
  const React = require('react');
  return ({ handleGoBack, handleNextStep }) =>
    React.createElement('div', null,
      React.createElement('button', { onClick: handleGoBack }, 'Back'),
      React.createElement('button', { onClick: handleNextStep }, 'Next')
    );
});

jest.mock('../../components/OcrScanningSection', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'ocr-section' });
});

jest.mock('../../components/y14-report/DetailedFindings', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'findings' });
});

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: {
      'Banking_Capital_Market_Operate_Table_EY_Logo.svg': '/logo.svg',
      'Banking_Capital_Market_Operate_Table_Background_Video': '/bg.mp4',
    },
  }),
  useVisualizationDataSet: (screen, viz) => {
    if (viz === 'AI Alert') return { message: 'Anomaly detected' };
    if (viz === 'Operational Findings') return { findings: [{ title: 'Finding A' }] };
    if (viz === 'Shipment Details') return {
      rows: [{ shipment: 'SH-001', promised: '2024-01-15', actual: '2024-01-18', status: 'Delayed' }],
    };
    return {};
  },
}));

jest.mock('./OperationalDocScan.module.css', () => ({}));

jest.mock('../../hooks', () => ({
  useButtonSound: () => jest.fn((fn) => fn),
}));

const React = require('react');
const { render, screen, act } = require('@testing-library/react');
const OperationalDocScan = require('./OperationalDocScan').default;

describe('OperationalDocScan', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('renders Shipment Details title', () => {
    render(React.createElement(OperationalDocScan));
    act(() => { jest.advanceTimersByTime(5000); });
    expect(screen.getByText('Shipment Details')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(React.createElement(OperationalDocScan));
    act(() => { jest.advanceTimersByTime(5000); });
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('renders OCR scanning section', () => {
    render(React.createElement(OperationalDocScan));
    expect(screen.getByTestId('ocr-section')).toBeInTheDocument();
  });
});
