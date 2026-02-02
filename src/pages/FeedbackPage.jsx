import React, { useState, useRef, useEffect } from 'react';
import DeliveryOptionsSvg from '../components/DeliveryOptionsSvg';
import RatingComponentSvg from '../components/RatingComponentSvg';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
// Removed unused import: CheckCircleOutlineIcon
import { useNavigate } from 'react-router-dom';
import { useButtonSound } from '../hooks';
import Lottie from 'lottie-react';
import feedbackAnimationData from '../lottie/FEEDBACK UI.json';

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#000000',
  minHeight: '100vh',
  padding: theme.spacing(3),
  color: '#FFFFFF',
  position: 'relative',
  overflow: 'hidden',
}));

const Header = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const Title = styled(Typography)(({ theme }) => ({
  color: '#00C8FF',
  fontWeight: 500,
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: '#FFFFFF',
  opacity: 0.7,
}));

const MainCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '16px',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  minHeight: '500px',
  transformOrigin: 'center',
  transition: 'box-shadow 0.4s ease, transform 0.3s ease, filter 0.3s ease',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
  '&:hover': {
    transform: 'scale(1.02) !important',
    filter: 'brightness(1.08) !important',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.65), 0 0 15px rgba(255, 230, 0, 0.08) !important',
    cursor: 'pointer',
  },
}));

const LottieContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%'
}));

// Removed unused styled components

const OptionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 117,
  marginTop: theme.spacing(6),
  width: '100%',
  flexWrap: 'wrap',
  zIndex: 2,
  position: 'absolute',
  left: '1vw',
  bottom: '14vh',
}));

// Removed OptionCard as it's now in the individual components

// Removed unused styled components

const BackButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: '#F3F3F5',
  color: '#000000',
  borderRadius: '8px',
  padding: theme.spacing(1.5, 4),
  fontWeight: 500,
  textTransform: 'none',
  fontSize: '16px',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#FFFFFF',
  },
}));

// Removed unused styled components

export default function FeedbackPage() {
  const navigate = useNavigate();
  // const [rating, setRating] = useState(0); // Removed unused state
  const lottieRef = useRef(null);
  const [showComponents, setShowComponents] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  
  useEffect(() => {
    // Show components after 5.2 seconds
    const timer = setTimeout(() => {
      setShowComponents(true);
      // Start fade-in animation shortly after
      setTimeout(() => setFadeIn(true), 100);
    }, 5200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle back to home with sound effect
  const handleBackToHome = useButtonSound(() => {
    navigate('/');
  });

  return (
    <PageContainer>
      <Container maxWidth="lg">

         <MainCard>
          <LottieContainer>
            <Lottie
              lottieRef={lottieRef}
              animationData={feedbackAnimationData}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
              rendererSettings={{
                preserveAspectRatio: 'xMidYMid slice',
              }}
            />
          </LottieContainer>
          
          {showComponents && (
            <OptionsContainer>
              <DeliveryOptionsSvg isVisible={fadeIn} />
              <RatingComponentSvg isVisible={fadeIn} />
            </OptionsContainer>
          )}
        </MainCard>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: -1, position: 'relative', zIndex: 2 }}>
          <BackButton onClick={handleBackToHome}>
            Back to home
          </BackButton>
        </Box>
      </Container>
    </PageContainer>
  );
}
