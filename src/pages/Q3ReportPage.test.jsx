import React from 'react';
import { render } from '@testing-library/react';

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
  };
});

import Q3ReportPage from './Q3ReportPage';

describe('Q3ReportPage', () => {
  it('renders SVG content', () => {
    const { container } = render(<Q3ReportPage />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
