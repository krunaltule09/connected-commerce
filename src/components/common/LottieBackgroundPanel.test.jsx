jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: React.forwardRef(({ children, ...props }, ref) =>
      React.createElement('div', { ...props, ref }, children)
    ),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    List: ({ children, ...props }) => React.createElement('ul', props, children),
    ListItem: ({ children, ...props }) => React.createElement('li', props, children),
    styled: (Component) => () => {
      const React = require('react');
      return React.forwardRef((props, ref) => React.createElement(Component, { ...props, ref }));
    },
  };
});

jest.mock('lottie-react', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: React.forwardRef((props, ref) =>
      React.createElement('div', { 'data-testid': 'lottie', ref })
    ),
  };
});

const React = require('react');
const { render, screen } = require('@testing-library/react');
const LottieBackgroundPanel = require('./LottieBackgroundPanel').default;

describe('LottieBackgroundPanel', () => {
  it('renders lottie animation', () => {
    render(React.createElement(LottieBackgroundPanel, {
      animationData: { v: '5.5.7' },
    }));
    expect(screen.getByTestId('lottie')).toBeInTheDocument();
  });

  it('renders bullet points', () => {
    render(React.createElement(LottieBackgroundPanel, {
      animationData: { v: '5.5.7' },
      bulletPoints: ['Alert A', 'Alert B'],
    }));
    expect(screen.getByText('Alert A')).toBeInTheDocument();
    expect(screen.getByText('Alert B')).toBeInTheDocument();
  });

  it('renders with empty bullet points', () => {
    const { container } = render(React.createElement(LottieBackgroundPanel, {
      animationData: { v: '5.5.7' },
      bulletPoints: [],
    }));
    expect(container).toBeTruthy();
  });
});
