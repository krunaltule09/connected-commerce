jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), create: jest.fn(() => ({ post: jest.fn() })) },
}));

jest.mock('../hooks/useSyncRoute', () => ({
  useSyncRoute: () => ({
    isSynced: true,
    error: null,
    targetRoute: '/dashboard',
    currentRoute: '/',
  }),
}));

const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const { SyncRouteProvider, useSyncRouteContext, SyncIndicator } = require('./SyncRouteContext');

// Helper to render SyncIndicator inside SyncRouteProvider
function renderInProvider() {
  return render(
    React.createElement(SyncRouteProvider, null,
      React.createElement(SyncIndicator)
    )
  );
}

describe('SyncRouteContext', () => {
  describe('SyncRouteProvider', () => {
    it('provides context to children', () => {
      const Consumer = () => {
        const ctx = useSyncRouteContext();
        return React.createElement('div', null, `synced: ${ctx.isSynced}`);
      };
      render(React.createElement(SyncRouteProvider, null, React.createElement(Consumer)));
      expect(screen.getByText('synced: true')).toBeInTheDocument();
    });
  });

  describe('useSyncRouteContext', () => {
    it('throws outside provider', () => {
      const Orphan = () => {
        useSyncRouteContext();
        return null;
      };
      expect(() => render(React.createElement(Orphan))).toThrow(
        'useSyncRouteContext must be used within a SyncRouteProvider'
      );
    });
  });

  describe('SyncIndicator', () => {
    it('shows "Apps in sync" when synced', () => {
      renderInProvider();
      expect(screen.getByText('Apps in sync')).toBeInTheDocument();
    });

    it('shows target route', () => {
      renderInProvider();
      expect(screen.getByText('/dashboard')).toBeInTheDocument();
    });

    it('toggles sync on click', () => {
      renderInProvider();
      fireEvent.click(screen.getByText('Apps in sync'));
      // After toggle, sync is disabled
      expect(screen.getByText('Sync disabled')).toBeInTheDocument();
    });
  });
});

describe('SyncIndicator states', () => {
  it('shows error state', () => {
    jest.spyOn(require('../hooks/useSyncRoute'), 'useSyncRoute').mockReturnValue({
      isSynced: false,
      error: 'Connection failed',
      targetRoute: null,
      currentRoute: '/',
    });
    renderInProvider();
    expect(screen.getByText('Sync error')).toBeInTheDocument();
    expect(screen.getByText('Connection failed')).toBeInTheDocument();
  });

  it('shows no route mapping state', () => {
    jest.spyOn(require('../hooks/useSyncRoute'), 'useSyncRoute').mockReturnValue({
      isSynced: false,
      error: null,
      targetRoute: null,
      currentRoute: '/',
    });
    renderInProvider();
    expect(screen.getByText('No route mapping')).toBeInTheDocument();
  });

  it('shows syncing state', () => {
    jest.spyOn(require('../hooks/useSyncRoute'), 'useSyncRoute').mockReturnValue({
      isSynced: false,
      error: null,
      targetRoute: '/other',
      currentRoute: '/',
    });
    renderInProvider();
    expect(screen.getByText('Syncing...')).toBeInTheDocument();
  });
});
