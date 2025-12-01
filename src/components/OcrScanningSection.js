import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import GradientBorderBox from './common/GradientBorderBox';
import { useScanning } from '../context/ScanningContext';

export default function OcrScanningSection() {
  // Removed sections array and currentSectionIndex state as they're no longer needed
  const { scanProgress: progress, isComplete } = useScanning();

  // Progress is now managed by the ScanningContext

  return (
    <GradientBorderBox sx={{ px: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={1.5} sx={{ flexGrow: 1, overflow: 'hidden' }}>
      <Box>
        <Typography variant="subtitle1" sx={{ color: '#FFE600', fontWeight: 500, fontSize: '1rem', mb: 1, p: 1.5 }}>Scanned Document Preview</Typography>
        <GradientBorderBox p={1.5}>
        <Box
          sx={{
            height:400,
            bgcolor: '#343340',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            backgroundImage: `url('${process.env.PUBLIC_URL}/assets/doc1.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        </GradientBorderBox>
      </Box>

      <GradientBorderBox sx={{ p: 1.5 }}>
        <Box  sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: isComplete ? '#FFE600' : 'rgba(252, 252, 252, 0.7)',
                fontSize: '0.75rem',
              }}
            >
              {isComplete ? 'Completed' : 'OCR scanning in process...'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFE600' }}>{`${Math.round(progress)}%`}</Typography>
          </Box>
          <Box
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255,255,255,0.1)',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: `${progress}%`,
                backgroundColor: '#FFE600',
                transition: 'width 0.3s ease',
              }}
            />
          </Box>
        </Box>
      </GradientBorderBox>
    </Stack>
    </GradientBorderBox>
  );
}
