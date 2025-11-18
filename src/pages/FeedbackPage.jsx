import React, { useState, useRef, useEffect } from 'react';
import DeliveryOptionsSvg from '../components/DeliveryOptionsSvg';
import RatingComponentSvg from '../components/RatingComponentSvg';
import { Box, Typography, Button, Container, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
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
}));

const LottieContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%'
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: theme.spacing(3),
  backdropFilter: 'blur(2px)',
}));

const SuccessIcon = styled(CheckCircleOutlineIcon)(({ theme }) => ({
  fontSize: '64px',
  color: '#4CAF50',
  marginBottom: theme.spacing(2),
}));

const OptionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 117,
  marginTop: theme.spacing(6),
  width: '100%',
  flexWrap: 'wrap',
  zIndex: 2,
  position:'relative',
  top:-316,
  left:12,
}));

// Removed OptionCard as it's now in the individual components

const OptionTitle = styled(Typography)(({ theme }) => ({
  color: '#FFFFFF',
  marginBottom: theme.spacing(2),
  fontWeight: 500,
}));

const QRCode = styled('img')(({ theme }) => ({
  width: '120px',
  height: '120px',
  marginBottom: theme.spacing(2),
}));

const OptionButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#FFFFFF',
  borderRadius: '4px',
  padding: theme.spacing(0.5, 2),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}));

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

const DeliveryOption = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  color: '#FFFFFF',
}));

const Dot = styled(Box)(({ theme }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#FFEB3B',
  marginRight: theme.spacing(1),
}));

export default function FeedbackPage() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
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
  
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <Header>
          <Title variant="h4">Feedback</Title>
          <Subtitle variant="body1">Feedback & review</Subtitle>
        </Header>
        
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
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, position: 'relative', zIndex: 2 }}>
          <BackButton onClick={handleBackToHome}>
            Back to home
          </BackButton>
        </Box>
      </Container>
    </PageContainer>
  );
}
