import React, { useState, useEffect } from 'react';
import { Box, Grow, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GradientBorderBox from '../../components/common/GradientBorderBox';
import { Typography, List, ListItem } from '@mui/material';
import aiBoxSvg from '../../assets/ai_box_tall.svg';
import NavigationButtons from '../../components/operational-doc-scan/NavigationButtons';
import OcrScanningSection from '../../components/OcrScanningSection';
import DetailedFindings from '../../components/y14-report/DetailedFindings';
import { useConfig, useVisualizationDataSet } from '../../context/ConfigContext';
import styles from './OperationalDocScan.module.css';
import { useButtonSound } from '../../hooks';

const OperationalDocScan = () => {
  const navigate = useNavigate();
  const { assets } = useConfig();
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  
  // Get data from appDatabase
  const aiAlertData = useVisualizationDataSet('operational_doc_scan', 'AI Alert');
  const findingsData = useVisualizationDataSet('operational_doc_scan', 'Operational Findings');
  const shipmentData = useVisualizationDataSet('operational_doc_scan', 'Shipment Details');
  
  // Transform database shipment data to match component format
  const shipments = shipmentData.rows.map((row) => ({
    name: row.shipment,
    promisedDate: row.promised,
    actualDate: row.actual,
    status: row.status
  }));
  
  const revealStage = scanProgress > 20;
  
  const [animateOcr, setAnimateOcr] = useState(false);
  const [animateAi, setAnimateAi] = useState(false);
  const [animateShipment, setAnimateShipment] = useState(false);
  const [animateFindings, setAnimateFindings] = useState(false);
  const [animateLogo, setAnimateLogo] = useState(false);
  
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          setScanComplete(true);
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    return () => clearInterval(progressInterval);
  }, []);
  

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
  
  // Enable next button after all animations complete and shipments are revealed
  useEffect(() => {
    if (scanComplete && animateFindings && animateShipment) {
      // Add delay to ensure all shipment rows have animated in
      const timer = setTimeout(() => {
        setNextButtonEnabled(true);
      }, 1000); // Increased delay to account for shipment animations
      return () => clearTimeout(timer);
    }
  }, [scanComplete, animateFindings, animateShipment]);
  
  const handleNextStep = useButtonSound(() => {
    if (nextButtonEnabled) {
      // /data-simulator
      navigate('/y14-report');
    }
  });

  const handleGoBack = useButtonSound(() => {
    navigate('/anomaly-detection');
  });

  const handleLogoClick = useButtonSound(() => {
    // Navigate to home/welcome page
    navigate('/');
    // Reload the page to reset the app state
    window.location.reload();
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
        <video muted playsInline>
          <source src={assets['Banking_Capital_Market_Operate_Table_Dashboard_Background_Video']} type="video/mp4" />
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
          <Box sx={{
            width: '98.7%',
            marginLeft: 'auto',
            marginRight: 'auto',
            alignSelf: 'flex-start',
          }}>
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <Box
                component="img"
                src={aiBoxSvg}
                alt="AI Background"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill',
                }}
              />
              <Box sx={{
                position: 'absolute',
                top: '52%',
                left: '55%',
                width: '70%',
                transform: 'translate(-50%, -50%)',
                paddingLeft: '2rem',
                paddingRight: '1rem',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
                <List sx={{ p: 0 }}>
                  {aiAlertData.recommendations?.map((point, index) => (
                    <ListItem key={index} disableGutters sx={{ p: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                        <Box sx={{ color: '#FFFFFF', mr: 1.5, fontSize: '0.75rem', lineHeight: 1, opacity: 0.7, mt: '3px' }}>▶</Box>
                        <Typography
                          variant="body2"
                          color="white"
                          sx={{
                            fontSize: '0.85rem',
                            lineHeight: 1.2,
                            fontWeight: '300',
                            fontFamily: 'Interstate, sans-serif',
                            textAlign: 'left',
                          }}
                        >
                          {point}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
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
                              <Box component="img" src={assets['Banking_Capital_Market_Operate_Table_On_Time_Status.svg']} alt="On Time" sx={{ width: '100%', height: '100%' }} />
                            ) : (
                              <Box component="img" src={assets['Banking_Capital_Market_Operate_Table_Delayed_Status.svg']} alt="Delayed" sx={{ width: '100%', height: '100%' }} />
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
            findings={findingsData.findings}
            showWarning={false}
            cardMinWidth="220px"
            cardMaxWidth="328px"
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
      <Box 
        onClick={handleLogoClick}
        sx={{
          cursor: 'pointer',
          display: 'inline-block'
        }}
      >
        <Zoom in={animateLogo} timeout={800}>
          <Box 
            component="img"
            src={assets['Banking_Capital_Market_Operate_Table_EY_Logo.svg']}
            alt="EY Logo"
            className={styles.eyLogo}
            sx={{
              transition: 'opacity 0.3s ease',
              '&:hover': {
                opacity: 0.8
              }
            }}
          />
        </Zoom>
      </Box>
    </Box>
  );
};

export default OperationalDocScan;
