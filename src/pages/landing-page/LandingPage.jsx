import React, { useState } from 'react';
import { Box, Typography, Fade, Zoom, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';
import navigationService from '../../services/NavigationService';

const LandingPage = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  const handleStartJourney = async () => {
    try {
      // Navigate locally
      navigate('/explore');
      
      // Send navigation event to operate-experience app
      await navigationService.navigateToOperateExperience('/personal-welcome', {
        referrer: 'landing-page',
        action: 'START_JOURNEY'
      });
      
      setNotification({
        open: true,
        message: 'Navigation event sent to operate-experience',
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to send navigation event:', error);
      setNotification({
        open: true,
        message: 'Failed to send navigation event',
        severity: 'error'
      });
    }
  };
  
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box className={styles.landingPage}>
      {/* Video background with overlay */}
      <Box className={styles.backgroundOverlay}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.backgroundVideo}
        >
          <source src="/assets/landing-page.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Box className={styles.videoOverlay}></Box>
      </Box>
      
      {/* Main content */}
      <Box 
        className={styles.contentFrame}
      >
        {/* Text frame with animated text */}
        <Box className={styles.textFrame}>
          <Box className={styles.innerTextFrame}>
            {/* Animated heading with MUI Fade */}
            <Fade in={true} timeout={1200}>
              <Typography className={styles.heading} align="center">
                Reimagining Covenant Monitoring
              </Typography>
            </Fade>
            
            {/* Animated subheading with MUI Fade */}
            <Fade in={true} timeout={1500} style={{ transitionDelay: '300ms' }}>
              <Typography className={styles.subheading} align="center">
                Turning covenant monitoring from a reactive task into a proactive advantage.
              </Typography>
            </Fade>
          </Box>
        </Box>
        
        {/* Animated button with MUI Zoom */}
        <Zoom in={true} style={{ transitionDelay: '600ms' }}>
          <Box
            className={styles.startJourneyButton}
            onClick={handleStartJourney}
            sx={{ 
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 0px 15px rgba(33, 207, 255, 0.5)'
              },
              '&:active': {
                transform: 'scale(0.95)'
              }
            }}
          >
            <Box className={styles.buttonText}>
              Start Journey
            </Box>
          </Box>
        </Zoom>
      </Box>
      
      {/* Animated EY Logo with MUI Fade */}
      <Fade in={true} timeout={1000} style={{ transitionDelay: '1000ms' }}>
        <Box 
          component="img"
          src="/assets/ey-logo.svg"
          alt="EY Logo"
          className={styles.eyLogo}
        />
      </Fade>
      {/* Notification */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LandingPage;
