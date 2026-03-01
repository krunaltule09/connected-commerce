import React from 'react';
import { Box, Slide } from '@mui/material';
import styles from '../../pages/operational-doc-scan/OperationalDocScan.module.css';

const NavigationButtons = ({ handleGoBack, handleNextStep, nextButtonEnabled }) => {
  return (
    <Box className={styles.navigationButtons}>
      <Slide direction="right" in={true} timeout={1000} mountOnEnter>
        <Box className={styles.backButton} onClick={handleGoBack}>Back</Box>
      </Slide>
      <Slide direction="left" in={true} timeout={1000} mountOnEnter>
        <Box 
          className={`${styles.nextButton} ${!nextButtonEnabled ? styles.disabledButton : ''}`} 
          onClick={nextButtonEnabled ? handleNextStep : undefined}
          sx={{
            opacity: nextButtonEnabled ? 1 : 0.5,
            cursor: nextButtonEnabled ? 'pointer' : 'not-allowed',
            pointerEvents: nextButtonEnabled ? 'auto' : 'none',
            transition: 'opacity 0.3s ease'
          }}
        >
          Next 
        </Box>
      </Slide>
    </Box>
  );
};

export default NavigationButtons;
