import React from 'react';
import { motion } from 'framer-motion';
import styles from './SidebarItem.module.css';

/**
 * SidebarItem component for navigation sidebar
 * @param {Object} props - Component props
 * @param {string} props.sublabel - Small label (usually a number)
 * @param {string} props.label - Main label text
 * @param {boolean} props.active - Whether the item is currently active
 * @param {boolean} props.completed - Whether the item has been completed
 * @param {number} props.index - Index for animation delay
 * @param {function} props.onClick - Function to call when item is clicked
 */
const SidebarItem = ({ sublabel, label, active = false, completed = false, index = 0, onClick }) => {
  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5
      }
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(index);
    }
  };

  return (
    <motion.div 
      className={`${styles.sidebarItem} ${active ? styles.active : ''}`}
      variants={itemVariants}
      onClick={handleClick}
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(10, 54, 22, 0.5)' }}
      whileTap={{ scale: 0.98 }}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.textWrapper}>
        <div className={styles.sublabel}>{sublabel}</div>
        <div className={styles.label}>{label}</div>
      </div>
      {completed && (
        <div className={`${styles.iconContainer} ${active ? styles.activeIcon : ''} ${styles.completed}`}>
          <div className={styles.checkmark} />
        </div>
      )}
    </motion.div>
  );
};

export default SidebarItem;
