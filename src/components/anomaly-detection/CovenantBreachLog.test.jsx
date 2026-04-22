jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: React.forwardRef(({ children, component, src, alt, ...props }, ref) => {
      if (component === 'img') return React.createElement('img', { src, alt, ...props, ref });
      return React.createElement('div', { ...props, ref }, children);
    }),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    Grid: React.forwardRef(({ children, ...props }, ref) =>
      React.createElement('div', { ...props, ref }, children)
    ),
    Paper: ({ children, ...props }) => React.createElement('div', props, children),
  };
});

jest.mock('@mui/material/styles', () => ({
  styled: (Component) => () => {
    const React = require('react');
    return React.forwardRef((props, ref) => React.createElement(Component, { ...props, ref }));
  },
}));

jest.mock('../common/GradientButton', () => {
  const React = require('react');
  return ({ children, onClick, active }) =>
    React.createElement('button', { onClick, 'data-active': String(active) }, children);
});

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: {
      'Banking_Capital_Market_Operate_Table_Alert_Icon.svg': '/alert.svg',
      'Banking_Capital_Market_Operate_Table_Light_Circle_Outline.svg': '/circle.svg',
      'Banking_Capital_Market_Operate_Table_Arrow_Icon.svg': '/arrow.svg',
    },
  }),
}));

const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const CovenantBreachLog = require('./CovenantBreachLog').default;

describe('CovenantBreachLog', () => {
  const documents = [
    { id: 1, title: 'Loan Agreement', subtitle: 'Q2 2024' },
    { id: 2, title: 'Covenant Register', subtitle: 'Q2 2024' },
  ];

  it('renders "Covenant Breach Log" title', () => {
    render(React.createElement(CovenantBreachLog, { documents }));
    expect(screen.getByText('Covenant Breach Log')).toBeInTheDocument();
  });

  it('renders Explore Documents and Operational KPIs tabs', () => {
    render(React.createElement(CovenantBreachLog, { documents }));
    expect(screen.getByText('Explore Documents')).toBeInTheDocument();
    expect(screen.getByText('Operational KPIs')).toBeInTheDocument();
  });

  it('renders alert text', () => {
    render(React.createElement(CovenantBreachLog, { documents }));
    expect(screen.getByText(/DSCR = 1.1 in Q2/)).toBeInTheDocument();
  });

  it('renders document titles', () => {
    render(React.createElement(CovenantBreachLog, { documents }));
    expect(screen.getByText('Loan Agreement')).toBeInTheDocument();
    expect(screen.getByText('Covenant Register')).toBeInTheDocument();
  });

  it('renders View buttons', () => {
    render(React.createElement(CovenantBreachLog, { documents }));
    const viewButtons = screen.getAllByText('View');
    expect(viewButtons.length).toBe(2);
  });

  it('switches tab on click', () => {
    render(React.createElement(CovenantBreachLog, { documents }));
    fireEvent.click(screen.getByText('Operational KPIs'));
    // Tab state changes internally
  });
});
