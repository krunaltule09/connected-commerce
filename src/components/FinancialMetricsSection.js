import { Box, Stack, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import GradientBorderBox from './common/GradientBorderBox';
import GradientButton from './common/GradientButton';
import FinancialChart from './FinancialChart';
import ChartBreakdown from './ChartBreakdown';

export default function FinancialMetricsSection() {
  const metrics = ['Revenue', 'EBITDA', 'Debt', 'Equity', 'Interest', 'Expense'];
  const [selectedMetric, setSelectedMetric] = useState('Revenue');

  return (
    <GradientBorderBox sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle1" sx={{ color: '#FFE600', fontWeight: 500, fontSize: '1rem', mb: 1 }}>Extracted Key Metrics</Typography>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>

        <Grid item xs={6} md={3} lg={2}>
          <GradientBorderBox sx={{p: 1.3, height: '95%', overflow: 'auto' }}>
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
          </GradientBorderBox>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <GradientBorderBox sx={{ p: 1.3, height: '95%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Box sx={{ flexGrow: 1, minHeight: 0, position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ position: 'relative', flexGrow: 1, width: '100%', height: '90%', overflow: 'visible' }}>
                <FinancialChart />
              </Box>
            </Box>
            <ChartBreakdown />
          </GradientBorderBox>
        </Grid>
      </Grid>

      
    </GradientBorderBox>
  );
}
