import { Box } from '@mui/material';

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
          src="/assets/Group 1010107907.svg"
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
