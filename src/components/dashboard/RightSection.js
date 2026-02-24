import React from 'react';
import { Box } from '@mui/material';
import AiRecommendationsSection from './AiRecommendationsSection';
import CovenantStatusWrapper from './CovenantStatusWrapper';

/**
 * RightSection component that combines AI Recommendations and Covenant Status
 * @param {Object} props - Component props
 * @param {Array<string>} props.recommendations - List of AI recommendations
 */
export default function RightSection({ recommendations }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      gap: 1,
    }}>
      <AiRecommendationsSection 
        recommendations={recommendations} 
        containerStyle={{ marginLeft: '1rem' }}
      />
      <CovenantStatusWrapper />
    </Box>
  );
}
