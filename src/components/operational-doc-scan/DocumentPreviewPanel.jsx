import React from 'react';
import { Box, Typography, Slide } from '@mui/material';
import GradientBorderBox from '../common/GradientBorderBox';
import styles from '../../pages/operational-doc-scan/OperationalDocScan.module.css';

const DocumentPreviewPanel = ({ scanProgress }) => {
  return (
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
              {scanProgress >= 99 ? 'Completed' : 'Analyzing'}
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
  );
};

export default DocumentPreviewPanel;
