import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Button: ({ children, onClick, ...props }) =>
      React.createElement('button', { onClick, ...props }, children),
  };
});

jest.mock('../../hooks', () => ({
  useSound: () => jest.fn(),
}));

jest.mock('../../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_Button_Click.mp3': '/click.mp3' },
  }),
}));

jest.mock('../../context/SoundContext', () => ({
  useSoundContext: () => ({ soundEnabled: true }),
}));

import GradientButton from './GradientButton';

describe('GradientButton', () => {
  it('renders children', () => {
    render(<GradientButton>Click me</GradientButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<GradientButton onClick={onClick}>Btn</GradientButton>);
    fireEvent.click(screen.getByText('Btn'));
    expect(onClick).toHaveBeenCalled();
  });

  it('renders with metric variant', () => {
    render(<GradientButton variant="metric" active>Revenue</GradientButton>);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });

  it('renders with primary variant', () => {
    render(<GradientButton variant="primary">Primary</GradientButton>);
    expect(screen.getByText('Primary')).toBeInTheDocument();
  });

  it('renders with secondary variant', () => {
    render(<GradientButton variant="secondary">Secondary</GradientButton>);
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    render(<GradientButton>Default</GradientButton>);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });
});
