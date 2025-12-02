import React from 'react';
import { useNavigate } from 'react-router-dom';
import OcrScanningSection from '../components/OcrScanningSection';
import FinancialMetricsSection from '../components/FinancialMetricsSection';
import { ScanningProvider } from '../context/ScanningContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import RightSection from '../components/dashboard/RightSection';

export default function FinancialDashboard() {
  const navigate = useNavigate();
  
  const handleNextStep = () => {
    navigate('/anomaly-detection');
  };

  const handleGoBack = () => {
    window.history.back();
  };
  
  // AI recommendations data
  const recommendations = ['Debt/Equity exceeds limit (3.2 vs 3.0)'];
  
  return (
    <ScanningProvider>
      <DashboardLayout
        leftSection={<OcrScanningSection />}
        middleSection={<FinancialMetricsSection />}
        rightSection={<RightSection recommendations={recommendations} />}
        onBack={handleGoBack}
        onNext={handleNextStep}
      />
    </ScanningProvider>
  );
}
