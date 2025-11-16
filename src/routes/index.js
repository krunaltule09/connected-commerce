import { Navigate } from 'react-router-dom';
import { LandingPage, ExplorePage, DocumentScan } from '../pages';

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
    path: '/document-scan',
    element: <DocumentScan />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;
