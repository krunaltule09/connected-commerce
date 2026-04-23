import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, List, ListItem } from '@mui/material';
import { useConfig } from '../../context/ConfigContext';

export default function AiRecommendationsSection({ recommendations, size = 'medium', containerStyle = {} }) {
  const { assets } = useConfig();
  const aiBoxSvg = assets['Banking_Capital_Market_Operate_Table_AI_UI_Medium.svg'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      style={{ height: '28%', minHeight: '120px', marginBottom: '8px', ...containerStyle }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <Box
          component="img"
          src={aiBoxSvg}
          alt="AI Background"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'fill',
          }}
        />
        <Box sx={{
          position: 'absolute',
          top: '58%',
          left: '50%',
          width: '85%',
          transform: 'translate(-50%, -50%)',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <List sx={{ paddingLeft: '2rem' }}>
            {recommendations?.map((point, index) => (
              <ListItem key={index} disableGutters sx={{ p: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                  <Box sx={{ color: '#FFFFFF', mr: 1.5, fontSize: '0.75rem', lineHeight: 1, opacity: 0.7, mt: '3px' }}>▶</Box>
                  <Typography
                    variant="body2"
                    color="white"
                    sx={{
                      fontSize: '13px',
                      lineHeight: 1.2,
                      fontWeight: '300',
                      fontFamily: 'Interstate, sans-serif',
                      textAlign: 'left',
                    }}
                  >
                    {point}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </motion.div>
  );
}
