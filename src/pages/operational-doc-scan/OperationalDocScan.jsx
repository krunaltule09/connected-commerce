import React, { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import GradientBorderBox from '../../components/common/GradientBorderBox';
import styles from './OperationalDocScan.module.css';
import { useShipmentData } from '../../hooks/useShipmentData';

const OperationalDocScan = () => {
  const { shipments, scanProgress } = useShipmentData();
  const [activeTab, setActiveTab] = useState('on-time');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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
            <Box className={styles.scanStatusText}>OCR scanning in process...</Box>
            <Box className={styles.progressBarContainer}>
              <Box 
                className={styles.progressBar} 
                sx={{ width: `${scanProgress}%` }}
              ></Box>
            </Box>
            <Box className={styles.progressPercentage}>{scanProgress}%</Box>
          </Box>
          
          <Box className={styles.aiChipContainer}>
            <Box 
              component="img"
              src="/assets/ai-chip.svg"
              alt="AI Chip"
              className={styles.aiChipIcon}
            />
          </Box>
        </GradientBorderBox>
        
        {/* Right panel - Shipment Details */}
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
            
            {shipments.map((shipment, index) => (
              <Box key={index} className={styles.tableRow}>
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
            ))}
          </Box>
        </GradientBorderBox>
        
        {/* Bottom panel - KPIs */}
        <GradientBorderBox className={styles.kpiPanel}>
          <Box className={styles.panelTitle}>Operational KPIs</Box>
          
          <Box className={styles.kpiContainer}>
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', gap: '24px' }}>
                <Box 
                  className={activeTab === 'on-time' ? styles.kpiTabActive : styles.kpiTab}
                  onClick={() => handleTabChange('on-time')}
                >
                  <Box className={styles.tabText}>On-Time Delivery</Box>
                </Box>
                <Box 
                  className={activeTab === 'cost' ? styles.kpiTabActive : styles.kpiTab}
                  onClick={() => handleTabChange('cost')}
                >
                  <Box className={styles.tabText}>Cost per Mile</Box>
                </Box>
              </Box>
              
              <Box className={styles.kpiFilters}>
                <Box className={styles.filterButton}>
                  <FilterListIcon sx={{ fontSize: 20, color: '#AFAEBA' }} />
                  <Box className={styles.filterText}>Filter by category</Box>
                </Box>
                <Box className={styles.filterButton}>
                  <FilterListIcon sx={{ fontSize: 20, color: '#AFAEBA' }} />
                  <Box className={styles.filterText}>Filter by time</Box>
                </Box>
              </Box>
            </Box>
            
            <Box className={styles.chartContainer}>
              <Box className={styles.pieChart}>
                <Box className={styles.pieChartInner}></Box>
                <Box className={styles.pieChartOuter}></Box>
              </Box>
              
              <Box className={styles.chartLegend}>
                <Box className={styles.legendItem}>
                  <Box className={styles.legendDot} sx={{ background: '#0A558E' }}></Box>
                  <Box className={styles.legendText}>Target: 78%</Box>
                </Box>
                <Box className={styles.legendItem}>
                  <Box className={styles.legendDot} sx={{ background: '#188CE5' }}></Box>
                  <Box className={styles.legendText}>Actual: 62.4%</Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </GradientBorderBox>
     
      </Box>
         {/* Navigation buttons */}
         <Box className={styles.navigationButtons}>
          <Box className={styles.backButton} onClick={() => window.history.back()}>Go back</Box>
          <Box className={styles.nextButton}>Next step</Box>
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

export default OperationalDocScan;
