/**
 * Route mapping configuration between connected-commerce and operate-experience apps
 * 
 * This configuration maps routes from connected-commerce to their corresponding
 * routes in operate-experience for automatic synchronization
 */

const ROUTE_MAPPING = {
  '/': '/welcome',
  '/explore': '/personal-welcome',
  '/document-centre': '/loan-service',
  '/financial-dashboard': '/financial-statement',
  '/anomaly-detection': '/dscr-trend',
  '/y14-report': '/covenant-monitoring',
  '/operational-doc-scan':  '/y14-report/large',
  '/data-simulator': '/benefits-summary',

};

export default ROUTE_MAPPING;
