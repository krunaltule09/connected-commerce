import { Box, Container, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import OcrScanningSection from '../components/OcrScanningSection';
import FinancialMetricsSection from '../components/FinancialMetricsSection';
import CovenantStatusSection from '../components/CovenantStatusSection';
import PerformanceSection from '../components/PerformanceSection';

export default function FinancialDashboard() {
  const navigate = useNavigate();
  
  const handleNextStep = () => {
    navigate('/operational-doc-scan');
  };
  return (
    <Box sx={{ bgcolor: '#000', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', p: 2 }}>
      <Container maxWidth="xl" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', py: 1 }}>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={4} sx={{ height: '100%' }}>
            <Grid container spacing={2}  direction="column" >
              <Grid item xs sx={{ height: '60%' }}>
                <OcrScanningSection />
              </Grid>
              <Grid item xs sx={{ height: '40%', mt: 3 }}>
                <CovenantStatusSection />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8} sx={{ height: '100%' }}>
            <Grid container spacing={1} direction="column" sx={{ height: '100%' }}>
              <Grid item xs sx={{ height: '70%' }}>
                <Box sx={{ height: '100%' }}>
                  <FinancialMetricsSection />
                </Box>
              </Grid>
              <Grid item xs sx={{ height: '30%' }}>
                <Box sx={{ height: '100%' }}>
                  <PerformanceSection />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>


      </Container>
              <Box sx={{ display: 'flex',width: '92%', justifyContent: 'flex-end', gap: 3, mt: 3, mb: 3 }}>
          <Button
            variant="outlined"
            sx={{
              position: 'relative',
              bottom: '60px',
              right: '60px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px 32px',
              gap: '18px',
              isolation: 'isolate',

              color: '#FFFFFF',
              border: '2.26px solid #C3C3CB',
              borderRadius: '50px',
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 400,
              '&:hover': {
                borderColor: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Go back
          </Button>
          <Button
            variant="outlined"
            onClick={handleNextStep}
            sx={{
              position: 'relative',
              bottom: '60px',
              right: '60px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px 48px',
              gap: '14px',
              color: '#00C8FF',
              background: 'linear-gradient(0deg, rgba(29, 29, 29, 0.2), rgba(29, 29, 29, 0.2)), #1D1D1D',
              backgroundBlendMode: 'color-burn, plus-lighter',
              boxShadow: 'inset 6px 6px 1px -7px rgba(255, 255, 255, 0.5), inset 4px 4px 2px -4px #B3B3B3, inset -4px -4px 2px -4px #B3B3B3, inset 0px 0px 44px rgba(242, 242, 242, 0.5)',
              backdropFilter: 'blur(40px)',
              borderRadius: '200px',
              border: 'none',
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 400,
              '&:hover': {
                borderColor: 'transparent',
                backgroundColor: 'rgba(29, 29, 29, 0.4)',
              },
            }}
          >
            Next step
          </Button>
        </Box>
    </Box>
  );
}
