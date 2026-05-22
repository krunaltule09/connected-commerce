import { httpFetch } from '../utils/tauriFetch';

const PUBLISH_URL = process.env.REACT_APP_NATS_PUBLISH_URL || '';
const TARGET_DEVICE = ['large_screen'];

let _token = '';
export const setNatsToken = (token) => { _token = token; };

const subject = 'bcm.navigation';

let _debounceTimer = null;

/**
 * Low-level publish with 2 retries and 500ms between attempts.
 */
const _publish = async (route, data) => {
  const body = {
    message: {
      title: 'BCM Navigation',
      body: {
        targetAppId: 'operate-experience',
        action: 'NAVIGATE',
        route,
        sourceAppId: 'connected-commerce',
        timestamp: new Date().toISOString(),
        data,
      },
    },
    target_device: TARGET_DEVICE,
    subject,
  };

  const MAX_RETRIES = 2;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await httpFetch(PUBLISH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${_token}`,
        },
        body: JSON.stringify(body),
      });
      if (res.ok) return;
    } catch (err) {
      // retry
    }
    if (attempt < MAX_RETRIES) await new Promise(r => setTimeout(r, 500));
  }
};

/**
 * Send a navigation route to the large screen.
 * Debounced at 200ms — rapid calls only send the last route.
 *
 * @param {string} route  - React Router path on the subscriber app
 * @param {object} data   - Optional metadata
 */
export const sendLargeScreenRoute = (route, data = {}) => {
  if (_debounceTimer) clearTimeout(_debounceTimer);
  _debounceTimer = setTimeout(() => {
    _debounceTimer = null;
    _publish(route, data);
  }, 200);
};

class NavigationService {
  constructor() {
    this.appId = 'connected-commerce';
  }

  async sendNavigationEvent(action, targetAppId, route, data = {}) {
    sendLargeScreenRoute(route, {
      ...data,
      action,
      targetAppId,
    });
  }

  navigateToOperateExperience(route, data = {}) {
    return this.sendNavigationEvent('NAVIGATE', 'operate-experience', route, data);
  }
}

// Create a singleton instance
const navigationService = new NavigationService();

export default navigationService;
