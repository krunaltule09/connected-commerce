import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Container, Paper, Fade, Grow, Slide, Zoom } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion } from 'framer-motion';
import navigationService from '../services/NavigationService';
import GradientButton from '../components/common/GradientButton';
import { useButtonSound } from '../hooks';
import bgLoanVideo from '../assets/bg-loan.mp4';

// Icons
import LoanAgreementIcon from '@mui/icons-material/ArticleOutlined';
import CovenantRegisterIcon from '@mui/icons-material/ShieldOutlined';
import Y14ReportingIcon from '@mui/icons-material/DescriptionOutlined';
import FinancialsESGIcon from '@mui/icons-material/SummarizeOutlined';
import KYCAMLIcon from '@mui/icons-material/SensorOccupied';
import RiskDashboardIcon from '@mui/icons-material/BarChartOutlined';
import ClientCommunicationIcon from '@mui/icons-material/Message';
import BlockchainLedgerIcon from '@mui/icons-material/ViewInArOutlined';

// Styled components
const VideoBackground = styled('video')({
  position: 'fixed',
  top: 0,
  left: 0,
  minWidth: '100%',
  minHeight: '100%',
  width: 'auto',
  height: 'auto',
  zIndex: -1,
  objectFit: 'cover',
});

const Overlay = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.64)',
  zIndex: -1,
});

const Logo = styled('img')({
  position: 'absolute',
  bottom: '8%',
  right: '-16%',
  width: '80px',
  height: 'auto',
});

const MenuGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  width: '100%',
}));

const MenuButton = styled(GradientButton)(({ theme }) => ({
  width: '85%', // Reduced width from 100% to 80%
  height: '50px',
  display: 'flex',
  justifyContent: 'center', // Changed from flex-start to center
  alignItems: 'center',
  fontSize: '0.75rem !important',
  padding: theme.spacing(1.5, 2),
  backgroundColor: 'rgba(29, 29, 29, 0.3)',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(5px)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  margin: '0 auto', // Added to center the button in its container
  '&:hover': {
    backgroundColor: 'rgba(29, 29, 29, 0.5)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  },
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    color: '#FFD700',
    fontSize: '0.87rem',
    flexShrink: 0,
    position: 'relative',
    top: '-1px', // Slight vertical adjustment for better alignment
  },
  '& .MuiTypography-root': {
    fontWeight: 400,
    fontSize: '0.78rem',
    color: '#FFD700',
    letterSpacing: '0.3px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'center', // Added to ensure text is centered
  }
}));

// Pulse animation for the activate button
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 215, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
  }
