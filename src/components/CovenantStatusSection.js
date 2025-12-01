import { Stack, Typography, Box, CircularProgress, Fade, Skeleton } from '@mui/material';
import GradientBorderBox from './common/GradientBorderBox';
import CovenantTile from './CovenantTile';
import { useScanning } from '../context/ScanningContext';

export default function CovenantStatusSection() {
  const { isCovenantDataReady, scanProgress } = useScanning();
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
    <GradientBorderBox sx={{ px: 1.5, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#121214' }}>
      <Typography variant="subtitle1" sx={{ color: '#FFE600', fontWeight: 500, fontSize: '1rem', mb: 1 }}>Covenant Status</Typography>
      
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
          <Stack spacing={1} sx={{ flexGrow: 1, overflow: 'auto' }}>
            {covenants.map((covenant, index) => (
              <CovenantTile key={index} covenant={covenant} />
            ))}
          </Stack>
        </Fade>
      )}
    </GradientBorderBox>
  );
}
