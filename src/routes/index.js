import { Navigate } from 'react-router-dom';
import { LandingPage, ExplorePage, FinancialDashboard, DocumentScan } from '../pages';
import WelcomePage from '../pages/WelcomePage';
import PersonalWelcomePage from '../pages/PersonalWelcomePage';
import LoanServicePage from '../pages/LoanServicePage';
import FinancialStatementPage from '../pages/FinancialStatementPage';
import DocumentCentrePage from '../pages/DocumentCentrePage';
import AnomalyDetection from '../pages/AnomalyDetection';
import OperationalDocScan from '../pages/operational-doc-scan/OperationalDocScan';
import FeedbackPage from '../pages/FeedbackPage';
import Y14ReportGeneration from '../pages/y14-report/Y14ReportGeneration';
import Y14ReportPage from '../pages/Y14ReportPage/Y14ReportPage';
import CovenantMonitoringPage from '../pages/CovenantMonitoringPage/CovenantMonitoringPage';
import DataSimulator from '../pages/data-simulator/DataSimulator';

// Define routes configuration
const routes = [
  {
    path: '/financial-statement',
    element: <FinancialStatementPage />,
  },
  {
    path: '/y14-report/large',
    element: <Y14ReportPage />,
  },
  {
    path: '/loan-service',
    element: <LoanServicePage />,
  },
  {
    path: '/personal-welcome',
    element: <PersonalWelcomePage />,
  },
  {
    path: '/welcome',
    element: <WelcomePage />,
  },
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
    path: '/covenant-monitoring',
    element: <CovenantMonitoringPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;
