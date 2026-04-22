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

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_Scan_Video': '/scan.mp4' },
  }),
}));

jest.mock('./DocumentScan.module.css', () => ({}));

const React = require('react');
const { render } = require('@testing-library/react');
const DocumentScan = require('./DocumentScan').default;

describe('DocumentScan', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('renders video element', () => {
    const { container } = render(React.createElement(DocumentScan));
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    const { container } = render(React.createElement(DocumentScan));
    expect(container).toBeTruthy();
  });
});
