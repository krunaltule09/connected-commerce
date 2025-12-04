import React, { createContext, useContext, useState } from 'react';
import { useSyncRoute } from '../hooks/useSyncRoute';

// Create context
const SyncRouteContext = createContext(null);

/**
 * Provider component for route synchronization
 * 
 * This component provides synchronization state and controls to the app
 */
export function SyncRouteProvider({ children }) {
  const [syncEnabled, setSyncEnabled] = useState(true);
  const syncState = useSyncRoute(syncEnabled);
  
  const value = {
    ...syncState,
    syncEnabled,
    toggleSync: () => setSyncEnabled(prev => !prev),
    enableSync: () => setSyncEnabled(true),
    disableSync: () => setSyncEnabled(false)
  };
  
  return (
    <SyncRouteContext.Provider value={value}>
      {children}
    </SyncRouteContext.Provider>
  );
}

/**
 * Hook to access the sync route context
 */
export function useSyncRouteContext() {
  const context = useContext(SyncRouteContext);
  if (!context) {
    throw new Error('useSyncRouteContext must be used within a SyncRouteProvider');
  }
  return context;
}

/**
 * Component to display sync status
 */
export function SyncIndicator() {
  const { syncEnabled, isSynced, error, targetRoute, toggleSync } = useSyncRouteContext();
  
  if (!syncEnabled) {
    return (
      <div className="sync-indicator sync-disabled" onClick={toggleSync}>
        <span className="sync-dot"></span>
        <span className="sync-text">Sync disabled</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="sync-indicator sync-error" onClick={toggleSync}>
        <span className="sync-dot"></span>
        <span className="sync-text">Sync error</span>
        <span className="sync-error-message">{error}</span>
      </div>
    );
  }
  
  if (!targetRoute) {
    return (
      <div className="sync-indicator sync-no-mapping" onClick={toggleSync}>
        <span className="sync-dot"></span>
        <span className="sync-text">No route mapping</span>
      </div>
    );
  }
  
  return (
    <div className={`sync-indicator ${isSynced ? 'sync-active' : 'sync-syncing'}`} onClick={toggleSync}>
      <span className="sync-dot"></span>
      <span className="sync-text">{isSynced ? 'Apps in sync' : 'Syncing...'}</span>
      {targetRoute && <span className="sync-target">{targetRoute}</span>}
    </div>
  );
}
