import React from 'react';
import { Box, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useButtonSound } from '../../hooks';
import styles from '../../pages/operational-doc-scan/OperationalDocScan.module.css';
import { useConfig } from '../../context/ConfigContext';

const EyLogo = () => {
  const navigate = useNavigate();
  const { assets } = useConfig();
  
  const handleLogoClick = useButtonSound(() => {
    // Navigate to home/welcome page
    navigate('/');
    // Reload the page to reset the app state
    window.location.reload();
  });

  return (
    <Zoom in={true} timeout={1500} style={{ transitionDelay: '500ms' }}>
      <Box 
        component="img"
        src={assets['BCM_OperateTable_EY_Logo.svg']}
        alt="EY Logo"
        className={styles.eyLogo}
        onClick={handleLogoClick}
        sx={{
          cursor: 'pointer',
          transition: 'opacity 0.3s ease',
          '&:hover': {
            opacity: 0.8
          }
        }}
      />
    </Zoom>
  );
};

export default EyLogo;
