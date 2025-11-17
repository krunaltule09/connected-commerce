import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import QuarterlyDSCRLottie from '../components/anomaly-detection/QuarterlyDSCRLottie';
import FinancialDriversLottie from '../components/anomaly-detection/FinancialDriversLottie';
import CovenantBreachLog from '../components/anomaly-detection/CovenantBreachLog';
import AIRecommendations from '../components/anomaly-detection/AIRecommendations';
import GradientBorderBox from '../components/common/GradientBorderBox';

// Styled components
const Container = styled(Box)(({ theme }) => ({
  backgroundColor: '#0A0A14', // Darker background to match screenshot
  minHeight: '100vh',
  padding: theme.spacing(3),
  color: '#FFFFFF',
  position: 'relative',
  overflow: 'hidden',
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/assets/background-texture.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const Title = styled(Typography)(({ theme }) => ({
  color: '#00C8FF',
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  '&:before': {
    content: '"▶"',
    marginRight: theme.spacing(1),
  }
}));

const Footer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginTop: theme.spacing(4),
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const BackButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  padding: '10px 24px',
  color: '#FFFFFF',
  border: '1px solid #C3C3CB',
  '&:hover': {
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const NextButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  padding: '10px 24px',
  color: '#00C8FF',
  backgroundColor: 'rgba(29, 29, 29, 0.8)',
  boxShadow: 'inset 0px 0px 10px rgba(255, 255, 255, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(29, 29, 29, 0.9)',
  },
}));

const Logo = styled('img')({
  height: '30px',
});

export default function AnomalyDetection() {
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
    <Container>

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
          <Box >
            <AIRecommendations recommendations={recommendations} />
          </Box>
        </Grid>
      </Grid>
      
      <Footer>
        <ButtonGroup>
          <BackButton variant="outlined">Go back</BackButton>
          <NextButton variant="contained">Next step</NextButton>
        </ButtonGroup>
        <Logo src="/assets/ey-logo.svg" alt="EY Logo" />
      </Footer>
    </Container>
  );
}
