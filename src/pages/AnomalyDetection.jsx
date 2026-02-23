import React, { useState, useEffect } from 'react';
import { Box, Grid, Fade, Grow, Slide } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './AnomalyDetection.module.css';
import navigationService from '../services/NavigationService';
import { useButtonSound } from '../hooks';
import QuarterlyDSCRChart from '../components/anomaly-detection/QuarterlyDSCRChart';
import FinancialDriversChart from '../components/anomaly-detection/FinancialDriversChart';
import GradientBorderBox from '../components/common/GradientBorderBox';
import Q3Highlight from '../components/anomaly-detection/Q3Highlight';
import AIRecommendationsWithGif from '../components/anomaly-detection/AIRecommendationsWithGif';

// Removed unused Title component

export default function AnomalyDetection() {
  const navigate = useNavigate();
  
  // Animation states for each section
  const [animateDscr, setAnimateDscr] = useState(false);
  const [animateDrivers, setAnimateDrivers] = useState(false);
  const [animateRecommendations, setAnimateRecommendations] = useState(false);
  const [animateQ3, setAnimateQ3] = useState(false);
  const [animateNav, setAnimateNav] = useState(false);
  const [animateLogo, setAnimateLogo] = useState(false);
  
  // Staggered animation timing with 400ms gaps
  useEffect(() => {
    const dscrTimer = setTimeout(() => setAnimateDscr(true), 0);
    const driversTimer = setTimeout(() => setAnimateDrivers(true), 500);
    const recommendationsTimer = setTimeout(() => setAnimateRecommendations(true), 1000);
    const q3Timer = setTimeout(() => setAnimateQ3(true), 1500);
    const navTimer = setTimeout(() => setAnimateNav(true), 2000);
    const logoTimer = setTimeout(() => setAnimateLogo(true), 2500);
    
    return () => {
      clearTimeout(dscrTimer);
      clearTimeout(driversTimer);
      clearTimeout(recommendationsTimer);
      clearTimeout(q3Timer);
      clearTimeout(navTimer);
      clearTimeout(logoTimer);
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
      
    } catch (error) {
      console.error('Failed to send navigation event:', error);
    }
  });
  
  // Handle going back to previous page with sound effect
  const handleGoBack = useButtonSound(() => {
      navigate('/financial-dashboard');
  });
  
  
  // No need for DSCR data as we're using Lottie animation

  // No need for financial drivers data as we're using Lottie animation

  return (
    <Box className={styles.container}>
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
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Grid container columnSpacing={2.5} rowSpacing={0} alignItems="stretch">
          {/* Top Row */}
          <Grid item xs={12} md={3.7} sx={{ display: 'flex' }}>
            <Grow in={animateDscr} timeout={800}>
              <Box sx={{ height: '100%', width: '100%' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={animateDscr ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  <GradientBorderBox
                    className={styles.dscrPanel}
                    sx={{
                      minHeight: { xs: 290, md: 350, lg: 390 },
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%'
                    }}
                  >
                    <Box className={styles.panelContent}>
                      <QuarterlyDSCRChart />
                    </Box>
                  </GradientBorderBox>
                </motion.div>
              </Box>
            </Grow>
          </Grid>
          
          <Grid item xs={12} md={4.7} sx={{ display: 'flex' }}>
            <Grow in={animateDrivers} timeout={800}>
              <Box sx={{ height: '100%', width: '100%' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={animateDrivers ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
                >
                  <GradientBorderBox
                    className={styles.driversPanel}
                    sx={{
                      minHeight: { xs: 290, md: 350, lg: 390 },
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%'
                    }}
                  >
                    <Box className={styles.panelContent}>
                      <FinancialDriversChart />
                    </Box>
                  </GradientBorderBox>
                </motion.div>
              </Box>
            </Grow>
          </Grid>

          <Grid item xs={12} md={3.6} sx={{ display: 'flex' }}>
            <Grow in={animateRecommendations} timeout={800}>
              <Box sx={{ height: '100%', width: '100%' }}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={animateRecommendations ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                >
                  <Box
                    className={styles.svgPanel}
                    sx={{
                      minHeight: { xs: 300, md: 340, lg: 360 },
                      width: '98%',
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Box sx={{ width: '99%', height: '100%', position: 'relative' }}>
                      <AIRecommendationsWithGif
                        size="large"
                        recommendations={[
                          "Operating cash flow improved steadily from $15K → $28K.",
                          "However, interest and debt obligations grew faster, reducing coverage in Q2.",
                          "DSCR fell to 1.10, below the required 1.25 covenant threshold.",
                          "Improvement in Q3/Q4 signals stabilizing performance.",
                          "Recommended: Reassess expense control and cross-check shipment delays."
                        ]}
                        imageTransform="translateY(-8%)"
                        contentContainerSx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          top: "42%",
                          zIndex: 2,
                          left: "52%",
                          width: "72%",
                          transform: "translate(-50%, -50%)"
                        }}
                      />
                    </Box>
                  </Box>
                </motion.div>
              </Box>
            </Grow>
          </Grid>
        </Grid>
      </motion.div>

      <Grow in={animateQ3} timeout={800}>
        <Grid container mt={-7} columnSpacing={2.5} alignItems="stretch" >
          <Grid item xs={12} md={3.7} sx={{ display: 'flex' }}>
            
              <Box className={styles.svgPanelQ3} sx={{ width: '100%' }}>
                <GradientBorderBox 
                  className={styles.driversPanel}
                  sx={{
                    minHeight: { xs: 320, md: 380, lg: 420 },
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%'
                  }}
                >
                  <Box className={styles.panelContent}>
                  <Q3Highlight />
                  </Box>
                </GradientBorderBox>
              </Box>
            
          </Grid>
        </Grid>
      </Grow>
      
      {/* Navigation buttons */}
      <Fade in={animateNav} timeout={800}>
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
      <Fade in={animateLogo} timeout={800}>
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
      
    </Box>
  );
}
