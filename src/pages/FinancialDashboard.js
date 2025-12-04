import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import OcrScanningSection from '../components/OcrScanningSection';
import FinancialMetricsSection from '../components/FinancialMetricsSection';
import { ScanningProvider } from '../context/ScanningContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import RightSection from '../components/dashboard/RightSection';
import navigationService from '../services/NavigationService';

export default function FinancialDashboard() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  
  const handleNextStep = async () => {
    navigate('/anomaly-detection')
    try {
      // Send navigation event to operate-experience app
      await navigationService.navigateToOperateExperience('/dscr-trend', {
        referrer: 'financial-dashboard',
        action: 'NEXT_STEP'
      });
      
      setNotification({
        open: true,
        message: 'Navigation event sent to operate-experience',
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to send navigation event:', error);
      setNotification({
        open: true,
        message: 'Failed to send navigation event',
        severity: 'error'
      });
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };
  
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
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
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </ScanningProvider>
  );
}
