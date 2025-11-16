import { Navigate } from 'react-router-dom';
import { LandingPage, ExplorePage } from '../pages';

// Define routes configuration
const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/explore',
    element: <ExplorePage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;
