jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    Button: ({ children, onClick, ...props }) => React.createElement('button', { onClick, ...props }, children),
    Rating: ({ name, ...props }) => React.createElement('div', { 'data-testid': 'rating', ...props }),
  };
});

jest.mock('@mui/material/styles', () => ({
  styled: (Component) => () => {
    const React = require('react');
    return React.forwardRef((props, ref) =>
      React.createElement(Component, { ...props, ref })
    );
  },
}));

jest.mock('@mui/icons-material', () => ({
  Star: () => null,
}));

import RatingComponent from './RatingComponent';

describe('RatingComponent', () => {
  it('renders "Rate us" title', () => {
    render(<RatingComponent />);
    expect(screen.getByText('Rate us')).toBeInTheDocument();
  });

  it('renders Submit button', () => {
    render(<RatingComponent />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('renders rating widget', () => {
    render(<RatingComponent />);
    expect(screen.getByTestId('rating')).toBeInTheDocument();
  });
});
