import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Stack, Grow, Fade, Tooltip } from '@mui/material';
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

export default function Y14ReportNew() {
  const navigate = useNavigate();
  // Keep 'borrower' accordion open by default
  const [expandedAccordion, setExpandedAccordion] = useState('borrower');
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [showFindings, setShowFindings] = useState(false);

  // Staggered mount so panels render one-by-one slowly
  useEffect(() => {
    const t1 = setTimeout(() => setShowLeft(true), 200);       // left starts
    const t2 = setTimeout(() => setShowRight(true), 1400);     // then right
    const t3 = setTimeout(() => setShowFindings(true), 2600);  // then findings
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
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
        <source src={`${process.env.PUBLIC_URL}/assets/AdobeStock_1544892280.mp4`} type="video/mp4" />
      </video>
      
      {/* Background Overlay */}
      <Box className={styles.backgroundOverlay} />
      
      {/* Main content */}
      <Box className={styles.mainContainer}>
        {/* Left: Schedule Template with gradient border and grow */}
        <Box className={styles.leftColumn}>
          <Grow in={showLeft} timeout={1200} appear>
            <GradientBorderBox animated>
              <Box className={styles.scheduleTemplatePanel}>
                <Box className={styles.panelHeader}>
                  <Typography className={styles.panelTitle}>FR Y-14 Schedule Template</Typography>
                </Box>

                <Box className={styles.templateContent}>
              <Box className={styles.accordionColumn}>
                {/* Borrower / Obligor Information */}
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
                  {expandedAccordion === 'borrower' && (
                  <Box className={styles.accordionContent}>
                    <Box className={styles.detailsGrid}>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Obligor name</Typography>
                        <Tooltip title="Vertex Logistics Corp." placement="top" arrow>
                          <Typography className={styles.textValue}>Vertex Logistics Corp.</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Obligor ID</Typography>
                        <Tooltip title="00492-WHSL" placement="top" arrow>
                          <Typography className={styles.textValue}>00492-WHSL</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Country</Typography>
                        <Tooltip title="United States" placement="top" arrow>
                          <Typography className={styles.textValue}>United States</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Industry/NAICS code</Typography>
                        <Tooltip title="488510 – Freight Transportation Arrangement" placement="top" arrow>
                          <Typography className={styles.textValue}>488510 – Freight Transportation Arrangement</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Obligor type</Typography>
                        <Tooltip title="Corporate" placement="top" arrow>
                          <Typography className={styles.textValue}>Corporate</Typography>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                )}
                </Box>
                {/* Loan Characteristics */}
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
                  {expandedAccordion === 'loan' && (
                  <Box className={styles.accordionContent}>
                    <Box className={styles.detailsGrid}>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Loan Type</Typography>
                        <Tooltip title="Working Capital Revolver" placement="top" arrow>
                          <Typography className={styles.textValue}>Working Capital Revolver</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Origination Date</Typography>
                        <Tooltip title="15-Jan-21" placement="top" arrow>
                          <Typography className={styles.textValue}>15-Jan-21</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Maturity Date</Typography>
                        <Tooltip title="15-Jan-26" placement="top" arrow>
                          <Typography className={styles.textValue}>15-Jan-26</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Original Commitment</Typography>
                        <Tooltip title="Value hidden" placement="top" arrow>
                          <Typography className={styles.textValue}>########</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Current Outstanding Balance</Typography>
                        <Tooltip title="Value hidden" placement="top" arrow>
                          <Typography className={styles.textValue}>########</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Unused Commitment</Typography>
                        <Tooltip title="Value hidden" placement="top" arrow>
                          <Typography className={styles.textValue}>########</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Interest Rate Type</Typography>
                        <Tooltip title="Floating (SOFR + 2.10%)" placement="top" arrow>
                          <Typography className={styles.textValue}>Floating (SOFR + 2.10%)</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Current Interest Rate</Typography>
                        <Tooltip title="7.35%" placement="top" arrow>
                          <Typography className={styles.textValue}>7.35%</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Payment Frequency</Typography>
                        <Tooltip title="Monthly" placement="top" arrow>
                          <Typography className={styles.textValue}>Monthly</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Next Payment Due</Typography>
                        <Tooltip title="Value hidden" placement="top" arrow>
                          <Typography className={styles.textValue}>########</Typography>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                )}
                </Box>
                {/* Collateral Information */}
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
                  {expandedAccordion === 'collateral' && (
                  <Box className={styles.accordionContent}>
                    <Box className={styles.detailsGrid}>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Collateral Type</Typography>
                        <Tooltip title="Accounts Receivable + Inventory" placement="top" arrow>
                          <Typography className={styles.textValue}>Accounts Receivable + Inventory</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Collateral Code</Typography>
                        <Tooltip title="24" placement="top" arrow>
                          <Typography className={styles.textValue}>24</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Collateral Value</Typography>
                        <Tooltip title="Value hidden" placement="top" arrow>
                          <Typography className={styles.textValue}>########</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>LTV (Calculated)</Typography>
                        <Tooltip title="64%" placement="top" arrow>
                          <Typography className={styles.textValue}>64%</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Lien Position</Typography>
                        <Tooltip title="1st Lien" placement="top" arrow>
                          <Typography className={styles.textValue}>1st Lien</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Guarantee Indicator</Typography>
                        <Tooltip title="Yes (Corporate Guarantee)" placement="top" arrow>
                          <Typography className={styles.textValue}>Yes (Corporate Guarantee)</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Guarantee Amount</Typography>
                        <Tooltip title="Value hidden" placement="top" arrow>
                          <Typography className={styles.textValue}>########</Typography>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                )}
                </Box>
                {/* Covenant Information */}
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
                  {expandedAccordion === 'covenant' && (
                  <Box className={styles.accordionContent}>
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
                        <Tooltip title="DSCR" placement="top" arrow>
                          <Typography className={styles.covenantCell}>DSCR</Typography>
                        </Tooltip>
                        <Tooltip title="≥ 1.20" placement="top" arrow>
                          <Typography className={styles.covenantCell}>≥ 1.20</Typography>
                        </Tooltip>
                        <Tooltip title="0.75" placement="top" arrow>
                          <Typography className={styles.covenantCell}>0.75</Typography>
                        </Tooltip>
                        <Box className={styles.covenantCell} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: 16, height: 16, bgcolor: '#FF9800', borderRadius: 1, mr: 1 }}></Box>
                          <Typography>At Risk</Typography>
                        </Box>
                      </Box>
                      
                      {/* LTV */}
                      <Box className={styles.covenantRow}>
                        <Tooltip title="LTV" placement="top" arrow>
                          <Typography className={styles.covenantCell}>LTV</Typography>
                        </Tooltip>
                        <Tooltip title="≤ 70%" placement="top" arrow>
                          <Typography className={styles.covenantCell}>≤ 70%</Typography>
                        </Tooltip>
                        <Tooltip title="64%" placement="top" arrow>
                          <Typography className={styles.covenantCell}>64%</Typography>
                        </Tooltip>
                        <Box className={styles.covenantCell} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: 16, height: 16, bgcolor: '#4CAF50', borderRadius: 1, mr: 1 }}></Box>
                          <Typography>Compliant</Typography>
                        </Box>
                      </Box>
                      
                      {/* Leverage Ratio */}
                      <Box className={styles.covenantRow}>
                        <Tooltip title="Leverage Ratio" placement="top" arrow>
                          <Typography className={styles.covenantCell}>Leverage Ratio</Typography>
                        </Tooltip>
                        <Tooltip title="≤ 3.50x" placement="top" arrow>
                          <Typography className={styles.covenantCell}>≤ 3.50x</Typography>
                        </Tooltip>
                        <Tooltip title="3.20x" placement="top" arrow>
                          <Typography className={styles.covenantCell}>3.20x</Typography>
                        </Tooltip>
                        <Box className={styles.covenantCell} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: 16, height: 16, bgcolor: '#4CAF50', borderRadius: 1, mr: 1 }}></Box>
                          <Typography>Compliant</Typography>
                        </Box>
                      </Box>
                      
                      {/* ESG Filing */}
                      <Box className={styles.covenantRow}>
                        <Tooltip title="ESG Filing" placement="top" arrow>
                          <Typography className={styles.covenantCell}>ESG Filing</Typography>
                        </Tooltip>
                        <Tooltip title="Q2 Filing Required" placement="top" arrow>
                          <Typography className={styles.covenantCell}>Q2 Filing Required</Typography>
                        </Tooltip>
                        <Tooltip title="Overdue" placement="top" arrow>
                          <Typography className={styles.covenantCell}>Overdue</Typography>
                        </Tooltip>
                        <Box className={styles.covenantCell} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: 16, height: 16, bgcolor: '#F44336', borderRadius: 1, mr: 1 }}></Box>
                          <Typography>Breached</Typography>
                        </Box>
                      </Box>
                      
                      {/* Financial Reporting */}
                      <Box className={styles.covenantRow}>
                        <Tooltip title="Financial Reporting" placement="top" arrow>
                          <Typography className={styles.covenantCell}>Financial Reporting</Typography>
                        </Tooltip>
                        <Tooltip title="Quarterly, within 30 days" placement="top" arrow>
                          <Typography className={styles.covenantCell}>Quarterly, within 30 days</Typography>
                        </Tooltip>
                        <Tooltip title="Submitted" placement="top" arrow>
                          <Typography className={styles.covenantCell}>Submitted</Typography>
                        </Tooltip>
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
                  {expandedAccordion === 'credit' && (
                  <Box className={styles.accordionContent}>
                    <Box className={styles.detailsGrid}>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Internal Risk Rating</Typography>
                        <Tooltip title="6 (Moderate Risk)" placement="top" arrow>
                          <Typography className={styles.textValue}>6 (Moderate Risk)</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Prob. of Default (PD)</Typography>
                        <Tooltip title="1.90%" placement="top" arrow>
                          <Typography className={styles.textValue}>1.90%</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Loss Given Default (LGD)</Typography>
                        <Tooltip title="38%" placement="top" arrow>
                          <Typography className={styles.textValue}>38%</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Exposure at Default (EAD)</Typography>
                        <Tooltip title="Value hidden" placement="top" arrow>
                          <Typography className={styles.textValue}>########</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Accrued Interest</Typography>
                        <Tooltip title="$72,400" placement="top" arrow>
                          <Typography className={styles.textValue}>$72,400</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Non-Accrual Indicator</Typography>
                        <Tooltip title="No" placement="top" arrow>
                          <Typography className={styles.textValue}>No</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Troubled Debt Restructuring</Typography>
                        <Tooltip title="No" placement="top" arrow>
                          <Typography className={styles.textValue}>No</Typography>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                )}
                </Box>
                {/* Performance & Payment Info */}
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
                  {expandedAccordion === 'performance' && (
                  <Box className={styles.accordionContent}>
                    <Box className={styles.detailsGrid}>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Days Past Due</Typography>
                        <Tooltip title="0" placement="top" arrow>
                          <Typography className={styles.textValue}>0</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Past Due Indicator</Typography>
                        <Tooltip title="No" placement="top" arrow>
                          <Typography className={styles.textValue}>No</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Last Payment Date</Typography>
                        <Tooltip title="Value hidden" placement="top" arrow>
                          <Typography className={styles.textValue}>########</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Next Payment Date</Typography>
                        <Tooltip title="Value hidden" placement="top" arrow>
                          <Typography className={styles.textValue}>########</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Payment Status</Typography>
                        <Tooltip title="Current" placement="top" arrow>
                          <Typography className={styles.textValue}>Current</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Interest Expense (YTD)</Typography>
                        <Tooltip title="Value hidden" placement="top" arrow>
                          <Typography className={styles.textValue}>########</Typography>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                )}
                </Box>
                {/* Accounting & Reporting Attributes */}
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
                  {expandedAccordion === 'accounting' && (
                  <Box className={styles.accordionContent}>
                    <Box className={styles.detailsGrid}>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Accounting Standard</Typography>
                        <Tooltip title="GAAP" placement="top" arrow>
                          <Typography className={styles.textValue}>GAAP</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Accrual Status</Typography>
                        <Tooltip title="Performing" placement="top" arrow>
                          <Typography className={styles.textValue}>Performing</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Impairment Status</Typography>
                        <Tooltip title="Not Impaired" placement="top" arrow>
                          <Typography className={styles.textValue}>Not Impaired</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Charge-Off Amount</Typography>
                        <Tooltip title="$0" placement="top" arrow>
                          <Typography className={styles.textValue}>$0</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Restructured Indicator</Typography>
                        <Tooltip title="No" placement="top" arrow>
                          <Typography className={styles.textValue}>No</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Basel Exposure Class</Typography>
                        <Tooltip title="Corporate Exposure" placement="top" arrow>
                          <Typography className={styles.textValue}>Corporate Exposure</Typography>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                )}
                </Box>
                {/* Regulatory Schedule Mapping (Meta Fields) */}
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
                  {expandedAccordion === 'regulatory' && (
                  <Box className={styles.accordionContent}>
                    <Box className={styles.detailsGrid}>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>DSCR (Reported)</Typography>
                        <Tooltip title="0.75" placement="top" arrow>
                          <Typography className={styles.textValue}>0.75</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>DSCR (Trend YoY)</Typography>
                        <Tooltip title="5%" placement="top" arrow>
                          <Typography className={styles.textValue}>5%</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>LTV (Reported)</Typography>
                        <Tooltip title="64%" placement="top" arrow>
                          <Typography className={styles.textValue}>64%</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>EBITDA (TTM)</Typography>
                        <Tooltip title="$1.2B" placement="top" arrow>
                          <Typography className={styles.textValue}>$1.2B</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Revenue (TTM)</Typography>
                        <Tooltip title="$12.5B" placement="top" arrow>
                          <Typography className={styles.textValue}>$12.5B</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Total Debt</Typography>
                        <Tooltip title="$3.8B" placement="top" arrow>
                          <Typography className={styles.textValue}>$3.8B</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Equity</Typography>
                        <Tooltip title="$1.2B" placement="top" arrow>
                          <Typography className={styles.textValue}>$1.2B</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Covenant Breach</Typography>
                        <Tooltip title="ESG report overdue (Q2)" placement="top" arrow>
                          <Typography className={styles.textValue}>ESG report overdue (Q2)</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Remediation Plan</Typography>
                        <Tooltip title="Client notified; 30-day cure period issued" placement="top" arrow>
                          <Typography className={styles.textValue}>Client notified; 30-day cure period issued</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Internal Comments</Typography>
                        <Tooltip title="No financial covenant defaults; ESG breach does not trigger cross-default" placement="top" arrow>
                          <Typography className={styles.textValue}>No financial covenant defaults; ESG breach does not trigger cross-default</Typography>
                        </Tooltip>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Stress Scenario Tested</Typography>
                        <Tooltip title="Revenue – 10% = DSCR falls to 0.62" placement="top" arrow>
                          <Typography className={styles.textValue}>Revenue – 10% = DSCR falls to 0.62</Typography>
                        </Tooltip>
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

        {/* Right column - Replaced with static SVG */}
        <Fade in={showRight} timeout={1200} appear>
          <Box className={styles.rightColumn}>
            <Box className={styles.workflowPanel}>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/assets/builder-workflow.svg`}
                alt="Report Builder Workflow"
                className={styles.workflowImage}
              />
            </Box>
          </Box>
        </Fade>

        {/* Detailed Findings replaced by static SVG */}
        <Fade in={showFindings} timeout={1400} appear>
          <Box className={styles.findingsPanel}>
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/assets/deatiled-findings.svg`}
              alt="Detailed Findings"
              className={styles.findingsImage}
            />
          </Box>
        </Fade>
      </Box>
      
      {/* Navigation buttons */}
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
      
      {/* EY Logo */}
      <Box 
        component="img"
        src={`${process.env.PUBLIC_URL}/assets/ey-logo.svg`}
        alt="EY Logo"
        className={styles.eyLogo}
      />
    </Box>
  );
}
