import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../../context/ConfigContext';
import styles from './ExplorePage.module.css';

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();
  const { assets } = useConfig();

  const handleTabClick = (tab) => {
    // Only allow 'loan' tab to be active
    if (tab === 'loan') {
      setActiveTab(activeTab === tab ? null : tab);
    }
  };
  
  const handleExploreNow = () => {
    navigate('/document-scan');
  };

  return (
    <Box className={styles.explorePage}>
      {/* Background image with overlay */}
      <Box 
        className={styles.backgroundOverlay}
        sx={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('${assets['BCM_OperateTable_Page_Layout_2.svg']}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%'
        }}
      ></Box>
      
      {/* Main content frame */}
      <Box className={styles.contentFrame}>
        <Box className={styles.tabsContainer}>
          {/* Top row */}
          <Box className={styles.tabsRow}>
            {/* Loan Service Tab */}
            <Box 
              className={`${styles.cardText} ${activeTab === 'loan' ? styles.activeCard : ''}`}
              onClick={() => handleTabClick('loan')}
            >
              <Box 
                component="img" 
                src={assets['BCM_OperateTable_Loan_Service.svg']}
                alt="Loan Service" 
                className={styles.svgIcon}
              />
            </Box>

            {/* Transparent Compliance Tab (Disabled) */}
            <Box 
              className={`${styles.cardText} ${styles.disabledCard}`}
            >
              <Box 
                component="img" 
                src={assets['BCM_OperateTable_Transparent_Compliance.svg']}
                alt="Transparent Compliance" 
                className={styles.svgIcon}
                sx={{ opacity: 0.5 }}
              />
            </Box>
          </Box>

          {/* Bottom row */}
          <Box className={styles.tabsRow}>
            {/* Automated Servicing Tab 1 (Disabled) */}
            <Box 
              className={`${styles.cardText} ${styles.disabledCard}`}
            >
              <Box 
                component="img" 
                src={assets['BCM_OperateTable_Automated_Servicing.svg']}
                alt="Automated Servicing" 
                className={styles.svgIcon}
                sx={{ opacity: 0.5 }}
              />
            </Box>

            {/* Automated Servicing Tab 2 (Disabled) */}
            <Box 
              className={`${styles.cardText} ${styles.disabledCard}`}
            >
              <Box 
                component="img" 
                src={assets['BCM_OperateTable_Automated_Servicing_Alt.svg']}
                alt="Automated Servicing 2" 
                className={styles.svgIcon}
                sx={{ opacity: 0.5 }}
              />
            </Box>
          </Box>
        </Box>

        {/* Explore Now button */}
        <Box className={styles.exploreButtonContainer}>
          <Box 
            className={styles.exploreButton}
            onClick={handleExploreNow}
          >
            <Box className={styles.exploreButtonText}>
              Explore Now
            </Box>
          </Box>
        </Box>

        {/* Help text */}
        <Box className={styles.helpText}>
          Need Help? Contact SPOC
        </Box>
      </Box>
      
      {/* EY Logo */}
      <Box 
        component="img"
        src={assets['BCM_OperateTable_EY_Logo.svg']}
        alt="EY Logo"
        className={styles.eyLogo}
      />
    </Box>
  );
};

export default ExplorePage;
