import React from 'react';
import { render } from '@testing-library/react';

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: React.forwardRef(({ children, component, src, alt, ...props }, ref) => {
      if (component === 'img') return React.createElement('img', { src, alt, ...props, ref });
      return React.createElement('div', { ...props, ref }, children);
    }),
  };
});

jest.mock('../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_Performance_Section.svg': '/perf.svg' },
  }),
}));

import PerformanceSection from './PerformanceSection';

describe('PerformanceSection', () => {
  it('renders the performance image', () => {
    const { container } = render(<PerformanceSection />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('perf.svg');
  });
});
