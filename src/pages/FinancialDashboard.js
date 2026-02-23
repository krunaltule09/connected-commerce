import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OcrScanningSection from '../components/OcrScanningSection';
import FinancialMetricsSection from '../components/FinancialMetricsSection';
import { ScanningProvider } from '../context/ScanningContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import RightSection from '../components/dashboard/RightSection';
import navigationService from '../services/NavigationService';
import { useButtonSound } from '../hooks';

export default function FinancialDashboard() {
  const navigate = useNavigate();
  
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
