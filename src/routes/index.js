import { Navigate } from 'react-router-dom';
import { LandingPage, ExplorePage, FinancialDashboard, DocumentScan } from '../pages';
import DocumentCentrePage from '../pages/DocumentCentrePage';
import AnomalyDetection from '../pages/AnomalyDetection';
import OperationalDocScan from '../pages/operational-doc-scan/OperationalDocScan';
import FeedbackPage from '../pages/FeedbackPage';
import Y14ReportGeneration from '../pages/y14-report/Y14ReportGeneration';
import DataSimulator from '../pages/data-simulator/DataSimulator';

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
    path: '/y14-report',
    element: <Y14ReportGeneration />,
  },
  {
    path: '/data-simulator',
    element: <DataSimulator />,
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
