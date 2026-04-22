jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: React.forwardRef(({ children, ...props }, ref) =>
      React.createElement('div', { ...props, ref }, children)
    ),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    Button: ({ children, onClick, ...props }) => React.createElement('button', { onClick, ...props }, children),
    Tooltip: ({ children }) => children,
  };
});

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_Warning_Icon.svg': '/warn.svg' },
  }),
}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const DetailedFindings = require('./DetailedFindings').default;

describe('DetailedFindings', () => {
  const findings = [
    { title: 'Finding A', section: 'Balance Sheet', usedFor: 'Compliance' },
    { title: 'Finding B', section: 'P&L', usedFor: 'Audit' },
  ];

  it('renders "Detailed Findings" heading', () => {
    render(React.createElement(DetailedFindings, { findings }));
    expect(screen.getByText('Detailed Findings')).toBeInTheDocument();
  });

  it('renders finding titles', () => {
    render(React.createElement(DetailedFindings, { findings }));
    expect(screen.getByText('Finding A')).toBeInTheDocument();
    expect(screen.getByText('Finding B')).toBeInTheDocument();
  });

  it('renders warning message when showWarning is true', () => {
    render(React.createElement(DetailedFindings, {
      findings,
      warningMessage: 'Caution required',
      showWarning: true,
    }));
    expect(screen.getByText('Caution required')).toBeInTheDocument();
  });

  it('renders with empty findings', () => {
    render(React.createElement(DetailedFindings, { findings: [] }));
    expect(screen.getByText('Detailed Findings')).toBeInTheDocument();
  });

  it('renders View buttons for each finding', () => {
    render(React.createElement(DetailedFindings, { findings }));
    const buttons = screen.getAllByText('View');
    expect(buttons.length).toBe(2);
  });
});
