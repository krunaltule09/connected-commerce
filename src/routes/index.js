import { Navigate } from 'react-router-dom';
import { LandingPage, ExplorePage, FinancialDashboard, DocumentScan } from '../pages';
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
    path: '/document-scan',
    element: <DocumentScan />,
  },
  {
    path: '/document-centre',
    element: <DocumentCentrePage />,
  },
  {
    path: '/financial-dashboard',
    element: <FinancialDashboard />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;
