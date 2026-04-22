import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
    Grid: ({ children, ...props }) => React.createElement('div', props, children),
  };
});

jest.mock('./DocumentTile', () => {
  const React = require('react');
  return ({ doc }) => React.createElement('div', { 'data-testid': 'doc-tile' }, doc.name);
});

jest.mock('../context/ConfigContext', () => ({
  useConfig: () => ({
    assets: { 'Banking_Capital_Market_Operate_Table_Vector_Icon.svg': '/v.svg' },
  }),
}));

import DocumentList from './DocumentList';

describe('DocumentList', () => {
  const docs = [
    { id: 1, name: 'Doc A' },
    { id: 2, name: 'Doc B' },
    { id: 3, name: 'Doc C' },
  ];

  it('renders all document tiles', () => {
    render(<DocumentList documents={docs} />);
    const tiles = screen.getAllByTestId('doc-tile');
    expect(tiles).toHaveLength(3);
  });

  it('renders empty when no documents', () => {
    const { container } = render(<DocumentList />);
    expect(container.querySelectorAll('[data-testid="doc-tile"]')).toHaveLength(0);
  });

  it('shows document names', () => {
    render(<DocumentList documents={docs} />);
    expect(screen.getByText('Doc A')).toBeInTheDocument();
    expect(screen.getByText('Doc B')).toBeInTheDocument();
  });
});
