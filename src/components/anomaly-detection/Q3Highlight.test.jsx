import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
  };
});

import Q3Highlight from './Q3Highlight';

describe('Q3Highlight', () => {
  const highlights = [
    { title: 'Revenue Growth', description: 'Increased by 15%' },
    { title: 'DSCR', description: 'Stable at 1.8x' },
  ];

  it('renders Q3 Highlight header', () => {
    render(<Q3Highlight highlights={highlights} />);
    expect(screen.getByText('Q3 Highlight')).toBeInTheDocument();
  });

  it('renders highlight titles', () => {
    render(<Q3Highlight highlights={highlights} />);
    expect(screen.getByText('Revenue Growth')).toBeInTheDocument();
    expect(screen.getByText('DSCR')).toBeInTheDocument();
  });

  it('renders highlight descriptions', () => {
    render(<Q3Highlight highlights={highlights} />);
    expect(screen.getByText('Increased by 15%')).toBeInTheDocument();
    expect(screen.getByText('Stable at 1.8x')).toBeInTheDocument();
  });

  it('renders with empty highlights', () => {
    render(<Q3Highlight />);
    expect(screen.getByText('Q3 Highlight')).toBeInTheDocument();
  });
});
