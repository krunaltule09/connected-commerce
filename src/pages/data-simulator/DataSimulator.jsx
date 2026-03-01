import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GradientBorderBoxLegacy from '../../components/common/GradientBorderBoxLegacy';
import GradientBorderBox from '../../components/common/GradientBorderBox';
import { useButtonSound } from '../../hooks';
import styles from './DataSimulator.module.css';
import errorsIcon from '../../assets/errors.svg';
import covenantChecksIcon from '../../assets/convetChecks.svg';

const DataSimulator = () => {
  const navigate = useNavigate();
  const tabs = ['Benefit Blocks', 'ROI Calculator', 'Case Studies / Benchmarks'];
  const [selectedTab, setSelectedTab] = useState('Benefit Blocks');
  
  // Custom background styles for each tab
  const getTabStyle = (tab, isSelected) => {
    const baseStyle = {
      color: '#FCFCFC',
      border: 'none !important',
      backgroundColor: 'transparent',
      textTransform: 'none',
      fontSize: '0.85rem',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: isSelected 
        ? `url('/assets/Group 5.svg')`
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
      outline: 'none !important',
      boxShadow: 'none !important',
      '&:hover': {
        outline: 'none !important',
        border: 'none !important',
        cursor: 'not-allowed',
      },
      '&:focus': {
        outline: 'none !important',
        border: 'none !important',
      },
      '&:active': {
        outline: 'none !important',
        border: 'none !important',
      },
      '&.Mui-focusVisible': {
        outline: 'none !important',
        border: 'none !important',
      },
    };
    
    // Add tab-specific adjustments
    if (tab === 'Benefit Blocks') {
      return {
        ...baseStyle,
        minWidth: '220px',
        '&:hover': {
          outline: 'none !important',
          border: 'none !important',
          cursor: 'pointer',
          backgroundColor: 'transparent',
        },
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
            <Stack direction="row" spacing={3} sx={{ overflowX: 'auto', pb: 0.6, justifyContent: 'left' }}>
              {tabs.map((tab, index) => {
                const isSelected = selectedTab === tab;
                const isDisabled = tab === 'ROI Calculator' || tab === 'Case Studies / Benchmarks';
                // Removed unused bgColor variable
                return (
                  <Button
                    key={tab}
                    onClick={() => !isDisabled && setSelectedTab(tab)}
                    variant="outlined"
                    disabled={isDisabled}
                    sx={{
                      ...getTabStyle(tab, isSelected),
                      ...(index === 2 && { marginLeft: '2rem !important' }),
                      ...(isDisabled && {
                        opacity: 0.5,
                        cursor: 'not-allowed !important',
                        pointerEvents: 'auto',
                        color: '#FCFCFC !important'
                      })
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
                    <Typography className={styles.timelineValue} sx={{ fontSize: '41.5px !important', mb: "10px !important" }}>3 Days</Typography>
                    <Typography className={styles.timelineLabel}>Earlier (Without AI Integration)</Typography>
                  </Box>
                </Box>
                
                <Box className={styles.timelineItem}>
                  <Box className={styles.timelineIconContainer}>
                    <Box className={styles.timelineIcon}>
                      <Box className={styles.sparkIcon}></Box>
                    </Box>
                    <Box className={styles.timelineConnector}></Box>
                  </Box>
                  <Box className={styles.timelineContent}>
                    <Typography className={styles.timelineValue} sx={{ fontSize: '41.5px !important', mb: "10px !important"  }}>30 Minutes</Typography>
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
                
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '4px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <Box 
                        component="img"
                        src={covenantChecksIcon}
                        alt="Faster Covenant Checks"
                        sx={{ 
                          width: 36, 
                          height: 36
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
                 
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '4px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <Box 
                        component="img"
                        src={errorsIcon}
                        alt="Fewer Errors"
                        sx={{ 
                          width: 36, 
                          height: 36
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
              <GradientBorderBoxLegacy className={styles.columnContent}>
                <Box className={styles.alertBox} sx={{ background: 'rgba(255, 67, 50, 0.21)', width: '100%' }}>
                  <Box className={styles.alertHeader}>
                    <Box className={styles.alertIcon} sx={{ color: '#F22323' }}></Box>
                    <Typography className={styles.alertTitle} sx={{ color: '#F22323' }}>Proactive Alerts</Typography>
                  </Box>
                  
                  <Box className={styles.alertDetails} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box className={styles.alertDetail} sx={{ width: '30%', minWidth: '120px' }}>
                      <Typography className={styles.alertDetailLabel}>Tampered Recipient</Typography>
                      <Typography className={styles.alertDetailValue} sx={{ whiteSpace: 'nowrap', display: 'block' }}>XYZ Holdings (Offshore)</Typography>
                    </Box>
                    
                    <Box className={styles.alertDetail} sx={{ width: '35%', minWidth: '200px' }}>
                      <Typography className={styles.alertDetailLabel}>Tampered Routing Path</Typography>
                      <Typography className={styles.alertDetailValue}>Rerouted through unknown server node (Hong Kong)</Typography>
                    </Box>
                    
                    <Box className={styles.alertDetail} sx={{ width: '30%', minWidth: '120px' }}>
                      <Typography className={styles.alertDetailLabel}>Blockchain Hash Check</Typography>
                      <Typography className={styles.alertDetailValue} sx={{ whiteSpace: 'nowrap', display: 'block' }}>Mismatch – integrity violated</Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Box className={styles.alertBox} sx={{ background: 'rgba(113, 60, 2, 0.51)', width: '100%' }}>
                  <Box className={styles.alertHeader}>
                    <Box className={styles.alertIcon} sx={{ color: '#FF8700' }}></Box>
                    <Typography className={styles.alertTitle} sx={{ color: '#FF8700' }}>Missed breaches in manual process</Typography>
                  </Box>
                  
                  <Box className={styles.alertDetails} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box className={styles.alertDetail} sx={{ width: '30%', minWidth: '120px' }}>
                      <Typography className={styles.alertDetailLabel}>Covenant Breach</Typography>
                      <Typography className={styles.alertDetailValue} sx={{ whiteSpace: 'nowrap', display: 'block' }}>DEBT RATIO EXCEEDED</Typography>
                    </Box>
                    
                    <Box className={styles.alertDetail} sx={{ width: '35%', minWidth: '200px' }}>
                      <Typography className={styles.alertDetailLabel}>Reporting Deadline</Typography>
                      <Typography className={styles.alertDetailValue} sx={{ whiteSpace: 'nowrap', display: 'block' }}>MISSED BY 3 DAYS</Typography>
                    </Box>
                    
                    <Box className={styles.alertDetail} sx={{ width: '30%', minWidth: '120px' }}>
                      <Typography className={styles.alertDetailLabel}>Document Verification</Typography>
                      <Typography className={styles.alertDetailValue} sx={{ whiteSpace: 'nowrap', display: 'block' }}>INCOMPLETE</Typography>
                    </Box>
                  </Box>
                </Box>
              </GradientBorderBoxLegacy>
            </GradientBorderBox>
          </Box>
        </GradientBorderBox>
      </Box>
      
      {/* Navigation buttons with sound effects */}
      <Box className={styles.navigationButtons}>
        <Box 
          className={styles.backButton} 
          onClick={useButtonSound(() => navigate('/operational-doc-scan'))}
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
        onClick={() => { navigate('/'); window.location.reload(); }}
        sx={{
          cursor: 'pointer',
          transition: 'opacity 0.3s ease',
          '&:hover': { opacity: 0.8 }
        }}
      />
    </Box>
  );
};

export default DataSimulator;
