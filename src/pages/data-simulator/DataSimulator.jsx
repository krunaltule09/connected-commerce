import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GradientBorderBoxLegacy from '../../components/common/GradientBorderBoxLegacy';
import GradientBorderBox from '../../components/common/GradientBorderBox';
import { useButtonSound } from '../../hooks';
import styles from './DataSimulator.module.css';
import { useConfig, useVisualizationDataSet } from '../../context/ConfigContext';

const DataSimulator = () => {
  const navigate = useNavigate();
  const { assets } = useConfig();
  
  // Get data from appDatabase
  const headerData = useVisualizationDataSet('data_simulator', 'Page Header');
  const speedData = useVisualizationDataSet('data_simulator', 'Speed Metrics');
  const accuracyData = useVisualizationDataSet('data_simulator', 'Accuracy Metrics');
  const complianceData = useVisualizationDataSet('data_simulator', 'Compliance Alerts');
  
  const [selectedTab, setSelectedTab] = useState(headerData.tabs[0]);
  
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
        ? `url('${assets['Banking_Capital_Market_Operate_Table_Button_Background_Active.svg']}')`
        : `url('${assets['Banking_Capital_Market_Operate_Table_Button_Background_Alt.svg']}')`,
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
        <GradientBorderBox className={styles.mainPanel}>
          <Typography className={styles.panelTitle}>{headerData.title}</Typography>
          
          {/* Tab buttons */}
          <Box sx={{ width: '100%' }}>
            <Stack direction="row" spacing={3} sx={{ overflowX: 'auto', pb: 0.6, justifyContent: 'left' }}>
              {headerData.tabs.map((tab, index) => {
                const isSelected = selectedTab === tab;
                const isDisabled = index !== 0;
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
              <Typography className={styles.columnTitle}>{speedData.title}</Typography>
              <GradientBorderBox className={styles.columnContentSpeed}>
                <Typography className={styles.timelineTitle}>{speedData.subtitle}</Typography>
                
                <Box className={styles.timelineItem}>
                  <Box className={styles.timelineIconContainer}>
                    <Box className={styles.timelineIcon}>
                      <Box className={styles.calendarIcon}></Box>
                    </Box>
                    <Box className={styles.timelineConnector}></Box>
                  </Box>
                  <Box className={styles.timelineContent}>
                    <Typography className={styles.timelineValue} sx={{ fontSize: '41.5px !important', mb: "10px !important" }}>{speedData.before.value}</Typography>
                    <Typography className={styles.timelineLabel}>{speedData.before.label}</Typography>
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
                    <Typography className={styles.timelineValue} sx={{ fontSize: '41.5px !important', mb: "10px !important"  }}>{speedData.after.value}</Typography>
                    <Typography className={styles.timelineLabel}>{speedData.after.label}</Typography>
                  </Box>
                </Box>
              </GradientBorderBox>
            </GradientBorderBox>
            
            {/* Accuracy column */}
            <GradientBorderBox className={styles.column}>
              <Typography className={styles.columnTitle}>{accuracyData.title}</Typography>
              <Box className={styles.metricsContainer}>
                {accuracyData.metrics.map((metric, idx) => (
                  <GradientBorderBox key={idx} className={styles.metricBox} sx={{ mb: idx === 0 ? 2 : 0 }}>
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
                          src={assets[idx === 0 ? 'BCM_OperateTable_Covenant_Checks.svg' : 'BCM_OperateTable_Errors_Icon.svg']}
                          alt={metric.title}
                          sx={{ width: 36, height: 36 }}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: 15, fontWeight: 500, color: '#FFFFFF', mb: 1 }}>{metric.title}</Typography>
                        <Box sx={{ pl: 2 }}>
                          {metric.points.map((point, pointIdx) => (
                            <Typography key={pointIdx} sx={{ fontSize: 12, color: '#FFFFFF', display: 'flex', alignItems: 'center', mb: pointIdx === 0 ? 0.5 : 0 }}>
                              <Box component="span" sx={{ mr: 1, fontSize: 16 }}>•</Box>
                              {point}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </GradientBorderBox>
                ))}
              </Box>
            </GradientBorderBox>
            
            {/* Compliance column */}
            <GradientBorderBox className={styles.column}>
              <Typography className={styles.columnTitle}>{complianceData.title}</Typography>
              <GradientBorderBoxLegacy className={styles.columnContent}>
                {complianceData.alerts.map((alert, idx) => (
                  <Box key={idx} className={styles.alertBox} sx={{ 
                    background: alert.type === 'critical' ? 'rgba(255, 67, 50, 0.21)' : 'rgba(113, 60, 2, 0.51)', 
                    width: '100%' 
                  }}>
                    <Box className={styles.alertHeader}>
                      <Box className={styles.alertIcon} sx={{ color: alert.type === 'critical' ? '#F22323' : '#FF8700' }}></Box>
                      <Typography className={styles.alertTitle} sx={{ color: alert.type === 'critical' ? '#F22323' : '#FF8700' }}>{alert.title}</Typography>
                    </Box>
                    
                    <Box className={styles.alertDetails} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      {alert.details.map((detail, detailIdx) => (
                        <Box key={detailIdx} className={styles.alertDetail} sx={{ 
                          width: detailIdx === 1 ? '35%' : '30%', 
                          minWidth: detailIdx === 1 ? '200px' : '120px' 
                        }}>
                          <Typography className={styles.alertDetailLabel}>{detail.label}</Typography>
                          <Typography className={styles.alertDetailValue} sx={{ whiteSpace: 'nowrap', display: 'block' }}>{detail.value}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
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
        src={assets['Banking_Capital_Market_Operate_Table_EY_Logo.svg']}
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
