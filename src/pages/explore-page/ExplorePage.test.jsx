jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: React.forwardRef(({ children, onClick, ...props }, ref) =>
      React.createElement('div', { onClick, ...props, ref }, children)
    ),
  };
});

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_Background_Video': '/bg.mp4' },
  }),
}));

jest.mock('./ExplorePage.module.css', () => ({}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const ExplorePage = require('./ExplorePage').default;

describe('ExplorePage', () => {
  it('renders "Explore Now" text', () => {
    render(React.createElement(ExplorePage));
    expect(screen.getByText('Explore Now')).toBeInTheDocument();
  });

  it('renders contact SPOC text', () => {
    render(React.createElement(ExplorePage));
    expect(screen.getByText(/Need Help/)).toBeInTheDocument();
  });
});
