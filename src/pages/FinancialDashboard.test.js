jest.mock('axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn().mockResolvedValue({ data: {} }),
    create: jest.fn(() => ({ get: jest.fn(), post: jest.fn(), defaults: { baseURL: '' } })),
  },
}));

jest.mock('../components/OcrScanningSection', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'ocr-section' });
});

jest.mock('../components/FinancialMetricsSection', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'metrics-section' });
});

jest.mock('../components/layout/DashboardLayout', () => {
  const React = require('react');
  return ({ leftSection, middleSection, rightSection, onBack, onNext }) =>
    React.createElement('div', { 'data-testid': 'dashboard-layout' },
      leftSection,
      middleSection,
      rightSection,
      React.createElement('button', { onClick: onBack, 'data-testid': 'back-btn' }, 'Back'),
      React.createElement('button', { onClick: onNext, 'data-testid': 'next-btn' }, 'Next')
    );
});

jest.mock('../components/dashboard/RightSection', () => {
  const React = require('react');
  return ({ recommendations }) => React.createElement('div', { 'data-testid': 'right-section' });
});

jest.mock('../services/NavigationService', () => ({
  __esModule: true,
  default: { navigateToOperateExperience: jest.fn().mockResolvedValue({}) },
}));

jest.mock('../hooks', () => ({
  useButtonSound: (fn) => fn,
}));

jest.mock('../context/ConfigContext', () => ({
  useVisualizationDataSet: () => ({
    alerts: ['Alert 1', 'Alert 2'],
  }),
}));

jest.mock('../context/ScanningContext', () => ({
  ScanningProvider: ({ children }) => children,
  useScanning: () => ({ scanProgress: 0, isFinancialDataReady: false, isCovenantDataReady: false }),
}));

jest.mock('../context/FinancialDataContext', () => ({
  useFinancialData: () => ({
    selectedMetric: 'Revenue',
    metrics: ['Revenue'],
    setSelectedMetric: jest.fn(),
    getSelectedData: () => [],
    getInfoLines: () => [],
    formatValue: (v) => `$${v}`,
    isLoading: false,
  }),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const FinancialDashboard = require('./FinancialDashboard').default;

describe('FinancialDashboard', () => {
  it('renders DashboardLayout', () => {
    render(React.createElement(FinancialDashboard));
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
  });

  it('renders child sections', () => {
    render(React.createElement(FinancialDashboard));
    expect(screen.getByTestId('ocr-section')).toBeInTheDocument();
    expect(screen.getByTestId('metrics-section')).toBeInTheDocument();
    expect(screen.getByTestId('right-section')).toBeInTheDocument();
  });

  it('navigates to anomaly-detection on Next', () => {
    render(React.createElement(FinancialDashboard));
    fireEvent.click(screen.getByTestId('next-btn'));
    expect(mockNavigate).toHaveBeenCalledWith('/anomaly-detection');
  });

  it('navigates to document-centre on Back', () => {
    render(React.createElement(FinancialDashboard));
    fireEvent.click(screen.getByTestId('back-btn'));
    expect(mockNavigate).toHaveBeenCalledWith('/document-centre');
  });
});
