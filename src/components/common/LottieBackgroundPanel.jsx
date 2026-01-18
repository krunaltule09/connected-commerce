import React, { useRef } from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import Lottie from 'lottie-react';

const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  backgroundColor: 'transparent',
  borderRadius: '8px',
}));

const LottieBackground = styled(Box)(({ theme }) => ({

  width: '100%',
  height: '100%',
  zIndex: 0,
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  height: '100%',
  width: '100%',
  padding: theme.spacing(3, 4),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const BulletPoint = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
}));

const Bullet = styled(Box)(({ theme }) => ({
  color: '#FFFFFF',
  marginRight: theme.spacing(1.5),
  fontSize: '0.75rem',
  lineHeight: 1.8,
  opacity: 0.7,
  marginTop: '3px',
}));

/**
 * A reusable component that displays content with a Lottie animation background
 * @param {Object} props - Component props
 * @param {Object} props.animationData - Lottie animation JSON data
 * @param {Array<string>} props.bulletPoints - List of bullet point text items
 * @param {React.ReactNode} props.icon - Optional icon to display at the top
 * @param {Object} props.sx - Additional styles for the container
 */
const LottieBackgroundPanel = ({ 
  animationData,
  bulletPoints = [], 
  icon = null,
  sx = {},
  contentContainerSx={}
}) => {
  const lottieRef = useRef(null);

  return (
    <Container sx={sx}>
      <LottieBackground>
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={true}
          autoplay={true}
         
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice',
          }}
        />
      </LottieBackground>
      
      <ContentContainer sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 1, ...contentContainerSx }}>
        <List disablePadding>
          {bulletPoints.map((point, index) => (
            <ListItem key={index} disableGutters sx={{ p: 0 }}>
              <BulletPoint>
                <Bullet sx={{ lineHeight: 1 }}>▶</Bullet>
                <Typography 
                  variant="body2" 
                  color="white"
                  sx={{ fontSize: '14px', lineHeight: 1.5 }}
                >
                  {point}
                </Typography>
              </BulletPoint>
            </ListItem>
          ))}
        </List>
      </ContentContainer>
    </Container>
  );
};

export default LottieBackgroundPanel;
