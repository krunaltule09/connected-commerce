import { Stack, Typography, Box, CircularProgress, Fade, Skeleton } from '@mui/material';
import GradientBorderBox from './common/GradientBorderBox';
import CovenantTile from './CovenantTile';
import { useScanning } from '../context/ScanningContext';

export default function CovenantStatusSection() {
  const { isCovenantDataReady, scanProgress } = useScanning();
  const covenants = [
    {
      name: 'DSCR',
      value: '1.10 (Below 1.25 Covenant)',
      indicator: 'Alert',
      status: 'alert',
    },
    {
      name: 'Debt/Equity',
      value: '3.2x (Above 3.0 Threshold)',
      indicator: 'Warning',
      status: 'warning',
    },
    {
      name: 'Current Ratio',
      value: '12.3 (Unusually high vs. 1.5–2.0 industry norm)',
      indicator: 'Alert',
      status: 'alert',
    },
  ];

  return (
    <GradientBorderBox animated sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#121214', p: 0 }}>
      <Typography variant="h6" sx={{ color: '#FFE600', fontWeight: 400, fontSize: '1.25rem', p: 2, pb: 1 }}>Covenant Status</Typography>
      
      {!isCovenantDataReady ? (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'column',
              height: '100%' 
            }}
          >
            <CircularProgress 
              variant="determinate" 
              value={Math.min(100, scanProgress * 1.2)} 
              sx={{ 
                color: '#FFE600',
                mb: 2
              }} 
              size={30}
            />
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(252,252,252,0.7)',
                textAlign: 'center',
                fontSize: '0.85rem'
              }}
            >
              Analyzing covenant data...
            </Typography>
          </Box>
          
          <Stack spacing={1} sx={{ mt: 2 }}>
            {[1, 2, 3].map((i) => (
              <Skeleton 
                key={i}
                variant="rectangular" 
                height={60} 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.05)',
                  borderRadius: 1
                }} 
              />
            ))}
          </Stack>
        </Box>
      ) : (
        <Fade in={isCovenantDataReady} timeout={800}>
          <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {covenants.map((covenant, index) => (
              <CovenantTile key={index} covenant={covenant} />
            ))}
          </Box>
        </Fade>
      )}
    </GradientBorderBox>
  );
}
