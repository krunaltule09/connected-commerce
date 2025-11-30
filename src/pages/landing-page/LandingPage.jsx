import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/explore'); // Navigate to the explore page
  };

  return (
    <Box className={styles.landingPage}>
      {/* Background image with overlay */}
      <Box 
        className={styles.backgroundOverlay}
        sx={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.46), rgba(0, 0, 0, 0.46)), url('/assets/page1.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%'
        }}
      ></Box>
      
      {/* No yellow background behind text as per design */}
      
      {/* Main content - Frame 1000004743 */}
      <Box className={styles.contentFrame}>
        {/* Frame 1000004742 */}
        <Box className={styles.textFrame}>
          {/* Frame 1000004741 */}
          <Box className={styles.innerTextFrame}>
            <Typography className={styles.heading}>
              Reimagining Covenant Monitoring
            </Typography>
            <Typography className={styles.subheading}>
              Turning covenant monitoring from a reactive task into a proactive advantage.
            </Typography>
          </Box>
        </Box>
        
        {/* Tab */}
        <Box 
          className={styles.startJourneyButton}
          onClick={handleStartJourney}
        >
          <Box className={styles.buttonText}>
            Start Journey
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

export default LandingPage;
