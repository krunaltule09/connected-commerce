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
      if (component === 'img') return React.createElement('img', { src, alt, ...props, ref });
      return React.createElement('div', { onClick, ...props, ref }, children);
    }),
    Button: ({ children, onClick, ...props }) => React.createElement('button', { onClick, ...props }, children),
    Container: ({ children }) => React.createElement('div', null, children),
    Fade: ({ children }) => children,
    Grow: ({ children }) => children,
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    Checkbox: (props) => React.createElement('input', { type: 'checkbox', ...props }),
    FormControlLabel: ({ label, control, ...props }) => React.createElement('label', props, control, label),
  };
});

jest.mock('@mui/material/styles', () => ({
  styled: (component) => () => {
    const React = require('react');
    return ({ children, onClick, ...props }) => React.createElement('div', { onClick, ...props }, children);
  },
}));

jest.mock('../components/DeliveryOptionsSvg', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'delivery-svg' });
});

jest.mock('../components/RatingComponentSvg', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'rating-svg' });
});

jest.mock('../hooks', () => ({
  useButtonSound: (fn) => fn,
}));

jest.mock('../context/ConfigContext', () => ({
  useConfig: () => ({ assets: {} }),
  useVisualizationDataSet: () => ({
    cta_label: 'Back to Home',
    cta_target: '/',
  }),
}));

jest.mock('lottie-react', () => {
  const React = require('react');
  return React.forwardRef((props, ref) => React.createElement('div', { 'data-testid': 'lottie', ref }));
});

jest.mock('../assets/animations', () => ({
  ANIMATIONS: { feedbackAnimation: {} },
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const React = require('react');
const { render, screen, fireEvent, act } = require('@testing-library/react');
const FeedbackPage = require('./FeedbackPage').default;

describe('FeedbackPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    render(React.createElement(FeedbackPage));
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });

  it('renders success tick image', () => {
    render(React.createElement(FeedbackPage));
    expect(screen.getByAltText('Success')).toBeInTheDocument();
  });

  it('navigates home on back button click', () => {
    render(React.createElement(FeedbackPage));
    fireEvent.click(screen.getByText('Back to Home'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('shows delivery and rating cards after timer', () => {
    render(React.createElement(FeedbackPage));

    act(() => {
      jest.advanceTimersByTime(5500);
    });

    expect(screen.getByText('Delivery options')).toBeInTheDocument();
    expect(screen.getByText('Rate us')).toBeInTheDocument();
  });
});
