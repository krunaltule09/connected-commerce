import React, { useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import styles from '../components/layout/DashboardLayout.module.css';
import navigationSync from '../services/NavigationSyncService';

/**
 * Example of how to integrate NavigationSyncService with DashboardLayout
 * This is just an example - you should adapt it to your actual component
 */
export default function DashboardLayoutWithSync({ 
  leftSection, 
  middleSection, 
  rightSection, 
  onBack, 
  onNext 
}) {
  // Listen for navigation events from other UIs
  useEffect(() => {
    const removeListener = navigationSync.addListener((data) => {
      if (data.type === 'navigation') {
        console.log(`Received navigation event: ${data.action} to ${data.targetPage}`);
        
        // Handle navigation based on the action
        if (data.action === 'next' && onNext) {
          onNext();
        } else if (data.action === 'back' && onBack) {
          onBack();
        }
      }
    });
    
    // Clean up listener on unmount
    return () => {
      removeListener();
    };
  }, [onBack, onNext]);
  
  // Enhanced handlers that also send WebSocket events
  const handleBack = () => {
    // Call the original onBack handler
    if (onBack) {
      onBack();
    }
    
    // Send navigation event to other UIs
    navigationSync.sendNavigation('back', 'previous-page');
  };
  
  const handleNext = () => {
    // Call the original onNext handler
    if (onNext) {
      onNext();
    }
    
    // Send navigation event to other UIs
    navigationSync.sendNavigation('next', 'next-page');
  };
  
  return (
    <Box sx={{ 
      position: 'relative',
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden', 
      p: 2,
      minHeight: '100vh'
    }}>
      {/* Video Background */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        '& video': {
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }
      }}>
        <video autoPlay loop muted playsInline>
          <source src="/assets/AdobeStock_1544892280.mp4" type="video/mp4" />
        </video>
      </Box>
      
      {/* Dark Overlay */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: -1
      }} />
      
      <Container maxWidth="xxl" sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        py: 1, 
        height: "65vh" 
      }}>
        <Grid container spacing={2} sx={{ flexGrow: 1, height: '100%' }}>
          {/* Left Section */}
          <Grid item xs={12} md={3} sx={{ height: '100%' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ height: '100%' }}
            >
              {leftSection}
            </motion.div>
          </Grid>
          
          {/* Middle Section */}
          <Grid item xs={12} md={6} sx={{ height: '100%' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ height: '100%' }}
            >
              {middleSection}
            </motion.div>
          </Grid>
          
          {/* Right Section */}
          <Grid item xs={12} md={3} sx={{ height: '100%' }}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {rightSection}
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Additional black background section */}
      <Box sx={{ 
        width: '100%',
        minHeight: '35vh',
        position: 'relative',
        zIndex: 0
      }} />
      
      {/* Navigation buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Box className={styles.navigationButtons}>
          <Box className={styles.backButton} onClick={handleBack}>Back</Box>
          <Box className={styles.nextButton} onClick={handleNext}>Next</Box>
        </Box>
      </motion.div>
      
      {/* EY Logo */}
      <Box 
        component="img"
        src="/assets/ey-logo.svg"
        alt="EY Logo"
        className={styles.eyLogo}
      />
    </Box>
  );
}
