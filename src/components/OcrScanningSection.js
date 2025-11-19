import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import GradientBorderBox from './common/GradientBorderBox';
import { useScanning } from '../context/ScanningContext';

export default function OcrScanningSection() {
  const sections = [
    'Document Title & Date',
    'Balance Sheet Analysis',
    'Income Statement',
    'Cash Flow Statement',
    'Financial Ratios',
    'Footnotes & Disclosures',
    'Management Discussion',
    'Audit Opinion',
  ];
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const { scanProgress: progress, isComplete } = useScanning();

  // Progress is now managed by the ScanningContext

  useEffect(() => {
    if (isComplete) return;

    const sectionTimer = setInterval(() => {
      setCurrentSectionIndex((prev) => (prev + 1) % sections.length);
    }, 1240);

    return () => clearInterval(sectionTimer);
  }, [isComplete, sections.length]);

  const currentSection = sections[currentSectionIndex];

  return (
    <GradientBorderBox sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={1.5} sx={{ flexGrow: 1, overflow: 'hidden' }}>
      <Box>
        <Typography variant="subtitle1" sx={{ color: '#FFE600', fontWeight: 500, fontSize: '1rem', mb: 1 }}>Scanned Document Preview</Typography>
        <GradientBorderBox p={2}>
        <Box
          sx={{
            height: 200,
            bgcolor: '#343340',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundImage: `url('${process.env.PUBLIC_URL}/assets/paper.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        </GradientBorderBox>
      </Box>

      <GradientBorderBox sx={{ p: 2 }}>
        
        <Box
          sx={{
            backgroundImage: `url('${process.env.PUBLIC_URL}/assets/Frame%201010108056.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderRadius: 2,
            minHeight: 80,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#FFE600',
              fontWeight: 600,
              fontSize: '0.875rem',
              mb: 0.5,
            }}
          >
            Sections Scanning
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#FCFCFC',
              fontWeight: 500,
              fontSize: '0.8rem',
            }}
          >
            • {currentSection}
          </Typography>
        </Box>

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
