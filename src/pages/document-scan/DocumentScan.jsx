import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './DocumentScan.module.css';

const DocumentScan = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // Handle video end and navigate to next page
  useEffect(() => {
    // Set timeout to navigate after video plays for a while (5 seconds)
    const timeout = setTimeout(() => {
      navigate('/document-centre');
    }, 10000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <Box className={styles.documentScanPage}>
      {/* Full screen video background */}
      <Box className={styles.videoBackground}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={styles.fullScreenVideo}
          src="/assets/SCANNIG DOCS 2.mp4"
        />
      </Box>
      
      {/* EY Logo - keeping only this element */}
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
