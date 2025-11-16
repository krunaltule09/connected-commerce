import { Navigate } from 'react-router-dom';
import { LandingPage } from '../pages';

// Define routes configuration
const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  // Add more routes as needed
  // Example:
  // {
  //   path: '/dashboard',
  //   element: <Dashboard />,
  // },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;
