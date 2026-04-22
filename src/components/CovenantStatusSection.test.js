jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Stack: ({ children, ...props }) => React.createElement('div', props, children),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    Box: React.forwardRef(({ children, ...props }, ref) =>
      React.createElement('div', { ...props, ref }, children)
    ),
    CircularProgress: () => React.createElement('div', { 'data-testid': 'spinner' }),
    Fade: ({ children, in: show }) => (show ? children : null),
    Skeleton: () => React.createElement('div', { 'data-testid': 'skeleton' }),
  };
});

jest.mock('./common/GradientBorderBox', () => {
  const React = require('react');
  return ({ children }) => React.createElement('div', { 'data-testid': 'gradient-box' }, children);
});

jest.mock('./CovenantTile', () => {
  const React = require('react');
  return ({ covenant }) => React.createElement('div', { 'data-testid': 'covenant-tile' }, covenant.name);
});

const mockUseScanning = jest.fn();
const mockUseVisualizationDataSet = jest.fn();

jest.mock('../context/ScanningContext', () => ({
  useScanning: () => mockUseScanning(),
}));

jest.mock('../context/ConfigContext', () => ({
  useVisualizationDataSet: (...args) => mockUseVisualizationDataSet(...args),
}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const CovenantStatusSection = require('./CovenantStatusSection').default;

describe('CovenantStatusSection', () => {
  beforeEach(() => {
    mockUseVisualizationDataSet.mockReturnValue({
      title: 'Covenant Status',
      covenants: [
        { name: 'Debt/EBITDA', value: '3.5x', status: 'alert', indicator: 'Warning' },
        { name: 'Interest Coverage', value: '2.0x', status: 'ok', indicator: 'OK' },
      ],
    });
  });

  it('shows loading state when covenant data not ready', () => {
    mockUseScanning.mockReturnValue({ isCovenantDataReady: false, scanProgress: 30 });
    render(React.createElement(CovenantStatusSection));
    expect(screen.getByText('Analyzing covenant data...')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('shows covenant tiles when data is ready', () => {
    mockUseScanning.mockReturnValue({ isCovenantDataReady: true, scanProgress: 100 });
    render(React.createElement(CovenantStatusSection));
    const tiles = screen.getAllByTestId('covenant-tile');
    expect(tiles).toHaveLength(2);
    expect(screen.getByText('Debt/EBITDA')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    mockUseScanning.mockReturnValue({ isCovenantDataReady: true, scanProgress: 100 });
    render(React.createElement(CovenantStatusSection));
    expect(screen.getByText('Covenant Status')).toBeInTheDocument();
  });

  it('uses fallback title if data_set has none', () => {
    mockUseVisualizationDataSet.mockReturnValue({ covenants: [] });
    mockUseScanning.mockReturnValue({ isCovenantDataReady: true, scanProgress: 100 });
    render(React.createElement(CovenantStatusSection));
    expect(screen.getByText('Covenant Status')).toBeInTheDocument();
  });

  it('calls useVisualizationDataSet with correct args', () => {
    mockUseScanning.mockReturnValue({ isCovenantDataReady: false, scanProgress: 0 });
    render(React.createElement(CovenantStatusSection));
    expect(mockUseVisualizationDataSet).toHaveBeenCalledWith('financial_dashboard', 'Covenant Status');
  });
});
