import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Grow, Fade, Slide } from '@mui/material';
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
  // Animation states
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateMiddle, setAnimateMiddle] = useState(false);
  const [animateRight, setAnimateRight] = useState(false);
  const [animateNav, setAnimateNav] = useState(false);
  
  // Staggered animation timing
  useEffect(() => {
    const leftTimer = setTimeout(() => setAnimateLeft(true), 300);
    const middleTimer = setTimeout(() => setAnimateMiddle(true), 600);
    const rightTimer = setTimeout(() => setAnimateRight(true), 900);
    const navTimer = setTimeout(() => setAnimateNav(true), 1200);
    
    return () => {
      clearTimeout(leftTimer);
      clearTimeout(middleTimer);
      clearTimeout(rightTimer);
      clearTimeout(navTimer);
    };
  }, []);
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
        height: "54vh" 
      }}>
        <Grid container spacing={2} sx={{ flexGrow: 1, height: '100%' }}>
          {/* Left Section */}
          <Grid item xs={12} md={2.4} sx={{ height: '100%', mt: 2 }}>
            <Grow in={animateLeft} timeout={800}>
              <Box sx={{ height: '100%', width: '100%' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={animateLeft ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  style={{ height: '100%' }}
                >
                  {leftSection}
                </motion.div>
              </Box>
            </Grow>
          </Grid>
          
          {/* Middle Section */}
          <Grid item xs={12} md={6.3} sx={{ height: '100%', mt: 2}}>
            <Grow in={animateMiddle} timeout={900}>
              <Box sx={{ height: '100%', width: '100%' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={animateMiddle ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 90, damping: 15 }}
                  style={{ height: '100%' }}
                >
                  {middleSection}
                </motion.div>
              </Box>
            </Grow>
          </Grid>
          
          {/* Right Section */}
          <Grid item xs={12} md={3.3} sx={{ height: '100%', mt: 2 }}>
            <Fade in={animateRight} timeout={1000}>
              <Box sx={{ height: '100%', width: '100%' }}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={animateRight ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                  style={{ height: '100%' }}
                >
                  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {rightSection}
                  </Box>
                </motion.div>
              </Box>
            </Fade>
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
      <Fade in={animateNav} timeout={1000}>
        <Box className={styles.navigationButtons}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={animateNav ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Box className={styles.backButton} onClick={onBack}>Back</Box>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={animateNav ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Box className={styles.nextButton} onClick={onNext}>Next</Box>
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
    </Box>
  );
}
