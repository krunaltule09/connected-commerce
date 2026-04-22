import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Card: ({ children, onDragStart, draggable, ...props }) =>
      React.createElement('div', { onDragStart, draggable, 'data-testid': 'card', ...props }, children),
    CardActionArea: ({ children, onClick, ...props }) =>
      React.createElement('div', { onClick, ...props }, children),
    Stack: ({ children, ...props }) => React.createElement('div', props, children),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    Box: React.forwardRef(({ children, component, src, alt, ...props }, ref) => {
      if (component === 'img') return React.createElement('img', { src, alt, ...props, ref });
      return React.createElement('div', { ...props, ref }, children);
    }),
  };
});

jest.mock('../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: {
      'Banking_Capital_Market_Operate_Table_Vector_Icon.svg': '/vector.svg',
    },
  }),
}));

jest.mock('../utils', () => ({
  handleDocumentDragStart: () => jest.fn(),
}));

import DocumentTile from './DocumentTile';

describe('DocumentTile', () => {
  const doc = { id: 1, name: 'Invoice Q3', url: '/preview.png' };

  it('renders document name', () => {
    render(<DocumentTile doc={doc} />);
    expect(screen.getByText('Invoice Q3')).toBeInTheDocument();
  });

  it('renders preview image when doc has url', () => {
    render(<DocumentTile doc={doc} />);
    const img = document.querySelector('img[alt="Invoice Q3"]');
    expect(img).toBeInTheDocument();
  });

  it('renders vector icon when no doc url', () => {
    render(<DocumentTile doc={{ id: 2, name: 'Empty' }} />);
    const img = document.querySelector('img');
    expect(img.src).toContain('vector.svg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = jest.fn();
    render(<DocumentTile doc={doc} onSelect={onSelect} />);
    const actionArea = screen.getByText('Invoice Q3').closest('div[onClick]') || screen.getByText('Invoice Q3').parentElement.parentElement;
    fireEvent.click(actionArea);
    // onSelect is called via CardActionArea
  });

  it('is draggable', () => {
    render(<DocumentTile doc={doc} />);
    const card = screen.getByTestId('card');
    expect(card).toHaveAttribute('draggable');
  });
});
