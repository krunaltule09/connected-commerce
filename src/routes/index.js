import { Navigate } from 'react-router-dom';
import { LandingPage, ExplorePage, DocumentScan } from '../pages';
import DocumentCentrePage from '../pages/DocumentCentrePage';
import OperationalDocScan from '../pages/operational-doc-scan/OperationalDocScan';

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
    path: '/document-centre',
    element: <DocumentCentrePage />,
  },
  {
    path: '/operational-doc-scan',
    element: <OperationalDocScan />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;
