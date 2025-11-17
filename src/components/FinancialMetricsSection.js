import { Box, Button, Stack, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import GradientBorderBox from './common/GradientBorderBox';
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
              <Button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                variant="outlined"
                sx={{
                  color: '#FCFCFC',
                  border: 'none',
                  backgroundColor: 'transparent',
                  textTransform: 'none',
                  fontSize: '0.85rem',
                  padding: '12px 16px',
                  justifyContent: 'flex-start',
                  backgroundImage: isSelected 
                    ? `url('${process.env.PUBLIC_URL}/assets/Group%204.svg')`
                    : `url('${process.env.PUBLIC_URL}/assets/Group%20554.svg')`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  minHeight: '50px',
                  position: 'relative',
                  '&:hover': {
                    backgroundImage: isSelected
                      ? `url('${process.env.PUBLIC_URL}/assets/Group%204.svg')`
                      : `url('${process.env.PUBLIC_URL}/assets/Group%20554.svg')`,
                  },
                }}
                >
              {metric}
              </Button>
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
