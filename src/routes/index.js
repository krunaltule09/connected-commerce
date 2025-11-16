import { Navigate } from 'react-router-dom';
import { LandingPage, ExplorePage } from '../pages';
import DocumentCentrePage from '../pages/DocumentCentrePage';

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
    path: '/document-centre',
    element: <DocumentCentrePage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;
