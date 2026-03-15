import React from 'react';
import { Box } from '@mui/material';
import AiRecommendationsSection from './AiRecommendationsSection';
import CovenantStatusWrapper from './CovenantStatusWrapper';

export default function RightSection({ recommendations }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      gap: 1
    }}>
      <AiRecommendationsSection 
        recommendations={recommendations} 
        containerStyle={{ marginLeft: '1rem',
      width:"100%" }}
      />
      <CovenantStatusWrapper />
    </Box>
  );
}
