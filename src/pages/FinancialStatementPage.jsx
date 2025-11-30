import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components';
import DeepDiveCard from '../components/DeepDiveCard/DeepDiveCard';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import SidebarItem from '../components/SidebarItem/SidebarItem';
import CovenantBar from '../components/CovenantBar/CovenantBar';
import styles from './FinancialStatementPage.module.css';

/**
 * FinancialStatementPage component for displaying financial statement analysis
 */
const FinancialStatementPage = () => {
  // Sample financial data
  const financialData = [
    { title: 'Revenue', value: '$12.5B' },
    { title: 'EBITDA', value: '$1.2B' },
    { title: 'Total Debt', value: '$3.8B' },
    { title: 'Equity', value: '$1.2B' },
    { title: 'Interest Expense', value: '$210M' }
  ];

  // State for progress and content visibility
  const [progress, setProgress] = useState(0);
  const [showDeepDive, setShowDeepDive] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  
  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 1;
        
        // Show deep dive content at 40%
        if (newProgress >= 40 && !showDeepDive) {
          setShowDeepDive(true);
        }
        
        // Reveal cards one by one between 40% and 90%
        if (newProgress >= 40 && newProgress < 90) {
          const cardIndex = Math.floor((newProgress - 40) / 10);
          if (cardIndex >= 0 && cardIndex < financialData.length && !visibleCards.includes(cardIndex)) {
            setVisibleCards(prev => [...prev, cardIndex]);
          }
        }
        
        // Show graph at 100%
        if (newProgress >= 100) {
          setShowGraph(true);
          clearInterval(interval);
        }
        
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 50); // Update every 50ms
    
    return () => clearInterval(interval);
  }, [showDeepDive, showGraph, visibleCards, financialData.length]);
  
  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 8,
        stiffness: 80,
        delay: 0.4
      }
    }
  };

  // Sample covenant data
  const covenantData = [
    { label: 'DSCR', value: '1.3', isGood: true, percentage: 45 },
    { label: 'Debt / Equity', value: '3.2', limit: '3.0', isGood: false, percentage: 75 },
    { label: 'Current Ratio', value: '1.6', isGood: true, percentage: 55 }
  ];

  // Sidebar navigation items
  const sidebarItems = [
    { sublabel: '1', label: 'Welcome', completed: true },
    { sublabel: '2', label: 'Financial Statement Scan', active: true, completed: true },
    { sublabel: '3', label: 'Operational Docx Scan', completed: true },
    { sublabel: '4', label: 'Y-14 Report Generation', completed: true },
    { sublabel: '5', label: 'Covenant Monitoring', completed: true },
    { sublabel: '6', label: 'Benefits Summary', completed: true }
  ];

  return (
    <div className={styles.financialStatementContainer}>
      <Header />
      
      <motion.main 
        className={styles.mainContent}
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        {/* Sidebar Navigation */}
        <div className={styles.sidebar}>
          {sidebarItems.map((item, index) => (
            <SidebarItem 
              key={index}
              sublabel={item.sublabel}
              label={item.label}
              active={item.active}
              completed={item.completed}
              index={index}
            />
          ))}
        </div>
        
        {/* Main Content Area */}
        <div className={styles.contentArea}>
          {/* Page Title */}
          <motion.div 
            className={styles.pageTitle}
            variants={titleVariants}
          >
            <h1>Financial Statement Scan & Covenant Extraction</h1>
            <p className={styles.pageDescription}>Description text here</p>
          </motion.div>
          
          {/* Content Sections */}
          <div className={styles.contentSections}>
            {/* Document Preview Section */}
            <motion.div 
              className={styles.documentSection}
              variants={sectionVariants}
            >
              <div className={styles.documentPreview}>
                <div className={styles.documentImage}>
                  <img 
                    src="/assets/financial-status-doc.svg" 
                    alt="Financial document" 
                    className={styles.documentSvg} 
                  />
                </div>
                <div className={styles.analysisProgress}>
                  <ProgressBar percentage={progress} label={progress < 100 ? "Analysing..." : "Analysis Complete"} />
                </div>
              </div>
            </motion.div>
            
            {/* Financial Data Section */}
            <div className={styles.dataSection}>
              {/* Deep Dive Section */}
              <motion.div 
                className={styles.deepDiveSection}
                variants={sectionVariants}
                initial="hidden"
                animate={showDeepDive ? "visible" : "hidden"}
              >
                <h2 className={styles.sectionTitle}>Deep Dive (Extracted Data)</h2>
                <div className={styles.cardsContainer}>
                  {financialData.map((item, index) => (
                    <DeepDiveCard 
                      key={index}
                      title={item.title}
                      value={item.value}
                      position={index}
                      isVisible={visibleCards.includes(index)}
                    />
                  ))}
                </div>
              </motion.div>
              
              {/* Covenant Status Section */}
              <motion.div 
                className={styles.covenantSection}
                variants={sectionVariants}
                initial="hidden"
                animate={showGraph ? "visible" : "hidden"}
              >
                <h2 className={styles.sectionTitle}>Covenant Status</h2>
                <div className={styles.covenantContainer}>
                  <div className={styles.covenantSvgWrapper}>
                    <img 
                      src="/assets/convenant-status.svg" 
                      alt="Covenant Status Background" 
                      className={styles.covenantSvg} 
                    />
                    <div className={styles.covenantBarsContainer}>
                      {covenantData.map((item, index) => (
                        <CovenantBar 
                          key={index}
                          label={item.label}
                          value={item.value}
                          limit={item.limit}
                          isGood={item.isGood}
                          percentage={item.percentage}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.main>
      
      {/* Background placeholder */}
      <div className={styles.backgroundPlaceholder}></div>
    </div>
  );
};

export default FinancialStatementPage;
