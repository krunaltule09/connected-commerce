import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import styles from './DashboardLayout.module.css';

/**
 * DashboardLayout component that handles the overall layout of the dashboard
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.leftSection - Content for the left section
 * @param {React.ReactNode} props.middleSection - Content for the middle section
 * @param {React.ReactNode} props.rightSection - Content for the right section
 * @param {Function} props.onBack - Function to handle back button click
 * @param {Function} props.onNext - Function to handle next button click
 */
export default function DashboardLayout({ 
  leftSection, 
  middleSection, 
  rightSection, 
  onBack, 
  onNext 
}) {
  return (
    <Box sx={{ 
      position: 'relative',
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden', 
      p: 2,
      pt: 4, // Increased top padding
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
        mt: 5, // Added top margin to move content downward
        height: "60vh" 
      }}>
        <Grid container spacing={2} sx={{ flexGrow: 1, height: '100%' }}>
          {/* Left Section */}
          <Grid item xs={12} md={2.7} sx={{ height: '100%', mt: 2 }}>
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
          <Grid item xs={12} md={6} sx={{ height: '100%', mt: 2}}>
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
          <Grid item xs={12} md={3.2} sx={{ height: '100%', mt: 2 }}>
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
          <Box className={styles.backButton} onClick={onBack}>Back</Box>
          <Box className={styles.nextButton} onClick={onNext}>Next</Box>
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
