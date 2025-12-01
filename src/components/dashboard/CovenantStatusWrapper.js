import React from 'react';
import { motion } from 'framer-motion';
import CovenantStatusSection from '../CovenantStatusSection';

/**
 * CovenantStatusWrapper component that wraps the CovenantStatusSection with animations
 */
export default function CovenantStatusWrapper() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ height: '70%' }}
    >
      <CovenantStatusSection />
    </motion.div>
  );
}
