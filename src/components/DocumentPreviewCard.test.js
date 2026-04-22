jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: React.forwardRef(({ children, component, src, alt, ...props }, ref) => {
      if (component === 'img') return React.createElement('img', { src, alt, ...props, ref });
      return React.createElement('div', { ...props, ref }, children);
    }),
    Card: ({ children, ...props }) => React.createElement('div', { 'data-testid': 'card', ...props }, children),
    CardContent: ({ children }) => React.createElement('div', null, children),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    Grid: ({ children, ...props }) => React.createElement('div', props, children),
  };
});

jest.mock('@mui/icons-material', () => ({
  AddRounded: () => {
    const React = require('react');
    return React.createElement('span', { 'data-testid': 'add-icon' });
  },
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: {
      'Banking_Capital_Market_Operate_Table_Document_Preview_1.svg': '/p1.svg',
      'Banking_Capital_Market_Operate_Table_Document_Preview_2.svg': '/p2.svg',
      'Banking_Capital_Market_Operate_Table_Document_Preview_3.svg': '/p3.svg',
    },
  }),
}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const DocumentPreviewCard = require('./DocumentPreviewCard').default;

describe('DocumentPreviewCard', () => {
  it('renders Document Preview title', () => {
    render(React.createElement(DocumentPreviewCard));
    expect(screen.getByText('Document Preview')).toBeInTheDocument();
  });

  it('renders the card', () => {
    render(React.createElement(DocumentPreviewCard));
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('shows drag & drop UI', () => {
    render(React.createElement(DocumentPreviewCard));
    expect(screen.getByText(/Drag & Drop/)).toBeInTheDocument();
  });
});
