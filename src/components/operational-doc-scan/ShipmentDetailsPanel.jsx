import React from 'react';
import { Box, Grow, Slide } from '@mui/material';
import GradientBorderBox from '../common/GradientBorderBox';
import styles from '../../pages/operational-doc-scan/OperationalDocScan.module.css';

const ShipmentDetailsPanel = ({ revealStage, shipments, scanProgress }) => {
  return (
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
  );
};

export default ShipmentDetailsPanel;
