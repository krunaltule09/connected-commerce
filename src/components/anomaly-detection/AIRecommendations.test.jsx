jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('../../assets/animations', () => ({
  ANIMATIONS: { aiAnimation: { v: '5.5.7' } },
}));

jest.mock('../common/LottieBackgroundPanel', () => {
  const React = require('react');
  return ({ bulletPoints }) =>
    React.createElement('div', { 'data-testid': 'lottie-panel' }, `Points: ${bulletPoints?.length || 0}`);
});

const React = require('react');
const { render, screen } = require('@testing-library/react');
const AIRecommendations = require('./AIRecommendations').default;

describe('AIRecommendations', () => {
  it('renders LottieBackgroundPanel with recommendations', () => {
    render(React.createElement(AIRecommendations, {
      recommendations: ['Alert 1', 'Alert 2'],
    }));
    expect(screen.getByTestId('lottie-panel')).toBeInTheDocument();
    expect(screen.getByText('Points: 2')).toBeInTheDocument();
  });

  it('renders with empty recommendations', () => {
    render(React.createElement(AIRecommendations, { recommendations: [] }));
    expect(screen.getByText('Points: 0')).toBeInTheDocument();
  });
});
