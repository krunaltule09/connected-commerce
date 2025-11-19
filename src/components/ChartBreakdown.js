import { Box, Stack, Typography, Fade } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { useScanning } from '../context/ScanningContext';

export default function ChartBreakdown() {
  const { isFinancialDataReady } = useScanning();
  const [visibleItems, setVisibleItems] = useState([]);
  
  // Use useMemo to prevent the array from being recreated on every render
  const breakdownItems = useMemo(() => [
    'Accurate and complete financial records, and provide quarterly reports to lender within 30 days',
    'Debt/Equity exceeds limit (3.2 vs 3.0)',
  ], []);

  // Effect to progressively show items
  useEffect(() => {
    if (!isFinancialDataReady) return;
    
    const showItems = () => {
      breakdownItems.forEach((item, index) => {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, index]);
        }, 800 + (index * 600)); // Staggered delay for each item
      });
    };
    
    showItems();
  }, [isFinancialDataReady, breakdownItems]);
  
  return (
    <Box sx={{ mt: 1, mb: 0.5 }}>
      <Typography
        variant="body2"
        sx={{
          color: '#FFE600',
          fontWeight: 600,
          fontSize: '0.875rem',
          mb: 0.5,
        }}
      >
        Breakdown
      </Typography>
      <Stack spacing={0.75}>
        {breakdownItems.map((item, index) => (
          <Fade in={visibleItems.includes(index)} timeout={800} key={index}>
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
          </Fade>
        ))}
      </Stack>
    </Box>
  );
}
