import { Box, Stack, Typography } from '@mui/material';

export default function ChartBreakdown() {
  const breakdownItems = [
    'Accurate and complete financial records, and provide quarterly reports to lender within 30 days',
    'Debt/Equity exceeds limit (3.2 vs 3.0)',
  ];

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
          <Typography
            key={index}
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
    </Box>
  );
}
