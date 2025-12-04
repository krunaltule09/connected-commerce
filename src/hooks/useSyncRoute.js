import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import navigationService from '../services/NavigationService';
import ROUTE_MAPPING from '../config/routeMapping';

/**
 * Custom hook to synchronize routes between connected-commerce and operate-experience apps
 * 
 * This hook automatically sends navigation events to the operate-experience app
 * whenever the route changes in the connected-commerce app, based on the defined mapping
 * 
 * @returns {Object} syncState - Information about the current sync state
 */
export function useSyncRoute(enabled = true) {
  const location = useLocation();
  const [syncStatus, setSyncStatus] = useState({
    currentRoute: location.pathname,
    targetRoute: ROUTE_MAPPING[location.pathname],
    isSynced: false,
    lastSyncTime: null,
    error: null
  });
  
  useEffect(() => {
    // Skip if synchronization is disabled
    if (!enabled) return;
    
    // Get the current path without query parameters
    const currentPath = location.pathname;
    
    // Find the corresponding target route in operate-experience
    const targetRoute = ROUTE_MAPPING[currentPath];
    
    if (targetRoute) {
      console.log(`Syncing route: ${currentPath} -> ${targetRoute}`);
      
      // Update status to syncing
      setSyncStatus(prev => ({
        ...prev,
        currentRoute: currentPath,
        targetRoute,
        isSynced: false,
        error: null
      }));
      
      // Send navigation event to operate-experience
      navigationService.navigateToOperateExperience(targetRoute, {
        referrer: currentPath,
        action: 'ROUTE_SYNC',
        automatic: true
      })
      .then(() => {
        // Update status to synced
        setSyncStatus(prev => ({
          ...prev,
          isSynced: true,
          lastSyncTime: new Date(),
          error: null
        }));
      })
      .catch(err => {
        console.error('Route synchronization failed:', err);
        // Update status with error
        setSyncStatus(prev => ({
          ...prev,
          isSynced: false,
          error: err.message || 'Synchronization failed'
        }));
      });
    } else {
      // No mapping for this route
      setSyncStatus(prev => ({
        ...prev,
        currentRoute: currentPath,
        targetRoute: null,
        isSynced: false
      }));
    }
  }, [location.pathname, enabled]);
  
  return syncStatus;
}
