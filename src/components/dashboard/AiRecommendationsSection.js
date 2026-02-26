import React from 'react';
import { motion } from 'framer-motion';
import AIRecommendationsWithGif from '../anomaly-detection/AIRecommendationsWithGif';

/**
 * AiRecommendationsSection component that displays AI recommendations
 * @param {Object} props - Component props
 * @param {Array<string>} props.recommendations - List of AI recommendations
 * @param {string} props.size - Size of the panel ('medium' or 'large')
 */
export default function AiRecommendationsSection({ recommendations, size = 'medium', containerStyle = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      style={{ height: '28%', minHeight: '120px', marginBottom: '8px', ...containerStyle }}
    >
      <AIRecommendationsWithGif 
        contentContainerSx={{display:"flex",alignItems:"center",justifyContent:"center",top:"63%",left:"0%"}} 
        recommendations={recommendations}
        size={size}
      />
    </motion.div>
  );
}
