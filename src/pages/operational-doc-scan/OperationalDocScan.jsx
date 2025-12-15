import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade, Grow, Slide, Zoom, Collapse } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import GradientBorderBox from '../../components/common/GradientBorderBox';
import GradientButton from '../../components/common/GradientButton';
import AIRecommendations from '../../components/anomaly-detection/AIRecommendations';
import NavigationButtons from '../../components/operational-doc-scan/NavigationButtons';
import styles from './OperationalDocScan.module.css';
import { useShipmentData } from '../../hooks/useShipmentData';
import { useButtonSound } from '../../hooks';


const OperationalDocScan = () => {
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
      {/* Background image with overlay */}
      <Box 
        className={styles.backgroundOverlay}
        sx={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('/assets/operational-docu-scan.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%'
        }}
      ></Box>
      
      {/* Main content */}
      <Box className={styles.contentContainer}>
        {/* Left panel - Document Preview */}
        <Slide direction="right" in={true} timeout={800} mountOnEnter unmountOnExit>
          <GradientBorderBox className={styles.documentPreviewPanel}>
          <Box className={styles.panelTitle}>Scanned Document Preview</Box>
          
          <Box className={styles.documentImageContainer}>
            <Box 
              component="img"
              src="/assets/scanned-doc-preview.svg"
              alt="Document Preview"
              className={styles.documentImage}
            />
          </Box>
          
          <Box className={styles.scanProgressContainer}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: scanProgress >= 99 ? '#FFE600' : 'rgba(252, 252, 252, 0.7)',
                  fontSize: '0.75rem',
                }}
              >
                {scanProgress >= 99 ? 'Completed' : 'OCR scanning in process...'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#FFE600' }}>{`${Math.round(scanProgress)}%`}</Typography>
            </Box>
            <Box
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.1)',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${scanProgress}%`,
                  backgroundColor: '#FFE600',
                  transition: 'width 0.3s ease',
                }}
              />
            </Box>
          </Box>
          
        </GradientBorderBox>
        </Slide>
        
        {/* AI Chip - positioned outside the document preview panel */}
        <Grow in={scanProgress >= 50} timeout={800}>
          <Box >
            <AIRecommendations contentContainerSx={{top:"15%",left:"14%"}} recommendations={['Shipment 2845 delivered late (9/22 vs 9/20)']} />
          </Box>
        </Grow>
        
        {/* Right panel - Shipment Details */}
        <Slide direction="left" in={revealStage >= 1} timeout={800}>
          <GradientBorderBox className={styles.shipmentDetailsPanel}>
            <Box className={styles.panelTitle}>Shipment Details</Box>
            
            <Box className={styles.tableContainer}>
              <Box className={styles.tableHeader}>
                <Box className={styles.tableHeaderCell}>Shipment #</Box>
                <Box className={styles.tableHeaderCell}>Promised Delivery Date</Box>
                <Box className={styles.tableHeaderCell}>Actual Delivery Date</Box>
                <Box className={styles.tableHeaderCell}>Actions</Box>
              </Box>
              
              <Box className={styles.tableDivider}></Box>
              
              {shipments.map((shipment, index) => {
                // Calculate if this shipment should be visible based on progress
                // Each shipment appears at different progress thresholds
                const shipmentThreshold = 30 + (index * 10); // 15%, 25%, 35%, 45%, 55%
                const isShipmentVisible = scanProgress >= shipmentThreshold;
                
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
                      <Box className={styles.tableCell}>
                        <Box className={styles.deliveryStatusContainer}>
                          <Box 
                            className={`${styles.statusIndicator} ${shipment.status === 'on-time' ? styles.statusOnTime : styles.statusDelayed}`}
                          >
                            {shipment.status === 'on-time' ? (
                              <Box className={styles.checkIcon}></Box>
                            ) : (
                              <Box className={styles.alertIcon}></Box>
                            )}
                          </Box>
                          <Box>{shipment.actualDate}</Box>
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
        </Slide>
        
        {/* Bottom panel - KPIs */}
        <Zoom in={revealStage >= 2} timeout={1000} style={{ transitionDelay: revealStage >= 2 ? '300ms' : '0ms' }}>
          <GradientBorderBox className={styles.kpiPanel}>
            <Box className={styles.panelTitle}>Operational KPIs</Box>
            
            <Box className={styles.kpiContainer}>
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <GradientButton
                  variant="metric"
                  active={activeTab === 'on-time'}
                  onClick={() => handleTabChange('on-time')}
                  sx={{ 
                    minWidth: '180px',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  On-Time Delivery
                </GradientButton>
                <GradientButton
                  variant="metric"
                  active={activeTab === 'cost'}
                  onClick={() => handleTabChange('cost')}
                  sx={{ 
                    minWidth: '180px',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  Cost per Mile
                </GradientButton>
              </Box>
              
              <Box className={styles.kpiFilters}>
                <Collapse in={scanProgress >= 70} timeout={800} orientation="horizontal">
                  <Box className={styles.filterButton}>
                    <FilterListIcon sx={{ fontSize: 20, color: '#AFAEBA' }} />
                    <Box className={styles.filterText}>Filter by category</Box>
                  </Box>
                </Collapse>
                <Collapse in={scanProgress >= 80} timeout={800} orientation="horizontal">
                  <Box className={styles.filterButton}>
                    <FilterListIcon sx={{ fontSize: 20, color: '#AFAEBA' }} />
                    <Box className={styles.filterText}>Filter by time</Box>
                  </Box>
                </Collapse>
              </Box>
            </Box>
            
            <Box className={styles.chartContainer}>
              {/* Pie chart with progressive animation based on scan progress */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '15px', width: '100%' }}>
                <Box className={styles.pieChart}>
                  {/* Inner circle with pulsing animation */}
                  <Grow 
                    in={scanProgress >= 90} 
                    timeout={800}
                    style={{ 
                      transformOrigin: 'center center',
                    }}
                  >
                    <Box 
                      className={styles.pieChartInner}
                      sx={{
                        animation: scanProgress >= 92 ? 'pulse 2s infinite' : 'none',
                        '@keyframes pulse': {
                          '0%': { transform: 'scale(1)' },
                          '50%': { transform: 'scale(1.05)' },
                          '100%': { transform: 'scale(1)' },
                        },
                      }}
                    ></Box>
                  </Grow>
                  
                  {/* Outer circle with rotating animation */}
                  <Grow 
                    in={scanProgress >= 90} 
                    timeout={800}
                    style={{ 
                      transformOrigin: 'center center',
                    }}
                  >
                    <Box 
                      className={styles.pieChartOuter}
                      sx={{
                        animation: scanProgress >= 92 ? 'rotate 4s linear infinite' : 'none',
                        '@keyframes rotate': {
                          '0%': { transform: 'rotate(0deg)' },
                          '100%': { transform: 'rotate(360deg)' },
                        },
                      }}
                    ></Box>
                  </Grow>
                </Box>
                
                {/* Chart legend with sequential reveal - now below the pie chart */}
                <Collapse 
                  in={scanProgress >= 95} 
                  timeout={1200}
                  orientation="vertical"
                >
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start',
                    gap: '10px',
                    marginTop: '10px',
                    paddingLeft: '42px'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Box sx={{ 
                        width: '10px', 
                        height: '10px', 
                        borderRadius: '50%', 
                        backgroundColor: '#0A558E' 
                      }} />
                      <Typography sx={{ 
                        color: '#FFFFFF', 
                        fontSize: '14px',
                        fontWeight: 'normal',
                        fontFamily: 'var(--font-family-primary, "EYInterstate")',
                      }}>
                        Target: 78%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Box sx={{ 
                        width: '10px', 
                        height: '10px', 
                        borderRadius: '50%', 
                        backgroundColor: '#188CE5' 
                      }} />
                      <Typography sx={{ 
                        color: '#FFFFFF', 
                        fontSize: '14px',
                        fontWeight: 'normal',
                        fontFamily: 'var(--font-family-primary, "EYInterstate")',
                      }}>
                        Actual: 62.4%
                      </Typography>
                    </Box>
                  </Box>
                </Collapse>
              </Box>
            </Box>
          </Box>
        </GradientBorderBox>
        </Zoom>
     
      </Box>
         {/* Navigation buttons */}
      <NavigationButtons 
        handleGoBack={handleGoBack} 
        handleNextStep={handleNextStep} 
        nextButtonEnabled={nextButtonEnabled} 
      />
      
      {/* EY Logo */}
      <Zoom in={true} timeout={1500} style={{ transitionDelay: '500ms' }}>
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
