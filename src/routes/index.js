import { Navigate } from 'react-router-dom';
import { LandingPage, ExplorePage, FinancialDashboard, DocumentScan } from '../pages';
import DocumentCentrePage from '../pages/DocumentCentrePage';
import OperationalDocScan from '../pages/operational-doc-scan/OperationalDocScan';
import Y14ReportGeneration from '../pages/y14-report/Y14ReportGeneration';

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
    path: '/financial-dashboard',
    element: <FinancialDashboard />,
  },
  {
    path: '/y14-report',
    element: <Y14ReportGeneration />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;
