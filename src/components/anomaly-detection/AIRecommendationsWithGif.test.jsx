jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('../common/GifBackgroundPanel', () => {
  const React = require('react');
  return ({ bulletPoints, size }) =>
    React.createElement('div', { 'data-testid': 'gif-panel' }, `Points: ${bulletPoints?.length || 0}, Size: ${size}`);
});

const React = require('react');
const { render, screen } = require('@testing-library/react');
const AIRecommendationsWithGif = require('./AIRecommendationsWithGif').default;

describe('AIRecommendationsWithGif', () => {
  it('renders GifBackgroundPanel with recommendations', () => {
    render(React.createElement(AIRecommendationsWithGif, {
      recommendations: ['Alert 1', 'Alert 2'],
    }));
    expect(screen.getByTestId('gif-panel')).toBeInTheDocument();
    expect(screen.getByText('Points: 2, Size: medium')).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    render(React.createElement(AIRecommendationsWithGif, {
      recommendations: ['Alert'],
      size: 'large',
    }));
    expect(screen.getByText('Points: 1, Size: large')).toBeInTheDocument();
  });
});
