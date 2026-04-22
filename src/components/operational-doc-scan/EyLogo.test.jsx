jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: React.forwardRef(({ children, component, src, alt, onClick, ...props }, ref) => {
      if (component === 'img') return React.createElement('img', { src, alt, onClick, ...props, ref });
      return React.createElement('div', { onClick, ...props, ref }, children);
    }),
    Zoom: ({ children }) => children,
  };
});

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../../hooks', () => ({
  useButtonSound: () => jest.fn((fn) => fn),
}));

jest.mock('../../pages/operational-doc-scan/OperationalDocScan.module.css', () => ({}));

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_EY_Logo.svg': '/logo.svg' },
  }),
}));

const React = require('react');
const { render } = require('@testing-library/react');
const EyLogo = require('./EyLogo').default;

describe('EyLogo', () => {
  it('renders logo image', () => {
    const { container } = render(React.createElement(EyLogo));
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
  });
});
