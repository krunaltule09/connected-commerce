jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: React.forwardRef(({ children, ...props }, ref) =>
      React.createElement('div', { ...props, ref }, children)
    ),
  };
});

const React = require('react');
const { render, screen } = require('@testing-library/react');
const GradientBorderBoxLegacy = require('./GradientBorderBoxLegacy').default;

describe('GradientBorderBoxLegacy', () => {
  it('renders children', () => {
    render(React.createElement(GradientBorderBoxLegacy, null, 'Content'));
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with animated prop', () => {
    render(React.createElement(GradientBorderBoxLegacy, { animated: true }, 'Animated'));
    expect(screen.getByText('Animated')).toBeInTheDocument();
  });

  it('renders with custom sx', () => {
    const { container } = render(React.createElement(GradientBorderBoxLegacy, { sx: { p: 2 } }, 'Styled'));
    expect(container).toBeTruthy();
  });
});
