import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const defaultFindings = [
  {
    title: 'Finance_Operations_Q2.xlsx',
    section: 'Section: Cash Flow Statement (Operating Activities)',
    usedFor: 'Used For: DSCR calculation (EBITDA ÷ Debt Service)'
  },
  {
    title: 'Loan_Agreement.pdf',
    section: 'Section: Financial Covenant Schedule',
    usedFor: 'Used For: Covenant threshold: DSCR ≥ 1.25'
  },
  {
    title: 'Covenant_Compliance_Certificate_Q2.pdf',
    section: 'Section: Borrower attestation & covenant reporting',
    usedFor: 'Used For: Y-14Q Schedule H.1 – Covenant Status'
  },
  {
    title: 'Borrower_Financials_Q2_Reviewed.pdf',
    section: 'Section: Financial Covenant Schedule',
    usedFor: 'Used For: Covenant threshold: DSCR ≥ 1.25'
  }
];

export default function DetailedFindings({ 
  findings = defaultFindings,
  warningMessage = 'DSCR = 1.10 in Q2 (Below 1.25 FR Y-14 regulatory threshold)',
  showWarning = true,
  className = '',
  containerSx = {},
  cardMinWidth = '280px',
  cardMaxWidth = '320px',
  cardHeight = '200px',
  buttonTransformY = '-2rem'
}) {
  return (
    <Box 
      className={className}
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative', 
        width: '100%', 
        maxWidth: '2044px',
        pb: 1,
        pr: 2,
        ...containerSx
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          color: '#FFE600', 
          fontSize: { xs: '1.125rem', md: '1.25rem' },
          fontWeight: 400, 
          mb: 2,
          pl: 2,
          pt: 2
        }}
      >
        Detailed Findings
      </Typography>
      
      <Box sx={{ display: 'flex', width: '100%', gap: 1, pl: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          {showWarning && (
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 3 }}>
              <Box sx={{ width: 20, height: 20, flexShrink: 0 }}>
                <Box component="img" src="/assets/Vector (1).svg" sx={{ width: '100%', height: '100%' }} />
              </Box>
              <Typography sx={{ fontSize: '1rem', lineHeight: 1.2, color: 'white', fontWeight: 400 }}>
                {warningMessage}
              </Typography>
            </Box>
          )}
          
          <Box sx={{ 
            display: 'flex', 
            width: '100%', 
            overflowX: 'auto', 
            justifyContent: 'flex-start', 
            overflowY: 'hidden', 
            transform: 'translateY(-0.6rem)',
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255, 230, 0, 1)',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(255, 230, 0, 0.8)',
              },
            },
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 230, 0, 1) rgba(255, 255, 255, 0.05)',
          }}>
            {findings.map((finding, index) => (
              <Box 
                key={index}
                sx={{ 
                  bgcolor: '#23232f', 
                  flex: '0 0 auto',
                  minWidth: cardMinWidth,
                  maxWidth: cardMaxWidth,
                  position: 'relative', 
                  borderRadius: '4px',
                  border: '1px solid #33333e',
                  height: cardHeight,
                  transform: 'scale(0.98)'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', p: 2.25, width: '100%', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                  <Box sx={{ display: 'flex', gap: 2, height: '172px', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%' }}>
                    <Box sx={{ 
                      bgcolor: '#3b3b3b', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      p: 1, 
                      borderRadius: '50%', 
                      flexShrink: 0, 
                      width: 44, 
                      height: 44 
                    }}>
                      <Box sx={{ width: 42, height: 42, flexShrink: 0 }}>
                        <Box component="img" src="/assets/Light circle outline.svg" sx={{ width: '100%', height: '100%' }} />
                      </Box>
                    </Box>
                    <Box sx={{ flex: '1 0 0', height: '172px' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', pr: 0.5, height: '100%' }}>
                        <Typography sx={{ 
                          fontSize: '0.9rem', 
                          lineHeight: 1, 
                          overflow: 'hidden', 
                          color: '#dedee2', 
                          fontWeight: 700, 
                          width: '95%', 
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis'
                        }}>
                          {finding.title}
                        </Typography>
                        <Box sx={{ height: '142px', overflow: 'hidden' }}>
                          <Typography sx={{ 
                            fontSize: '0.8rem', 
                            lineHeight: 1.5, 
                            color: '#a4a3b1', 
                            fontWeight: 400,
                            mt: 2,
                            mb: 1
                          }}>
                            {finding.section}
                          </Typography>
                          <Typography sx={{ 
                            fontSize: '0.8rem', 
                            lineHeight: 1.5, 
                            color: '#a4a3b1', 
                            fontWeight: 400,
                            fontStyle: 'italic'
                          }}>
                            {finding.usedFor}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Button
                    sx={{
                      transform: `translateY(${buttonTransformY})`, 
                      bgcolor: '#2e2e38', 
                      borderRadius: '5px', 
                      border: '0.5px solid #747480',
                      px: 1.75,
                      py: 0.75,
                      display: 'flex',
                      gap: 1,
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      color: '#737387',
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: '#3a3a48'
                      }
                    }}
                  >
                    <Typography sx={{ fontSize: '1rem', lineHeight: 1, fontWeight: 400 }}>
                      View
                    </Typography>
                    <Box sx={{ width: 20, height: 20, flexShrink: 0 }}>
                      <Box component="img" src="/assets/nav-arrow-right.svg" sx={{ width: '100%', height: '100%' }} />
                    </Box>
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
