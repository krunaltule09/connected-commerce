/**
 * Navigation Sync Service for React components
 * 
 * This service manages WebSocket connections to synchronize navigation
 * between different UI applications.
 */

class NavigationSyncService {
  constructor(url = 'ws://localhost:8080') {
    this.url = url;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.listeners = new Set();
    this.isConnected = false;
    
    // Don't connect automatically - we'll connect when needed
  }
  
  connect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return Promise.resolve(); // Already connected
    }
    
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);
        
        this.ws.onopen = () => {
          console.log('Connected to WebSocket server');
          this.reconnectAttempts = 0;
          this.isConnected = true;
          resolve();
        };
        
        this.ws.onclose = () => {
          console.log('Disconnected from WebSocket server');
          this.isConnected = false;
          this.attemptReconnect();
        };
        
        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          if (!this.isConnected) {
            reject(error);
          }
        };
        
        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.notifyListeners(data);
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  }
  
  attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnect attempts reached');
      return;
    }
    
    this.reconnectAttempts++;
    const delay = Math.min(1000 * (2 ** this.reconnectAttempts), 30000);
    
    console.log(`Attempting to reconnect in ${delay}ms...`);
    setTimeout(() => this.connect().catch(err => console.error('Reconnection failed:', err)), delay);
  }
  
  sendNavigation(action, targetPage, additionalData = {}) {
    const sendMessage = () => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({
          type: 'navigation',
          action,
          targetPage,
          timestamp: Date.now(),
          ...additionalData
        }));
        return true;
      }
      return false;
    };
    
    if (!sendMessage() && !this.isConnected) {
      // Try to connect first, then send
      return this.connect()
        .then(() => {
          sendMessage();
          return true;
        })
        .catch(error => {
          console.error('Failed to connect and send navigation event:', error);
          return false;
        });
    }
    
    return Promise.resolve(true);
  }
  
  addListener(callback) {
    this.listeners.add(callback);
    
    // If not connected, connect now
    if (!this.isConnected) {
      this.connect().catch(err => console.error('Connection failed:', err));
    }
    
    return () => this.listeners.delete(callback);
  }
  
  notifyListeners(data) {
    this.listeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in listener callback:', error);
      }
    });
  }
  
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Create a singleton instance
const navigationSync = new NavigationSyncService();

export default navigationSync;
