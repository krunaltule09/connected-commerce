import { Box, Stack, Grid, Typography, CircularProgress, Fade } from '@mui/material';
import { useState } from 'react';
import GradientBorderBox from './common/GradientBorderBox';
import GradientButton from './common/GradientButton';
import FinancialChart from './FinancialChart';
import ChartBreakdown from './ChartBreakdown';
import { useScanning } from '../context/ScanningContext';

export default function FinancialMetricsSection() {
  const metrics = ['Revenue', 'EBITDA', 'Debt', 'Equity', 'Interest', 'Expense'];
  const [selectedMetric, setSelectedMetric] = useState('Revenue');
  const { isFinancialDataReady, scanProgress } = useScanning();

  return (
    <GradientBorderBox sx={{ px: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle1" sx={{ color: '#FFE600', fontWeight: 500, fontSize: '1rem', mb: 1,p: 1.5 }}>Extracted Key Metrics</Typography>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>

        <Grid item xs={6} md={3} lg={2}>
          <Box sx={{p: 1.5, height: '95%', overflow: 'auto' }}>
            <Stack spacing={0.5}>
            {metrics.map((metric) => {
              const isSelected = selectedMetric === metric;
              return (
              <GradientButton
                key={metric}
                variant="metric"
                active={isSelected}
                onClick={() => setSelectedMetric(metric)}
              >
                {metric}
              </GradientButton>
              );
            })}
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <Box sx={{ p: 1.5, height: '95%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Box sx={{ flexGrow: 1, minHeight: 0, position: 'relative', display: 'flex', flexDirection: 'column' }}>
              {!isFinancialDataReady ? (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%',
                    width: '100%'
                  }}
                >
                  <CircularProgress 
                    variant="determinate" 
                    value={Math.min(100, scanProgress * 1.5)} 
                    sx={{ 
                      color: '#FFE600',
                      mb: 2
                    }} 
                  />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(252,252,252,0.7)',
                      textAlign: 'center'
                    }}
                  >
                    Analyzing financial data...<br />
                    {Math.min(100, Math.round(scanProgress * 1.5))}% complete
                  </Typography>
                </Box>
              ) : (
                <Fade in={isFinancialDataReady} timeout={1000}>
                  <Box sx={{ position: 'relative', flexGrow: 1,  overflow: 'visible' }}>
                    <FinancialChart />
                  </Box>
                </Fade>
              )}
            </Box>
            {isFinancialDataReady && (
              <Fade in={isFinancialDataReady} timeout={1500}>
                <Box>
                  <ChartBreakdown selectedMetric={selectedMetric} />
                </Box>
              </Fade>
            )}
          </Box>
        </Grid>
      </Grid>

      
    </GradientBorderBox>
  );
}
