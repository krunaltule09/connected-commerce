import React from 'react';
import { render, screen, act } from '@testing-library/react';

jest.mock('@mui/material', () => {
  const React = require('react');
  return {
    Box: ({ children, ...props }) => React.createElement('div', props, children),
    Typography: ({ children, ...props }) => React.createElement('span', props, children),
    LinearProgress: (props) => React.createElement('div', { 'data-testid': 'progress', 'data-value': props.value }),
  };
});

import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with default label', () => {
    render(<ProgressBar />);
    expect(screen.getByText('OCR scanning in progress...')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<ProgressBar label="Loading data..." />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('shows 0% initially', () => {
    render(<ProgressBar />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('increments progress over time', () => {
    render(<ProgressBar />);

    act(() => {
      jest.advanceTimersByTime(600);
    });

    // Should show > 0%
    expect(screen.queryByText('0%')).not.toBeInTheDocument();
  });

  it('does not auto-increment when autoIncrement is false', () => {
    render(<ProgressBar autoIncrement={false} />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('reaches 100% eventually', () => {
    render(<ProgressBar />);

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});
