import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Fade, Grow, Slide } from '@mui/material';
import { motion } from 'framer-motion';
import GradientBorderBox from './common/GradientBorderBox';
import { useScanning } from '../context/ScanningContext';

export default function OcrScanningSection() {
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
    <GradientBorderBox animated sx={{ px: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={1.5} sx={{ flexGrow: 1, overflow: 'hidden' }}>
      <Box>
        <Slide direction="right" in={true} timeout={700} mountOnEnter>
          <Typography variant="subtitle1" sx={{ color: '#FFE600', fontWeight: 500, fontSize: '1rem', mb: 1, p: 1.5 }}>Scanned Document Preview</Typography>
        </Slide>
        <Grow in={animateDocument} timeout={800}>
          <GradientBorderBox p={1.5}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={documentVariants}
              style={{ height: '100%', width: '100%' }}
            >
              <Box
                sx={{
                  height: 400,
                  bgcolor: '#343340',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: `url('${process.env.PUBLIC_URL}/assets/docu_scan.svg')`,
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
        <GradientBorderBox sx={{ p: 1.5 }}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: isComplete ? '#FFE600' : 'rgba(252, 252, 252, 0.7)',
                    fontSize: '0.75rem',
                  }}
                >
                  {isComplete ? 'Completed' : 'OCR scanning in process...'}
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Typography variant="body2" sx={{ color: '#FFE600' }}>{`${Math.round(progress)}%`}</Typography>
              </motion.div>
            </Box>
            <Box
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.1)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeOut",
                  delay: 1
                }}
                style={{
                  height: '100%',
                  backgroundColor: '#FFE600',
                  borderRadius: 4,
                  position: 'absolute',
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
