import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: React.forwardRef(({ children, ...props }, ref) =>
      React.createElement('div', { ...props, ref }, children)
    ),
  };
});

import GradientBorderBox from './GradientBorderBox';

describe('GradientBorderBox', () => {
  it('renders children', () => {
    render(<GradientBorderBox><span>Child Content</span></GradientBorderBox>);
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders in static mode by default', () => {
    const { container } = render(<GradientBorderBox>Static</GradientBorderBox>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders in animated mode', () => {
    const { container } = render(<GradientBorderBox animated>Animated</GradientBorderBox>);
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText('Animated')).toBeInTheDocument();
  });

  it('passes additional props', () => {
    const { container } = render(
      <GradientBorderBox data-testid="box">Content</GradientBorderBox>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
