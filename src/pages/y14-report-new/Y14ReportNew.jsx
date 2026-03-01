import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Button, Typography, Stack, Grow, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';
import PictureAsPdfOutlined from '@mui/icons-material/PictureAsPdfOutlined';
import { useButtonSound } from '../../hooks';
// removed unused ErrorIcon
// removed findings icon imports (panel replaced with SVG)
// removed stepper CheckIcon
import styles from './Y14ReportNew.module.css';
import GradientBorderBox from '../../components/common/GradientBorderBox';
import bgVideo from '../../assets/AdobeStock_1544892280.mp4';
import DetailedFindings from '../../components/y14-report/DetailedFindings';

const SSE_BASE_URL = process.env.REACT_APP_SSE_SERVICE_URL || 'http://localhost:3001';

export default function Y14ReportNew() {
  const navigate = useNavigate();
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  
  // Animation states for each section
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateRight, setAnimateRight] = useState(false);
  const [animateFindings, setAnimateFindings] = useState(false);
  const [animateNav, setAnimateNav] = useState(false);
  const [animateLogo, setAnimateLogo] = useState(false);

  // Progress state for Y14 report generation
  const [reportProgress, setReportProgress] = useState(0);
  const lastPublishedProgress = useRef(-1);

  // Publish progress to SSE service (same pattern as ScanningContext)
  const publishProgress = useCallback(async (progress) => {
    // Only publish if progress changed significantly (avoid flooding)
    if (Math.floor(progress) === lastPublishedProgress.current) return;
    lastPublishedProgress.current = Math.floor(progress);

    try {
      await fetch(`${SSE_BASE_URL}/api/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId: 'y14-report',
          progress: Math.floor(progress),
          status: progress >= 100 ? 'complete' : 'generating',
          metadata: {
            reportReady: progress >= 100
          }
        })
      });
    } catch (error) {
      // Silently fail - SSE service may not be running
      console.debug('SSE publish failed:', error.message);
    }
  }, []);

  // Progress simulation for Y14 report generation
  useEffect(() => {
    const timer = setInterval(() => {
      setReportProgress((oldProgress) => {
        const increment = Math.max(1, 10 * (1 - oldProgress / 100));
        return Math.min(oldProgress + increment, 100);
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  // Publish progress to SSE whenever it changes
  useEffect(() => {
    publishProgress(reportProgress);
  }, [reportProgress, publishProgress]);

  // Staggered animation timing with 500ms gaps
  useEffect(() => {
    const leftTimer = setTimeout(() => setAnimateLeft(true), 0);
    const rightTimer = setTimeout(() => setAnimateRight(true), 500);
    const findingsTimer = setTimeout(() => setAnimateFindings(true), 1000);
    const navTimer = setTimeout(() => setAnimateNav(true), 1500);
    const logoTimer = setTimeout(() => setAnimateLogo(true), 2000);
    
    return () => {
      clearTimeout(leftTimer);
      clearTimeout(rightTimer);
      clearTimeout(findingsTimer);
      clearTimeout(navTimer);
      clearTimeout(logoTimer);
    };
  }, []);

  // Toggle accordion - only one can be open at a time
  const handleAccordionToggle = (accordionId) => {
    // If clicking the already expanded accordion, keep it open (don't close it)
    // Otherwise, open the clicked accordion and close the previous one
    setExpandedAccordion(accordionId);
  };

  // Handle next step with sound effect
  const handleNextStep = useButtonSound(() => {
    navigate('/operational-doc-scan');
  });

  // Handle go back with sound effect
  const handleGoBack = useButtonSound(() => {
    navigate('/anomaly-detection');
  });

  return (
    <Box className={styles.reportGenerationPage}>
      {/* Background Video */}
      <video 
        className={styles.backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      
      {/* Background Overlay */}
      <Box className={styles.backgroundOverlay} />
      
      {/* Main content */}
      <Box className={styles.mainContainer}>
        {/* Left: Schedule Template with gradient border and grow */}
        <Box className={styles.leftColumn}>
          <Grow in={animateLeft} timeout={800} appear>
            <GradientBorderBox>
              <Box className={styles.scheduleTemplatePanel}>
                <Box className={styles.panelHeader}>
                  <Typography className={styles.panelTitle}>FR Y-14 Schedule Template</Typography>
                </Box>

                <Box className={styles.templateContent}>
              <Box className={styles.accordionColumn}>
                {/* Borrower / Obligor Information */}
                <Box>
                  <Box className={styles.accordion}>
                    <Box 
                      className={styles.accordionTitle}
                      onClick={() => handleAccordionToggle('borrower')}
                    >
                      <Typography className={styles.accordionHeader}>Borrower / Obligor Information</Typography>
                      <Box className={styles.accordionIcon}>
                        {expandedAccordion === 'borrower' ? (
                          <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  {expandedAccordion === 'borrower' && (
                  <Box className={`${styles.accordionContent} ${styles.borrowerAccordionContent}`} sx={{overflowX:"hidden"}}>
                    <Box className={styles.detailsGrid} >
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Obligor name</Typography>
                        <Typography className={styles.textValue}>Vertex Logistics Corp.</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Obligor ID</Typography>
                        <Typography className={styles.textValue}>00492-WHSL</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Country</Typography>
                        <Typography className={styles.textValue}>United States</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Industry/NAICS code</Typography>
                        <Typography className={styles.textValue}>488510 – Freight Transportation Arrangement</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Obligor type</Typography>
                        <Typography className={styles.textValue}>Corporate</Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
                </Box>
                {/* Loan Characteristics */}
                <Box>
                  <Box className={styles.accordion}>
                    <Box className={styles.accordionTitle} onClick={() => handleAccordionToggle('loan')}>
                      <Typography className={styles.accordionHeader}>Loan Characteristics</Typography>
                      <Box className={styles.accordionIcon}>
                        {expandedAccordion === 'loan' ? (
                          <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  {expandedAccordion === 'loan' && (
                  <Box className={styles.accordionContent} sx={{overflowX:"hidden"}}>
                    <Box className={styles.detailsGrid} >
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Loan Type</Typography>
                        <Typography className={styles.textValue}>Working Capital Revolver</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Origination Date</Typography>
                        <Typography className={styles.textValue}>15-Jan-21</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Maturity Date</Typography>
                        <Typography className={styles.textValue}>15-Jan-26</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Original Commitment</Typography>
                        <Typography className={styles.textValue}>$1,80,00,000 </Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Current Outstanding Balance</Typography>
                        <Typography className={styles.textValue}>$1,42,00,000 </Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Unused Commitment</Typography>
                        <Typography className={styles.textValue}>$38,00,000 </Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Interest Rate Type</Typography>
                        <Typography className={styles.textValue}>Floating (SOFR + 2.10%)</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Current Interest Rate</Typography>
                        <Typography className={styles.textValue}>7.35%</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Payment Frequency</Typography>
                        <Typography className={styles.textValue}>Monthly</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Next Payment Due</Typography>
                        <Typography className={styles.textValue}>12/10/2025</Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
                </Box>
                {/* Collateral Information */}
                <Box>
                  <Box className={styles.accordion}>
                    <Box className={styles.accordionTitle} onClick={() => handleAccordionToggle('collateral')}>
                      <Typography className={styles.accordionHeader}>Collateral Information</Typography>
                      <Box className={styles.accordionIcon}>
                        {expandedAccordion === 'collateral' ? (
                          <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  {expandedAccordion === 'collateral' && (
                  <Box className={styles.accordionContent} sx={{overflowX:"hidden"}}>
                    <Box className={styles.detailsGrid}>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Collateral Type</Typography>
                        <Typography className={styles.textValue}>Accounts Receivable + Inventory</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Collateral Code</Typography>
                        <Typography className={styles.textValue}>24</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Collateral Value</Typography>
                        <Typography className={styles.textValue}>$2,10,00,000 </Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>LTV (Calculated)</Typography>
                        <Typography className={styles.textValue}>64%</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Lien Position</Typography>
                        <Typography className={styles.textValue}>1st Lien</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Guarantee Indicator</Typography>
                        <Typography className={styles.textValue}>Yes (Corporate Guarantee)</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Guarantee Amount</Typography>
                        <Typography className={styles.textValue}>$1,80,00,000 </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
                </Box>
                {/* Covenant Information */}
                <Box>
                  <Box className={styles.accordion}>
                    <Box className={styles.accordionTitle} onClick={() => handleAccordionToggle('covenant')}>
                      <Typography className={styles.accordionHeader}>Covenant Information (Extracted)</Typography>
                      <Box className={styles.accordionIcon}>
                        {expandedAccordion === 'covenant' ? (
                          <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  {expandedAccordion === 'covenant' && (
                  <Box className={styles.accordionContent} sx={{overflowX:"hidden"}}>
                    <Box className={styles.covenantGrid}>
                      {/* Headers */}
                      <Box className={styles.covenantRow} sx={{ borderBottom: '1px solid #33333E', pb: 1, mb: 1 }}>
                        <Typography className={styles.covenantCell} sx={{ fontWeight: 500 }}>Covenant</Typography>
                        <Typography className={styles.covenantCell} sx={{ fontWeight: 500 }}>Threshold</Typography>
                        <Typography className={styles.covenantCell} sx={{ fontWeight: 500 }}>Current</Typography>
                        <Typography className={styles.covenantCell} sx={{ fontWeight: 500 }}>Status</Typography>
                      </Box>
                      
                      {/* DSCR */}
                      <Box className={styles.covenantRow}>
                        <Typography className={styles.covenantCell}>DSCR</Typography>
                        <Typography className={styles.covenantCell}>≥ 1.20</Typography>
                        <Typography className={styles.covenantCell}>0.75</Typography>
                        <Box className={styles.covenantCell} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: 16, height: 16, bgcolor: '#FF9800', borderRadius: 1, mr: 1 }}></Box>
                          <Typography>At Risk</Typography>
                        </Box>
                      </Box>
                      
                      {/* LTV */}
                      <Box className={styles.covenantRow}>
                        <Typography className={styles.covenantCell}>LTV</Typography>
                        <Typography className={styles.covenantCell}>≤ 70%</Typography>
                        <Typography className={styles.covenantCell}>64%</Typography>
                        <Box className={styles.covenantCell} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: 16, height: 16, bgcolor: '#4CAF50', borderRadius: 1, mr: 1 }}></Box>
                          <Typography>Compliant</Typography>
                        </Box>
                      </Box>
                      
                      {/* Leverage Ratio */}
                      <Box className={styles.covenantRow}>
                        <Typography className={styles.covenantCell}>Leverage Ratio</Typography>
                        <Typography className={styles.covenantCell}>≤ 3.50x</Typography>
                        <Typography className={styles.covenantCell}>3.20x</Typography>
                        <Box className={styles.covenantCell} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: 16, height: 16, bgcolor: '#4CAF50', borderRadius: 1, mr: 1 }}></Box>
                          <Typography>Compliant</Typography>
                        </Box>
                      </Box>
                      
                      {/* ESG Filing */}
                      <Box className={styles.covenantRow}>
                        <Typography className={styles.covenantCell}>ESG Filing</Typography>
                        <Typography className={styles.covenantCell}>Q2 Filing Required</Typography>
                        <Typography className={styles.covenantCell}>Overdue</Typography>
                        <Box className={styles.covenantCell} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: 16, height: 16, bgcolor: '#F44336', borderRadius: 1, mr: 1 }}></Box>
                          <Typography>Breached</Typography>
                        </Box>
                      </Box>
                      
                      {/* Financial Reporting */}
                      <Box className={styles.covenantRow}>
                        <Typography className={styles.covenantCell}>Financial Reporting</Typography>
                        <Typography className={styles.covenantCell}>Quarterly, within 30 days</Typography>
                        <Typography className={styles.covenantCell}>Submitted</Typography>
                        <Box className={styles.covenantCell} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: 16, height: 16, bgcolor: '#4CAF50', borderRadius: 1, mr: 1 }}></Box>
                          <Typography>Compliant</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
                </Box>
              </Box>
              <Box className={styles.accordionColumn}>
                {/* Credit Quality & Risk Measures */}
                <Box>
                  <Box className={styles.accordion}>
                    <Box className={styles.accordionTitle} onClick={() => handleAccordionToggle('credit')}>
                      <Typography className={styles.accordionHeader}>Credit Quality & Risk Metrics</Typography>
                      <Box className={styles.accordionIcon}>
                        {expandedAccordion === 'credit' ? (
                          <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  {expandedAccordion === 'credit' && (
                  <Box className={styles.accordionContent}>
                    <Box className={styles.detailsGrid}>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Internal Risk Rating</Typography>
                        <Typography className={styles.textValue}>6 (Moderate Risk)</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Prob. of Default (PD)</Typography>
                        <Typography className={styles.textValue}>1.90%</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Loss Given Default (LGD)</Typography>
                        <Typography className={styles.textValue}>38%</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Exposure at Default (EAD)</Typography>
                        <Typography className={styles.textValue}>$1,80,00,000 </Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Accrued Interest</Typography>
                        <Typography className={styles.textValue}>$72,400</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Non-Accrual Indicator</Typography>
                        <Typography className={styles.textValue}>No</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Troubled Debt Restructuring</Typography>
                        <Typography className={styles.textValue}>No</Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
                </Box>
                {/* Performance & Payment Info */}
                <Box>
                  <Box className={styles.accordion}>
                    <Box className={styles.accordionTitle} onClick={() => handleAccordionToggle('performance')}>
                      <Typography className={styles.accordionHeader}>Performance & Payment Info</Typography>
                      <Box className={styles.accordionIcon}>
                        {expandedAccordion === 'performance' ? (
                          <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  {expandedAccordion === 'performance' && (
                  <Box className={styles.accordionContent}>
                    <Box className={styles.detailsGrid}>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Days Past Due</Typography>
                        <Typography className={styles.textValue}>0</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Past Due Indicator</Typography>
                        <Typography className={styles.textValue}>No</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Last Payment Date</Typography>
                        <Typography className={styles.textValue}>12-Sep-25</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Next Payment Date</Typography>
                        <Typography className={styles.textValue}>12-Oct-25</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Payment Status</Typography>
                        <Typography className={styles.textValue}>Current</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Interest Expense (YTD)</Typography>
                        <Typography className={styles.textValue}>$21,00,00,000  </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
                </Box>
                {/* Accounting & Reporting Attributes */}
                <Box>
                  <Box className={styles.accordion}>
                    <Box className={styles.accordionTitle} onClick={() => handleAccordionToggle('accounting')}>
                      <Typography className={styles.accordionHeader}>Accounting & Reporting Attributes</Typography>
                      <Box className={styles.accordionIcon}>
                        {expandedAccordion === 'accounting' ? (
                          <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  {expandedAccordion === 'accounting' && (
                  <Box className={styles.accordionContent}>
                    <Box className={styles.detailsGrid}>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Accounting Standard</Typography>
                        <Typography className={styles.textValue}>GAAP</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Accrual Status</Typography>
                        <Typography className={styles.textValue}>Performing</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Impairment Status</Typography>
                        <Typography className={styles.textValue}>Not Impaired</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Charge-Off Amount</Typography>
                        <Typography className={styles.textValue}>$0</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Restructured Indicator</Typography>
                        <Typography className={styles.textValue}>No</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Basel Exposure Class</Typography>
                        <Typography className={styles.textValue}>Corporate Exposure</Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
                </Box>
                {/* Regulatory Schedule Mapping (Meta Fields) */}
                <Box>
                  <Box className={styles.accordion}>
                    <Box className={styles.accordionTitle} onClick={() => handleAccordionToggle('regulatory')}>
                      <Typography className={styles.accordionHeader}>Regulatory Schedule Mapping (Meta Fields)</Typography>
                      <Box className={styles.accordionIcon}>
                        {expandedAccordion === 'regulatory' ? (
                          <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  {expandedAccordion === 'regulatory' && (
                  <Box className={styles.accordionContent}>
                    <Box className={styles.detailsGrid}>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>DSCR (Reported)</Typography>
                        <Typography className={styles.textValue}>0.75</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>DSCR (Trend YoY)</Typography>
                        <Typography className={styles.textValue}>5%</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>LTV (Reported)</Typography>
                        <Typography className={styles.textValue}>64%</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>EBITDA (TTM)</Typography>
                        <Typography className={styles.textValue}>$1.2B</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Revenue (TTM)</Typography>
                        <Typography className={styles.textValue}>$12.5B</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Total Debt</Typography>
                        <Typography className={styles.textValue}>$3.8B</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Equity</Typography>
                        <Typography className={styles.textValue}>$1.2B</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Covenant Breach</Typography>
                        <Typography className={styles.textValue}>ESG report overdue (Q2)</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Remediation Plan</Typography>
                        <Typography className={styles.textValue}>Client notified; 30-day cure period issued</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Internal Comments</Typography>
                        <Typography className={styles.textValue}>No financial covenant defaults; ESG breach does not trigger cross-default</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Stress Scenario Tested</Typography>
                        <Typography className={styles.textValue}>Revenue – 10% = DSCR falls to 0.62</Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
                </Box>
              </Box>
            </Box>
            
            {/* Action Buttons */}
            <Stack direction="row" spacing={2} justifyContent="flex-start" mt={2}>
              <Button className={styles.submitButton}>
                <Typography className={styles.buttonText}>Submit to Regulator</Typography>
              </Button>
              
              <Button className={styles.saveButton}>
                <Stack direction="row" alignItems="center">
                  <InsertDriveFileOutlined className={styles.buttonIcon} />
                  <Typography className={styles.buttonText}>Save Drafts</Typography>
                </Stack>
              </Button>
              
              <Button className={styles.generateButton}>
                <Stack direction="row" alignItems="center">
                  <PictureAsPdfOutlined className={styles.buttonIcon} />
                  <Typography className={styles.buttonText}>Generate PDF</Typography>
                </Stack>
              </Button>
            </Stack>
              </Box>
            </GradientBorderBox>
          </Grow>
        </Box>

        {/* Right column - Report Builder Workflow */}
        <Grow in={animateRight} timeout={800} appear>
          <GradientBorderBox>
            <Box className={styles.rightColumn}>
              <Box className={styles.panelHeader}>
                <Typography className={styles.panelTitle}>Report Builder Workflow</Typography>
              </Box>
              
              <Box className={styles.workflowContainer}>
                {/* Workflow Steps SVG */}
                <Box
                  component="img"
                  src={`${process.env.PUBLIC_URL}/assets/report-builder-workflow-step.svg`}
                  alt="Report Builder Workflow Steps"
                  className={styles.workflowStepsImage}
                />
                
                {/* Document SVGs Container */}
                <Box className={styles.docsContainer}>
                  {/* First Document */}
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/assets/reportbuilderdoc.svg`}
                    alt="Report Builder Document 1"
                    className={styles.docImage}
                  />
                  
                  {/* Second Document */}
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/assets/reportbuilderdoc.svg`}
                    alt="Report Builder Document 2"
                    className={styles.docImage}
                  />
                  
                  {/* Third Document */}
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/assets/reportbuilderdoc.svg`}
                    alt="Report Builder Document 3"
                    className={styles.docImage}
                  />
                </Box>
              </Box>
            </Box>
          </GradientBorderBox>
        </Grow>

        {/* Detailed Findings replaced by static SVG */}
        <Grow in={animateFindings} timeout={800} appear>
          <Box className={styles.findingsPanel}>
            <Box  className={styles.findingsImage}>
            <GradientBorderBox>
              <DetailedFindings 
                cardMinWidth="300px"
                cardMaxWidth="400px"
                
              />
            </GradientBorderBox>
            </Box>
          </Box>
        </Grow>
      </Box>
      
      {/* Navigation buttons */}
      <Fade in={animateNav} timeout={800}>
        <Box className={styles.navigationButtons}>
        <Button 
          className={styles.backButton}
          onClick={handleGoBack}
        >
          <Typography className={styles.backButtonText}>Back</Typography>
        </Button>
        <Button 
          className={styles.nextButton}
          onClick={handleNextStep}
        >
          <Typography className={styles.nextButtonText}>Next</Typography>
        </Button>
      </Box>
      </Fade>
      
      {/* EY Logo */}
      <Fade in={animateLogo} timeout={800}>
        <Box 
          component="img"
          src="/assets/ey-logo.svg"
          alt="EY Logo"
          className={styles.eyLogo}
          onClick={() => { navigate('/'); window.location.reload(); }}
          sx={{
            cursor: 'pointer',
            transition: 'opacity 0.3s ease',
            '&:hover': { opacity: 0.8 }
          }}
        />
      </Fade>
    </Box>
  );
}
