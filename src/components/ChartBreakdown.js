import { Box, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScanning } from '../context/ScanningContext';
import { useFinancialData } from '../context/FinancialDataContext';

export default function ChartBreakdown() {
  const { selectedMetric, getInfoLines } = useFinancialData();
  // eslint-disable-next-line no-unused-vars
  const { isFinancialDataReady } = useScanning();
  
  // Get the current breakdown items from API data via context
  const breakdownItems = useMemo(() => 
    getInfoLines() || [], 
    [getInfoLines, selectedMetric]
  );
  
  return (
    <Box sx={{ mt: '-3rem', mb: 0.5 }}> {/* Negative margin to move section up */}
      <motion.div
        key={selectedMetric} // Key helps React identify when to animate
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#FFE600',
            fontWeight: 600,
            fontSize: '0.875rem',
            mb: 0.5,
          }}
        >
          {selectedMetric} – Covenant Insights
        </Typography>
      </motion.div>
      
      <Stack spacing={0.75}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMetric} // Key helps React identify when to animate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Stack spacing={0.75}>
              {breakdownItems.map((item, index) => (
                
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(252, 252, 252, 0.7)',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1,
                    }}
                  >
                    <span style={{ color: '#FFE600', fontWeight: 600, flexShrink: 0 }}>•</span>
                    {item}
                  </Typography>
               
              ))}
            </Stack>
          </motion.div>
        </AnimatePresence>
      </Stack>
    </Box>
  );
}
