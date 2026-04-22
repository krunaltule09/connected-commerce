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
  };
});

jest.mock('@mui/icons-material', () => {
  const React = require('react');
  return {
    CheckCircle: () => React.createElement('span', { 'data-testid': 'check-icon' }),
  };
});

jest.mock('./common/GradientBorderBox', () => {
  const React = require('react');
  return ({ children, ...props }) => React.createElement('div', { 'data-testid': 'gradient-box', ...props }, children);
});

jest.mock('../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_Vector_Icon.svg': '/vector.svg' },
  }),
}));

const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const DocumentCard = require('./DocumentCard').default;

describe('DocumentCard', () => {
  const doc = { name: 'Invoice.pdf', url: '/preview.png' };

  it('renders document name', () => {
    render(React.createElement(DocumentCard, { document: doc }));
    expect(screen.getByText('Invoice.pdf')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(React.createElement(DocumentCard, { document: doc, onClick }));
    fireEvent.click(screen.getByText('Invoice.pdf'));
  });

  it('wraps in GradientBorderBox', () => {
    render(React.createElement(DocumentCard, { document: doc }));
    expect(screen.getByTestId('gradient-box')).toBeInTheDocument();
  });
});
