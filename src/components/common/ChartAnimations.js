import React from 'react';
import { motion } from 'framer-motion';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * Loading animation component for charts
 * 
 * @param {number} progress - Loading progress (0-100)
 * @returns {JSX.Element} - Loading animation component
 */
export const ChartLoadingAnimation = ({ progress }) => (
  <motion.div
    key="loading"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100%',
      width: '100%'
    }}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      <CircularProgress 
        variant="determinate" 
        value={Math.min(100, progress * 1.5)} 
        sx={{ 
          color: '#FFE600',
          mb: 2
        }} 
      />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Typography 
        variant="body2" 
        sx={{ 
          color: 'rgba(252,252,252,0.7)',
          textAlign: 'center'
        }}
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ display: 'inline-block' }}
        >
          Analyzing financial data...
        </motion.span>
        <br />
        {Math.min(100, Math.round(progress * 1.5))}% complete
      </Typography>
    </motion.div>
  </motion.div>
);

/**
 * Chart container with entrance animation
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Chart content
 * @param {string} props.metricKey - Current metric key (for animation triggering)
 * @returns {JSX.Element} - Animated chart container
 */
export const AnimatedChartContainer = ({ children, metricKey }) => (
  <motion.div
    key={`chart-${metricKey}`}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      type: "spring",
      stiffness: 100,
      damping: 15
    }}
    style={{ position: 'relative', flexGrow: 1, overflow: 'visible' }}
  >
    {children}
  </motion.div>
);

/**
 * Chart background with styling
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Chart content
 * @returns {JSX.Element} - Styled chart background
 */
export const ChartBackground = ({ children }) => (
  <Box
    sx={{
      position: 'relative',
      backgroundImage: `url('/assets/Group 7.svg')`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 0,
    }}
  >
    <Box sx={{ position: 'relative', width: '86%', height: '82%', p: 1 }}>
      {children}
    </Box>
  </Box>
);
