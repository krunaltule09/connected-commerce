import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GradientBorderBox from '../../components/common/GradientBorderBox';
import { useButtonSound } from '../../hooks';
import styles from './DataSimulator.module.css';

const DataSimulator = () => {
  const navigate = useNavigate();
  const tabs = ['Benefit Blocks', 'ROI Calculator', 'Case Studies / Benchmarks'];
  const [selectedTab, setSelectedTab] = useState('Benefit Blocks');
  
  // Custom background styles for each tab
  const getTabStyle = (tab, isSelected) => {
    const baseStyle = {
      color: '#FCFCFC',
      border: 'none',
      backgroundColor: 'transparent',
      textTransform: 'none',
      fontSize: '0.85rem',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: isSelected 
        ? `url('/assets/Group 4.svg')`
        : `url('/assets/Group 554.svg')`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      whiteSpace: 'normal',
      lineHeight: '1.2',
      height: '60px',
      wordWrap: 'break-word',
      textAlign: 'center',
      position: 'relative',
    };
    
    // Add tab-specific adjustments
    if (tab === 'Benefit Blocks') {
      return {
        ...baseStyle,
        minWidth: '220px',
      };
    } else if (tab === 'Client-Specific ROI Calculator') {
      return {
        ...baseStyle,
        minWidth: '220px',
      };
    } else {
      return {
        ...baseStyle,
        minWidth: '200px',
      };
    }
  };
  return (
    <Box className={styles.dataSimulatorPage}>
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
        <GradientBorderBox className={styles.mainPanel}>
          <Typography className={styles.panelTitle}>Data Simulator</Typography>
          
          {/* Tab buttons */}
          <Box sx={{ width: '100%' }}>
            <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', pb: 0.5 }}>
              {tabs.map((tab) => {
                const isSelected = selectedTab === tab;
                // Removed unused bgColor variable
                return (
                  <Button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    variant="outlined"
                    sx={{
                      ...getTabStyle(tab, isSelected),
                      '&:hover': {
                        backgroundImage: isSelected
                          ? `url('/assets/Group 4.svg')`
                          : `url('/assets/Group 554.svg')`,
                      },
                    }}
                  >
                    {tab}
                  </Button>
                );
              })}
            </Stack>
          </Box>
          
          <Typography className={styles.sectionTitle}>Drill into before/after timelines</Typography>
          
          {/* Three columns layout */}
          <Box className={styles.columnsContainer}>
            {/* Speed column */}
            <GradientBorderBox className={styles.column}>
              <Typography className={styles.columnTitle}>Speed</Typography>
              <GradientBorderBox className={styles.columnContentSpeed}>
                <Typography className={styles.timelineTitle}>Before/After Impact Timeline</Typography>
                
                <Box className={styles.timelineItem}>
                  <Box className={styles.timelineIconContainer}>
                    <Box className={styles.timelineIcon}>
                      <Box className={styles.calendarIcon}></Box>
                    </Box>
                    <Box className={styles.timelineConnector}></Box>
                  </Box>
                  <Box className={styles.timelineContent}>
                    <Typography className={styles.timelineValue}>3 Days</Typography>
                    <Typography className={styles.timelineLabel}>Earlier (Without AI Integration)</Typography>
                  </Box>
                </Box>
                
                <Box className={styles.timelineItem}>
                  <Box className={styles.timelineIconContainer}>
                    <Box className={styles.timelineIcon}>
                      <Box className={styles.sparkIcon}></Box>
                    </Box>
                  </Box>
                  <Box className={styles.timelineContent}>
                    <Typography className={styles.timelineValue}>30 Minutes</Typography>
                    <Typography className={styles.timelineLabel}>Now (with AI)</Typography>
                  </Box>
                </Box>
              </GradientBorderBox>
            </GradientBorderBox>
            
            {/* Accuracy column */}
            <GradientBorderBox className={styles.column}>
              <Typography className={styles.columnTitle}>Accuracy (OCR/NLP Error Reduction Metrics)</Typography>
              <Box className={styles.metricsContainer}>
                <GradientBorderBox className={styles.metricBox} sx={{ 
                  mb: 2, 
                  borderColor: '#FFE600',
                  borderRadius: 1,
                  bgcolor: '#1E1E28',
                  border: '1px solid',
                  borderImage: 'linear-gradient(130deg, rgba(255, 230, 0, 1) 0%, rgba(46, 46, 56, 1) 60%) 1',
                  borderImageSlice: 1
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      bgcolor: '#23232F', 
                      borderRadius: '4px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <Box 
                        component="span" 
                        sx={{ 
                          width: 24, 
                          height: 24, 
                          display: 'flex',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E")`,
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center'
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: 15, fontWeight: 500, color: '#FFFFFF', mb: 1 }}>Faster Covenant Checks</Typography>
                      <Box sx={{ pl: 2 }}>
                        <Typography sx={{ fontSize: 12, color: '#FFFFFF', display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Box component="span" sx={{ mr: 1, fontSize: 16 }}>•</Box>
                          Global Logistics Provider secured 65% faster Covenant Checks.
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: '#FFFFFF', display: 'flex', alignItems: 'center' }}>
                          <Box component="span" sx={{ mr: 1, fontSize: 16 }}>•</Box>
                          XYZ Company secured 35% faster Covenant Checks.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </GradientBorderBox>
                
                <GradientBorderBox className={styles.metricBox} sx={{ 
                  borderColor: '#FFE600',
                  borderRadius: 1,
                  bgcolor: '#1E1E28',
                  border: '1px solid',
                  borderImage: 'linear-gradient(130deg, rgba(255, 230, 0, 1) 0%, rgba(46, 46, 56, 1) 60%) 1',
                  borderImageSlice: 1
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      bgcolor: '#23232F', 
                      borderRadius: '4px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <Box 
                        component="span" 
                        sx={{ 
                          width: 24, 
                          height: 24, 
                          display: 'flex',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z'/%3E%3C/svg%3E")`,
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center'
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: 15, fontWeight: 500, color: '#FFFFFF', mb: 1 }}>Fewer Errors</Typography>
                      <Box sx={{ pl: 2 }}>
                        <Typography sx={{ fontSize: 12, color: '#FFFFFF', display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Box component="span" sx={{ mr: 1, fontSize: 16 }}>•</Box>
                          Global Logistics Provider, reduced 40% error in processing.
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: '#FFFFFF', display: 'flex', alignItems: 'center' }}>
                          <Box component="span" sx={{ mr: 1, fontSize: 16 }}>•</Box>
                          XYZ Company, reduced 40% error in processing.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </GradientBorderBox>
              </Box>
            </GradientBorderBox>
            
            {/* Compliance column */}
            <GradientBorderBox className={styles.column}>
              <Typography className={styles.columnTitle}>Compliance</Typography>
              <GradientBorderBox className={styles.columnContent}>
                <Box className={styles.alertBox} sx={{ background: 'rgba(255, 67, 50, 0.21)', width: '100%' }}>
                  <Box className={styles.alertHeader}>
                    <Box className={styles.alertIcon} sx={{ color: '#F22323' }}></Box>
                    <Typography className={styles.alertTitle} sx={{ color: '#F22323' }}>Proactive Alerts</Typography>
                  </Box>
                  
                  <Box className={styles.alertDetails}>
                    <Box className={styles.alertDetail}>
                      <Typography className={styles.alertDetailLabel}>Tampered Recipient</Typography>
                      <Typography className={styles.alertDetailValue}>XYZ Holdings (Offshore)</Typography>
                    </Box>
                    
                    <Box className={styles.alertDetail}>
                      <Typography className={styles.alertDetailLabel}>Tampered Routing Path</Typography>
                      <Typography className={styles.alertDetailValue}>Rerouted through unknown server node (Hong Kong)</Typography>
                    </Box>
                    
                    <Box className={styles.alertDetail}>
                      <Typography className={styles.alertDetailLabel}>Blockchain Hash Check</Typography>
                      <Typography className={styles.alertDetailValue}>Mismatch – integrity violated</Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Box className={styles.alertBox} sx={{ background: 'rgba(113, 60, 2, 0.51)', width: '100%' }}>
                  <Box className={styles.alertHeader}>
                    <Box className={styles.alertIcon} sx={{ color: '#FF8700' }}></Box>
                    <Typography className={styles.alertTitle} sx={{ color: '#FF8700' }}>Missed breaches in manual process</Typography>
                  </Box>
                  
                  <Box className={styles.alertDetails}>
                    <Box className={styles.alertDetail}>
                      <Typography className={styles.alertDetailLabel}>Covenant Breach</Typography>
                      <Typography className={styles.alertDetailValue}>DEBT RATIO EXCEEDED</Typography>
                    </Box>
                    
                    <Box className={styles.alertDetail}>
                      <Typography className={styles.alertDetailLabel}>Reporting Deadline</Typography>
                      <Typography className={styles.alertDetailValue}>MISSED BY 3 DAYS</Typography>
                    </Box>
                    
                    <Box className={styles.alertDetail}>
                      <Typography className={styles.alertDetailLabel}>Document Verification</Typography>
                      <Typography className={styles.alertDetailValue}>INCOMPLETE</Typography>
                    </Box>
                  </Box>
                </Box>
              </GradientBorderBox>
            </GradientBorderBox>
          </Box>
        </GradientBorderBox>
      </Box>
      
      {/* Navigation buttons with sound effects */}
      <Box className={styles.navigationButtons}>
        <Box 
          className={styles.backButton} 
          onClick={useButtonSound(() => window.history.back())}
        >
          Back
        </Box>
        <Box 
          className={styles.nextButton} 
          onClick={useButtonSound(() => navigate('/feedback'))}
        >
          Next
        </Box>
      </Box>
      
      {/* EY Logo */}
      <Box 
        component="img"
        src="/assets/ey-logo.svg"
        alt="EY Logo"
        className={styles.eyLogo}
      />
    </Box>
  );
};

export default DataSimulator;
