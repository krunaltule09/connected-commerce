import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: React.forwardRef(({ children, component, ...props }, ref) => {
      if (component === 'img') return React.createElement('img', { ...props, ref });
      return React.createElement('div', { ...props, ref }, children);
    }),
    Typography: React.forwardRef(({ children, ...props }, ref) =>
      React.createElement('span', { ...props, ref }, children)
    ),
    Button: ({ children, ...props }) => React.createElement('button', props, children),
    Tooltip: ({ children }) => children,
  };
});

jest.mock('../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: {
      'Banking_Capital_Market_Operate_Table_Alert_Icon.svg': '/alert.svg',
      'Banking_Capital_Market_Operate_Table_Shield_Alert.svg': '/shield.svg',
    },
  }),
}));

import CovenantTile from './CovenantTile';

describe('CovenantTile', () => {
  const baseCovenant = {
    name: 'Debt/EBITDA',
    value: '3.5x (Max 4.0x)',
    status: 'alert',
    indicator: 'Warning',
  };

  it('renders covenant name', () => {
    render(<CovenantTile covenant={baseCovenant} />);
    expect(screen.getByText('Debt/EBITDA')).toBeInTheDocument();
  });

  it('renders value with bracket split', () => {
    render(<CovenantTile covenant={baseCovenant} />);
    expect(screen.getByText('3.5x')).toBeInTheDocument();
    expect(screen.getByText('(Max 4.0x)')).toBeInTheDocument();
  });

  it('renders indicator text', () => {
    render(<CovenantTile covenant={baseCovenant} />);
    expect(screen.getByText('Warning')).toBeInTheDocument();
  });

  it('renders value without brackets', () => {
    const covenant = { ...baseCovenant, value: '1.2x' };
    render(<CovenantTile covenant={covenant} />);
    expect(screen.getByText('1.2x')).toBeInTheDocument();
  });

  it('renders View Formula button', () => {
    render(<CovenantTile covenant={baseCovenant} />);
    expect(screen.getAllByText('View Formula & Historical Values').length).toBeGreaterThanOrEqual(1);
  });

  it('uses shield icon for non-alert status', () => {
    const covenant = { ...baseCovenant, status: 'ok' };
    render(<CovenantTile covenant={covenant} />);
    const img = document.querySelector('img');
    expect(img.src).toContain('shield');
  });
});
