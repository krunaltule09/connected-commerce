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
      bgcolor: '#000', 
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden', 
      p: 2,
      minHeight: '100vh'
    }}>
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
        bgcolor: '#000', 
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
          <Box className={styles.backButton} onClick={onBack}>Go back</Box>
          <Box className={styles.nextButton} onClick={onNext}>Next step</Box>
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
