import React from 'react';
import { motion } from 'framer-motion';
import AIRecommendations from '../anomaly-detection/AIRecommendations';

/**
 * AiRecommendationsSection component that displays AI recommendations
 * @param {Object} props - Component props
 * @param {Array<string>} props.recommendations - List of AI recommendations
 */
export default function AiRecommendationsSection({ recommendations }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      style={{ height: '25%', minHeight: '120px', marginBottom: '8px' }}
    >
      <AIRecommendations contentContainerSx={{top:"45%"}} recommendations={recommendations} />
    </motion.div>
  );
}
