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
    List: ({ children, ...props }) => React.createElement('ul', props, children),
    ListItem: ({ children, ...props }) => React.createElement('li', props, children),
    styled: (Component) => () => {
      const React = require('react');
      return React.forwardRef((props, ref) => React.createElement(Component, { ...props, ref }));
    },
  };
});

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_AI_Animation.gif': '/ai.gif' },
  }),
}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const GifBackgroundPanel = require('./GifBackgroundPanel').default;

describe('GifBackgroundPanel', () => {
  it('renders without bullet points', () => {
    const { container } = render(React.createElement(GifBackgroundPanel));
    expect(container).toBeTruthy();
  });

  it('renders bullet points', () => {
    render(React.createElement(GifBackgroundPanel, {
      bulletPoints: ['Point 1', 'Point 2'],
    }));
    expect(screen.getByText('Point 1')).toBeInTheDocument();
    expect(screen.getByText('Point 2')).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    const { container } = render(React.createElement(GifBackgroundPanel, {
      bulletPoints: ['Item'],
      size: 'large',
    }));
    expect(container).toBeTruthy();
  });
});
