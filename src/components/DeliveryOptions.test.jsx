import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: React.forwardRef(({ children, component, src, alt, ...props }, ref) => {
      if (component === 'img') return React.createElement('img', { src, alt, ...props, ref });
      return React.createElement('div', { ...props, ref }, children);
    }),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    Button: ({ children, onClick, ...props }) => React.createElement('button', { onClick, ...props }, children),
    Checkbox: ({ checked, onChange, ...props }) =>
      React.createElement('input', { type: 'checkbox', checked, onChange, ...props }),
    FormControlLabel: ({ label, control }) => React.createElement('label', null, control, label),
    FormGroup: ({ children }) => React.createElement('div', null, children),
  };
});

jest.mock('@mui/material/styles', () => ({
  styled: (component) => (styles) => {
    const React = require('react');
    return React.forwardRef(({ children, ...props }, ref) =>
      React.createElement('div', { ...props, ref }, children)
    );
  },
}));

jest.mock('../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_Rating_Frame.svg': '/qr.svg' },
  }),
}));

import DeliveryOptions from './DeliveryOptions';

describe('DeliveryOptions', () => {
  it('renders title', () => {
    render(<DeliveryOptions />);
    expect(screen.getByText('Delivery options')).toBeInTheDocument();
  });

  it('renders Email and SMS checkboxes', () => {
    render(<DeliveryOptions />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('SMS')).toBeInTheDocument();
  });

  it('renders Submit button', () => {
    render(<DeliveryOptions />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});
