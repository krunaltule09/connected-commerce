import React from 'react';
import { useSyncRouteContext } from '../../context/SyncRouteContext';
import '../../styles/SyncIndicator.css';

/**
 * Component to display the synchronization status between apps
 * 
 * This component shows a visual indicator of the current sync status
 * and allows users to toggle synchronization on/off
 */
const SyncIndicator = () => {
  const { 
    syncEnabled, 
    isSynced, 
    error, 
    targetRoute, 
    currentRoute,
    toggleSync 
  } = useSyncRouteContext();
  
  if (!syncEnabled) {
    return (
      <div className="sync-indicator sync-disabled" onClick={toggleSync} title="Click to enable sync">
        <span className="sync-dot"></span>
        <span className="sync-text">Sync disabled</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="sync-indicator sync-error" onClick={toggleSync} title="Sync error - Click to disable">
        <span className="sync-dot"></span>
        <span className="sync-text">Sync error</span>
        <span className="sync-error-message">{error}</span>
      </div>
    );
  }
  
  if (!targetRoute) {
    return (
      <div className="sync-indicator sync-no-mapping" onClick={toggleSync} title="No mapping for this route">
        <span className="sync-dot"></span>
        <span className="sync-text">No route mapping</span>
      </div>
    );
  }
  
  return (
    <div 
      className={`sync-indicator ${isSynced ? 'sync-active' : 'sync-syncing'}`} 
      onClick={toggleSync}
      title={`${currentRoute} → ${targetRoute}`}
    >
      <span className="sync-dot"></span>
      <span className="sync-text">{isSynced ? 'Apps in sync' : 'Syncing...'}</span>
    </div>
  );
};

export default SyncIndicator;
