import React from 'react';
import { Box } from '@mui/material';
import styles from '../../pages/operational-doc-scan/OperationalDocScan.module.css';
import { IMAGES } from '../../constants/assetPaths';

const BackgroundOverlay = () => {
  return (
    <Box 
      className={styles.backgroundOverlay}
      sx={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('${IMAGES.OPERATIONAL_DOC_SCAN_BG}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%'
      }}
    ></Box>
  );
};

export default BackgroundOverlay;
