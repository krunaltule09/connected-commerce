import React from 'react';
import { motion } from 'framer-motion';
import AIRecommendationsWithGif from '../anomaly-detection/AIRecommendationsWithGif';

export default function AiRecommendationsSection({ recommendations, size = 'medium', containerStyle = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      style={{ height: '28%', minHeight: '120px', marginBottom: '8px', ...containerStyle }}
    >
      <AIRecommendationsWithGif
        contentContainerSx={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          top:"56%",
          left:"50%",
          width: "85%",
          transform: "translate(-50%, -50%)",
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          paddingTop: '1.5rem',
        }}
        recommendations={recommendations}
        size={size}
        listPaddingLeft='2rem'
      />
    </motion.div>
  );
}
