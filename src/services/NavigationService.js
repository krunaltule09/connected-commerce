import axios from 'axios';

/**
 * Service for cross-application navigation using Server-Sent Events
 */
class NavigationService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_SSE_SERVICE_URL || 'http://localhost:3001';
    this.appId = 'connected-commerce';
  }

  /**
   * Send a navigation event to the SSE service
   * @param {string} action - The action type
   * @param {string} targetAppId - Target application ID
   * @param {string} route - Target route to navigate to
   * @param {Object} data - Additional data to send
   * @returns {Promise} - Promise resolving to the response
   */
  async sendNavigationEvent(action, targetAppId, route, data = {}) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/navigation`, {
        action,
        targetAppId,
        route,
        data: {
          ...data,
          sourceAppId: this.appId,
          timestamp: new Date().toISOString()
        }
      });
      
      console.log('Navigation event sent:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to send navigation event:', error);
      throw error;
    }
  }

  /**
   * Navigate to a route in the operate-experience app
   * @param {string} route - Target route
   * @param {Object} data - Additional data to send
   * @returns {Promise} - Promise resolving to the response
   */
  navigateToOperateExperience(route, data = {}) {
    return this.sendNavigationEvent('NAVIGATE', 'operate-experience', route, data);
  }
}

// Create a singleton instance
const navigationService = new NavigationService();

export default navigationService;
