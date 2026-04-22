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
    Slide: ({ children }) => children,
  };
});

jest.mock('../common/GradientBorderBox', () => {
  const React = require('react');
  return ({ children }) => React.createElement('div', { 'data-testid': 'gradient-box' }, children);
});

jest.mock('../../pages/operational-doc-scan/OperationalDocScan.module.css', () => ({}));

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_Document_Preview.png': '/preview.png' },
  }),
}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const DocumentPreviewPanel = require('./DocumentPreviewPanel').default;

describe('DocumentPreviewPanel', () => {
  it('renders "Scanned Document Preview"', () => {
    render(React.createElement(DocumentPreviewPanel, { scanProgress: 50 }));
    expect(screen.getByText('Scanned Document Preview')).toBeInTheDocument();
  });

  it('shows "Analyzing" when not complete', () => {
    render(React.createElement(DocumentPreviewPanel, { scanProgress: 50 }));
    expect(screen.getByText('Analyzing')).toBeInTheDocument();
  });

  it('shows progress percentage', () => {
    render(React.createElement(DocumentPreviewPanel, { scanProgress: 75 }));
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('shows "Completed" at 100%', () => {
    render(React.createElement(DocumentPreviewPanel, { scanProgress: 100 }));
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });
});
