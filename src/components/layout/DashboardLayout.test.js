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
    Container: ({ children }) => React.createElement('div', null, children),
    Grid: React.forwardRef(({ children, ...props }, ref) =>
      React.createElement('div', { ...props, ref }, children)
    ),
    Grow: ({ children }) => children,
    Fade: ({ children }) => children,
  };
});

jest.mock('./DashboardLayout.module.css', () => ({
  backgroundOverlay: 'bg',
  backgroundVideo: 'bgv',
  videoOverlay: 'vo',
}));

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: {
      'Banking_Capital_Market_Operate_Table_Background_Video': '/bg.mp4',
      'Banking_Capital_Market_Operate_Table_EY_Logo.svg': '/logo.svg',
      'Banking_Capital_Market_Operate_Table_Back_Button.svg': '/back.svg',
      'Banking_Capital_Market_Operate_Table_Next_Button.svg': '/next.svg',
    },
  }),
}));

const React = require('react');
const { render, screen, act } = require('@testing-library/react');
const DashboardLayout = require('./DashboardLayout').default;

describe('DashboardLayout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders sections', () => {
    render(React.createElement(DashboardLayout, {
      leftSection: React.createElement('div', null, 'Left'),
      middleSection: React.createElement('div', null, 'Middle'),
      rightSection: React.createElement('div', null, 'Right'),
      onBack: jest.fn(),
      onNext: jest.fn(),
    }));

    act(() => { jest.advanceTimersByTime(2000); });

    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Middle')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('renders EY logo', () => {
    render(React.createElement(DashboardLayout, {
      leftSection: null,
      middleSection: null,
      rightSection: null,
      onBack: jest.fn(),
      onNext: jest.fn(),
    }));

    act(() => { jest.advanceTimersByTime(2000); });

    const logo = document.querySelector('img[alt="EY Logo"]');
    expect(logo).toBeInTheDocument();
  });

  it('renders video background', () => {
    const { container } = render(React.createElement(DashboardLayout, {
      leftSection: null,
      middleSection: null,
      rightSection: null,
      onBack: jest.fn(),
      onNext: jest.fn(),
    }));

    expect(container.querySelector('video')).toBeInTheDocument();
  });
});
