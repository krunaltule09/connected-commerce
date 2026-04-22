import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
  };
});

import SectionTitle from './SectionTitle';

describe('SectionTitle', () => {
  it('renders children text', () => {
    render(<SectionTitle>My Section</SectionTitle>);
    expect(screen.getByText('My Section')).toBeInTheDocument();
  });

  it('renders as a span (mocked Typography)', () => {
    const { container } = render(<SectionTitle>Title</SectionTitle>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });
});
