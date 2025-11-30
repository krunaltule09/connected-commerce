import React from 'react';
import { motion } from 'framer-motion';
import styles from './SidebarItem.module.css';

/**
 * SidebarItem component for navigation sidebar
 * @param {Object} props - Component props
 * @param {string} props.label - Primary label text
 * @param {string} props.sublabel - Secondary label text (number)
 * @param {boolean} props.active - Whether this item is active
 * @param {boolean} props.completed - Whether this item is completed
 * @param {number} props.index - Index for animation sequencing
 */
const SidebarItem = ({ label, sublabel, active = false, completed = true, index = 0 }) => {
  // Animation variants
  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -20
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        delay: 0.1 * index
      }
    }
  };

  return (
    <motion.div 
      className={`${styles.sidebarItem} ${active ? styles.active : ''}`}
      initial="hidden"
      animate="visible"
      variants={itemVariants}
    >
      <div className={styles.textWrapper}>
        <div className={styles.sublabel}>{sublabel}</div>
        <div className={styles.label}>{label}</div>
      </div>
      <div className={`${styles.iconContainer} ${completed ? styles.completed : ''} ${active ? styles.activeIcon : ''}`}>
        <div className={styles.checkmark}></div>
      </div>
    </motion.div>
  );
};

export default SidebarItem;
