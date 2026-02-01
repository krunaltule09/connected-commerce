import { Box, Stack, Grid, Typography, CircularProgress, Fade, Slide, Tooltip } from '@mui/material';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GradientBorderBox from './common/GradientBorderBox';
import GradientButton from './common/GradientButton';
import FinancialChart from './FinancialChart';
import ChartBreakdown from './ChartBreakdown';
import { useScanning } from '../context/ScanningContext';
import { useFinancialData } from '../context/FinancialDataContext';

export default function FinancialMetricsSection() {
  const { metrics, selectedMetric, setSelectedMetric } = useFinancialData();
  const { isFinancialDataReady, scanProgress } = useScanning();
  const [animateTitle, setAnimateTitle] = useState(false);
  const [animateMetrics, setAnimateMetrics] = useState(false);
  const [animateChart, setAnimateChart] = useState(false);
  
  // Staggered animation timing
  useEffect(() => {
    const titleTimer = setTimeout(() => setAnimateTitle(true), 200);
    const metricsTimer = setTimeout(() => setAnimateMetrics(true), 500);
    const chartTimer = setTimeout(() => setAnimateChart(true), 800);
    
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(metricsTimer);
      clearTimeout(chartTimer);
    };
  }, []);

  // Animation variants for metrics buttons
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <GradientBorderBox animated sx={{ px: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Slide direction="down" in={animateTitle} timeout={700}>
        <Typography variant="subtitle1" sx={{ color: '#FFE600', fontWeight: 400, fontSize: '1.25rem', mb: 1, p: 1.5 }}>Extracted Key Metrics</Typography>
      </Slide>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {/* Metrics buttons column */}
        <Grid item xs={6} md={3} lg={2.5}>
          <Fade in={animateMetrics} timeout={800}>
            <Box sx={{p: 1.5, height: '95%', overflow: 'auto' }}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={animateMetrics ? "visible" : "hidden"}
              >
                <Stack spacing={0.5}>
                {metrics.map((metric, index) => {
                  const isSelected = selectedMetric === metric;
                  return (
                    <motion.div key={metric} variants={itemVariants} custom={index}>
                      <Tooltip title={metric} arrow placement="right">
                        <div>
                          <GradientButton
                            variant="metric"
                            active={isSelected}
                            onClick={() => setSelectedMetric(metric)}
                            sx={{
                              fontSize: '0.85rem', // Standardized font size for all buttons
                              py: 0.5,
                              position: 'relative',
                              overflow: 'hidden',
                              justifyContent: 'center', // Center align all button texts
                              textAlign: 'center',
                              width: '140px', // Fixed width for all buttons
                              maxWidth: '140px', // Maximum width for all buttons
                              ...(metric === 'Interest Expense' && {
                                whiteSpace: 'nowrap', // Prevent text wrapping
                                letterSpacing: '-0.02em' // Slight letter spacing adjustment
                              }),
                              '&::after': isSelected ? {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                                animation: 'shine 2s infinite',
                                '@keyframes shine': {
                                  '0%': { transform: 'translateX(-100%)' },
                                  '100%': { transform: 'translateX(100%)' }
                                }
                              } : {}
                            }}
                          >
                            {metric === 'Interest Expense' ? (
                              <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>Interest Expense</span>
                            ) : metric}
                          </GradientButton>
                        </div>
                      </Tooltip>
                    </motion.div>
                  );
                })}
                </Stack>
              </motion.div>
            </Box>
          </Fade>
        </Grid>

        {/* Chart column */}
        <Grid item xs={12} md={9} lg={9.5}>
          <Fade in={animateChart} timeout={900}>
            <Box sx={{ p: 1.5, height: '95%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <Box sx={{ flexGrow: 1, minHeight: 0, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                <AnimatePresence mode="wait">
                  {!isFinancialDataReady ? (
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
                          value={Math.min(100, scanProgress * 1.5)} 
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
                          {Math.min(100, Math.round(scanProgress * 1.5))}% complete
                        </Typography>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="chart"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      style={{ position: 'relative', flexGrow: 1, overflow: 'visible' }}
                    >
                      <FinancialChart />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
              
              <AnimatePresence>
                {isFinancialDataReady && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      delay: 0.3,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                  >
                    <Box sx={{ mt: 4 }}>
                      <ChartBreakdown />
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </GradientBorderBox>
  );
}
