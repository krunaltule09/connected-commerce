import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

const mockContext = {
  syncEnabled: true,
  isSynced: true,
  error: null,
  targetRoute: '/welcome',
  currentRoute: '/',
  toggleSync: jest.fn(),
};

jest.mock('../../context/SyncRouteContext', () => ({
  useSyncRouteContext: () => mockContext,
}));

jest.mock('../../styles/SyncIndicator.css', () => ({}));

import SyncIndicator from './SyncIndicator';

describe('SyncIndicator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockContext.syncEnabled = true;
    mockContext.isSynced = true;
    mockContext.error = null;
    mockContext.targetRoute = '/welcome';
  });

  it('shows "Apps in sync" when synced', () => {
    render(<SyncIndicator />);
    expect(screen.getByText('Apps in sync')).toBeInTheDocument();
  });

  it('shows "Syncing..." when not synced', () => {
    mockContext.isSynced = false;
    render(<SyncIndicator />);
    expect(screen.getByText('Syncing...')).toBeInTheDocument();
  });

  it('shows "Sync disabled" when sync is off', () => {
    mockContext.syncEnabled = false;
    render(<SyncIndicator />);
    expect(screen.getByText('Sync disabled')).toBeInTheDocument();
  });

  it('shows error state', () => {
    mockContext.error = 'Connection lost';
    render(<SyncIndicator />);
    expect(screen.getByText('Sync error')).toBeInTheDocument();
    expect(screen.getByText('Connection lost')).toBeInTheDocument();
  });

  it('shows "No route mapping" when targetRoute is null', () => {
    mockContext.targetRoute = null;
    render(<SyncIndicator />);
    expect(screen.getByText('No route mapping')).toBeInTheDocument();
  });

  it('calls toggleSync on click', () => {
    render(<SyncIndicator />);
    fireEvent.click(screen.getByText('Apps in sync'));
    expect(mockContext.toggleSync).toHaveBeenCalled();
  });
});
