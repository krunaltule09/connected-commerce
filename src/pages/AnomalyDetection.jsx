import React, { useState, useEffect } from 'react';
import { Box, Grid, Fade, Grow, Slide, Snackbar, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './AnomalyDetection.module.css';
import navigationService from '../services/NavigationService';
import { useButtonSound } from '../hooks';
import QuarterlyDSCRLottie from '../components/anomaly-detection/QuarterlyDSCRLottie';
import FinancialDriversLottie from '../components/anomaly-detection/FinancialDriversLottie';
import CovenantBreachLog from '../components/anomaly-detection/CovenantBreachLog';
import AIRecommendations from '../components/anomaly-detection/AIRecommendations';
import GradientBorderBox from '../components/common/GradientBorderBox';

// Removed unused Title component

export default function AnomalyDetection() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  
  // Animation states
  const [animateTop, setAnimateTop] = useState(false);
  const [animateMiddle, setAnimateMiddle] = useState(false);
  const [animateBottom, setAnimateBottom] = useState(false);
  const [animateNav, setAnimateNav] = useState(false);
  
  // Staggered animation timing
  useEffect(() => {
    const topTimer = setTimeout(() => setAnimateTop(true), 300);
    const middleTimer = setTimeout(() => setAnimateMiddle(true), 800);
    const bottomTimer = setTimeout(() => setAnimateBottom(true), 1200);
    const navTimer = setTimeout(() => setAnimateNav(true), 1500);
    
    return () => {
      clearTimeout(topTimer);
      clearTimeout(middleTimer);
      clearTimeout(bottomTimer);
      clearTimeout(navTimer);
    };
  }, []);
  
  // Handle navigation to Y14 Report Generation page with sound effect
  const handleNextStep = useButtonSound(async () => {
    // Navigate locally
    navigate('/y14-report');
    
    try {
      // Send navigation event to operate-experience app
      await navigationService.navigateToOperateExperience('/y14-report/large', {
        referrer: 'anomaly-detection',
        action: 'NEXT_STEP'
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
  });
  
  // Handle going back to previous page with sound effect
  const handleGoBack = useButtonSound(() => {
    window.history.back();
  });
  
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };
  
  // No need for DSCR data as we're using Lottie animation

  // No need for financial drivers data as we're using Lottie animation

  const documents = [
    {
      id: 1,
      title: 'Finance operations.xls',
      subtitle: 'Shipment 1',
    },
    {
      id: 2,
      title: 'Finance operations.xls',
      subtitle: 'Shipment 1',
    },
    {
      id: 3,
      title: 'Finance operations.xls',
      subtitle: 'Shipment 1',
    }
  ];

  const recommendations = [
    'Investigate cash flow variance',
    'Cross-check delayed shipments'
  ];

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <Box className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Grid container spacing={2.5}>
          {/* Top Row */}
          <Grid item xs={12} md={4} sx={{height:"100%"}}>
            <Grow in={animateTop} timeout={800}>
              <Box>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={animateTop ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  <GradientBorderBox animated className={styles.dscrPanel}>
                    <QuarterlyDSCRLottie />
                  </GradientBorderBox>
                </motion.div>
              </Box>
            </Grow>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Grow in={animateTop} timeout={1000}>
              <Box>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={animateTop ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
                >
                  <GradientBorderBox animated className={styles.driversPanel}>
                    <FinancialDriversLottie />
                  </GradientBorderBox>
                </motion.div>
              </Box>
            </Grow>
          </Grid>

          <Grid item xs={12} md={3}>
            <Fade in={animateMiddle} timeout={1200}>
              <Box>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={animateMiddle ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                >
                  <Box className={styles.aiPanel}>
                    <AIRecommendations contentContainerSx={{top:"60%", left:"18%"}} recommendations={recommendations} />
                  </Box>
                </motion.div>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </motion.div>

      <Slide direction="up" in={animateBottom} timeout={1000} mountOnEnter>
        <Grid container mt={3}>
          <Grid item xs={12} md={9}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={animateBottom ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.2 }}
            >
              <GradientBorderBox animated py={3} className={styles.covenantPanel}>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={animateBottom ? "visible" : "hidden"}
                >
                  <CovenantBreachLog documents={documents} />
                </motion.div>
              </GradientBorderBox>
            </motion.div>
          </Grid>
        </Grid>
      </Slide>
      
      {/* Navigation buttons */}
      <Fade in={animateNav} timeout={1000}>
        <Box className={styles.navigationButtons}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={animateNav ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Box className={styles.backButton} onClick={handleGoBack}> Back</Box>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={animateNav ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Box className={styles.nextButton} onClick={handleNextStep}> Next</Box>
          </motion.div>
        </Box>
      </Fade>
      
      {/* EY Logo */}
      <Fade in={animateNav} timeout={1500}>
        <Box 
          component="img"
          src="/assets/ey-logo.svg"
          alt="EY Logo"
          className={styles.eyLogo}
          sx={{
            transition: "transform 0.3s ease",
            '&:hover': {
              transform: "scale(1.1)"
            }
          }}
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
}
