jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
    Grow: ({ children }) => children,
  };
});

jest.mock('../anomaly-detection/AIRecommendations', () => {
  const React = require('react');
  return ({ recommendations }) =>
    React.createElement('div', { 'data-testid': 'ai-recs' }, `Recs: ${recommendations?.length || 0}`);
});

jest.mock('../../pages/operational-doc-scan/OperationalDocScan.module.css', () => ({}));

const React = require('react');
const { render, screen } = require('@testing-library/react');
const AIChip = require('./AIChip').default;

describe('AIChip', () => {
  it('renders AI recommendations', () => {
    render(React.createElement(AIChip, {
      scanProgress: 80,
      recommendations: ['Alert 1', 'Alert 2'],
    }));
    expect(screen.getByTestId('ai-recs')).toBeInTheDocument();
  });

  it('shows recommendation count', () => {
    render(React.createElement(AIChip, {
      scanProgress: 80,
      recommendations: ['A', 'B', 'C'],
    }));
    expect(screen.getByText('Recs: 3')).toBeInTheDocument();
  });
});
