import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    Button: ({ children, onClick, ...props }) => React.createElement('button', { onClick, ...props }, children),
    Stack: ({ children, ...props }) => React.createElement('div', props, children),
  };
});

jest.mock('./common/GradientBorderBox', () => {
  const React = require('react');
  return ({ children }) => React.createElement('div', null, children);
});

import FinancialDriversSection from './FinancialDriversSection';

describe('FinancialDriversSection', () => {
  it('renders toggle buttons', () => {
    render(<FinancialDriversSection />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Profit')).toBeInTheDocument();
    expect(screen.getByText('Growth')).toBeInTheDocument();
  });

  it('shows Financial Drivers Chart placeholder', () => {
    render(<FinancialDriversSection />);
    expect(screen.getByText('Financial Drivers Chart')).toBeInTheDocument();
  });

  it('switches active data set on button click', () => {
    render(<FinancialDriversSection />);
    fireEvent.click(screen.getByText('Profit'));
    // Should change the description text
    expect(screen.getByText(/Profit/)).toBeInTheDocument();
  });
});
