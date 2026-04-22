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

jest.mock('../anomaly-detection/AIRecommendationsWithGif', () => {
  const React = require('react');
  return ({ bulletPoints }) =>
    React.createElement('div', { 'data-testid': 'ai-with-gif' }, `Items: ${bulletPoints?.length || 0}`);
});

jest.mock('../../assets/animations', () => ({
  ANIMATIONS: { aiAnimation: {} },
}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const AiRecommendationsSection = require('./AiRecommendationsSection').default;

describe('AiRecommendationsSection', () => {
  it('renders AIRecommendationsWithGif', () => {
    render(React.createElement(AiRecommendationsSection, { recommendations: ['Alert 1'] }));
    expect(screen.getByTestId('ai-with-gif')).toBeInTheDocument();
  });

  it('renders with empty recommendations', () => {
    render(React.createElement(AiRecommendationsSection, { recommendations: [] }));
    expect(screen.getByText('Items: 0')).toBeInTheDocument();
  });
});
