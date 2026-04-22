jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
  };
});

jest.mock('./AiRecommendationsSection', () => {
  const React = require('react');
  return ({ recommendations }) =>
    React.createElement('div', { 'data-testid': 'ai-section' }, `Recs: ${recommendations?.length || 0}`);
});

jest.mock('./CovenantStatusWrapper', () => {
  const React = require('react');
  return () => React.createElement('div', { 'data-testid': 'covenant-wrapper' });
});

const React = require('react');
const { render, screen } = require('@testing-library/react');
const RightSection = require('./RightSection').default;

describe('RightSection', () => {
  it('renders AI recommendations section', () => {
    render(React.createElement(RightSection, { recommendations: ['a', 'b'] }));
    expect(screen.getByTestId('ai-section')).toBeInTheDocument();
    expect(screen.getByText('Recs: 2')).toBeInTheDocument();
  });

  it('renders covenant status wrapper', () => {
    render(React.createElement(RightSection, { recommendations: [] }));
    expect(screen.getByTestId('covenant-wrapper')).toBeInTheDocument();
  });
});
