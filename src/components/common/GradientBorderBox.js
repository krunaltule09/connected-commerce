import { Box } from '@mui/material';

export default function GradientBorderBox({ children, sx = {}, animated = false, p, px, py, pt, pb, pl, pr, ...props }) {
  // Static border styles (no animation) - using pseudo-element for gradient border with border-radius
  const staticStyles = {
    position: 'relative',
    borderRadius: 2,
    padding: '1px',
    background: 'linear-gradient(95.1deg, #FFE600 0.33%, #2E2E38 100%)',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: '1px',
      borderRadius: '8px',
      background: '#1A1A24',
      zIndex: 0,
      height: 'auto',
    },
  };

  // Animated border styles
  const animatedStyles = {
    position: 'relative',
    borderRadius: 2,
    bgcolor: '#1A1A24',
    padding: '1px',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'conic-gradient(from 0deg, #EEF96E 0deg, rgba(244, 167, 157, 0.5) 90deg, transparent 180deg, transparent 270deg, #EEF96E 360deg)',
      animation: 'rotate 4s linear infinite',
      zIndex: 0,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '1px',
      left: '1px',
      right: '1px',
      bottom: '1px',
      background: '#1A1A24',
      borderRadius: 'inherit',
      zIndex: 1,
    },
    '@keyframes rotate': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
  };

  return (
    <Box
      sx={{
        ...(animated ? animatedStyles : staticStyles),
        ...sx
      }}
      {...props}
    >
      <Box sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
}
