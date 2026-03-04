import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Lottie from 'lottie-react';
import { ANNIMATIONS } from '../../constants/assetPaths';

/**
 * A Lottie animation component for the Financial Drivers chart
 */
export default function FinancialDriversLottie({ style = {} }) {
  const lottieRef = useRef(null);
  const [animationData, setAnimationData] = useState(null);

  // Fetch Lottie animation JSON from URL
  useEffect(() => {
    fetch(ANNIMATIONS.FINANCIAL_DRIVERS_LOTTIE)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Failed to load Financial Drivers animation:', err));
  }, []);

  // Control animation playback
  useEffect(() => {
    if (lottieRef.current) {
      // Ensure animation plays from the beginning
      lottieRef.current.goToAndPlay(0);
    }

    return () => {
      // Cleanup if needed
    };
  }, [animationData]);

  if (!animationData) return null;

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
