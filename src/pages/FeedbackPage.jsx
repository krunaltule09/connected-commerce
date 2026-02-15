import React, { useState, useRef, useEffect } from 'react';
import DeliveryOptionsSvg from '../components/DeliveryOptionsSvg';
import RatingComponentSvg from '../components/RatingComponentSvg';
import { Box, Typography, Button, Container, Fade, Grow, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
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
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '600px',
  transformOrigin: 'center',
  transition: 'box-shadow 0.4s ease, transform 0.3s ease, filter 0.3s ease',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
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
  left: '2.5vw',
  bottom: '14vh',
}));

// Removed OptionCard as it's now in the individual components

// Removed unused styled components

const BackButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: '#F3F3F5',
  color: '#000000',
  borderRadius: '8px',
  padding: theme.spacing(1, 2),
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
  const [rating, setRating] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const lottieRef = useRef(null);
  const [showComponents, setShowComponents] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  
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
        <Grow in={animateTop} timeout={800}>
          <Box sx={{ width: '100%' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={animateTop ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <MainCard>
                <LottieContainer>
                  <Lottie
                    lottieRef={lottieRef}
                    animationData={feedbackAnimationData}
                    loop={true}
                    autoplay={true}
                    style={{ width: '105%', height: '100%' }}
                    rendererSettings={{
                      preserveAspectRatio: 'xMidYMid slice',
                    }}
                  />
                </LottieContainer>
                
                {showComponents && (
                  <Fade in={fadeIn && animateMiddle} timeout={1000}>
                                         <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={(fadeIn && animateMiddle) ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 90, damping: 15 }}
                      >
                    <OptionsContainer>
 
                        <DeliveryOptionsSvg isVisible={fadeIn} />
                        <RatingComponentSvg isVisible={fadeIn} />
                      
                    </OptionsContainer>
                    </motion.div>
                  </Fade>
                )}
              </MainCard>
            </motion.div>
          </Box>
        </Grow>
        
        <Fade in={animateNav} timeout={1000}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: -1, position: 'relative', zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={animateNav ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BackButton onClick={handleBackToHome}>
                Back to home
              </BackButton>
            </motion.div>
          </Box>
        </Fade>
      </Container>
    </PageContainer>
  );
}
