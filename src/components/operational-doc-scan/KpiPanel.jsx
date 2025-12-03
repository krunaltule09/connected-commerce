import React from 'react';
import { Box, Typography, Collapse, Zoom } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import GradientBorderBox from '../common/GradientBorderBox';
import GradientButton from '../common/GradientButton';
import styles from '../../pages/operational-doc-scan/OperationalDocScan.module.css';

const KpiPanel = ({ revealStage, scanProgress, activeTab, handleTabChange }) => {
  return (
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
  );
};

export default KpiPanel;
