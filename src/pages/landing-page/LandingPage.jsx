import React, { useState } from 'react';
import { Box, Typography, Fade, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';
import navigationService from '../../services/NavigationService';
import { useButtonSound } from '../../hooks';
import { useConfig, useVisualizationDataSet } from '../../context/ConfigContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { assets } = useConfig();
  
  // Get data from appDatabase
  const heroData = useVisualizationDataSet('landing_page', 'Hero Section');

  // Create a click handler with sound effect
  const handleStartJourney = useButtonSound(async () => {
    try {
      // Navigate locally - use data from database
      navigate(heroData.cta_target);
      
      // Send navigation event to operate-experience app
      await navigationService.navigateToOperateExperience('/personal-welcome', {
        referrer: 'landing-page',
        action: 'START_JOURNEY'
      });
      
    } catch (error) {
      console.error('Failed to send navigation event:', error);
    }
  });
  

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
          <source src={assets['BCM_OperateTable_Landing_Page_Video.mp4']} type="video/mp4" />
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
                {heroData.heading}
              </Typography>
            </Fade>
            
            {/* Animated subheading with MUI Fade */}
            <Fade in={true} timeout={1500} style={{ transitionDelay: '300ms' }}>
              <Typography className={styles.subheading} align="center">
                {heroData.subheading}
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
              {heroData.cta_label}
            </Box>
          </Box>
        </Zoom>
      </Box>
      
      {/* Animated EY Logo with MUI Fade */}
      <Fade in={true} timeout={1000} style={{ transitionDelay: '1000ms' }}>
        <Box 
          component="img"
          src={assets['BCM_OperateTable_EY_Logo.svg']}
          alt="EY Logo"
          className={styles.eyLogo}
        />
      </Fade>
    </Box>
  );
};

export default LandingPage;
