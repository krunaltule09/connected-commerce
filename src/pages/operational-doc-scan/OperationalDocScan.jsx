import React, { useState, useEffect } from 'react';
import { Box, Fade, Grow, Slide, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GradientBorderBox from '../../components/common/GradientBorderBox';
import AIRecommendationsWithGif from '../../components/anomaly-detection/AIRecommendationsWithGif';
import NavigationButtons from '../../components/operational-doc-scan/NavigationButtons';
import OcrScanningSection from '../../components/OcrScanningSection';
import DetailedFindings from '../../components/y14-report/DetailedFindings';
import styles from './OperationalDocScan.module.css';
import { useShipmentData } from '../../hooks/useShipmentData';
import { useButtonSound } from '../../hooks';


const operationalFindings = [
  {
    title: 'On-Time Delivery (OTIF) Impact',
    section: 'Tracking OTIF dropped to 91%, missing covenant threshold',
    usedFor: 'Analyze root cause: late pickups, route inefficiency, or carrier performance'
  },
  {
    title: 'Promised vs Delivered Variance',
    section: 'Delivery lead times vary ±60% (2-10 days), impacting cash flow',
    usedFor: 'Standardize lead time estimates and improve forecasting accuracy'
  },
  {
    title: 'Cost Per Mile / Unit Cost Pressure',
    section: 'Analyze cost per mile vs 8.5 p/mi, understand if cost pressure exists',
    usedFor: 'Identify cost drivers: fuel, labor, maintenance, or route optimization gaps'
  },
  {
    title: 'Capacity Utilization Decline',
    section: 'Flagging utilization at 78%, impacting fixed cost absorption',
    usedFor: 'Review load planning and asset allocation to improve utilization rates'
  },
  {
    title: 'OTIF Gap/Time to Fulfil',
    section: 'Tracking OTIF at 91% (Above 90%)',
    usedFor: 'Monitor performance trends and identify improvement opportunities'
  }
];

const OperationalDocScan = () => {
  const navigate = useNavigate();
  const { shipments, scanProgress, revealStage, scanComplete } = useShipmentData();
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);
  
  // Animation states for each section
  const [animateOcr, setAnimateOcr] = useState(false);
  const [animateAi, setAnimateAi] = useState(false);
  const [animateShipment, setAnimateShipment] = useState(false);
  const [animateFindings, setAnimateFindings] = useState(false);
  const [animateLogo, setAnimateLogo] = useState(false);
  
  // Staggered animation timing with 400ms gaps
  useEffect(() => {
    const ocrTimer = setTimeout(() => setAnimateOcr(true), 0);
    const shipmentTimer = setTimeout(() => setAnimateShipment(true), 500);
    const aiTimer = setTimeout(() => setAnimateAi(true), 1200);
    const findingsTimer = setTimeout(() => setAnimateFindings(true), 1700);
    const logoTimer = setTimeout(() => setAnimateLogo(true), 2000);
    
    return () => {
      clearTimeout(ocrTimer);
      clearTimeout(aiTimer);
      clearTimeout(shipmentTimer);
      clearTimeout(findingsTimer);
      clearTimeout(logoTimer);
    };
  }, []);
  
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
  
  const handleNextStep = useButtonSound(() => {
    if (nextButtonEnabled) {
      navigate('/data-simulator');
    }
  });

  const handleGoBack = useButtonSound(() => {
    navigate('/y14-report');
  });

  return (
    <Box className={styles.operationalDocScanPage}>
      {/* Video Background */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        '& video': {
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }
      }}>
        <video autoPlay loop muted playsInline>
          <source src="/assets/AdobeStock_1544892280.mp4" type="video/mp4" />
        </video>
      </Box>
      
      {/* Dark Overlay */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: -1
      }} />
      
      {/* Main content */}
      <Box className={styles.contentContainer}>
        {/* Left panel - OCR Scanning Section */}
        <Grow in={animateOcr} timeout={800}>
          <Box style={{height:"101%"}}>
            <OcrScanningSection isInOperationalDocScan={true} />
          </Box>
        </Grow>
        
        {/* AI Chip - positioned outside the document preview panel */}
        <Grow in={animateAi} timeout={800}>
          <Box sx={{ marginLeft: '1rem' }}>
            <AIRecommendationsWithGif 
              size="medium" 
              contentContainerSx={{display:"flex",alignItems:"center",justifyContent:"center",top:"13%",left:"3%"}} 
              recommendations={['Shipment 2845 delivered late (9/22 vs 9/20)']} 
            />
          </Box>
        </Grow>
        
        {/* Right panel - Shipment Details */}
        <Grow in={animateShipment && revealStage} timeout={800}>
          
          <GradientBorderBox className={styles.shipmentDetailsPanel}>
            <Box className={styles.panelTitle}>Shipment Details</Box>
            
            <Box className={styles.tableContainer}>
              <Box className={styles.tableHeader}>
                <Box className={styles.tableHeaderCell}>Shipment #</Box>
                <Box className={styles.tableHeaderCell}>Promised Delivery Date</Box>
                <Box className={styles.tableHeaderCell}>Actual Delivery Date</Box>
                <Box className={styles.tableHeaderCell}>Status</Box>
                <Box className={styles.tableHeaderCell}>Actions</Box>
              </Box>
              
              <Box className={styles.tableDivider}></Box>
              
              {shipments.map((shipment, index) => {
                // Calculate if this shipment should be visible based on progress
                // Each shipment appears at different progress thresholds
                const shipmentThreshold = 30 + (index * 10); // 15%, 25%, 35%, 45%, 55%
                const isShipmentVisible = scanProgress >= shipmentThreshold;
                const isOnTime = shipment.status === 'on-time' || shipment.status === 'early';
                
                return (
                  <Grow 
                    in={isShipmentVisible} 
                    timeout={600}
                    style={{ transformOrigin: '0 0 0' }}
                    key={index}
                  >
                    <Box 
                      className={styles.tableRow}
                      sx={{
                        position: 'relative',
                        '&::after': isShipmentVisible ? {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          bottom: 0,
                          height: '2px',
                          background: 'linear-gradient(90deg, rgba(33, 207, 255, 0.7) 0%, rgba(33, 207, 255, 0) 100%)',
                          animation: 'fadeOut 1.5s forwards',
                          '@keyframes fadeOut': {
                            '0%': { opacity: 1 },
                            '100%': { opacity: 0 },
                          },
                        } : {}
                      }}
                    >
                      <Box className={styles.tableCell}>{shipment.name}</Box>
                      <Box className={styles.tableCell}>{shipment.promisedDate}</Box>
                      <Box className={styles.tableCell}>{shipment.actualDate}</Box>
                      <Box className={styles.tableCell}>
                        <Box className={styles.deliveryStatusContainer}>
                          <Box 
                            className={`${styles.statusIndicator} ${isOnTime ? styles.statusOnTime : styles.statusDelayed}`}
                          >
                            {isOnTime ? (
                              <Box component="img" src="/assets/on-time-status.svg" alt="On Time" sx={{ width: '100%', height: '100%' }} />
                            ) : (
                              <Box component="img" src="/assets/delayed-status.svg" alt="Delayed" sx={{ width: '100%', height: '100%' }} />
                            )}
                          </Box>
                          <Box sx={{textTransform:"capitalize"}}>{shipment.status}</Box>
                        </Box>
                      </Box>
                      <Box className={styles.tableCell}>
                        <Box className={styles.actionButton}>
                          <Box className={styles.arrowIcon}></Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grow>
                );
              })}
            </Box>
          </GradientBorderBox>
        </Grow>
      
     
      </Box>
      {/* Detailed Findings Panel with Gradient Border */}
      <Grow in={animateFindings} timeout={800}>
        <GradientBorderBox className={styles.detailedFindingsPanel}>
          <DetailedFindings 
            findings={operationalFindings}
            showWarning={false}
            cardMinWidth="220px"
            cardMaxWidth="330px"
            cardHeight="220px"
            buttonTransformY="-1rem"
          />
        </GradientBorderBox>
      </Grow>
         {/* Navigation buttons */}
      <NavigationButtons 
        handleGoBack={handleGoBack} 
        handleNextStep={handleNextStep} 
        nextButtonEnabled={nextButtonEnabled} 
      />
      
      {/* EY Logo */}
      <Zoom in={animateLogo} timeout={800}>
        <Box 
          component="img"
          src="/assets/ey-logo.svg"
          alt="EY Logo"
          className={styles.eyLogo}
        />
      </Zoom>
    </Box>
  );
};

export default OperationalDocScan;
