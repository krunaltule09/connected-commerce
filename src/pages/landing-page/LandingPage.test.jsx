jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: React.forwardRef(({ children, component, src, alt, onClick, ...props }, ref) => {
      if (component === 'img') return React.createElement('img', { src, alt, ...props, ref });
      return React.createElement('div', { onClick, ...props, ref }, children);
    }),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    Fade: ({ children }) => children,
    Zoom: ({ children }) => children,
  };
});

jest.mock('./LandingPage.module.css', () => ({
  landingPage: 'landingPage',
  backgroundOverlay: 'bg',
  backgroundVideo: 'bgv',
  videoOverlay: 'vo',
  contentFrame: 'cf',
  textFrame: 'tf',
  innerTextFrame: 'itf',
  heading: 'heading',
  subheading: 'subheading',
  startJourneyButton: 'sjb',
  buttonText: 'bt',
  eyLogo: 'el',
}));

jest.mock('../../services/NavigationService', () => ({
  __esModule: true,
  default: { navigateToOperateExperience: jest.fn().mockResolvedValue({}) },
}));

jest.mock('../../hooks', () => ({
  useButtonSound: (fn) => fn,
}));

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: {
      'Banking_Capital_Market_Operate_Table_Landing_Page_Video': '/bg.mp4',
      'Banking_Capital_Market_Operate_Table_EY_Logo.svg': '/logo.svg',
    },
  }),
  useVisualizationDataSet: () => ({
    heading: 'Welcome to BCM',
    subheading: 'Operate Experience',
    cta_label: 'Start Journey',
    cta_target: '/explore',
  }),
}));

jest.mock('../../components/common/HLSVideoPlayer', () => {
  const React = require('react');
  return () => React.createElement('video', { 'data-testid': 'hls-video' });
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const LandingPage = require('./LandingPage').default;

describe('LandingPage', () => {
  it('renders heading', () => {
    render(React.createElement(LandingPage));
    expect(screen.getByText('Welcome to BCM')).toBeInTheDocument();
  });

  it('renders subheading', () => {
    render(React.createElement(LandingPage));
    expect(screen.getByText('Operate Experience')).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    render(React.createElement(LandingPage));
    expect(screen.getByText('Start Journey')).toBeInTheDocument();
  });

  it('renders EY logo', () => {
    const { container } = render(React.createElement(LandingPage));
    const logo = container.querySelector('img[alt="EY Logo"]');
    expect(logo).toBeInTheDocument();
  });

  it('navigates on CTA click', () => {
    render(React.createElement(LandingPage));
    fireEvent.click(screen.getByText('Start Journey'));
    expect(mockNavigate).toHaveBeenCalledWith('/explore');
  });

  it('renders HLS video player', () => {
    render(React.createElement(LandingPage));
    expect(screen.getByTestId('hls-video')).toBeInTheDocument();
  });
});