`;

const ActivateButton = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  bottom: '80px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
    width: '24rem',
  height: '3.5rem',
  background: 'rgba(218, 199, 199, 0.1)', // Using the background color from Figma
  borderRadius: '8px', // Using the border radius from Figma
  border: 'none',
  cursor: 'pointer',
  transition: 'transform 0.3s, box-shadow 0.3s, border 0.3s',
  '&:hover': {
    transform: 'translateX(-50%) scale(1.05)',
    boxShadow: 'inset 6.03px 6.03px 1px -7.03px rgba(255, 255, 255, 0.7), inset 4.02px 4.02px 2.01px -4.02px rgba(179, 179, 179, 0.7), inset -4.02px -4.02px 2.01px -4.02px rgba(179, 179, 179, 0.7), inset 0px 0px 44.2px rgba(242, 242, 242, 0.5), 0px 0px 20px rgba(33, 207, 255, 0.5)',
    border: '1px solid rgba(33, 207, 255, 0.5)',
  },
  '&:active': {
    transform: 'translateX(-50%) scale(0.98)',
  },
}));

// Text animation variants for framer-motion
const textVariants = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: i * 0.1 }
  })
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 12, stiffness: 100 }
  }
};

// Icon mapping for services
const iconMap = {
  'Loan Agreement': <LoanAgreementIcon />,
  'Covenant Register': <CovenantRegisterIcon />,
  'FR Y-14 Reporting': <Y14ReportingIcon />,
  'Financials & ESG Reports': <FinancialsESGIcon />,
  'KYC/AML file': <KYCAMLIcon />,
  'Risk Dashboard': <RiskDashboardIcon />,
  'Client Communication': <ClientCommunicationIcon />,
  'Blockchain ledger': <BlockchainLedgerIcon />,
};

// Path mapping for services
const pathMap = {
  'Loan Agreement': '/loan-agreement',
  'Covenant Register': '/covenant-register',
  'FR Y-14 Reporting': '/y14-report',
  'Financials & ESG Reports': '/financials-esg',
  'KYC/AML file': '/kyc-aml',
  'Risk Dashboard': '/risk-dashboard',
  'Client Communication': '/client-communication',
  'Blockchain ledger': '/blockchain-ledger',
};

const EnterpriseLoanServicing = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [animationReady, setAnimationReady] = useState(false);
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  
  // Fetch available services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL
        const response = await fetch(`${apiUrl}/api/available-services`);
        const result = await response.json();
        const services = result.data?.services || [];
        
        const items = services.map((service) => ({
          icon: iconMap[service.name] || <LoanAgreementIcon />,
          text: service.name,
          path: pathMap[service.name] || '/',
        }));
        
        setMenuItems(items);
      } catch (error) {
        console.error('Failed to fetch available services:', error);
      }
    };
    
    fetchServices();
  }, []);

  // Trigger animations after video is loaded
  useEffect(() => {
    if (isVideoLoaded) {
      // Small delay to ensure smooth animation start
      const timer = setTimeout(() => {
        setAnimationReady(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVideoLoaded]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  // Handle button click with sound effect
  const handleButtonClick = useButtonSound((path) => {
    // Navigate to the specified path
    console.log(`Navigating to: ${path}`);
    navigate(path);
  });

  // Handle activate servicing with sound effect
  const handleActivateServicing = useButtonSound(async () => {
    console.log('Activating servicing mode');
    
    // Navigate locally
    navigate('/document-centre');
    
    try {
      // Send navigation event to operate-experience app
      await navigationService.navigateToOperateExperience('/loan-service', {
        referrer: 'enterprise-loan-servicing',
        action: 'ACTIVATE_SERVICING'
      });
      
    } catch (error) {
      console.error('Failed to send navigation event:', error);
    }
  });
  

  return (
    <Box sx={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
      <VideoBackground
        autoPlay
        loop
        muted
        onLoadedData={handleVideoLoad}
        src={bgLoanVideo}
      />
      <Overlay />

      <Container maxWidth="lg" sx={{ height: '100%', position: 'relative', pt: 3 }}>
        {/* Menu Grid */}
        <MenuGrid container spacing={2} justifyContent="center" sx={{ maxWidth: '1280px', mx: 'auto', px: 2}}>
          {menuItems.map((item, index) => (
            <Grow 
              in={animationReady} 
              timeout={300 + (index * 150)} 
              key={index}
              style={{ transformOrigin: 'center top' }}
            >
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Slide direction="up" in={animationReady} timeout={400 + (index * 150)}>
                  <MenuButton
                    onClick={() => handleButtonClick(item.path)}
                    startIcon={item.icon}
                    sx={{ minWidth: 0 }}
                  >
                    <Typography sx={{fontWeight:400 }}  noWrap>{item.text}</Typography>
                  </MenuButton>
                </Slide>
              </Grid>
            </Grow>
          ))}
        </MenuGrid>

        {/* Main Content */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '100%'
          }}
        >
          <Fade in={animationReady} timeout={800}>
            <Box>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <motion.div
                  initial="hidden"
                  animate={animationReady ? "visible" : "hidden"}
                  variants={textVariants}
                  onAnimationComplete={() => setTextAnimationComplete(true)}
                  style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
                >
                  {"Enterprise Loan Servicing".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      style={{
                        display: 'inline-block',
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        fontWeight: 300,
                        color: 'white',
                        textShadow: '0px 0px 10px rgba(0,0,0,0.5)',
                        marginRight: char === " " ? '0.5rem' : '0.05rem'
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
              </Box>
            </Box>
          </Fade>
          <Fade 
            in={animationReady} 
            timeout={1200}
            style={{ transitionDelay: animationReady ? '800ms' : '0ms' }}
          >
            <Box>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={textAnimationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  type: 'spring', 
                  damping: 12, 
                  stiffness: 100, 
                  delay: 0.5,
                  duration: 0.8 
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    color: 'white',
                    fontWeight: 400,
                    textShadow: '0px 0px 10px rgba(0,0,0,0.5)',
                    fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                    position: 'relative',
                    display: 'inline-block'
                  }}
                >
                  Case: Vertex Logistics Corp - $18M Working Capital Facility
                </Typography>
              </motion.div>
            </Box>
          </Fade>
        </Box>

        {/* Activate Button */}
        <Fade 
          in={animationReady} 
          timeout={1500}
          style={{ transitionDelay: animationReady ? '1200ms' : '0ms' }}
        >
          <ActivateButton onClick={handleActivateServicing}>
            <Typography 
              variant="body1"
              sx={{ 
                letterSpacing: '0.5px',
                fontStyle: 'normal',
                textAlign: 'center',
                color: '#FFFFFF',
                textTransform: 'none'
              }}
            >
              Touch here to activate servicing mode
            </Typography>
          </ActivateButton>
        </Fade>

        {/* EY Logo */}
        <Zoom 
          in={animationReady} 
          timeout={1000}
          style={{ transitionDelay: animationReady ? '800ms' : '0ms' }}
        >
          <Logo src="/assets/ey-logo.svg" alt="EY Logo" />
        </Zoom>
        
      </Container>
    </Box>
  );
};

export default EnterpriseLoanServicing;
