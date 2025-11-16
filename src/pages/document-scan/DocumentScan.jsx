import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './DocumentScan.module.css';

const DocumentScan = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('Initializing scan...');
  const navigate = useNavigate();

  // Simulate scanning progress
  useEffect(() => {
    const statuses = [
      'Initializing scan...',
      'Detecting documents...',
      'Processing documents...',
      'Analyzing content...',
      'Finalizing scan...',
      'Scan complete!'
    ];

    let progress = 0;
    const interval = setInterval(() => {
      progress += 2; // Increment by 2 instead of 1 for faster progress
      setScanProgress(progress > 100 ? 100 : progress);
      
      // Update status message at certain progress points
      if (progress >= 20 && progress < 40) setScanStatus(statuses[1]);
      if (progress >= 40 && progress < 60) setScanStatus(statuses[2]);
      if (progress >= 60 && progress < 80) setScanStatus(statuses[3]);
      if (progress >= 80 && progress < 100) setScanStatus(statuses[4]);
      if (progress >= 100) {
        setScanStatus(statuses[5]);
        clearInterval(interval);
        
        // Navigate to document-centre after a short delay to show the completed status
        setTimeout(() => {
          navigate('/document-centre');
        }, 1000);
      }
    }, 50); // Reduced from 100ms to 50ms

    return () => clearInterval(interval);
  }, []);

  return (
    <Box className={styles.documentScanPage}>
      {/* Background image with overlay */}
      <Box 
        className={styles.backgroundOverlay}
        sx={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('/assets/docu-scan.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%'
        }}
      ></Box>
      
      {/* Main content frame */}
      <Box className={styles.contentFrame}>
        <Box className={styles.scannerContainer}>
          {/* Outer scanner ring */}
          <Box className={styles.scannerRing}>
            {/* Inner scanner progress */}
            <CircularProgress 
              variant="determinate" 
              value={scanProgress} 
              className={styles.scannerProgress}
              size={200}
              thickness={4}
            />
            
            {/* Scanner center */}
            <Box className={styles.scannerCenter}>
              <Box className={styles.scannerPercentage}>
                {scanProgress}%
              </Box>
              <Box className={styles.scannerPulse}></Box>
            </Box>
          </Box>
          
          {/* Scanner status */}
          <Box className={styles.scannerStatus}>
            {scanStatus}
          </Box>
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

export default DocumentScan;
