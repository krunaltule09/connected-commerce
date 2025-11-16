import { Stack, Typography } from '@mui/material';
import GradientBorderBox from './common/GradientBorderBox';
import CovenantTile from './CovenantTile';

export default function CovenantStatusSection() {
  const covenants = [
    {
      name: 'DSCR',
      value: '1.1 (Below 1.25 Covenant)',
      indicator: 'Alert',
      status: 'alert',
    },
    {
      name: 'Debt/Equity',
      value: '2,300 Cr',
      indicator: 'Warning',
      status: 'warning',
    },
    {
      name: 'Current Ratio',
      value: '12.3',
      indicator: 'Alert',
      status: 'alert',
    },
  ];

  return (
    <GradientBorderBox sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#121214' }}>
      <Typography variant="subtitle1" sx={{ color: '#FFE600', fontWeight: 500, fontSize: '1rem', mb: 1 }}>Covenant Status</Typography>
      <Stack spacing={1} sx={{ flexGrow: 1, overflow: 'auto' }}>
        {covenants.map((covenant, index) => (
          <CovenantTile key={index} covenant={covenant} />
        ))}
      </Stack>
    </GradientBorderBox>
  );
}
