import { Navigate } from 'react-router-dom';
import { LandingPage, ExplorePage, FinancialDashboard, DocumentScan } from '../pages';
import DocumentCentrePage from '../pages/DocumentCentrePage';
import AnomalyDetection from '../pages/AnomalyDetection';
import OperationalDocScan from '../pages/operational-doc-scan/OperationalDocScan';
import FeedbackPage from '../pages/FeedbackPage';

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
    path: '/feedback',
    element: <FeedbackPage />,
  },
  {
    path: '/financial-dashboard',
    element: <FinancialDashboard />,
  },
  {
    path: '/anomaly-detection',
    element: <AnomalyDetection />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;
