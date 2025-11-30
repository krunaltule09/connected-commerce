import { Box, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import OcrScanningSection from '../components/OcrScanningSection';
import FinancialMetricsSection from '../components/FinancialMetricsSection';
import CovenantStatusSection from '../components/CovenantStatusSection';
// import PerformanceSection from '../components/PerformanceSection'; // Unused for now
import AIRecommendations from '../components/anomaly-detection/AIRecommendations';
import { ScanningProvider } from '../context/ScanningContext';
import styles from './FinancialDashboard.module.css';

export default function FinancialDashboard() {
  const navigate = useNavigate();
  
  const handleNextStep = () => {
    navigate('/operational-doc-scan');
  };
  
  return (
    <ScanningProvider>
      <Box sx={{ bgcolor: '#000', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', p: 2 }}>
      <Container maxWidth="xl" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', py: 1 }}>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={5} sx={{ height: '100%' }}>
            <Grid container spacing={2}  direction="column" >
              <Grid item xs sx={{ height: '60%' }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <OcrScanningSection />
                </motion.div>
              </Grid>
              <Grid item xs sx={{ height: '40%', mt: 3 }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <CovenantStatusSection />
                </motion.div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={7} >
            <Grid container spacing={1} direction="column" sx={{ height: '100%' }}>
              <Grid item xs sx={{ height: '70%' }}>
                <Box sx={{ height: '100%' }}>
                  <FinancialMetricsSection />
                </Box>
              </Grid>
              <Grid item xs>
                <Box >
                  <Box sx={{ width: '70%', height: '100%', mt: 4 }}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <AIRecommendations recommendations={['Debt/Equity exceeds limit (3.2 vs 3.0)']} />
                    </motion.div>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      
      {/* Navigation buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Box className={styles.navigationButtons}>
          <Box className={styles.backButton} onClick={() => window.history.back()}>Go back</Box>
          <Box className={styles.nextButton} onClick={handleNextStep}>Next step</Box>
        </Box>
      </motion.div>
      
      {/* EY Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Box 
          component="img"
          src="/assets/ey-logo.svg"
          alt="EY Logo"
          className={styles.eyLogo}
        />
      </motion.div>
      </Box>
    </ScanningProvider>
  );
}
