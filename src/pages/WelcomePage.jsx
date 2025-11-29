import React from 'react';
import { MoveDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '../components';
import styles from './WelcomePage.module.css';

/**
 * Welcome page component that displays a greeting and instruction
 * This is the landing page for the application
 */
const WelcomePage = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5, // Increased from 0.3 for slower stagger
        delayChildren: 0.4,   // Increased from 0.2 for slower start
        duration: 1.2,        // Longer overall duration
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Increased y offset for more dramatic movement
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 10,     // Reduced damping for more bounce
        stiffness: 70,   // Reduced stiffness for slower movement
        duration: 1.5,   // Longer duration
        ease: 'easeOut',
      },
    },
  };

  const bottomVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.8,       // Increased delay to appear after main content
        duration: 1.2,    // Longer duration
        ease: 'easeOut',
      },
    },
  };

  const waveVariants = {
    hidden: { rotateZ: 0, scale: 1 },
    visible: {
      rotateZ: [0, -25, 15, -25, 15, -15, 10, 0], // More complex waving motion
      scale: [1, 1.1, 1, 1.1, 1, 1.05, 1],        // Add subtle scaling for emphasis
      transition: {
        delay: 1.8,                                // Start waving after text appears
        duration: 2.5,                             // Longer duration for slower wave
        ease: 'easeInOut',
        times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
        repeat: Infinity,                          // Make it wave continuously
        repeatDelay: 3,                            // Wait between waves
      },
    },
  };

  const arrowVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2.2,           // Increased delay to appear after instruction text
        duration: 0.8,        // Slower animation
        ease: 'easeOut',
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0.8,     // Longer pause between pulses
      },
    },
  };

  return (
    <div className={styles.welcomeContainer}>
      <Header />
      
      <main className={styles.mainContent}>
        <motion.div 
          className={styles.centerContent}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 className={styles.heading} variants={itemVariants}>
            Hello, there!
            <motion.span 
              className={styles.waveEmoji}
              variants={waveVariants}
            >
              👋
            </motion.span>
          </motion.h1>
          <motion.h2 className={styles.subheading} variants={itemVariants}>
            Welcome to Operate Zone.
          </motion.h2>
        </motion.div>
        
        <motion.div 
          className={styles.bottomContent}
          initial="hidden"
          animate="visible"
          variants={bottomVariants}
        >
          <motion.p className={styles.instruction}>
            Please proceed on the interactive screen to begin
          </motion.p>
          <motion.div variants={arrowVariants} initial="hidden" animate="visible">
            <MoveDown className={styles.arrowIcon} />
          </motion.div>
        </motion.div>
      </main>
      
      {/* Placeholder for future background video */}
      <div className={styles.backgroundPlaceholder}></div>
    </div>
  );
};

export default WelcomePage;
