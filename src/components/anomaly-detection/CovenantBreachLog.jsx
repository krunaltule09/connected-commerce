import React, { useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import GradientButton from '../common/GradientButton';

// Styled components
const LogContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#1A1A24',
  padding: theme.spacing(2.5),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const LogTitle = styled(Typography)(({ theme }) => ({
  color: '#FFEB3B',
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
  fontSize: '1.25rem',
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2.5),
}));

// Using GradientButton component instead

const AlertBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2.5),
  padding: theme.spacing(0.5, 0),
}));

const DocumentCard = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(29, 29, 29, 0.8)',
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  minHeight: '100px',
}));

const DocumentHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
}));

const DocumentFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 'auto',
}));

const ViewButton = styled(Box)(({ theme }) => ({
  color: '#FFFFFF',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  fontSize: '0.75rem',
  cursor: 'pointer',
  opacity: 0.8,
  '&:hover': {
    color: '#FFFFFF',
    opacity: 1,
  },
}));

export default function CovenantBreachLog({ documents }) {
  const [activeTab, setActiveTab] = useState('documents'); // 'documents' or 'kpis'
  return (
    <LogContainer>
      <LogTitle variant="h6">Covenant Breach Log</LogTitle>
      
      <ActionButtons>
        <GradientButton 
          variant="metric" 
          active={activeTab === 'documents'}
          onClick={() => setActiveTab('documents')}
          sx={{
            color: activeTab === 'documents' ? '#B4FF00' : '#FFFFFF',
            minWidth: '180px',
            justifyContent: 'center',
          }}
        >
          Explore Documents
        </GradientButton>
        <GradientButton 
          variant="metric" 
          active={activeTab === 'kpis'}
          onClick={() => setActiveTab('kpis')}
          sx={{
            color: activeTab === 'kpis' ? '#FFEB3B' : '#FFFFFF',
            minWidth: '180px',
            justifyContent: 'center',
          }}
        >
          Operational KPIs
        </GradientButton>
      </ActionButtons>
      
      <AlertBox>
        <Box component="img" src="/assets/Vector (1).svg" alt="Alert Icon" sx={{ width: 20, height: 20, flexShrink: 0 }} />
        <Typography variant="body2" color="white" fontWeight="medium">
          DSCR = 1.1 in Q2 (Below 1.25 limit)
        </Typography>
      </AlertBox>
      
      <Grid container spacing={2}>
        {documents.map((doc) => (
          <Grid item xs={12} sm={4} key={doc.id}>
            <DocumentCard elevation={0}>
              <DocumentHeader>
                <Box component="img" src="/assets/Light circle outline.svg" alt="Document Icon" sx={{ width: 28, height: 28, flexShrink: 0 }} />
                <Box>
                  <Typography variant="body2" color="white">
                    {doc.title}
                  </Typography>
                  <Typography variant="caption" color="white" sx={{ opacity: 0.7 }}>
                    {doc.subtitle}
                  </Typography>
                </Box>
              </DocumentHeader>
              
              <DocumentFooter>
                <ViewButton>
                  View
                  <Box component="img" src="/assets/Vector (4).svg" alt="Arrow Icon" sx={{ width: 7, height: 12, ml: 0.5, mt: 0.25 }} />
                </ViewButton>
              </DocumentFooter>
            </DocumentCard>
          </Grid>
        ))}
      </Grid>
    </LogContainer>
  );
}
