import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import GradientBorderBox from './common/GradientBorderBox';

export default function FinancialDriversSection() {
  // Sample data sets that we can switch between
  const dataSets = {
    revenue: [30, 35, 40, 38, 45, 50, 48, 55, 60, 65, 70, 75],
    profit: [20, 22, 25, 28, 30, 35, 38, 40, 42, 45, 48, 50],
    growth: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65]
  };
  
  const [activeDataSet, setActiveDataSet] = useState('revenue');
  const [currentData, setCurrentData] = useState(dataSets.revenue);
  
  // Update the current data when the active data set changes
  useEffect(() => {
    setCurrentData(dataSets[activeDataSet]);
  }, [activeDataSet]);
  
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF' }}>
        Financial Drivers
      </Typography>
      
      <GradientBorderBox animated sx={{ px: 1.3, height: 'calc(100% - 50px)', display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button 
            variant={activeDataSet === 'revenue' ? 'contained' : 'outlined'}
            onClick={() => setActiveDataSet('revenue')}
            sx={{ 
              bgcolor: activeDataSet === 'revenue' ? 'primary.main' : 'transparent',
              '&:hover': { bgcolor: activeDataSet === 'revenue' ? 'primary.dark' : 'rgba(180, 255, 0, 0.1)' }
            }}
          >
            Revenue
          </Button>
          <Button 
            variant={activeDataSet === 'profit' ? 'contained' : 'outlined'}
            onClick={() => setActiveDataSet('profit')}
            sx={{ 
              bgcolor: activeDataSet === 'profit' ? 'primary.main' : 'transparent',
              '&:hover': { bgcolor: activeDataSet === 'profit' ? 'primary.dark' : 'rgba(180, 255, 0, 0.1)' }
            }}
          >
            Profit
          </Button>
          <Button 
            variant={activeDataSet === 'growth' ? 'contained' : 'outlined'}
            onClick={() => setActiveDataSet('growth')}
            sx={{ 
              bgcolor: activeDataSet === 'growth' ? 'primary.main' : 'transparent',
              '&:hover': { bgcolor: activeDataSet === 'growth' ? 'primary.dark' : 'rgba(180, 255, 0, 0.1)' }
            }}
          >
            Growth
          </Button>
        </Stack>
        
        <Box sx={{ flexGrow: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(16, 16, 24, 0.95)',
              borderRadius: '8px',
              color: '#B4FF00'
            }}
          >
            Financial Drivers Chart
          </Box>
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ color: '#FFFFFF', opacity: 0.7 }}>
            {activeDataSet === 'revenue' && 'Monthly revenue trends for the current fiscal year'}
            {activeDataSet === 'profit' && 'Monthly profit margins showing steady growth'}
            {activeDataSet === 'growth' && 'Year-over-year growth percentages by month'}
          </Typography>
        </Box>
      </GradientBorderBox>
    </Box>
  );
}
