import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Create context
const SSEContext = createContext();

/**
 * Provider component for Server-Sent Events
 */
export const SSEProvider = ({ children }) => {
  const navigate = useNavigate();
  const [eventSource, setEventSource] = useState(null);
  const [connected, setConnected] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  // Handle navigation events
  const handleNavigationEvent = useCallback((event) => {
    console.log('Navigation event received:', event);
    
    // Check if this event is targeted for this app
    if (event.targetAppId === 'connected-commerce') {
      // Add to events history
      setEvents(prevEvents => [event, ...prevEvents].slice(0, 10));
      
      // Handle navigation
      if (event.action === 'NAVIGATE' && event.route) {
        console.log(`Attempting to navigate to: ${event.route}`);
        
        try {
          // Check if this is an automatic route sync
          const isAutoSync = event.data?.automatic === true;
          
          // Create a custom event that components can listen to
          const navigationEvent = new CustomEvent('sse-navigation', { 
            detail: {
              route: event.route,
              sourceAppId: event.data?.sourceAppId,
              timestamp: event.timestamp,
              data: event.data,
              isAutoSync
            }
          });
          
          // Dispatch the event
          window.dispatchEvent(navigationEvent);
          
          // Use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => {
            console.log(`Executing navigation to: ${event.route}`);
            console.log('Current location:', window.location.pathname);
            console.log('Navigate function available:', typeof navigate === 'function');
            
            try {
              // Navigate to the specified route using React Router
              if (isAutoSync) {
                navigate(event.route, { replace: true });
              } else {
                navigate(event.route);
              }
              console.log('Navigation called successfully');
            } catch (error) {
              console.error('Navigation error:', error);
            }
          });
        } catch (error) {
          console.error('Navigation failed:', error);
        }
      }
    }
  }, [navigate]);

  // Connect to SSE server
  const connectToSSE = useCallback(() => {
    const sseUrl = process.env.REACT_APP_SSE_SERVICE_URL || 'http://localhost:3001';
    
    // Close existing connection if any
    if (eventSource) {
      eventSource.close();
    }
    
    try {
      const newEventSource = new EventSource(`${sseUrl}/api/sse`);
      
      newEventSource.onopen = () => {
        console.log('SSE connection opened');
        setConnected(true);
        setError(null);
      };
      
      newEventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        // Handle connection confirmation
        if (data.type === 'connection') {
          setClientId(data.clientId);
          console.log(`Connected with client ID: ${data.clientId}`);
        }
        
        // Handle history events
        else if (data.type === 'history') {
          console.log('Received event history:', data.events);
          setEvents(data.events);
        }
        
        // Handle navigation events
        else if (data.type === 'navigation') {
          handleNavigationEvent(data);
        }
      };
      
      newEventSource.onerror = (err) => {
        console.error('SSE connection error:', err);
        setError('Connection error. Reconnecting...');
        setConnected(false);
        
        // Close and try to reconnect after a delay
        newEventSource.close();
        // Use setTimeout with a function that doesn't reference connectToSSE
        setTimeout(() => {
          const sseUrl = process.env.REACT_APP_SSE_SERVICE_URL || 'http://localhost:3001';
          try {
            const retryEventSource = new EventSource(`${sseUrl}/api/sse`);
            
            // Set up event handlers for the retry connection
            retryEventSource.onopen = () => {
              console.log('SSE reconnection successful');
              setConnected(true);
              setError(null);
            };
            
            retryEventSource.onmessage = (event) => {
              const data = JSON.parse(event.data);
              
              if (data.type === 'connection') {
                setClientId(data.clientId);
                console.log(`Reconnected with client ID: ${data.clientId}`);
              } else if (data.type === 'history') {
                setEvents(data.events);
              } else if (data.type === 'navigation') {
                handleNavigationEvent(data);
              }
            };
            
            retryEventSource.onerror = () => {
              console.error('SSE reconnection failed');
              retryEventSource.close();
            };
            
            setEventSource(retryEventSource);
          } catch (error) {
            console.error('Reconnection failed:', error);
          }
        }, 5000);
      };
      
      setEventSource(newEventSource);
      
    } catch (err) {
      console.error('Failed to connect to SSE server:', err);
      setError(`Failed to connect: ${err.message}`);
      setConnected(false);
      
      // Try to reconnect after a delay without referencing connectToSSE
      setTimeout(() => {
        const sseUrl = process.env.REACT_APP_SSE_SERVICE_URL || 'http://localhost:3001';
        try {
          const retryEventSource = new EventSource(`${sseUrl}/api/sse`);
          
          // Set up event handlers for the retry connection
          retryEventSource.onopen = () => {
            console.log('SSE reconnection successful');
            setConnected(true);
            setError(null);
          };
          
          retryEventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            if (data.type === 'connection') {
              setClientId(data.clientId);
              console.log(`Reconnected with client ID: ${data.clientId}`);
            } else if (data.type === 'history') {
              setEvents(data.events);
            } else if (data.type === 'navigation') {
              handleNavigationEvent(data);
            }
          };
          
          retryEventSource.onerror = () => {
            console.error('SSE reconnection failed');
            retryEventSource.close();
          };
          
          setEventSource(retryEventSource);
        } catch (error) {
          console.error('Reconnection failed:', error);
        }
      }, 5000);
    }
    
    // No cleanup function needed here as it's handled in the useEffect
  }, [handleNavigationEvent]); // Remove eventSource from dependencies
  
  // Connect on component mount
  useEffect(() => {
    // Initial connection
    connectToSSE();
    
    // Cleanup function
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [connectToSSE]); // connectToSSE is stable now
  
  // Context value
  const contextValue = {
    connected,
    clientId,
    events,
    error,
    reconnect: connectToSSE
  };
  
  return (
    <SSEContext.Provider value={contextValue}>
      {children}
    </SSEContext.Provider>
  );
};

// Custom hook to use the SSE context
export const useSSE = () => {
  const context = useContext(SSEContext);
  if (!context) {
    throw new Error('useSSE must be used within an SSEProvider');
  }
  return context;
};

export default SSEContext;
