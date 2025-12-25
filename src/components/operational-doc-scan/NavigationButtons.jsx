import React from 'react';
import { Box, Slide } from '@mui/material';
import styles from '../../pages/operational-doc-scan/OperationalDocScan.module.css';
import { useButtonSound } from '../../hooks';

const NavigationButtons = ({ handleGoBack, handleNextStep, nextButtonEnabled }) => {
  // Create button click handlers with sound
  const handleBackWithSound = useButtonSound(handleGoBack);
  const handleNextWithSound = useButtonSound(handleNextStep);
  
  return (
    <Box className={styles.navigationButtons}>
      <Slide direction="right" in={true} timeout={1000} mountOnEnter>
        <Box className={styles.backButton} onClick={handleBackWithSound}>Back</Box>
      </Slide>
      <Slide direction="left" in={true} timeout={1000} mountOnEnter>
        <Box 
          className={`${styles.nextButton} ${!nextButtonEnabled ? styles.disabledButton : ''}`} 
          onClick={nextButtonEnabled ? handleNextWithSound : undefined}
          sx={{
            opacity: nextButtonEnabled ? 1 : 0.5,
            cursor: nextButtonEnabled ? 'pointer' : 'not-allowed',
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
