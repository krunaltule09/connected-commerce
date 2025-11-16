import { useState, useEffect } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

export default function ProgressBar({ label = 'OCR scanning in progress...', autoIncrement = true }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!autoIncrement) return;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const increment = Math.max(1, 10 * (1 - oldProgress / 100));
        const newProgress = Math.min(oldProgress + increment, 100);

        if (newProgress === 100) {
          clearInterval(timer);
        }
        return newProgress;
      });
    }, 300);

    return () => clearInterval(timer);
  }, [autoIncrement]);

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" sx={{ color: '#FCFCFC' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ color: '#FFE600' }}>
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(255,255,255,0.1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#FFE600',
          },
        }}
      />
    </Box>
  );
}
