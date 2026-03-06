import { Box } from '@mui/material';
import { useConfig } from '../context/ConfigContext';

export default function PerformanceSection() {
  const { assets } = useConfig();
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
          src={assets['BCM_OperateTable_Performance_Section.svg']}
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
