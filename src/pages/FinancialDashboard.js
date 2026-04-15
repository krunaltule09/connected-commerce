import React from 'react';
import { useNavigate } from 'react-router-dom';
import OcrScanningSection from '../components/OcrScanningSection';
import FinancialMetricsSection from '../components/FinancialMetricsSection';
import { ScanningProvider } from '../context/ScanningContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import RightSection from '../components/dashboard/RightSection';
import navigationService from '../services/NavigationService';
import { useButtonSound } from '../hooks';
import { useVisualizationDataSet } from '../context/ConfigContext';

export default function FinancialDashboard() {
  const navigate = useNavigate();

  // Get data from appDatabase
  const aiRecommendations = useVisualizationDataSet('financial_dashboard', 'AI Recommendations');

  const handleNextStep = useButtonSound(async () => {
    navigate('/anomaly-detection')
    try {
      // Send navigation event to operate-experience app
      await navigationService.navigateToOperateExperience('/dscr-trend', {
        referrer: 'financial-dashboard',
        action: 'NEXT_STEP'
      });
      
    } catch (error) {
      console.error('Failed to send navigation event:', error); 
    }
  });

  const handleGoBack = useButtonSound(() => {
    navigate('/document-centre');
  });
  
  return (
    <ScanningProvider>
      <DashboardLayout
        leftSection={<OcrScanningSection />}
        middleSection={<FinancialMetricsSection />}
        rightSection={<RightSection recommendations={aiRecommendations.alerts} />}
        onBack={handleGoBack}
        onNext={handleNextStep}
      />
    </ScanningProvider>
  );
}
