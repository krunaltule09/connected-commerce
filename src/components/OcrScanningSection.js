import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Fade, Grow, Slide } from '@mui/material';
import { motion } from 'framer-motion';
import GradientBorderBox from './common/GradientBorderBox';
import { useScanning } from '../context/ScanningContext';

export default function OcrScanningSection({ isInOperationalDocScan=false }) {
  // Removed sections array and currentSectionIndex state as they're no longer needed
  const { scanProgress: progress, isComplete } = useScanning();
  const [animateDocument, setAnimateDocument] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  
  // Staggered animation timing
  useEffect(() => {
    const documentTimer = setTimeout(() => setAnimateDocument(true), 300);
    const progressTimer = setTimeout(() => setAnimateProgress(true), 600);
    
    return () => {
      clearTimeout(documentTimer);
      clearTimeout(progressTimer);
    };
  }, []);

  // Progress is now managed by the ScanningContext

  // Animation variants for document
  const documentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <GradientBorderBox animated sx={{ px: 1.45, height: '100%', display: 'flex', flexDirection: 'column', py:1.9 }}>
      <Stack spacing={1.45} sx={{ flexGrow: 1, overflow: 'hidden', '& > *': { marginBottom: '0 !important' } }} className="ocr-scanning-stack">
      <Box>
        <Slide direction="right" in={true} timeout={700} mountOnEnter>
          <Typography variant="subtitle1" sx={{ color: '#FFE600', fontWeight: 400, fontSize: '1.21rem', mb: 1 }}>Data Extraction Preview</Typography>
        </Slide>
        <Grow in={animateDocument} timeout={800}>
          <GradientBorderBox p={1.45}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={documentVariants}
              style={{ height: '100%', width: '100%' }}
            >
              <Box
                sx={{
                  height: isInOperationalDocScan ? 300 : 388,
                  bgcolor: '#343340',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: `url('/assets/docu_scan.svg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 12px 20px rgba(0,0,0,0.4)',
                    transform: 'translateY(-2px)'
                  }
                }}
              />
            </motion.div>
          </GradientBorderBox>
        </Grow>
      </Box>

      <Fade in={animateProgress} timeout={1000}>
        <GradientBorderBox sx={{ p: 1.45 }}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.97 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: isComplete ? '#FFE600' : 'rgba(252, 252, 252, 0.7)',
                    fontSize: '0.73rem',
                  }}
                >
                  {isComplete ? 'Completed' : 'Analyzing'}
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Typography variant="body2" sx={{ color: '#FFE600', fontSize: '0.85rem' }}>{`${Math.round(progress)}%`}</Typography>
              </motion.div>
            </Box>
            <Box
              sx={{
                height: 7.8,
                borderRadius: 3.9,
                backgroundColor: 'rgba(255,255,255,0.1)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: '#FFE600',
                  borderRadius: 4,
                  position: 'absolute',
                  transition: 'width 0.3s ease-out'
                }}
              />

            </Box>
          </Box>
        </GradientBorderBox>
      </Fade>
    </Stack>
    </GradientBorderBox>
  );
}
