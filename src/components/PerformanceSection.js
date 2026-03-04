import { Box } from '@mui/material';
import { ASSETS } from '../data/assetPaths';

export default function PerformanceSection() {
  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80%',
          width: '80%',
          position: 'relative'
        }}
      >
        <Box
          component="img"
          src={ASSETS.PERFORMANCE_SECTION}
          alt="Performance Metrics"
          sx={{
            maxWidth: '90%',
            maxHeight: '90%',
            objectFit: 'contain'
          }}
        />
      </Box>
    </Box>
  );
}
