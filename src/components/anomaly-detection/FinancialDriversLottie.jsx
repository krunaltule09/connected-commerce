import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import Lottie from 'lottie-react';
import { ANIMATIONS } from '../../assets/animations';

/**
 * A Lottie animation component for the Financial Drivers chart
 */
export default function FinancialDriversLottie({ style = {} }) {
  const lottieRef = useRef(null);

  // Control animation playback
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.goToAndPlay(0);
    }
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#1A1A24',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        overflow: 'hidden', // Prevent any overflow
        ...style
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={ANIMATIONS.financialDrivers}
        loop={true}
        autoplay={true}
        style={{ 
          width: '100%', 
          height: '100%',
          objectFit: 'contain' // Ensure the animation fits within the container
        }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice', // Maintain aspect ratio
          progressiveLoad: true, // Load animation progressively
          hideOnTransparent: true // Improve performance
        }}
      />
    </Box>
  );
}
