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
    AnimatePresence: ({ children }) => children,
  };
});

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: React.forwardRef(({ children, component, src, alt, onClick, ...props }, ref) => {
      if (component === 'img') return React.createElement('img', { src, alt, onClick, ...props, ref });
      return React.createElement('div', { onClick, ...props, ref }, children);
    }),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    Grid: React.forwardRef(({ children, ...props }, ref) =>
      React.createElement('div', { ...props, ref }, children)
    ),
    Container: ({ children }) => React.createElement('div', null, children),
    Paper: ({ children, ...props }) => React.createElement('div', props, children),
    Fade: ({ children }) => children,
    Grow: ({ children }) => children,
    Slide: ({ children }) => children,
    Zoom: ({ children }) => children,
    styled: (Component) => () => {
      const React = require('react');
      return React.forwardRef((props, ref) => React.createElement(Component, { ...props, ref }));
    },
    keyframes: () => '',
  };
});

jest.mock('@mui/icons-material', () => {
  const React = require('react');
  const make = (name) => () => React.createElement('span', { 'data-testid': `icon-${name}` });
  return {
    ArticleOutlined: make('article'),
    ShieldOutlined: make('shield'),
    AssessmentOutlined: make('assessment'),
    DescriptionOutlined: make('description'),
    VerifiedUserOutlined: make('verified'),
    TrendingUpOutlined: make('trending'),
    ChatOutlined: make('chat'),
    LinkOutlined: make('link'),
  };
});

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../services/NavigationService', () => ({
  __esModule: true,
  default: { getInstance: () => ({ publishNavigation: jest.fn() }) },
}));

jest.mock('../components/common/GradientButton', () => {
  const React = require('react');
  return ({ children, onClick }) => React.createElement('button', { onClick }, children);
});

jest.mock('../components/common/HLSVideoPlayer', () => {
  const React = require('react');
  return () => React.createElement('video', { 'data-testid': 'hls-video' });
});

jest.mock('../hooks', () => ({
  useButtonSound: () => jest.fn((fn) => fn),
}));

jest.mock('../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: {
      'Banking_Capital_Market_Operate_Table_EY_Logo.svg': '/logo.svg',
      'Banking_Capital_Market_Operate_Table_Background_Video': '/bg.mp4',
    },
  }),
  useVisualizationDataSet: (screen, viz) => {
    if (viz === 'Page Header') return { main_title: 'Enterprise Loan Servicing', subtitle: 'Manage your portfolio' };
    if (viz === 'Activate Button') return { label: 'Activate', target: '/dashboard' };
    if (viz === 'Service Menu') return {
      services: [
        { name: 'Loan Agreement', icon: 'article' },
        { name: 'Covenant Register', icon: 'shield' },
      ],
    };
    return {};
  },
}));

const React = require('react');
const { render, screen, act } = require('@testing-library/react');
const EnterpriseLoanServicing = require('./EnterpriseLoanServicing').default;

describe('EnterpriseLoanServicing', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('renders page title', () => {
    render(React.createElement(EnterpriseLoanServicing));
    act(() => { jest.advanceTimersByTime(3000); });
    // Title is rendered letter by letter via animation
    const container = document.body;
    expect(container.textContent).toContain('Enterprise');
  });

  it('renders subtitle', () => {
    render(React.createElement(EnterpriseLoanServicing));
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText('Manage your portfolio')).toBeInTheDocument();
  });

  it('renders service menu items', () => {
    render(React.createElement(EnterpriseLoanServicing));
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText('Loan Agreement')).toBeInTheDocument();
    expect(screen.getByText('Covenant Register')).toBeInTheDocument();
  });

  it('renders activate button', () => {
    render(React.createElement(EnterpriseLoanServicing));
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText('Activate')).toBeInTheDocument();
  });
});
