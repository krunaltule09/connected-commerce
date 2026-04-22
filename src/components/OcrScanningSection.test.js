jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: new Proxy({}, {
      get: (_, tag) => React.forwardRef((props, ref) => {
        const { initial, animate, exit, variants, whileHover, whileTap, transition, layout, ...rest } = props;
        return React.createElement(tag, { ...rest, ref });
      }),
    }),
  };
});

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: React.forwardRef(({ children, component, src, alt, ...props }, ref) => {
      if (component === 'img') return React.createElement('img', { src, alt, ...props, ref });
      return React.createElement('div', { ...props, ref }, children);
    }),
    Stack: ({ children, ...props }) => React.createElement('div', props, children),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    Fade: ({ children }) => children,
    Grow: ({ children }) => children,
    Slide: ({ children }) => children,
  };
});

jest.mock('./common/GradientBorderBox', () => {
  const React = require('react');
  return ({ children }) => React.createElement('div', { 'data-testid': 'gradient-box' }, children);
});

jest.mock('../context/ScanningContext', () => ({
  useScanning: () => ({ scanProgress: 50, isComplete: false }),
}));

jest.mock('../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_Document_Background.svg': '/doc-bg.svg' },
  }),
  useVisualizationDataSet: () => ({ title: 'OCR Scanning' }),
}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const OcrScanningSection = require('./OcrScanningSection').default;

describe('OcrScanningSection', () => {
  it('renders OCR title', () => {
    render(React.createElement(OcrScanningSection));
    expect(screen.getByText('OCR Scanning')).toBeInTheDocument();
  });

  it('renders the gradient border box', () => {
    render(React.createElement(OcrScanningSection));
    const boxes = screen.getAllByTestId('gradient-box');
    expect(boxes.length).toBeGreaterThanOrEqual(1);
  });
});
