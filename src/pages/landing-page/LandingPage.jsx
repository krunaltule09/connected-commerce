import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    // Navigate directly without animation
    navigate('/explore');
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
            {/* Animated heading */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <Typography className={styles.heading} align="center">
                Reimagining Covenant Monitoring
              </Typography>
            </motion.div>
            
            {/* Animated subheading */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            >
              <Typography className={styles.subheading} align="center">
                Turning covenant monitoring from a reactive task into a proactive advantage.
              </Typography>
            </motion.div>
          </Box>
        </Box>
        
        {/* Animated button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0px 0px 15px rgba(33, 207, 255, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}

        >
          <Box
 /* Preserve the margin */
            className={styles.startJourneyButton}
            onClick={handleStartJourney}
          >
            <Box className={styles.buttonText}>
              Start Journey
            </Box>
          </Box>
        </motion.div>
      </Box>
      
      {/* Animated EY Logo */}
      <motion.img 
        src="/assets/ey-logo.svg"
        alt="EY Logo"
        className={styles.eyLogo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      />
    </Box>
  );
};

export default LandingPage;
