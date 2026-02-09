import { Navigate } from 'react-router-dom';
import { LandingPage, ExplorePage, FinancialDashboard, DocumentScan, EnterpriseLoanServicing } from '../pages';
import DocumentCentrePage from '../pages/DocumentCentrePage';
import AnomalyDetection from '../pages/AnomalyDetection';
import OperationalDocScan from '../pages/operational-doc-scan/OperationalDocScan';
import FeedbackPage from '../pages/FeedbackPage';
import Y14ReportNew from '../pages/y14-report-new/Y14ReportNew';
import DataSimulator from '../pages/data-simulator/DataSimulator';
import Q3ReportPage from '../pages/Q3ReportPage';
import SSETestPage from '../pages/SSETestPage';

// Define routes configuration
const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  // {
  //   path: '/enterprise-loan-servicing',
  //   element: <EnterpriseLoanServicing />,
  // },
  {
    path: '/explore',
    element: <EnterpriseLoanServicing />,
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
    element: <Y14ReportNew />,
  },
  {
    path: '/data-simulator',
    element: <DataSimulator />,
  },
  {
    path: '/y14-report-new',
    element: <Y14ReportNew />,
  },
  {
    path: '/anomaly-detection',
    element: <AnomalyDetection />,
  },
  {
    path: '/q3-report',
    element: <Q3ReportPage />,
  },
  {
    path: '/sse-test',
    element: <SSETestPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;
