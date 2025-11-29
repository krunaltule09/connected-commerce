import React from 'react';
import { motion } from 'framer-motion';
import styles from './OfferCard.module.css';

/**
 * Reusable OfferCard component that displays loan information with a futuristic border
 * Uses the Frame.svg as the border
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the card (e.g., "Working Capital Loan")
 * @param {string} props.value - Main value to display (e.g., "$250M")
 * @param {string} props.subtitle - Optional subtitle (e.g., "Analysing")
 * @param {string} props.position - Position of the card ('left' or 'right')
 */
const OfferCard = ({ title, value, subtitle, position = 'left' }) => {
  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      x: position === 'left' ? -20 : 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        delay: position === 'left' ? 0.3 : 0.5,
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: position === 'left' ? 0.5 : 0.7,
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // SVG for frame border - inline to allow customization based on position
  const renderFrameSVG = () => (
    <svg className={styles.frameSvg} viewBox="0 0 1377 535" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Frame">
        <g id="Group" opacity="0.3">
          <path id="Vector" fillRule="evenodd" clipRule="evenodd" d="M1266.28 535H110.72L0 409.588V125.412L110.72 0H1266.28L1266.79 0.579004L1377 125.412V409.588L1266.28 535ZM111.947 531.526H1265.05L1373.93 408.198V126.802L1265.05 3.47403H111.947L2.9648 126.802V408.198L111.947 531.526Z" fill="#FFE600"/>
        </g>
        <path id="Vector_2" fillRule="evenodd" clipRule="evenodd" d="M1252.99 515.779H262.646L230.749 479.649H93.2432L92.8342 479.186L19.5319 396.157V395.346L19.4297 138.847L124.629 19.688H699.393L744.376 70.6404H1089.73L1136.55 17.6035H1252.48L1252.89 18.0667L1358.6 137.805V396.157L1252.99 515.779ZM263.873 512.421H1251.77L1355.64 394.767V139.194L1251.26 20.9618H1137.88L1090.95 73.9986H743.15L698.166 23.0462H125.856L22.4967 140.237L22.599 394.651L94.5722 476.175H231.976L263.873 512.421Z" fill="#FFE600"/>
        <path id="Vector_3" d="M105.203 491.116L125.139 513.697H244.038L222.978 489.727L105.203 491.116Z" fill="#FFE600"/>
        <path id="Vector_4" d="M732.406 21.4258L763.179 56.166H1078.06L1108.73 21.4258H732.406Z" fill="#FFE600"/>
        <g id="Group_2" opacity="0.3">
          <path id="Vector_5" d="M1103.62 514.738L1101.58 512.422L1189.91 412.254H1338.76V415.728H1191.14L1103.62 514.738Z" fill="#FFE600"/>
        </g>
        <g id="Group_3" opacity="0.3">
          <path id="Vector_6" d="M200.69 157.719H20.9609V154.361H199.463L317.851 20.2637L319.998 22.5797L200.69 157.719Z" fill="#FFE600"/>
        </g>
      </g>
    </svg>
  );

  return (
    <motion.div 
      className={styles.offerCardContainer}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <div className={styles.offerCard}>
        {/* Frame SVG as background */}
        <div className={`${styles.frameSvgContainer} ${position === 'right' ? styles.rightFrame : ''}`}>
          {renderFrameSVG()}
        </div>
        
        {/* Content */}
        <motion.div className={styles.cardContent} variants={textVariants}>
          <motion.h3 className={styles.cardTitle} variants={itemVariants}>
            {title}
          </motion.h3>
          <motion.div className={styles.cardValue} variants={itemVariants}>
            {value}
          </motion.div>
          {subtitle && (
            <motion.div className={styles.cardSubtitle} variants={itemVariants}>
              {subtitle}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OfferCard;
