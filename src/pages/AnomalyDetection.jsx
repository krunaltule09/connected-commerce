import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './AnomalyDetection.module.css';
import QuarterlyDSCRLottie from '../components/anomaly-detection/QuarterlyDSCRLottie';
import FinancialDriversLottie from '../components/anomaly-detection/FinancialDriversLottie';
import CovenantBreachLog from '../components/anomaly-detection/CovenantBreachLog';
import AIRecommendations from '../components/anomaly-detection/AIRecommendations';
import GradientBorderBox from '../components/common/GradientBorderBox';

// Title component
const Title = ({ children }) => (
  <Typography 
    sx={{
      color: '#00C8FF',
      marginBottom: 3,
      display: 'flex',
      alignItems: 'center',
      '&:before': {
        content: '"▶"',
        marginRight: 1,
      }
    }}
  >
    {children}
  </Typography>
);

export default function AnomalyDetection() {
  const navigate = useNavigate();
  
  // Handle navigation to Data Simulator page
  const handleNextStep = () => {
    navigate('/data-simulator');
  };
  
  // Handle going back to previous page
  const handleGoBack = () => {
    window.history.back();
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

  return (
    <Box className={styles.container}>

      <Grid container spacing={2.5}>
        {/* Top Row */}
        <Grid item xs={12} md={6}>
          <GradientBorderBox>
            <QuarterlyDSCRLottie />
          </GradientBorderBox>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <GradientBorderBox>
            <FinancialDriversLottie />
          </GradientBorderBox>
        </Grid>
        
        {/* Bottom Row */}
        <Grid item xs={12} md={7}>
          <GradientBorderBox py={3}>
            <CovenantBreachLog documents={documents} />
          </GradientBorderBox>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Box>
            <AIRecommendations recommendations={recommendations} />
          </Box>
        </Grid>
      </Grid>
      
      {/* Navigation buttons */}
      <Box className={styles.navigationButtons}>
        <Box className={styles.backButton} onClick={handleGoBack}>Go back</Box>
        <Box className={styles.nextButton} onClick={handleNextStep}>Next step</Box>
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
}
