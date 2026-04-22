jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
  };
});

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('./OperationalDocScan.module.css', () => ({}));

jest.mock('../../hooks/useShipmentData', () => ({
  useShipmentData: () => ({
    shipments: [{ name: 'SH-001', promisedDate: '2024-01-15', actualDate: '2024-01-18', status: 'delayed' }],
    scanProgress: 80,
    revealStage: 4,
    scanComplete: false,
  }),
}));

jest.mock('../../context/ConfigContext', () => ({
  useVisualizationDataSet: (screen, viz) => {
    if (viz === 'AI Alert') return { message: 'Anomaly detected' };
    if (viz === 'Shipment Details') return { title: 'Shipment Details', columns: ['#', 'Promised', 'Actual', 'Status', 'Actions'] };
    return {};
  },
}));

jest.mock('../../components/operational-doc-scan/BackgroundOverlay', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'bg-overlay' });
});

jest.mock('../../components/operational-doc-scan/DocumentPreviewPanel', () => {
  const React = require('react');
  return ({ scanProgress }) => React.createElement('div', { 'data-testid': 'doc-preview' }, `${scanProgress}%`);
});

jest.mock('../../components/operational-doc-scan/ShipmentDetailsPanel', () => {
  const React = require('react');
  return ({ title }) => React.createElement('div', { 'data-testid': 'shipment-panel' }, title);
});

jest.mock('../../components/operational-doc-scan/KpiPanel', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'kpi-panel' });
});

jest.mock('../../components/operational-doc-scan/AIChip', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'ai-chip' });
});

jest.mock('../../components/operational-doc-scan/NavigationButtons', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'nav-buttons' });
});

jest.mock('../../components/operational-doc-scan/EyLogo', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'ey-logo' });
});

const React = require('react');
const { render, screen } = require('@testing-library/react');
const ModularOperationalDocScan = require('./ModularOperationalDocScan').default;

describe('ModularOperationalDocScan', () => {
  it('renders all modular components', () => {
    render(React.createElement(ModularOperationalDocScan));
    expect(screen.getByTestId('bg-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('doc-preview')).toBeInTheDocument();
    expect(screen.getByTestId('shipment-panel')).toBeInTheDocument();
    expect(screen.getByTestId('kpi-panel')).toBeInTheDocument();
    expect(screen.getByTestId('ai-chip')).toBeInTheDocument();
    expect(screen.getByTestId('nav-buttons')).toBeInTheDocument();
    expect(screen.getByTestId('ey-logo')).toBeInTheDocument();
  });

  it('passes scan progress to DocumentPreviewPanel', () => {
    render(React.createElement(ModularOperationalDocScan));
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('passes title to ShipmentDetailsPanel', () => {
    render(React.createElement(ModularOperationalDocScan));
    expect(screen.getByText('Shipment Details')).toBeInTheDocument();
  });
});
