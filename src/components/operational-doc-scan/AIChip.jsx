import React from 'react';
import { Box, Grow } from '@mui/material';
import AIRecommendations from '../anomaly-detection/AIRecommendations';
import styles from '../../pages/operational-doc-scan/OperationalDocScan.module.css';

const AIChip = ({ scanProgress, recommendations }) => {
  return (
    <Grow in={scanProgress >= 50} timeout={800}>
      <Box className={styles.aiChipContainer}>
        <AIRecommendations 
          contentContainerSx={{top:"16%"}} 
          recommendations={recommendations} 
        />
      </Box>
    </Grow>
  );
};

export default AIChip;
