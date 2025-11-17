import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import Lottie from 'lottie-react';
// Note: You'll need to create or provide this Lottie animation file
import animationData from '../../lottie/Financial drivers_UI.json';

/**
 * A Lottie animation component for the Financial Drivers chart
 */
export default function FinancialDriversLottie({ style = {} }) {
  const lottieRef = useRef(null);

  // Control animation playback
  useEffect(() => {
    if (lottieRef.current) {
      // Ensure animation plays from the beginning
      lottieRef.current.goToAndPlay(0);
    }
    
    return () => {
      // Cleanup if needed
    };
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
        animationData={animationData}
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
