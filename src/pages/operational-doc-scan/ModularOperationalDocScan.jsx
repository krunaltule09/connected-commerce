import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './OperationalDocScan.module.css';
import { useShipmentData } from '../../hooks/useShipmentData';

// Import modular components
import BackgroundOverlay from '../../components/operational-doc-scan/BackgroundOverlay';
import DocumentPreviewPanel from '../../components/operational-doc-scan/DocumentPreviewPanel';
import ShipmentDetailsPanel from '../../components/operational-doc-scan/ShipmentDetailsPanel';
import KpiPanel from '../../components/operational-doc-scan/KpiPanel';
import AIChip from '../../components/operational-doc-scan/AIChip';
import NavigationButtons from '../../components/operational-doc-scan/NavigationButtons';
import EyLogo from '../../components/operational-doc-scan/EyLogo';

const ModularOperationalDocScan = () => {
  const navigate = useNavigate();
  const { shipments, scanProgress, revealStage, scanComplete } = useShipmentData();
  const [activeTab, setActiveTab] = useState('on-time');
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);
  
  // Enable next button when scan is complete
  useEffect(() => {
    if (scanComplete) {
      // Add a small delay before enabling the next button for better UX
      const timer = setTimeout(() => {
        setNextButtonEnabled(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [scanComplete]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleNextStep = () => {
    if (nextButtonEnabled) {
      navigate('/data-simulator');
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Box className={styles.operationalDocScanPage}>
      {/* Background image with overlay */}
      <BackgroundOverlay />
      
      {/* Main content */}
      <Box className={styles.contentContainer}>
        {/* Left panel - Document Preview */}
        <DocumentPreviewPanel scanProgress={scanProgress} />
        
        {/* AI Chip - positioned outside the document preview panel */}
        <AIChip 
          scanProgress={scanProgress} 
          recommendations={['Shipment 2845 delivered late (9/22 vs 9/20)']} 
        />
        
        {/* Right panel - Shipment Details */}
        <ShipmentDetailsPanel 
          revealStage={revealStage} 
          shipments={shipments} 
          scanProgress={scanProgress} 
        />
        
        {/* Bottom panel - KPIs */}
        <KpiPanel 
          revealStage={revealStage} 
          scanProgress={scanProgress} 
          activeTab={activeTab} 
          handleTabChange={handleTabChange} 
        />
      </Box>
      
      {/* Navigation buttons */}
      <NavigationButtons 
        handleGoBack={handleGoBack} 
        handleNextStep={handleNextStep} 
        nextButtonEnabled={nextButtonEnabled} 
      />
      
      {/* EY Logo */}
      <EyLogo />
    </Box>
  );
};

export default ModularOperationalDocScan;
