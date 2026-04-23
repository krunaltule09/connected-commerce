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
        containerStyle={{ width:"100%", flexShrink: 0 }}
      />
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <CovenantStatusWrapper />
      </Box>
    </Box>
  );
}
