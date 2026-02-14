import { Box, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScanning } from '../context/ScanningContext';
import { useFinancialData } from '../context/FinancialDataContext';

export default function ChartBreakdown() {
  const { selectedMetric } = useFinancialData();
  // eslint-disable-next-line no-unused-vars
  const { isFinancialDataReady } = useScanning();
  
  // Define different breakdown items for each metric
  const breakdownItemsByMetric = useMemo(() => ({
    'Revenue': [
      'Revenue growth supports minimum turnover covenant, reducing risk of operating underperformance.',
      'Stable YoY increase indicates low likelihood of cash-flow stress, supporting DSCR maintenance.'
    ],
    'EBITDA': [
      'Rising EBITDA strengthens Debt/EBITDA covenant compliance, improving borrower creditworthiness.',
      'Sustained profitability trend reduces risk of breach on interest coverage or leverage covenants.'
    ],
    'Debt': [
      'Current leverage remains within allowable Debt/EBITDA thresholds, though trending upward.',
      'Monitoring required to avoid breaching maximum leverage or total indebtedness covenants.'
    ],
    'Equity': [
      'Stable equity position supports Net Worth / Equity Maintenance covenants.',
      'Equity cushion reduces risk of LTV covenant deterioration during adverse market cycles.'
    ],
    'Interest Expense': [
      'Rising interest expense may pressure Interest Coverage covenants if EBITDA slows.',
      'Higher servicing costs could impact DSCR compliance, requiring ongoing monitoring.'
    ]
  }), []);

  // Get the current breakdown items based on selected metric
  const breakdownItems = useMemo(() => 
    breakdownItemsByMetric[selectedMetric] || [], 
    [breakdownItemsByMetric, selectedMetric]
  );
  
  return (
    <Box sx={{ mt: 4, mb: 0.5 }}> {/* Increased top margin from 1 to 4 */}
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
