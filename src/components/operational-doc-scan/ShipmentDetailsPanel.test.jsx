jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
    Grow: ({ children }) => children,
    Slide: ({ children }) => children,
  };
});

jest.mock('../common/GradientBorderBox', () => {
  const React = require('react');
  return ({ children }) => React.createElement('div', { 'data-testid': 'gradient-box' }, children);
});

jest.mock('../../pages/operational-doc-scan/OperationalDocScan.module.css', () => ({}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const ShipmentDetailsPanel = require('./ShipmentDetailsPanel').default;

describe('ShipmentDetailsPanel', () => {
  const shipments = [
    { name: 'SH-001', promisedDate: '2024-01-15', actualDate: '2024-01-18', status: 'delayed' },
  ];

  it('renders title', () => {
    render(React.createElement(ShipmentDetailsPanel, {
      revealStage: 4,
      shipments,
      scanProgress: 100,
      title: 'Shipment Details',
      columns: ['Shipment #', 'Promised', 'Actual', 'Status', 'Actions'],
    }));
    expect(screen.getByText('Shipment Details')).toBeInTheDocument();
  });

  it('renders shipment data', () => {
    render(React.createElement(ShipmentDetailsPanel, {
      revealStage: 4,
      shipments,
      scanProgress: 100,
      title: 'Shipment Details',
      columns: ['Shipment #', 'Promised', 'Actual', 'Status', 'Actions'],
    }));
    expect(screen.getByText('SH-001')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(React.createElement(ShipmentDetailsPanel, {
      revealStage: 4,
      shipments,
      scanProgress: 100,
      title: 'Shipment Details',
      columns: ['Shipment #', 'Promised', 'Actual', 'Status', 'Actions'],
    }));
    expect(screen.getByText('Shipment #')).toBeInTheDocument();
  });
});
