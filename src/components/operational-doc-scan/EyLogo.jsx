import React from 'react';
import { Box, Zoom } from '@mui/material';
import styles from '../../pages/operational-doc-scan/OperationalDocScan.module.css';

const EyLogo = () => {
  return (
    <Zoom in={true} timeout={1500} style={{ transitionDelay: '500ms' }}>
      <Box 
        component="img"
        src="/assets/ey-logo.svg"
        alt="EY Logo"
        className={styles.eyLogo}
      />
    </Zoom>
  );
};

export default EyLogo;
